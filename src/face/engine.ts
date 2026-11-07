/**
 * WebGL2 Interactive Anime Face Physics Engine
 * Dense 128x128 UV grid with Gaussian vertex displacement,
 * 4-pointer rubber band multi-touch stretching, damped harmonic spring release,
 * realistic anime eyes with multi-tier gradients, catchlights, blink cycle,
 * anime hair with angel-ring shine, cyber techwear hoodie, and studio headphones.
 */

export interface FaceEngineOptions {
  onPatienceChange?: (patience: number, stateText: string) => void;
  onExpressionChange?: (expression: ExpressionType) => void;
}

export type ExpressionType =
  | "neutral"
  | "startled"
  | "stretched"
  | "crosseyed"
  | "laughing"
  | "annoyed"
  | "blush"
  | "cyber";

interface PointerState {
  id: number;
  active: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  // Damped spring physics
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  isReleasing: boolean;
}

export class FacePhysicsEngine {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;

  // Grid mesh parameters
  private readonly GRID_SIZE = 128; // 128x128 dense mesh
  private vertexCount = 0;
  private indexCount = 0;

  private positionBuffer: WebGLBuffer | null = null;
  private uvBuffer: WebGLBuffer | null = null;
  private indexBuffer: WebGLBuffer | null = null;

  private basePositions!: Float32Array;
  private currentPositions!: Float32Array;
  private uvs!: Float32Array;
  private indices!: Uint32Array;

  // WebGL Uniform locations
  private uTextureLoc: WebGLUniformLocation | null = null;
  private uFlushLoc: WebGLUniformLocation | null = null;
  private uTimeLoc: WebGLUniformLocation | null = null;

  // Character textures
  private texture: WebGLTexture | null = null;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;

  // Pointers (up to 4 simultaneous)
  private pointers: PointerState[] = [];
  private mousePos = { x: 0, y: 0, onCanvas: false };

  // Face states & animations
  private currentExpression: ExpressionType = "neutral";
  private patience = 100; // 0 to 100
  private stretchDuration = 0;
  private flushIntensity = 0;
  private animationFrameId: number | null = null;
  private lastTime = 0;
  private releaseTimer = 0;

  // Anime idle breathing & realistic eye blinking
  private blinkTimer = 3.2;
  private blinkProgress = 0; // 0 = open, 1 = closed
  private isBlinking = false;
  private idleTime = 0;

  private options: FaceEngineOptions;

  constructor(canvas: HTMLCanvasElement, options: FaceEngineOptions = {}) {
    this.canvas = canvas;
    this.options = options;

    // Initialize 4 pointer slots
    for (let i = 0; i < 4; i++) {
      this.pointers.push({
        id: -1,
        active: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
        isReleasing: false,
      });
    }

    // Prepare offscreen canvas for dynamic anime character rendering (crisp 1024x1024)
    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = 1024;
    this.offscreenCanvas.height = 1024;
    this.offscreenCtx = this.offscreenCanvas.getContext("2d", { willReadFrequently: true })!;

    this.initWebGL();
    this.bindEvents();
    this.startLoop();
  }

  private initWebGL() {
    const gl = this.canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL2 not supported, fallback mode");
      return;
    }
    this.gl = gl;

    // Shaders
    const vsSource = `#version 300 es
      in vec2 a_position;
      in vec2 a_uv;
      out vec2 v_uv;

      void main() {
        v_uv = a_uv;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      in vec2 v_uv;
      out vec4 outColor;

      uniform sampler2D u_texture;
      uniform float u_flush;
      uniform float u_time;

      void main() {
        vec4 color = texture(u_texture, v_uv);
        if (color.a < 0.01) {
          discard;
        }

        // Anime cheek blush effect (localized Gaussian circles around cheeks)
        // Left cheek: (~0.37, 0.49), Right cheek: (~0.63, 0.49)
        float dLeft = length((v_uv - vec2(0.37, 0.49)) * vec2(1.0, 1.4));
        float dRight = length((v_uv - vec2(0.63, 0.49)) * vec2(1.0, 1.4));
        float blushLeft = exp(-dLeft * dLeft * 55.0);
        float blushRight = exp(-dRight * dRight * 55.0);
        float totalBlush = clamp((blushLeft + blushRight) * u_flush * 0.75, 0.0, 0.75);

        // Warm, glowing rosy pink anime blush tone
        vec3 blushColor = vec3(1.0, 0.38, 0.48);
        vec3 finalRgb = mix(color.rgb, blushColor, totalBlush);

        outColor = vec4(finalRgb, color.a);
      }
    `;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link failed:", gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;

    this.uTextureLoc = gl.getUniformLocation(program, "u_texture");
    this.uFlushLoc = gl.getUniformLocation(program, "u_flush");
    this.uTimeLoc = gl.getUniformLocation(program, "u_time");

    // Build dense 128x128 grid mesh
    this.buildGridMesh();

    // Create GPU Buffers
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.currentPositions, gl.DYNAMIC_DRAW);

    const posAttrLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttrLoc);
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);

    this.uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);

    const uvAttrLoc = gl.getAttribLocation(program, "a_uv");
    gl.enableVertexAttribArray(uvAttrLoc);
    gl.vertexAttribPointer(uvAttrLoc, 2, gl.FLOAT, false, 0, 0);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    // Initial character texture creation
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Initial render onto offscreen canvas & GPU upload
    this.renderCharacterTexture();
    this.updateTexture();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compile failed:", this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private buildGridMesh() {
    const N = this.GRID_SIZE;
    this.vertexCount = N * N;
    this.indexCount = (N - 1) * (N - 1) * 6;

    this.basePositions = new Float32Array(this.vertexCount * 2);
    this.currentPositions = new Float32Array(this.vertexCount * 2);
    this.uvs = new Float32Array(this.vertexCount * 2);
    this.indices = new Uint32Array(this.indexCount);

    let vIdx = 0;
    for (let j = 0; j < N; j++) {
      const v = j / (N - 1);
      const y = -(v * 2 - 1); // Flip Y for WebGL clip space
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const x = u * 2 - 1;

        this.basePositions[vIdx] = x;
        this.basePositions[vIdx + 1] = y;

        this.currentPositions[vIdx] = x;
        this.currentPositions[vIdx + 1] = y;

        this.uvs[vIdx] = u;
        this.uvs[vIdx + 1] = v;

        vIdx += 2;
      }
    }

    let iIdx = 0;
    for (let j = 0; j < N - 1; j++) {
      for (let i = 0; i < N - 1; i++) {
        const row1 = j * N + i;
        const row2 = (j + 1) * N + i;

        // Triangle 1
        this.indices[iIdx++] = row1;
        this.indices[iIdx++] = row2;
        this.indices[iIdx++] = row1 + 1;

        // Triangle 2
        this.indices[iIdx++] = row1 + 1;
        this.indices[iIdx++] = row2;
        this.indices[iIdx++] = row2 + 1;
      }
    }
  }

  /**
   * Procedurally paints the realistic handsome anime protagonist developer character
   * with sharp chiseled jawline, textured curtain bangs, captivating almond anime eyes,
   * angel-ring hair gloss, silver ear piercings, and cyber techwear.
   */
  private renderCharacterTexture() {
    const ctx = this.offscreenCtx;
    const w = this.offscreenCanvas.width;
    const h = this.offscreenCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.52;

    // Determine Eye Look Targets
    let lookX = 0;
    let lookY = 0;
    let isCrossEyed = false;

    // Check if mouse is hovering over the nose area
    if (this.mousePos.onCanvas) {
      const distToNose = Math.hypot(this.mousePos.x, this.mousePos.y - 0.02);
      if (distToNose < 0.16) {
        isCrossEyed = true;
      } else {
        lookX = Math.max(-1, Math.min(1, this.mousePos.x * 2.2));
        lookY = Math.max(-1, Math.min(1, -this.mousePos.y * 2.2));
      }
    }

    const expr = isCrossEyed ? "crosseyed" : this.currentExpression;

    // Subtle anime breathing idle offset
    const breatheY = Math.sin(this.idleTime * 2.2) * 2.5;

    // --- 1. SHOULDERS & SLEEK TECHWEAR JACKET ---
    ctx.save();
    // Torso base
    const jacketGrad = ctx.createLinearGradient(cx - 300, cy + 200, cx + 300, cy + 500);
    jacketGrad.addColorStop(0, "#0B101E");
    jacketGrad.addColorStop(0.35, "#151F3D");
    jacketGrad.addColorStop(0.7, "#121C38");
    jacketGrad.addColorStop(1, "#070B16");

    ctx.fillStyle = jacketGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 380, h);
    ctx.quadraticCurveTo(cx - 320, cy + 260 + breatheY, cx - 180, cy + 235 + breatheY);
    ctx.quadraticCurveTo(cx, cy + 260 + breatheY, cx + 180, cy + 235 + breatheY);
    ctx.quadraticCurveTo(cx + 320, cy + 260 + breatheY, cx + 380, h);
    ctx.closePath();
    ctx.fill();

    // Cobalt Blue Shoulder Lapels (Asymmetric futuristic streetwear)
    const cobaltStripe = ctx.createLinearGradient(cx - 240, cy + 240, cx - 180, cy + 340);
    cobaltStripe.addColorStop(0, "#2F4BF0");
    cobaltStripe.addColorStop(1, "#182CAA");
    ctx.fillStyle = cobaltStripe;
    ctx.beginPath();
    ctx.moveTo(cx - 310, cy + 290 + breatheY);
    ctx.lineTo(cx - 180, cy + 235 + breatheY);
    ctx.lineTo(cx - 160, cy + 265 + breatheY);
    ctx.lineTo(cx - 280, cy + 340 + breatheY);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 310, cy + 290 + breatheY);
    ctx.lineTo(cx + 180, cy + 235 + breatheY);
    ctx.lineTo(cx + 160, cy + 265 + breatheY);
    ctx.lineTo(cx + 280, cy + 340 + breatheY);
    ctx.closePath();
    ctx.fill();

    // High Techwear Stand Collar
    ctx.fillStyle = "#10162B";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 245 + breatheY, 190, 68, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner Collar Cobalt Rim Accent
    ctx.strokeStyle = "#2F4BF0";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 240 + breatheY, 182, 60, 0, Math.PI * 0.1, Math.PI * 0.9);
    ctx.stroke();

    // Mustard Yellow Center Zipper & Trim
    ctx.strokeStyle = "#F2B31B";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy + 265 + breatheY);
    ctx.lineTo(cx, h);
    ctx.stroke();

    // Techwear Tag ("SAMIR // 01")
    ctx.fillStyle = "#F2B31B";
    ctx.fillRect(cx - 110, cy + 280 + breatheY, 48, 16);
    ctx.fillStyle = "#0E1015";
    ctx.font = "bold 9px monospace";
    ctx.fillText("SK.AI//01", cx - 106, cy + 292 + breatheY);

    // --- 2. CYBER AUDIO STUDIO HEADPHONES AROUND NECK ---
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#161924";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 230 + breatheY, 138, 48, 0, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();

    const drawHeadphoneCup = (x: number, isRight: boolean) => {
      ctx.save();
      ctx.translate(x, cy + 200 + breatheY);
      ctx.rotate(isRight ? -0.22 : 0.22);

      // Outer metallic pivot
      ctx.fillStyle = "#2D3447";
      ctx.beginPath();
      ctx.roundRect(-22, -42, 44, 84, 18);
      ctx.fill();

      // Cobalt Blue Core Body
      ctx.fillStyle = "#2F4BF0";
      ctx.beginPath();
      ctx.roundRect(-18, -38, 36, 76, 16);
      ctx.fill();

      // Glowing Cyan / Mustard LED Status Ring
      ctx.strokeStyle = expr === "cyber" ? "#00F0FF" : "#F2B31B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 24, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Cushion
      ctx.fillStyle = "#0E111A";
      ctx.beginPath();
      ctx.ellipse(isRight ? -13 : 13, 0, 9, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawHeadphoneCup(cx - 142, false);
    drawHeadphoneCup(cx + 142, true);

    // Under-neck ambient shadow
    ctx.fillStyle = "rgba(8, 12, 26, 0.58)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 202 + breatheY, 88, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 3. MASCULINE ANIME NECK & ADAM'S APPLE ---
    const neckGrad = ctx.createLinearGradient(cx - 60, cy + 120, cx + 60, cy + 225);
    neckGrad.addColorStop(0, "#F5C5A8");
    neckGrad.addColorStop(0.5, "#E8AF8D");
    neckGrad.addColorStop(1, "#CE8F6C");
    ctx.fillStyle = neckGrad;

    ctx.beginPath();
    ctx.moveTo(cx - 62, cy + 122);
    ctx.lineTo(cx - 66, cy + 222 + breatheY);
    ctx.quadraticCurveTo(cx, cy + 238 + breatheY, cx + 66, cy + 222 + breatheY);
    ctx.lineTo(cx + 62, cy + 122);
    ctx.closePath();
    ctx.fill();

    // Sternocleidomastoid Muscle Shadow lines (handsome neck definition)
    ctx.strokeStyle = "rgba(175, 95, 70, 0.35)";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx - 48, cy + 140);
    ctx.quadraticCurveTo(cx - 42, cy + 185, cx - 22, cy + 220 + breatheY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + 48, cy + 140);
    ctx.quadraticCurveTo(cx + 42, cy + 185, cx + 22, cy + 220 + breatheY);
    ctx.stroke();

    // Subtle Handsome Adam's Apple shadow
    ctx.fillStyle = "rgba(165, 85, 60, 0.4)";
    ctx.beginPath();
    ctx.moveTo(cx, cy + 172 + breatheY);
    ctx.lineTo(cx - 7, cy + 186 + breatheY);
    ctx.lineTo(cx + 7, cy + 186 + breatheY);
    ctx.closePath();
    ctx.fill();

    // Shadow cast under anime jaw onto neck
    ctx.fillStyle = "rgba(170, 90, 65, 0.38)";
    ctx.beginPath();
    ctx.moveTo(cx - 62, cy + 126);
    ctx.quadraticCurveTo(cx, cy + 178, cx + 62, cy + 126);
    ctx.quadraticCurveTo(cx, cy + 150, cx - 62, cy + 126);
    ctx.closePath();
    ctx.fill();

    // --- 4. ANIME EARS WITH SILVER PIERCINGS ---
    const drawHandsomeAnimeEar = (x: number, isRight: boolean) => {
      ctx.save();
      const earGrad = ctx.createRadialGradient(x, cy + 12, 10, x, cy + 12, 55);
      earGrad.addColorStop(0, "#FFD9BF");
      earGrad.addColorStop(0.7, "#EEB18C");
      earGrad.addColorStop(1, "#CF8B65");

      ctx.fillStyle = earGrad;
      ctx.beginPath();
      // Elegant, tapered anime ear shape
      ctx.ellipse(x, cy + 12, 34, 54, isRight ? 0.2 : -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Inner ear anime ridge
      ctx.strokeStyle = "rgba(180, 85, 65, 0.4)";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.ellipse(x + (isRight ? -4 : 4), cy + 10, 15, 28, isRight ? 0.12 : -0.12, 0, Math.PI * 1.5);
      ctx.stroke();

      // Left Ear Silver Piercings (Silver huggie hoop & stud - classic handsome anime aesthetic!)
      if (!isRight) {
        // Silver stud on lobe
        ctx.fillStyle = "#E8EBF1";
        ctx.beginPath();
        ctx.arc(x + 4, cy + 38, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Silver hoop on helix
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x - 14, cy - 8, 4.5, -0.2 * Math.PI, 1.2 * Math.PI);
        ctx.stroke();
      }

      ctx.restore();
    };

    drawHandsomeAnimeEar(cx - 212, false);
    drawHandsomeAnimeEar(cx + 212, true);

    // --- 5. CHISELED JAWLINE & HANDSOME CHIN ---
    const faceGrad = ctx.createRadialGradient(cx, cy - 35, 35, cx, cy + 15, 255);
    faceGrad.addColorStop(0, "#FFF2E8");
    faceGrad.addColorStop(0.45, "#FDE4D2");
    faceGrad.addColorStop(0.85, "#F4C7A8");
    faceGrad.addColorStop(1, "#DE9F78");

    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    // Chiseled, sharp handsome anime jawline
    ctx.moveTo(cx - 192, cy - 95);
    ctx.quadraticCurveTo(cx - 210, cy + 20, cx - 162, cy + 110);
    ctx.quadraticCurveTo(cx - 90, cy + 185, cx, cy + 204); // Clean, sharp tapered chin
    ctx.quadraticCurveTo(cx + 90, cy + 185, cx + 162, cy + 110);
    ctx.quadraticCurveTo(cx + 210, cy + 20, cx + 192, cy - 95);
    ctx.quadraticCurveTo(cx, cy - 205, cx - 192, cy - 95);
    ctx.closePath();
    ctx.fill();

    // Subtle handsome chin cleft shadow
    ctx.strokeStyle = "rgba(175, 90, 70, 0.35)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy + 190, 10, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // --- 6. HIGH CHEEKBONE CONTOUR & SUBTLE BLUSH ---
    // Subtle high cheekbone shading for handsome bone structure
    ctx.fillStyle = "rgba(220, 110, 90, 0.14)";
    ctx.beginPath();
    ctx.ellipse(cx - 115, cy + 45, 60, 24, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx + 115, cy + 45, 60, 24, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Manga Blush Hatch Lines (///) when flushed or stretched or blush expression
    if (this.flushIntensity > 0.22 || expr === "stretched" || expr === "blush" || expr === "startled") {
      ctx.save();
      ctx.strokeStyle = "rgba(235, 75, 95, 0.65)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      for (let i = 0; i < 4; i++) {
        const lx = cx - 125 + i * 11;
        ctx.beginPath();
        ctx.moveTo(lx, cy + 52);
        ctx.lineTo(lx + 8, cy + 38);
        ctx.stroke();

        const rx = cx + 92 + i * 11;
        ctx.beginPath();
        ctx.moveTo(rx, cy + 52);
        ctx.lineTo(rx + 8, cy + 38);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- 7. SLENDER ANIME NOSE (SHARP & REFINED) ---
    ctx.save();
    // Nose bridge line
    ctx.strokeStyle = "rgba(170, 85, 60, 0.5)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 2, cy - 12);
    ctx.quadraticCurveTo(cx - 6, cy + 24, cx - 2, cy + 40);
    ctx.stroke();

    // Clean anime nose tip facet
    ctx.fillStyle = "#CE7C58";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 41, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Piercing specular glint on nose tip
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(cx - 1.5, cy + 37.5, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- 8. PIERCING, CHARISMATIC ALMOND ANIME EYES ---
    const leftEyeCx = cx - 78;
    const rightEyeCx = cx + 78;
    const eyeCy = cy - 24;

    // Handsome Eyebrows (Well-groomed, confident, stylish arch)
    const drawHandsomeEyebrow = (x: number, isRight: boolean) => {
      ctx.save();
      ctx.fillStyle = "#0F121C";
      ctx.strokeStyle = "#0F121C";
      ctx.lineCap = "round";
      ctx.lineWidth = 7.5;
      ctx.beginPath();

      if (expr === "startled") {
        ctx.moveTo(x - 44, eyeCy - 72);
        ctx.quadraticCurveTo(x, eyeCy - 95, x + 44, eyeCy - 70);
      } else if (expr === "annoyed") {
        if (isRight) {
          ctx.moveTo(x - 44, eyeCy - 45);
          ctx.quadraticCurveTo(x, eyeCy - 62, x + 44, eyeCy - 68);
        } else {
          ctx.moveTo(x - 44, eyeCy - 68);
          ctx.quadraticCurveTo(x, eyeCy - 62, x + 44, eyeCy - 45);
        }
      } else {
        // Confident, sharp handsome arch
        if (isRight) {
          ctx.moveTo(x - 44, eyeCy - 55);
          ctx.quadraticCurveTo(x, eyeCy - 68, x + 44, eyeCy - 52);
        } else {
          ctx.moveTo(x - 44, eyeCy - 52);
          ctx.quadraticCurveTo(x, eyeCy - 68, x + 44, eyeCy - 55);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    drawHandsomeEyebrow(leftEyeCx, false);
    drawHandsomeEyebrow(rightEyeCx, true);

    // Eye Geometry: Handsome almond ratio (slightly narrower, more piercing)
    const eyeWidth = expr === "startled" ? 44 : 41;
    const eyeHeight = expr === "startled" ? 40 : 28;
    const blinkScale = 1.0 - this.blinkProgress;

    const drawHandsomeEye = (x: number, isRight: boolean) => {
      ctx.save();

      // Closed state during blink or laughing
      if (blinkScale < 0.25 || expr === "laughing") {
        ctx.strokeStyle = "#0E111C";
        ctx.lineWidth = 6.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - 38, eyeCy);
        ctx.quadraticCurveTo(x, eyeCy - 18, x + 38, eyeCy);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(isRight ? x + 35 : x - 35, eyeCy + 2);
        ctx.lineTo(isRight ? x + 45 : x - 45, eyeCy - 4);
        ctx.stroke();

        ctx.restore();
        return;
      }

      // Sclera with soft top-shadow
      ctx.beginPath();
      ctx.ellipse(x, eyeCy, eyeWidth, eyeHeight * blinkScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Sclera top shadow (creates deep, focused gaze)
      ctx.fillStyle = "rgba(20, 18, 42, 0.18)";
      ctx.beginPath();
      ctx.ellipse(x, eyeCy - eyeHeight * 0.35 * blinkScale, eyeWidth * 0.95, eyeHeight * 0.5 * blinkScale, 0, 0, Math.PI);
      ctx.fill();

      // Pupil / Iris positions tracking pointer
      let pupilOffsetPxX = lookX * 12;
      let pupilOffsetPxY = lookY * 8;

      if (isCrossEyed) {
        pupilOffsetPxX = isRight ? -16 : 16;
        pupilOffsetPxY = 3;
      }

      const pupilX = x + pupilOffsetPxX;
      const pupilY = eyeCy + pupilOffsetPxY;
      const irisRadius = expr === "startled" ? 17 : 19;

      // --- STRIKING SAPPHIRE-COBALT ANIME IRIS ---
      const irisGrad = ctx.createLinearGradient(pupilX, pupilY - irisRadius, pupilX, pupilY + irisRadius);
      irisGrad.addColorStop(0, "#060814");
      irisGrad.addColorStop(0.3, "#102058");
      irisGrad.addColorStop(0.65, "#2447E0");
      irisGrad.addColorStop(1, "#456DFF");

      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.ellipse(pupilX, pupilY, irisRadius, irisRadius * blinkScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Radiating crystalline striations (adds incredible realism!)
      ctx.strokeStyle = "rgba(100, 160, 255, 0.45)";
      ctx.lineWidth = 1.5;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.beginPath();
        ctx.moveTo(pupilX + Math.cos(a) * (irisRadius * 0.4), pupilY + Math.sin(a) * (irisRadius * 0.4 * blinkScale));
        ctx.lineTo(pupilX + Math.cos(a) * (irisRadius * 0.85), pupilY + Math.sin(a) * (irisRadius * 0.85 * blinkScale));
        ctx.stroke();
      }

      // Lower crescent illumination (glowing starlight ring)
      ctx.fillStyle = "rgba(140, 195, 255, 0.7)";
      ctx.beginPath();
      ctx.ellipse(
        pupilX,
        pupilY + irisRadius * 0.45 * blinkScale,
        irisRadius * 0.72,
        irisRadius * 0.4 * blinkScale,
        0,
        0,
        Math.PI
      );
      ctx.fill();

      // Velvety black pupil center
      ctx.fillStyle = "#020306";
      ctx.beginPath();
      ctx.ellipse(pupilX, pupilY, irisRadius * 0.46, irisRadius * 0.5 * blinkScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Catchlights
      if (isCrossEyed || expr === "crosseyed") {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, 5.5, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Primary crisp diamond catchlight
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(pupilX - irisRadius * 0.36, pupilY - irisRadius * 0.32 * blinkScale, 5, 0, Math.PI * 2);
        ctx.fill();

        // Secondary soft twinkle catchlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(pupilX + irisRadius * 0.35, pupilY + irisRadius * 0.28 * blinkScale, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Starlight reflection
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(pupilX - irisRadius * 0.08, pupilY + irisRadius * 0.38 * blinkScale, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Upper Eyeliner & Wing (Sharp masculine definition)
      ctx.strokeStyle = "#0B0E18";
      ctx.fillStyle = "#0B0E18";
      ctx.lineWidth = 6.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(x - eyeWidth - 2, eyeCy - eyeHeight * 0.08 * blinkScale);
      ctx.quadraticCurveTo(
        x,
        eyeCy - eyeHeight * 1.05 * blinkScale,
        x + eyeWidth + 4,
        eyeCy - eyeHeight * 0.08 * blinkScale
      );
      ctx.stroke();

      // Sharp masculine wing flick
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      const wingStartX = isRight ? x + eyeWidth + 2 : x - eyeWidth - 2;
      const wingEndX = isRight ? x + eyeWidth + 11 : x - eyeWidth - 11;
      ctx.moveTo(wingStartX, eyeCy - eyeHeight * 0.08 * blinkScale);
      ctx.lineTo(wingEndX, eyeCy - eyeHeight * 0.42 * blinkScale);
      ctx.stroke();

      // Double Eyelid Crease (Futae)
      ctx.strokeStyle = "rgba(135, 70, 50, 0.42)";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(
        x,
        eyeCy - eyeHeight * 1.15 * blinkScale,
        eyeWidth * 0.72,
        5.5 * blinkScale,
        0,
        Math.PI * 0.95,
        Math.PI * 2.05
      );
      ctx.stroke();

      ctx.restore();
    };

    drawHandsomeEye(leftEyeCx, false);
    drawHandsomeEye(rightEyeCx, true);

    // --- 9. CHARMING SCULPTED ANIME LIPS ---
    ctx.save();
    const mouthY = cy + 124;

    if (expr === "startled") {
      ctx.fillStyle = "#341016";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 10, 20, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#E46A7B";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 26, 14, 10, 0, 0, Math.PI);
      ctx.fill();

      // Sweat drop
      ctx.fillStyle = "#7EC8FF";
      ctx.beginPath();
      ctx.moveTo(cx + 175, cy - 80);
      ctx.quadraticCurveTo(cx + 160, cy - 50, cx + 175, cy - 38);
      ctx.quadraticCurveTo(cx + 190, cy - 50, cx + 175, cy - 80);
      ctx.fill();
    } else if (expr === "laughing") {
      ctx.fillStyle = "#361217";
      ctx.beginPath();
      ctx.moveTo(cx - 52, mouthY - 4);
      ctx.quadraticCurveTo(cx, mouthY + 50, cx + 52, mouthY - 4);
      ctx.quadraticCurveTo(cx, mouthY + 8, cx - 52, mouthY - 4);
      ctx.closePath();
      ctx.fill();

      // Teeth
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(cx - 42, mouthY - 2);
      ctx.quadraticCurveTo(cx, mouthY + 14, cx + 42, mouthY - 2);
      ctx.quadraticCurveTo(cx, mouthY + 4, cx - 42, mouthY - 2);
      ctx.fill();

      ctx.fillStyle = "#E66B7D";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 28, 28, 14, 0, 0, Math.PI);
      ctx.fill();
    } else if (expr === "annoyed") {
      ctx.strokeStyle = "#461820";
      ctx.lineWidth = 6.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 38, mouthY + 8);
      ctx.quadraticCurveTo(cx - 8, mouthY - 4, cx + 8, mouthY + 6);
      ctx.quadraticCurveTo(cx + 22, mouthY + 12, cx + 38, mouthY + 4);
      ctx.stroke();

      // Anger Mark (💢)
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 5.5;
      ctx.lineCap = "round";
      const fx = cx + 128;
      const fy = cy - 128;
      ctx.beginPath();
      ctx.arc(fx - 13, fy, 13, -0.4 * Math.PI, 0.4 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx + 13, fy, 13, 0.6 * Math.PI, 1.4 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx, fy - 13, 13, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx, fy + 13, 13, 1.1 * Math.PI, 1.9 * Math.PI);
      ctx.stroke();
    } else {
      // Confident, charming ikemen smirk
      ctx.strokeStyle = "#2E1116";
      ctx.lineWidth = 6.8;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(cx - 44, mouthY);
      ctx.quadraticCurveTo(cx - 4, mouthY + 26, cx + 46, mouthY - 2);
      ctx.stroke();

      // Natural rosy lower lip definition
      ctx.fillStyle = "rgba(215, 88, 98, 0.38)";
      ctx.beginPath();
      ctx.ellipse(cx + 2, mouthY + 20, 20, 5.5, 0, 0, Math.PI);
      ctx.fill();

      // Lower lip gloss highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.beginPath();
      ctx.ellipse(cx + 4, mouthY + 22, 6, 2, 0, 0, Math.PI);
      ctx.fill();

      // Smirk corner notch
      ctx.beginPath();
      ctx.moveTo(cx + 44, mouthY - 5);
      ctx.lineTo(cx + 49, mouthY + 2);
      ctx.stroke();
    }
    ctx.restore();

    // --- 10. TEXTURED CURTAIN BANGS & HANDSOME ANIME HAIR ---
    ctx.save();
    // Hair Gradient (Midnight Obsidian with Slate-Cobalt Tones)
    const hairGrad = ctx.createLinearGradient(cx - 200, cy - 280, cx + 200, cy - 40);
    hairGrad.addColorStop(0, "#080B14");
    hairGrad.addColorStop(0.35, "#12182D");
    hairGrad.addColorStop(0.7, "#1B2444");
    hairGrad.addColorStop(1, "#070912");

    ctx.fillStyle = hairGrad;

    // Layer 1: Voluminous Top Anime Crown with Layered Locks
    ctx.beginPath();
    ctx.moveTo(cx - 215, cy - 75);
    ctx.quadraticCurveTo(cx - 252, cy - 175, cx - 188, cy - 265);
    ctx.lineTo(cx - 168, cy - 245);
    ctx.quadraticCurveTo(cx - 110, cy - 325, cx, cy - 320);
    ctx.lineTo(cx + 35, cy - 302);
    ctx.quadraticCurveTo(cx + 175, cy - 315, cx + 236, cy - 225);
    ctx.lineTo(cx + 215, cy - 200);
    ctx.quadraticCurveTo(cx + 258, cy - 115, cx + 220, cy - 65);

    // Layer 2: Side Undercut & Tapered Cheekbone Framing Locks
    ctx.lineTo(cx + 210, cy + 10);
    ctx.quadraticCurveTo(cx + 185, cy - 50, cx + 160, cy - 90);

    // Front Textured Curtain Bangs (Parted slightly off-center with handsome flow)
    // Right Curtain Flow
    ctx.quadraticCurveTo(cx + 130, cy - 35, cx + 96, cy - 95);
    // Right Center Lock
    ctx.quadraticCurveTo(cx + 65, cy - 8, cx + 26, cy - 105);
    // Slender Loose Center Strand falling between eyes (iconic handsome anime feature!)
    ctx.quadraticCurveTo(cx + 6, cy + 12, cx - 12, cy - 108);
    // Left Center Swoop
    ctx.quadraticCurveTo(cx - 45, cy - 20, cx - 78, cy - 112);
    // Left Cheekbone Lock
    ctx.quadraticCurveTo(cx - 118, cy - 40, cx - 150, cy - 88);
    // Left Sideburn Lock
    ctx.lineTo(cx - 198, cy - 30);
    ctx.lineTo(cx - 212, cy + 10);
    ctx.closePath();
    ctx.fill();

    // Layer 3: Angel-Ring (Tenshi no wa) Gloss Arc
    ctx.save();
    ctx.strokeStyle = "rgba(100, 145, 255, 0.42)";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.arc(cx, cy - 182, 115, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(cx, cy - 182, 116, 1.25 * Math.PI, 1.75 * Math.PI);
    ctx.stroke();
    ctx.restore();

    // Layer 4: Fine Textured Hair Strands (Sharp, glossy lock highlights)
    ctx.strokeStyle = "rgba(135, 175, 255, 0.35)";
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(cx - 125, cy - 250);
    ctx.quadraticCurveTo(cx - 50, cy - 280, cx + 45, cy - 265);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 35, cy - 75);
    ctx.quadraticCurveTo(cx + 8, cy - 45, cx + 28, cy - 65);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + 40, cy - 70);
    ctx.quadraticCurveTo(cx + 80, cy - 40, cx + 110, cy - 60);
    ctx.stroke();

    ctx.restore();
  }

  private updateTexture() {
    if (!this.gl || !this.texture) return;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.offscreenCanvas
    );
  }

  private bindEvents() {
    // Pointer Events for accurate multi-touch and mouse stretching
    this.canvas.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);
    window.addEventListener("pointercancel", this.handlePointerUp);

    // Track mouse position on canvas for eye tracking
    this.canvas.addEventListener("pointerenter", () => {
      this.mousePos.onCanvas = true;
    });
    this.canvas.addEventListener("pointerleave", () => {
      this.mousePos.onCanvas = false;
      this.mousePos.x = 0;
      this.mousePos.y = 0;
    });
  }

  private toNDC(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    return { x, y };
  }

  private handlePointerDown = (e: PointerEvent) => {
    this.canvas.setPointerCapture(e.pointerId);
    const ndc = this.toNDC(e.clientX, e.clientY);

    // Find available pointer slot
    let slot = this.pointers.find((p) => p.id === e.pointerId);
    if (!slot) {
      slot = this.pointers.find((p) => !p.active);
    }
    if (!slot) return;

    slot.id = e.pointerId;
    slot.active = true;
    slot.startX = ndc.x;
    slot.startY = ndc.y;
    slot.currentX = ndc.x;
    slot.currentY = ndc.y;
    slot.offsetX = 0;
    slot.offsetY = 0;
    slot.vx = 0;
    slot.vy = 0;
    slot.isReleasing = false;

    // Trigger Startled expression on tap
    this.setExpression("startled");
    this.canvas.style.cursor = "grabbing";
  };

  private handlePointerMove = (e: PointerEvent) => {
    const ndc = this.toNDC(e.clientX, e.clientY);
    this.mousePos.x = ndc.x;
    this.mousePos.y = ndc.y;

    const slot = this.pointers.find((p) => p.id === e.pointerId && p.active && !p.isReleasing);
    if (slot) {
      slot.currentX = ndc.x;
      slot.currentY = ndc.y;

      const rawDx = slot.currentX - slot.startX;
      const rawDy = slot.currentY - slot.startY;

      // Rubber-band elastic limiting curve: x / (1 + |x| / max)
      const maxElasticStretch = 0.55;
      const len = Math.hypot(rawDx, rawDy);
      if (len > 0.001) {
        const factor = len / (1.0 + len / maxElasticStretch) / len;
        slot.offsetX = rawDx * factor;
        slot.offsetY = rawDy * factor;
      }

      // If stretch is significant, change expression
      if (len > 0.12 && this.currentExpression !== "stretched" && this.currentExpression !== "annoyed") {
        this.setExpression("stretched");
      }
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    const slot = this.pointers.find((p) => p.id === e.pointerId);
    if (slot && slot.active) {
      slot.isReleasing = true;
      // Initial velocity imparted into spring
      slot.vx = slot.offsetX * -8.0;
      slot.vy = slot.offsetY * -8.0;
      this.canvas.style.cursor = "grab";

      // On release, play a random joyful / proud / relieved expression
      const postExpressions: ExpressionType[] = ["laughing", "neutral", "laughing"];
      const randomExpr = postExpressions[Math.floor(Math.random() * postExpressions.length)];
      this.setExpression(randomExpr);
      this.releaseTimer = 1.4; // Hold expression for 1.4s
    }
  };

  public setExpressionDirect(expr: ExpressionType) {
    this.setExpression(expr);
    this.releaseTimer = 3.0;
  }

  public triggerBlink() {
    this.isBlinking = true;
    this.blinkProgress = 0;
  }

  private setExpression(expr: ExpressionType) {
    if (this.currentExpression === expr) return;
    this.currentExpression = expr;
    this.options.onExpressionChange?.(expr);
  }

  private startLoop() {
    this.lastTime = performance.now();
    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - this.lastTime) / 1000, 0.033);
      this.lastTime = currentTime;

      this.updatePhysics(dt);
      this.render(currentTime);

      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private updatePhysics(dt: number) {
    this.idleTime += dt;
    let anyPointerActive = false;
    let maxPull = 0;

    // Anime eye blinking cycle
    this.blinkTimer -= dt;
    if (this.blinkTimer <= 0 && !this.isBlinking) {
      this.isBlinking = true;
      this.blinkProgress = 0;
    }

    if (this.isBlinking) {
      // Smooth 0.22s blink cycle
      this.blinkProgress += dt * 8.5;
      if (this.blinkProgress >= 2.0) {
        this.isBlinking = false;
        this.blinkProgress = 0;
        this.blinkTimer = 3.0 + Math.random() * 3.5;
      }
    }

    // Spring constants for rubber-band release
    const kSpring = 360.0; // Spring stiffness
    const dDamper = 18.0; // Damping coefficient

    for (const p of this.pointers) {
      if (!p.active) continue;
      anyPointerActive = true;

      const pull = Math.hypot(p.offsetX, p.offsetY);
      if (pull > maxPull) maxPull = pull;

      if (p.isReleasing) {
        // Damped harmonic oscillator: F = -k*x - c*v
        const ax = -kSpring * p.offsetX - dDamper * p.vx;
        const ay = -kSpring * p.offsetY - dDamper * p.vy;

        p.vx += ax * dt;
        p.vy += ay * dt;

        p.offsetX += p.vx * dt;
        p.offsetY += p.vy * dt;

        // When nearly at rest, deactivate slot
        if (Math.hypot(p.offsetX, p.offsetY) < 0.002 && Math.hypot(p.vx, p.vy) < 0.02) {
          p.offsetX = 0;
          p.offsetY = 0;
          p.vx = 0;
          p.vy = 0;
          p.active = false;
          p.isReleasing = false;
          p.id = -1;
        }
      }
    }

    // Patience meter and face flushing calculations
    if (anyPointerActive && maxPull > 0.05) {
      this.stretchDuration += dt;
      this.patience = Math.max(0, this.patience - dt * 26.0);

      if (this.stretchDuration > 1.2) {
        this.flushIntensity = Math.min(1.0, this.flushIntensity + dt * 0.8);
        if (this.patience < 35) {
          this.setExpression("annoyed");
        }
      }
    } else {
      this.stretchDuration = Math.max(0, this.stretchDuration - dt * 2.0);
      this.flushIntensity = Math.max(0, this.flushIntensity - dt * 0.7);
      this.patience = Math.min(100, this.patience + dt * 15.0);

      if (this.releaseTimer > 0) {
        this.releaseTimer -= dt;
        if (this.releaseTimer <= 0) {
          this.setExpression("neutral");
        }
      }
    }

    // Report patience & state label
    let stateText = "Calm & Friendly (Protagonist Mode) ✨";
    if (this.patience < 20) stateText = "High Elasticity Overload! 🤯";
    else if (this.patience < 50) stateText = "Cheeks Stretched! Manga Blush 🌸";
    else if (this.patience < 75) stateText = "Mildly Pouted 😅";

    this.options.onPatienceChange?.(Math.round(this.patience), stateText);

    // Compute Gaussian vertex displacement on the 128x128 grid
    const N = this.GRID_SIZE;
    const sigma = 0.28; // Gaussian radius
    const twoSigmaSq = 2.0 * sigma * sigma;

    let vIdx = 0;
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const baseX = this.basePositions[vIdx];
        const baseY = this.basePositions[vIdx + 1];

        let totalDispX = 0;
        let totalDispY = 0;

        for (const p of this.pointers) {
          if (!p.active) continue;

          // Distance from vertex to pointer start grab center
          const dx = baseX - p.startX;
          const dy = baseY - p.startY;
          const distSq = dx * dx + dy * dy;

          const weight = Math.exp(-distSq / twoSigmaSq);
          totalDispX += p.offsetX * weight;
          totalDispY += p.offsetY * weight;
        }

        this.currentPositions[vIdx] = baseX + totalDispX;
        this.currentPositions[vIdx + 1] = baseY + totalDispY;

        vIdx += 2;
      }
    }
  }

  private render(currentTime: number) {
    if (!this.gl || !this.program) return;
    const gl = this.gl;

    // Re-render dynamic anime character texture with eye tracking & animations
    this.renderCharacterTexture();
    this.updateTexture();

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);

    // Update dynamic positions in VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.currentPositions);

    gl.uniform1i(this.uTextureLoc, 0);
    gl.uniform1f(this.uFlushLoc, this.flushIntensity);
    gl.uniform1f(this.uTimeLoc, currentTime * 0.001);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_INT, 0);
  }

  public resize(width: number, height: number) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public destroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerUp);
  }
}

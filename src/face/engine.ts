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
   * Procedurally paints the realistic modern anime developer character
   * with high detail, anime eyes, angel-ring hair gloss, cyber headphones,
   * expressive anime mouths, and dynamic blinking.
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

    // --- 1. SHOULDERS & COBALT / DARK TECHWEAR JACKET ---
    ctx.save();
    // Torso base
    const jacketGrad = ctx.createLinearGradient(cx - 300, cy + 200, cx + 300, cy + 500);
    jacketGrad.addColorStop(0, "#0E1528");
    jacketGrad.addColorStop(0.35, "#1B2754");
    jacketGrad.addColorStop(0.7, "#17234D");
    jacketGrad.addColorStop(1, "#0A0F1F");

    ctx.fillStyle = jacketGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 380, h);
    ctx.quadraticCurveTo(cx - 320, cy + 260 + breatheY, cx - 180, cy + 235 + breatheY);
    ctx.quadraticCurveTo(cx, cy + 260 + breatheY, cx + 180, cy + 235 + breatheY);
    ctx.quadraticCurveTo(cx + 320, cy + 260 + breatheY, cx + 380, h);
    ctx.closePath();
    ctx.fill();

    // Cobalt Blue Shoulder Panels (Cyber techwear look)
    const cobaltStripe = ctx.createLinearGradient(cx - 240, cy + 240, cx - 180, cy + 340);
    cobaltStripe.addColorStop(0, "#2F4BF0");
    cobaltStripe.addColorStop(1, "#182CAA");
    ctx.fillStyle = cobaltStripe;
    ctx.beginPath();
    ctx.moveTo(cx - 310, cy + 290 + breatheY);
    ctx.lineTo(cx - 180, cy + 240 + breatheY);
    ctx.lineTo(cx - 160, cy + 265 + breatheY);
    ctx.lineTo(cx - 280, cy + 340 + breatheY);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 310, cy + 290 + breatheY);
    ctx.lineTo(cx + 180, cy + 240 + breatheY);
    ctx.lineTo(cx + 160, cy + 265 + breatheY);
    ctx.lineTo(cx + 280, cy + 340 + breatheY);
    ctx.closePath();
    ctx.fill();

    // High Techwear Collar
    ctx.fillStyle = "#121A30";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 245 + breatheY, 195, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mustard Yellow Zipper / Accent Stripe
    ctx.strokeStyle = "#F2B31B";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy + 270 + breatheY);
    ctx.lineTo(cx, h);
    ctx.stroke();

    // Cyber Tag / Patch on Collar ("SK // DEV")
    ctx.fillStyle = "#F2B31B";
    ctx.fillRect(cx - 110, cy + 280 + breatheY, 44, 16);
    ctx.fillStyle = "#12141B";
    ctx.font = "bold 9px monospace";
    ctx.fillText("SK.DEV", cx - 105, cy + 292 + breatheY);

    // --- 2. CYBER AUDIO STUDIO HEADPHONES AROUND NECK ---
    // Padded headband behind neck
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#1A1D28";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 230 + breatheY, 140, 50, 0, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();

    // Left Ear Cup
    const drawHeadphoneCup = (x: number, isRight: boolean) => {
      ctx.save();
      ctx.translate(x, cy + 200 + breatheY);
      ctx.rotate(isRight ? -0.25 : 0.25);

      // Outer metallic pivot
      ctx.fillStyle = "#323A50";
      ctx.beginPath();
      ctx.roundRect(-24, -45, 48, 90, 20);
      ctx.fill();

      // Cobalt Blue Core Body
      ctx.fillStyle = "#2F4BF0";
      ctx.beginPath();
      ctx.roundRect(-20, -40, 40, 80, 18);
      ctx.fill();

      // Glowing Cyan / Mustard LED Status Ring
      ctx.strokeStyle = expr === "cyber" ? "#00F0FF" : "#F2B31B";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 26, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Cushion
      ctx.fillStyle = "#11141E";
      ctx.beginPath();
      ctx.ellipse(isRight ? -14 : 14, 0, 10, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawHeadphoneCup(cx - 145, false);
    drawHeadphoneCup(cx + 145, true);

    // Under-neck ambient shadow
    ctx.fillStyle = "rgba(10, 14, 30, 0.55)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 205 + breatheY, 90, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 3. ANIME NECK & CLAVICLE CEL-SHADING ---
    const neckGrad = ctx.createLinearGradient(cx - 65, cy + 120, cx + 65, cy + 225);
    neckGrad.addColorStop(0, "#F5C3A5");
    neckGrad.addColorStop(0.5, "#E8AC89");
    neckGrad.addColorStop(1, "#D08F6B");
    ctx.fillStyle = neckGrad;

    ctx.beginPath();
    ctx.moveTo(cx - 65, cy + 125);
    ctx.lineTo(cx - 70, cy + 225 + breatheY);
    ctx.quadraticCurveTo(cx, cy + 242 + breatheY, cx + 70, cy + 225 + breatheY);
    ctx.lineTo(cx + 65, cy + 125);
    ctx.closePath();
    ctx.fill();

    // Shadow cast under anime jaw onto neck
    ctx.fillStyle = "rgba(175, 95, 70, 0.35)";
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy + 130);
    ctx.quadraticCurveTo(cx, cy + 185, cx + 65, cy + 130);
    ctx.quadraticCurveTo(cx, cy + 155, cx - 65, cy + 130);
    ctx.closePath();
    ctx.fill();

    // --- 4. ANIME EARS ---
    const drawAnimeEar = (x: number, isRight: boolean) => {
      ctx.save();
      const earGrad = ctx.createRadialGradient(x, cy + 15, 10, x, cy + 15, 55);
      earGrad.addColorStop(0, "#FFD6BA");
      earGrad.addColorStop(0.7, "#EEAD87");
      earGrad.addColorStop(1, "#CF8862");

      ctx.fillStyle = earGrad;
      ctx.beginPath();
      // Anime tapered ear shape
      ctx.ellipse(x, cy + 15, 36, 56, isRight ? 0.22 : -0.22, 0, Math.PI * 2);
      ctx.fill();

      // Inner ear anime ridge
      ctx.strokeStyle = "rgba(180, 85, 65, 0.4)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(x + (isRight ? -4 : 4), cy + 12, 16, 30, isRight ? 0.15 : -0.15, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.restore();
    };

    drawAnimeEar(cx - 215, false);
    drawAnimeEar(cx + 215, true);

    // --- 5. ANIME HEAD & TAPERED JAWLINE ---
    const faceGrad = ctx.createRadialGradient(cx, cy - 30, 40, cx, cy + 20, 260);
    faceGrad.addColorStop(0, "#FFF0E4");
    faceGrad.addColorStop(0.45, "#FDE1CE");
    faceGrad.addColorStop(0.85, "#F3C4A5");
    faceGrad.addColorStop(1, "#DF9C75");

    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    // Sleek anime jawline contour tapering gracefully into a defined chin
    ctx.moveTo(cx - 195, cy - 100);
    ctx.quadraticCurveTo(cx - 215, cy + 25, cx - 165, cy + 115);
    ctx.quadraticCurveTo(cx - 95, cy + 195, cx, cy + 212); // Tapered anime chin
    ctx.quadraticCurveTo(cx + 95, cy + 195, cx + 165, cy + 115);
    ctx.quadraticCurveTo(cx + 215, cy + 25, cx + 195, cy - 100);
    ctx.quadraticCurveTo(cx, cy - 210, cx - 195, cy - 100);
    ctx.closePath();
    ctx.fill();

    // Subtle anime chin crease
    ctx.strokeStyle = "rgba(180, 95, 75, 0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy + 196, 12, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // --- 6. ANIME BLUSH & CHEEKS ---
    // Soft airbrushed cheek gradient
    const leftCheekGlow = ctx.createRadialGradient(cx - 110, cy + 50, 5, cx - 110, cy + 50, 65);
    leftCheekGlow.addColorStop(0, "rgba(255, 120, 130, 0.38)");
    leftCheekGlow.addColorStop(1, "rgba(255, 120, 130, 0)");
    ctx.fillStyle = leftCheekGlow;
    ctx.fillRect(cx - 180, cy - 10, 140, 120);

    const rightCheekGlow = ctx.createRadialGradient(cx + 110, cy + 50, 5, cx + 110, cy + 50, 65);
    rightCheekGlow.addColorStop(0, "rgba(255, 120, 130, 0.38)");
    rightCheekGlow.addColorStop(1, "rgba(255, 120, 130, 0)");
    ctx.fillStyle = rightCheekGlow;
    ctx.fillRect(cx + 40, cy - 10, 140, 120);

    // Manga Blush Hatch Lines (///) when flushed or stretched or blush expression
    if (this.flushIntensity > 0.25 || expr === "stretched" || expr === "blush" || expr === "startled") {
      ctx.save();
      ctx.strokeStyle = "rgba(225, 70, 90, 0.65)";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";

      // Left cheek hatching
      for (let i = 0; i < 4; i++) {
        const lx = cx - 130 + i * 11;
        ctx.beginPath();
        ctx.moveTo(lx, cy + 56);
        ctx.lineTo(lx + 8, cy + 40);
        ctx.stroke();
      }

      // Right cheek hatching
      for (let i = 0; i < 4; i++) {
        const rx = cx + 95 + i * 11;
        ctx.beginPath();
        ctx.moveTo(rx, cy + 56);
        ctx.lineTo(rx + 8, cy + 40);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- 7. ANIME NOSE ---
    // High-end anime style: delicate shadowed bridge + tiny clean specular dot
    ctx.save();
    ctx.strokeStyle = "rgba(175, 90, 65, 0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 3, cy - 8);
    ctx.quadraticCurveTo(cx - 8, cy + 28, cx - 2, cy + 42);
    ctx.stroke();

    // Cute anime nose tip shadow
    ctx.fillStyle = "#CE7C58";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 43, 7, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Specular shine on nose tip
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(cx - 2, cy + 39, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- 8. ANIME EYES (LUMINOUS, MULTI-TIER WITH CATCHLIGHTS) ---
    const leftEyeCx = cx - 78;
    const rightEyeCx = cx + 78;
    const eyeCy = cy - 24;

    // Eyebrows
    ctx.fillStyle = "#12141F";
    ctx.strokeStyle = "#12141F";
    ctx.lineCap = "round";

    const drawEyebrow = (x: number, isRight: boolean) => {
      ctx.save();
      ctx.lineWidth = 8;
      ctx.beginPath();

      if (expr === "startled") {
        // High arched surprised anime brows
        ctx.moveTo(x - 45, eyeCy - 75);
        ctx.quadraticCurveTo(x, eyeCy - 98, x + 45, eyeCy - 72);
      } else if (expr === "annoyed") {
        // Slanted inward glare brows
        if (isRight) {
          ctx.moveTo(x - 45, eyeCy - 45);
          ctx.quadraticCurveTo(x, eyeCy - 62, x + 45, eyeCy - 68);
        } else {
          ctx.moveTo(x - 45, eyeCy - 68);
          ctx.quadraticCurveTo(x, eyeCy - 62, x + 45, eyeCy - 45);
        }
      } else if (expr === "laughing" || expr === "blush") {
        // Gentle relaxed arched brows
        ctx.moveTo(x - 45, eyeCy - 58);
        ctx.quadraticCurveTo(x, eyeCy - 72, x + 45, eyeCy - 62);
      } else {
        // Cool stylish confident anime brows
        if (isRight) {
          ctx.moveTo(x - 45, eyeCy - 56);
          ctx.quadraticCurveTo(x, eyeCy - 68, x + 45, eyeCy - 54);
        } else {
          ctx.moveTo(x - 45, eyeCy - 54);
          ctx.quadraticCurveTo(x, eyeCy - 68, x + 45, eyeCy - 56);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    drawEyebrow(leftEyeCx, false);
    drawEyebrow(rightEyeCx, true);

    // Eye Geometry Parameters
    const eyeWidth = expr === "startled" ? 44 : 40;
    const eyeHeight = expr === "startled" ? 44 : 33;
    const blinkScale = 1.0 - this.blinkProgress;

    const drawAnimeEye = (x: number, isRight: boolean) => {
      ctx.save();

      // If closed from blinking or laughing
      if (blinkScale < 0.25 || expr === "laughing") {
        // Closed stylish anime smiling lash curve (^_^)
        ctx.strokeStyle = "#101322";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - 38, eyeCy);
        ctx.quadraticCurveTo(x, eyeCy - 20, x + 38, eyeCy);
        ctx.stroke();

        // Delicate lower lash wing
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(isRight ? x + 36 : x - 36, eyeCy + 2);
        ctx.lineTo(isRight ? x + 46 : x - 46, eyeCy - 4);
        ctx.stroke();

        ctx.restore();
        return;
      }

      // Sclera (Eye White with Soft Cel Shading)
      ctx.beginPath();
      ctx.ellipse(x, eyeCy, eyeWidth, eyeHeight * blinkScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Top eyelid cast shadow inside sclera
      ctx.fillStyle = "rgba(25, 20, 50, 0.16)";
      ctx.beginPath();
      ctx.ellipse(x, eyeCy - eyeHeight * 0.35 * blinkScale, eyeWidth * 0.95, eyeHeight * 0.5 * blinkScale, 0, 0, Math.PI);
      ctx.fill();

      // Pupil / Iris positions
      let pupilOffsetPxX = lookX * 13;
      let pupilOffsetPxY = lookY * 9;

      if (isCrossEyed) {
        pupilOffsetPxX = isRight ? -17 : 17;
        pupilOffsetPxY = 3;
      }

      const pupilX = x + pupilOffsetPxX;
      const pupilY = eyeCy + pupilOffsetPxY;
      const irisRadius = expr === "startled" ? 17 : 20;

      // --- MULTI-TIER LUMINOUS ANIME IRIS ---
      // Base Iris Gradient (Midnight Navy -> Deep Cobalt Sapphire)
      const irisGrad = ctx.createLinearGradient(pupilX, pupilY - irisRadius, pupilX, pupilY + irisRadius);
      irisGrad.addColorStop(0, "#080B1A");
      irisGrad.addColorStop(0.3, "#142566");
      irisGrad.addColorStop(0.7, "#284CE8");
      irisGrad.addColorStop(1, "#4E73FF");

      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.ellipse(pupilX, pupilY, irisRadius, irisRadius * blinkScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner Glowing Crescent Reflection (Anime lower light ring)
      ctx.fillStyle = "rgba(130, 185, 255, 0.65)";
      ctx.beginPath();
      ctx.ellipse(
        pupilX,
        pupilY + irisRadius * 0.45 * blinkScale,
        irisRadius * 0.72,
        irisRadius * 0.42 * blinkScale,
        0,
        0,
        Math.PI
      );
      ctx.fill();

      // Pupil Core
      ctx.fillStyle = "#04050A";
      ctx.beginPath();
      ctx.ellipse(pupilX, pupilY, irisRadius * 0.48, irisRadius * 0.52 * blinkScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cross-eyed special anime swirl
      if (isCrossEyed || expr === "crosseyed") {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, 6, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Primary Catchlight (Crisp Starlight Diamond / Circle in upper quadrant)
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(pupilX - irisRadius * 0.38, pupilY - irisRadius * 0.35 * blinkScale, 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Secondary Soft Twinkle Catchlight (Bottom right)
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(pupilX + irisRadius * 0.35, pupilY + irisRadius * 0.3 * blinkScale, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Tiny starlight point
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(pupilX - irisRadius * 0.1, pupilY + irisRadius * 0.4 * blinkScale, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Upper Eyelash & Wing Liner (Iconic Anime Eyeliner)
      ctx.strokeStyle = "#10121C";
      ctx.fillStyle = "#10121C";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(x - eyeWidth - 3, eyeCy - eyeHeight * 0.1 * blinkScale);
      ctx.quadraticCurveTo(
        x,
        eyeCy - eyeHeight * 1.05 * blinkScale,
        x + eyeWidth + 4,
        eyeCy - eyeHeight * 0.1 * blinkScale
      );
      ctx.stroke();

      // Wing tip
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      const wingStartX = isRight ? x + eyeWidth + 2 : x - eyeWidth - 2;
      const wingEndX = isRight ? x + eyeWidth + 12 : x - eyeWidth - 12;
      ctx.moveTo(wingStartX, eyeCy - eyeHeight * 0.1 * blinkScale);
      ctx.lineTo(wingEndX, eyeCy - eyeHeight * 0.45 * blinkScale);
      ctx.stroke();

      // Futae (Anime Double Eyelid Crease)
      ctx.strokeStyle = "rgba(140, 75, 55, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(
        x,
        eyeCy - eyeHeight * 1.15 * blinkScale,
        eyeWidth * 0.75,
        6 * blinkScale,
        0,
        Math.PI * 0.95,
        Math.PI * 2.05
      );
      ctx.stroke();

      ctx.restore();
    };

    drawAnimeEye(leftEyeCx, false);
    drawAnimeEye(rightEyeCx, true);

    // --- 9. ANIME MOUTH & EXPRESSIVE LIPS ---
    ctx.save();
    const mouthY = cy + 124;

    if (expr === "startled") {
      // Anime wide shocked round "O" mouth
      ctx.fillStyle = "#381016";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 12, 22, 32, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tongue
      ctx.fillStyle = "#E46A7B";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 30, 15, 12, 0, 0, Math.PI);
      ctx.fill();

      // Anime sweat drop on temple
      ctx.fillStyle = "#7EC8FF";
      ctx.beginPath();
      ctx.moveTo(cx + 175, cy - 80);
      ctx.quadraticCurveTo(cx + 160, cy - 50, cx + 175, cy - 38);
      ctx.quadraticCurveTo(cx + 190, cy - 50, cx + 175, cy - 80);
      ctx.fill();
    } else if (expr === "laughing") {
      // Joyful open anime smile with cute fang accent
      ctx.fillStyle = "#3D1318";
      ctx.beginPath();
      ctx.moveTo(cx - 56, mouthY - 4);
      ctx.quadraticCurveTo(cx, mouthY + 54, cx + 56, mouthY - 4);
      ctx.quadraticCurveTo(cx, mouthY + 8, cx - 56, mouthY - 4);
      ctx.closePath();
      ctx.fill();

      // Top teeth & cute anime corner tooth
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(cx - 46, mouthY - 2);
      ctx.quadraticCurveTo(cx, mouthY + 16, cx + 46, mouthY - 2);
      ctx.quadraticCurveTo(cx, mouthY + 4, cx - 46, mouthY - 2);
      ctx.fill();

      // Pink tongue
      ctx.fillStyle = "#E66B7D";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 30, 30, 16, 0, 0, Math.PI);
      ctx.fill();
    } else if (expr === "annoyed") {
      // Pouted wavy mouth
      ctx.strokeStyle = "#4D1A22";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 40, mouthY + 10);
      ctx.quadraticCurveTo(cx - 10, mouthY - 4, cx + 10, mouthY + 8);
      ctx.quadraticCurveTo(cx + 25, mouthY + 14, cx + 40, mouthY + 4);
      ctx.stroke();

      // Anime Anger Mark (💢) on forehead
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      const fx = cx + 130;
      const fy = cy - 130;
      ctx.beginPath();
      ctx.arc(fx - 14, fy, 14, -0.4 * Math.PI, 0.4 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx + 14, fy, 14, 0.6 * Math.PI, 1.4 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx, fy - 14, 14, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fx, fy + 14, 14, 1.1 * Math.PI, 1.9 * Math.PI);
      ctx.stroke();
    } else {
      // Confident, charming anime protagonist smirk
      ctx.strokeStyle = "#381419";
      ctx.lineWidth = 7.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(cx - 46, mouthY);
      ctx.quadraticCurveTo(cx - 5, mouthY + 28, cx + 48, mouthY - 2);
      ctx.stroke();

      // Subtle lower lip accent
      ctx.fillStyle = "rgba(210, 85, 95, 0.45)";
      ctx.beginPath();
      ctx.ellipse(cx + 2, mouthY + 22, 22, 6, 0, 0, Math.PI);
      ctx.fill();

      // Playful anime smirk notch
      ctx.beginPath();
      ctx.moveTo(cx + 46, mouthY - 6);
      ctx.lineTo(cx + 51, mouthY + 2);
      ctx.stroke();
    }
    ctx.restore();

    // --- 10. ANIME HAIR (TEXTURED SPIKY BANGS & ANGEL RING SHINE) ---
    ctx.save();
    // Hair Gradient (Midnight Black with Cobalt/Indigo Undertones)
    const hairGrad = ctx.createLinearGradient(cx - 200, cy - 280, cx + 200, cy - 40);
    hairGrad.addColorStop(0, "#0C0F1A");
    hairGrad.addColorStop(0.35, "#161C33");
    hairGrad.addColorStop(0.7, "#1F2847");
    hairGrad.addColorStop(1, "#0A0D17");

    ctx.fillStyle = hairGrad;

    // Layer 1: Voluminous Top Anime Crown
    ctx.beginPath();
    ctx.moveTo(cx - 215, cy - 80);
    // Left spiky flow
    ctx.quadraticCurveTo(cx - 250, cy - 180, cx - 185, cy - 265);
    ctx.lineTo(cx - 165, cy - 245);
    ctx.quadraticCurveTo(cx - 110, cy - 325, cx, cy - 320);
    ctx.lineTo(cx + 35, cy - 300);
    // Right crown locks
    ctx.quadraticCurveTo(cx + 175, cy - 315, cx + 235, cy - 225);
    ctx.lineTo(cx + 215, cy - 200);
    ctx.quadraticCurveTo(cx + 258, cy - 115, cx + 220, cy - 65);

    // Layer 2: Sideburns & Layered Face-Framing Bangs
    ctx.lineTo(cx + 210, cy + 10);
    ctx.quadraticCurveTo(cx + 185, cy - 50, cx + 160, cy - 90);

    // Front Anime Bang Locks (Parted across forehead with sharp tips)
    // Lock 1 (Right)
    ctx.quadraticCurveTo(cx + 125, cy - 40, cx + 90, cy - 95);
    // Lock 2 (Center-Right falling between eyes)
    ctx.quadraticCurveTo(cx + 55, cy - 15, cx + 20, cy - 105);
    // Lock 3 (Center-Left swoop)
    ctx.quadraticCurveTo(cx - 15, cy - 25, cx - 55, cy - 110);
    // Lock 4 (Left)
    ctx.quadraticCurveTo(cx - 95, cy - 45, cx - 140, cy - 90);
    // Left sideburn
    ctx.lineTo(cx - 195, cy - 35);
    ctx.lineTo(cx - 210, cy + 10);
    ctx.closePath();
    ctx.fill();

    // Layer 3: Anime "Angel Ring" (Tenshi no wa) Gloss Shine Arc
    ctx.save();
    ctx.strokeStyle = "rgba(110, 150, 255, 0.38)";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";

    // Stepped gloss highlight band across hair crown
    ctx.beginPath();
    ctx.arc(cx, cy - 180, 115, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();

    // Crisper inner specular arc
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy - 180, 116, 1.25 * Math.PI, 1.75 * Math.PI);
    ctx.stroke();
    ctx.restore();

    // Fine anime hair strand highlights
    ctx.strokeStyle = "rgba(140, 175, 255, 0.28)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(cx - 120, cy - 250);
    ctx.quadraticCurveTo(cx - 50, cy - 280, cx + 40, cy - 265);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 80);
    ctx.quadraticCurveTo(cx + 10, cy - 50, cx + 30, cy - 70);
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

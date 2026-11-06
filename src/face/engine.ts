/**
 * WebGL2 Interactive Face Physics Engine
 * Dense 128x128 UV grid with Gaussian vertex displacement,
 * 4-finger multi-touch rubber band stretching, damped spring release,
 * eye pupil tracking, cross-eyed nose detection, and cheek flushing.
 */

export interface FaceEngineOptions {
  onPatienceChange?: (patience: number, stateText: string) => void;
  onExpressionChange?: (expression: ExpressionType) => void;
}

export type ExpressionType = "neutral" | "startled" | "stretched" | "crosseyed" | "laughing" | "annoyed";

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

  // Face states
  private currentExpression: ExpressionType = "neutral";
  private patience = 100; // 0 to 100
  private stretchDuration = 0;
  private flushIntensity = 0;
  private animationFrameId: number | null = null;
  private lastTime = 0;
  private releaseTimer = 0;

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

    // Prepare offscreen canvas for dynamic character rendering (crisp 1024x1024)
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
      console.warn("WebGL2 not supported, falling back to 2D context");
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

        // Cheek flush effect (localized Gaussian circles around cheeks)
        // Left cheek: (~0.38, 0.48), Right cheek: (~0.62, 0.48)
        float dLeft = length((v_uv - vec2(0.38, 0.48)) * vec2(1.0, 1.3));
        float dRight = length((v_uv - vec2(0.62, 0.48)) * vec2(1.0, 1.3));
        float cheekMask = exp(-dLeft * dLeft / 0.008) + exp(-dRight * dRight / 0.008);

        // Blushing pink/red tone
        vec3 blushColor = vec3(0.96, 0.25, 0.35);
        color.rgb = mix(color.rgb, mix(color.rgb, blushColor, 0.65), u_flush * clamp(cheekMask, 0.0, 1.0));

        outColor = color;
      }
    `;

    const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    this.program = gl.createProgram();
    if (!this.program) return;
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);

    this.uTextureLoc = gl.getUniformLocation(this.program, "u_texture");
    this.uFlushLoc = gl.getUniformLocation(this.program, "u_flush");
    this.uTimeLoc = gl.getUniformLocation(this.program, "u_time");

    // Generate 128x128 UV Grid Mesh
    this.buildGrid();

    // Setup Buffers
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.currentPositions, gl.DYNAMIC_DRAW);

    const aPosLoc = gl.getAttribLocation(this.program, "a_position");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    this.uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);

    const aUvLoc = gl.getAttribLocation(this.program, "a_uv");
    gl.enableVertexAttribArray(aUvLoc);
    gl.vertexAttribPointer(aUvLoc, 2, gl.FLOAT, false, 0, 0);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    // Create & upload initial character texture
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.renderCharacterTexture();
    this.updateTexture();
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private buildGrid() {
    const N = this.GRID_SIZE;
    this.vertexCount = N * N;
    this.basePositions = new Float32Array(this.vertexCount * 2);
    this.currentPositions = new Float32Array(this.vertexCount * 2);
    this.uvs = new Float32Array(this.vertexCount * 2);

    let vIdx = 0;
    for (let j = 0; j < N; j++) {
      const v = j / (N - 1);
      const y = 1.0 - 2.0 * v; // WebGL normalized coords: +1 top, -1 bottom
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const x = 2.0 * u - 1.0; // -1 left, +1 right

        this.basePositions[vIdx] = x;
        this.basePositions[vIdx + 1] = y;

        this.currentPositions[vIdx] = x;
        this.currentPositions[vIdx + 1] = y;

        this.uvs[vIdx] = u;
        this.uvs[vIdx + 1] = v;

        vIdx += 2;
      }
    }

    // Build Triangles
    const quads = (N - 1) * (N - 1);
    this.indexCount = quads * 6;
    this.indices = new Uint32Array(this.indexCount);

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
   * Procedurally paints the 3D-stylized Samir Avatar with high detail,
   * smooth lighting, gradient depth, dynamic eye tracking, and expression morphing.
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
    // Nose in NDC is roughly (0.0, -0.05) to (0.0, 0.05)
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

    // --- 1. SHOULDERS & COBALT HOODIE WITH MUSTARD ACCENTS ---
    ctx.save();
    // Torso / Hoodie body
    const hoodieGrad = ctx.createLinearGradient(cx - 300, cy + 200, cx + 300, cy + 500);
    hoodieGrad.addColorStop(0, "#1E32B6");
    hoodieGrad.addColorStop(0.4, "#2F4BF0");
    hoodieGrad.addColorStop(1, "#18278E");

    ctx.fillStyle = hoodieGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 380, h);
    ctx.quadraticCurveTo(cx - 320, cy + 260, cx - 180, cy + 240);
    ctx.quadraticCurveTo(cx, cy + 265, cx + 180, cy + 240);
    ctx.quadraticCurveTo(cx + 320, cy + 260, cx + 380, h);
    ctx.closePath();
    ctx.fill();

    // Hoodie Collar / Hood contour
    ctx.fillStyle = "#1A2C9B";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 250, 200, 75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mustard Yellow Accents on Hoodie (Drawstrings & trim)
    ctx.strokeStyle = "#F2B31B";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    // Left drawstring
    ctx.beginPath();
    ctx.moveTo(cx - 60, cy + 255);
    ctx.quadraticCurveTo(cx - 75, cy + 340, cx - 65, cy + 410);
    ctx.stroke();

    // Left metal aglet
    ctx.fillStyle = "#D69707";
    ctx.fillRect(cx - 72, cy + 405, 14, 24);

    // Right drawstring
    ctx.beginPath();
    ctx.moveTo(cx + 60, cy + 255);
    ctx.quadraticCurveTo(cx + 75, cy + 340, cx + 65, cy + 410);
    ctx.stroke();

    // Right metal aglet
    ctx.fillRect(cx + 58, cy + 405, 14, 24);

    // Under-neck shadow
    ctx.fillStyle = "rgba(10, 16, 45, 0.4)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 215, 95, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 2. NECK ---
    const neckGrad = ctx.createLinearGradient(cx - 80, cy + 120, cx + 80, cy + 240);
    neckGrad.addColorStop(0, "#E0A885");
    neckGrad.addColorStop(0.5, "#D1936E");
    neckGrad.addColorStop(1, "#B87854");
    ctx.fillStyle = neckGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 80, cy + 130);
    ctx.lineTo(cx - 85, cy + 230);
    ctx.quadraticCurveTo(cx, cy + 250, cx + 85, cy + 230);
    ctx.lineTo(cx + 80, cy + 130);
    ctx.closePath();
    ctx.fill();

    // --- 3. EARS ---
    const earGrad = ctx.createRadialGradient(cx - 240, cy, 20, cx - 240, cy, 70);
    earGrad.addColorStop(0, "#F5BD99");
    earGrad.addColorStop(0.8, "#DE9B75");
    earGrad.addColorStop(1, "#BA734F");

    // Left ear
    ctx.fillStyle = earGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 235, cy + 15, 45, 65, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(180, 80, 60, 0.35)";
    ctx.beginPath();
    ctx.ellipse(cx - 235, cy + 15, 24, 38, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Right ear
    ctx.fillStyle = earGrad;
    ctx.beginPath();
    ctx.ellipse(cx + 235, cy + 15, 45, 65, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(180, 80, 60, 0.35)";
    ctx.beginPath();
    ctx.ellipse(cx + 235, cy + 15, 24, 38, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // --- 4. HEAD / FACE BASE ---
    const faceGrad = ctx.createRadialGradient(cx - 30, cy - 60, 50, cx, cy + 10, 260);
    faceGrad.addColorStop(0, "#FFD2B3");
    faceGrad.addColorStop(0.55, "#F2B48D");
    faceGrad.addColorStop(0.9, "#DF9971");
    faceGrad.addColorStop(1, "#C27951");

    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    // Stylized jaw and cheekbones
    ctx.moveTo(cx - 210, cy - 110);
    ctx.quadraticCurveTo(cx - 240, cy + 40, cx - 180, cy + 140);
    ctx.quadraticCurveTo(cx - 110, cy + 225, cx, cy + 235);
    ctx.quadraticCurveTo(cx + 110, cy + 225, cx + 180, cy + 140);
    ctx.quadraticCurveTo(cx + 240, cy + 40, cx + 210, cy - 110);
    ctx.quadraticCurveTo(cx, cy - 220, cx - 210, cy - 110);
    ctx.closePath();
    ctx.fill();

    // Subtle 3D ambient cheek highlights
    const cheekGlow = ctx.createRadialGradient(cx - 130, cy + 45, 0, cx - 130, cy + 45, 80);
    cheekGlow.addColorStop(0, "rgba(255, 150, 140, 0.28)");
    cheekGlow.addColorStop(1, "rgba(255, 150, 140, 0)");
    ctx.fillStyle = cheekGlow;
    ctx.fillRect(cx - 220, cy - 30, 180, 160);

    const rightCheekGlow = ctx.createRadialGradient(cx + 130, cy + 45, 0, cx + 130, cy + 45, 80);
    rightCheekGlow.addColorStop(0, "rgba(255, 150, 140, 0.28)");
    rightCheekGlow.addColorStop(1, "rgba(255, 150, 140, 0)");
    ctx.fillStyle = rightCheekGlow;
    ctx.fillRect(cx + 40, cy - 30, 180, 160);

    // --- 5. EYES & BROWS ---
    const leftEyeCx = cx - 85;
    const rightEyeCx = cx + 85;
    const eyeCy = cy - 20;

    // Eyebrows based on expression
    ctx.fillStyle = "#1A1513";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1A1513";

    if (expr === "startled") {
      // Raised arched brows
      ctx.beginPath();
      ctx.moveTo(leftEyeCx - 55, eyeCy - 75);
      ctx.quadraticCurveTo(leftEyeCx, eyeCy - 110, leftEyeCx + 55, eyeCy - 70);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightEyeCx - 55, eyeCy - 70);
      ctx.quadraticCurveTo(rightEyeCx, eyeCy - 110, rightEyeCx + 55, eyeCy - 75);
      ctx.stroke();
    } else if (expr === "annoyed") {
      // Slanted inward angry/annoyed brows
      ctx.beginPath();
      ctx.moveTo(leftEyeCx - 55, eyeCy - 55);
      ctx.quadraticCurveTo(leftEyeCx, eyeCy - 60, leftEyeCx + 55, eyeCy - 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightEyeCx - 55, eyeCy - 40);
      ctx.quadraticCurveTo(rightEyeCx, eyeCy - 60, rightEyeCx + 55, eyeCy - 55);
      ctx.stroke();
    } else {
      // Friendly, stylish angled brows
      ctx.beginPath();
      ctx.moveTo(leftEyeCx - 55, eyeCy - 50);
      ctx.quadraticCurveTo(leftEyeCx, eyeCy - 70, leftEyeCx + 55, eyeCy - 55);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightEyeCx - 55, eyeCy - 55);
      ctx.quadraticCurveTo(rightEyeCx, eyeCy - 70, rightEyeCx + 55, eyeCy - 50);
      ctx.stroke();
    }

    // Eye Whites
    const eyeRx = expr === "startled" ? 44 : 40;
    const eyeRy = expr === "startled" ? 48 : 34;

    const drawEye = (x: number, isRight: boolean) => {
      // Sclera
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(x, eyeCy, eyeRx, eyeRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soft upper shadow inside eye
      ctx.fillStyle = "rgba(40, 30, 25, 0.12)";
      ctx.beginPath();
      ctx.ellipse(x, eyeCy - 8, eyeRx * 0.9, eyeRy * 0.5, 0, 0, Math.PI);
      ctx.fill();

      // Pupil / Iris positions
      let pupilOffsetPxX = lookX * 14;
      let pupilOffsetPxY = lookY * 10;

      if (isCrossEyed) {
        // Look cross-eyed towards the bridge of the nose
        pupilOffsetPxX = isRight ? -16 : 16;
        pupilOffsetPxY = 4;
      }

      const pupilX = x + pupilOffsetPxX;
      const pupilY = eyeCy + pupilOffsetPxY;

      // Iris (Warm Deep Hazel/Amber Brown)
      const irisGrad = ctx.createRadialGradient(pupilX - 4, pupilY - 4, 3, pupilX, pupilY, 22);
      irisGrad.addColorStop(0, "#482613");
      irisGrad.addColorStop(0.7, "#2C1408");
      irisGrad.addColorStop(1, "#120602");

      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.ellipse(pupilX, pupilY, 20, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupil center
      ctx.fillStyle = "#0B0401";
      ctx.beginPath();
      ctx.arc(pupilX, pupilY, 11, 0, Math.PI * 2);
      ctx.fill();

      // Specular reflections (Catchlights)
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(pupilX - 6, pupilY - 6, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pupilX + 5, pupilY + 5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Eyelid crease line
      ctx.strokeStyle = "rgba(100, 50, 30, 0.35)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(x, eyeCy - eyeRy - 6, eyeRx * 0.85, 8, 0, Math.PI * 0.95, Math.PI * 2.05);
      ctx.stroke();
    };

    drawEye(leftEyeCx, false);
    drawEye(rightEyeCx, true);

    // --- 6. NOSE ---
    ctx.save();
    ctx.fillStyle = "#D68D64";
    ctx.beginPath();
    ctx.moveTo(cx, cy - 2);
    ctx.quadraticCurveTo(cx - 24, cy + 50, cx - 18, cy + 58);
    ctx.quadraticCurveTo(cx, cy + 66, cx + 18, cy + 58);
    ctx.quadraticCurveTo(cx + 24, cy + 50, cx, cy - 2);
    ctx.closePath();
    ctx.fill();

    // Nostrils & highlight
    ctx.fillStyle = "rgba(140, 60, 30, 0.35)";
    ctx.beginPath();
    ctx.ellipse(cx - 16, cy + 58, 6, 4, -0.2, 0, Math.PI * 2);
    ctx.ellipse(cx + 16, cy + 58, 6, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 44, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- 7. MOUTH & SMILE ---
    ctx.save();
    const mouthY = cy + 130;

    if (expr === "startled") {
      // Big open "O" gasp mouth
      ctx.fillStyle = "#3B1115";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 10, 26, 38, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tongue
      ctx.fillStyle = "#E06B7B";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 30, 18, 14, 0, 0, Math.PI);
      ctx.fill();

      // Upper teeth
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY - 14, 18, 8, 0, 0, Math.PI);
      ctx.fill();
    } else if (expr === "laughing") {
      // Wide joyful open grin
      ctx.fillStyle = "#3D1318";
      ctx.beginPath();
      ctx.moveTo(cx - 65, mouthY - 10);
      ctx.quadraticCurveTo(cx, mouthY + 60, cx + 65, mouthY - 10);
      ctx.quadraticCurveTo(cx, mouthY + 5, cx - 65, mouthY - 10);
      ctx.closePath();
      ctx.fill();

      // White teeth
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(cx - 52, mouthY - 6);
      ctx.quadraticCurveTo(cx, mouthY + 18, cx + 52, mouthY - 6);
      ctx.quadraticCurveTo(cx, mouthY + 2, cx - 52, mouthY - 6);
      ctx.fill();

      // Pink tongue
      ctx.fillStyle = "#EB6B7D";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 32, 34, 18, 0, 0, Math.PI);
      ctx.fill();
    } else if (expr === "annoyed") {
      // Flat tight wavy line
      ctx.strokeStyle = "#4D1C22";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 45, mouthY + 12);
      ctx.quadraticCurveTo(cx, mouthY - 2, cx + 45, mouthY + 6);
      ctx.stroke();
    } else {
      // Confident, charming friendly developer smirk/smile
      ctx.strokeStyle = "#40171C";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(cx - 52, mouthY - 2);
      ctx.quadraticCurveTo(cx, mouthY + 34, cx + 52, mouthY - 4);
      ctx.stroke();

      // Dimple accents
      ctx.beginPath();
      ctx.moveTo(cx - 54, mouthY - 8);
      ctx.lineTo(cx - 48, mouthY + 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 54, mouthY - 10);
      ctx.lineTo(cx + 48, mouthY + 2);
      ctx.stroke();

      // Subtle lower lip highlight
      ctx.fillStyle = "rgba(180, 80, 70, 0.28)";
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 24, 28, 8, 0, 0, Math.PI);
      ctx.fill();
    }
    ctx.restore();

    // --- 8. HAIR (MODERN TEXTURED DEVELOPER HAIRSTYLE) ---
    ctx.save();
    // Hair base back volume
    const hairGrad = ctx.createLinearGradient(cx - 200, cy - 280, cx + 200, cy - 40);
    hairGrad.addColorStop(0, "#1F1A17");
    hairGrad.addColorStop(0.4, "#2B231F");
    hairGrad.addColorStop(0.75, "#1C1714");
    hairGrad.addColorStop(1, "#120E0C");

    ctx.fillStyle = hairGrad;

    // Stylish voluminous top swoop and clean tapered sides
    ctx.beginPath();
    ctx.moveTo(cx - 215, cy - 80);
    ctx.quadraticCurveTo(cx - 245, cy - 180, cx - 180, cy - 260);
    ctx.quadraticCurveTo(cx - 100, cy - 315, cx + 20, cy - 310);
    ctx.quadraticCurveTo(cx + 170, cy - 300, cx + 230, cy - 210);
    ctx.quadraticCurveTo(cx + 250, cy - 110, cx + 215, cy - 60);

    // Sideburns and hairline
    ctx.lineTo(cx + 205, cy - 10);
    ctx.quadraticCurveTo(cx + 185, cy - 70, cx + 160, cy - 120);
    // Textured fringe swoops across forehead
    ctx.quadraticCurveTo(cx + 100, cy - 80, cx + 50, cy - 130);
    ctx.quadraticCurveTo(cx - 20, cy - 70, cx - 80, cy - 125);
    ctx.quadraticCurveTo(cx - 140, cy - 90, cx - 180, cy - 50);
    ctx.lineTo(cx - 205, cy - 10);
    ctx.closePath();
    ctx.fill();

    // Hair shine / textured strands highlight
    ctx.strokeStyle = "rgba(160, 130, 110, 0.35)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(cx - 120, cy - 260);
    ctx.quadraticCurveTo(cx - 40, cy - 285, cx + 70, cy - 270);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 70, cy - 230);
    ctx.quadraticCurveTo(cx + 20, cy - 245, cx + 120, cy - 215);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 140, cy - 170);
    ctx.quadraticCurveTo(cx - 60, cy - 195, cx + 10, cy - 180);
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
      slot.vx = (slot.offsetX) * -8.0;
      slot.vy = (slot.offsetY) * -8.0;
      this.canvas.style.cursor = "grab";

      // On release, play a random joyful / proud / relieved expression
      const postExpressions: ExpressionType[] = ["laughing", "neutral", "laughing"];
      const randomExpr = postExpressions[Math.floor(Math.random() * postExpressions.length)];
      this.setExpression(randomExpr);
      this.releaseTimer = 1.4; // Hold expression for 1.4s
    }
  };

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
    let anyPointerActive = false;
    let maxPull = 0;

    // Spring constants for rubber-band release
    const kSpring = 360.0; // Spring stiffness
    const dDamper = 18.0;  // Damping coefficient

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
    let stateText = "Calm & Friendly 😊";
    if (this.patience < 20) stateText = "Maximum Elasticity! 🤯";
    else if (this.patience < 50) stateText = "Cheeks Stretched! 😳";
    else if (this.patience < 75) stateText = "Mildly Annoyed 😅";

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

    // Always re-render dynamic eye tracking & expressions onto character texture
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

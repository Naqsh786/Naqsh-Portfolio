import React, { useEffect, useRef } from "react";

/**
 * RidgelineTerrain — Converted from Framer Ridgeline / WireTerrain
 * Source: https://framer.com/m/Ridgeline-bwTUlY.js@efDqjztibeISXzdZCR6C
 * 
 * Independently written high-performance WebGL wireframe mountain flyover
 * with interactive scanning pulse wave and pointer steering.
 * Themed for portfolio dark neon aesthetic (#00020B, neon purple & violet lines).
 */

const FIELD_DEPTH = 60;
const FIELD_HALF_WIDTH = 44;
const LOOK_BEHIND = 4;
const BASE_EYE = 1.8;
const BASE_AMPLITUDE = 4;
const FLIGHT_SPEED = 3.5;
const SCAN_SPEED = 9;
const SCAN_RANGE = 60;
const FOV_Y = (58 * Math.PI) / 180;
const BASE_PITCH = (7 * Math.PI) / 180;
const MAX_YAW = (10 * Math.PI) / 180;
const MAX_BANK = (5 * Math.PI) / 180;
const MAX_LIFT = 0.6;
const DPR_CAP = 2;

function mul(a, b) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  }
  return o;
}

const identity = () =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

function rotX(a) {
  const m = identity(),
    c = Math.cos(a),
    s = Math.sin(a);
  m[5] = c;
  m[6] = s;
  m[9] = -s;
  m[10] = c;
  return m;
}

function rotY(a) {
  const m = identity(),
    c = Math.cos(a),
    s = Math.sin(a);
  m[0] = c;
  m[2] = -s;
  m[8] = s;
  m[10] = c;
  return m;
}

function rotZ(a) {
  const m = identity(),
    c = Math.cos(a),
    s = Math.sin(a);
  m[0] = c;
  m[1] = s;
  m[4] = -s;
  m[5] = c;
  return m;
}

function translate(x, y, z) {
  const m = identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
}

function perspective(fovY, aspect, near, far) {
  const f = 1 / Math.tan(fovY / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

const VERT = `
precision highp float;
attribute vec2 aCell;
uniform vec4 uGrid;
uniform vec2 uScroll;
uniform mat4 uMVP;
uniform float uAmp;
uniform float uScan;
uniform float uFogFar;
varying float vFog;
varying float vScan;
varying float vPeak;

float landscape(float x, float z) {
    float ax = abs(x);
    float walls = smoothstep(2.5, 15.0, ax);
    float swell = sin(x * 0.27 + sin(z * 0.13) * 2.1) * 0.5 + 0.5;
    float crest = 1.0 - abs(sin(z * 0.19 + x * 0.09 + 1.3));
    float chop  = sin(x * 0.61 - z * 0.43) * 0.5 + 0.5;
    float n = swell * 0.5 + crest * crest * 0.35 + chop * 0.15;
    return uAmp * (walls * (n * 1.8 + 0.5 * ax / uGrid.w) + 0.08 * (n - 0.5));
}

void main() {
    float x = (aCell.x / uGrid.x * 2.0 - 1.0) * uGrid.w;
    float zLocal = (aCell.y - uScroll.y) * uGrid.z - 4.0;
    float zWorld = (aCell.y + uScroll.x) * uGrid.z;
    float h = landscape(x, zWorld);

    gl_Position = uMVP * vec4(x, h, -zLocal, 1.0);

    float dist = length(vec2(x * 0.5, zLocal));
    vFog = 1.0 - smoothstep(uFogFar * 0.3, uFogFar, dist);
    vScan = exp(-abs(zLocal - uScan) / 1.8);
    vPeak = clamp(h / (uAmp * 1.6 + 0.001), 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec4 uColor;
uniform vec3 uHot;
uniform float uFill;
varying float vFog;
varying float vScan;
varying float vPeak;
void main() {
    if (uFill > 0.5) {
        gl_FragColor = vec4(uColor.rgb, 1.0);
        return;
    }
    float a = uColor.a * vFog * (0.45 + 0.55 * vPeak);
    vec3 c = mix(uColor.rgb, uHot, clamp(vScan * 0.9, 0.0, 1.0));
    a = clamp(a * (1.0 + vScan * 3.0), 0.0, 1.0);
    gl_FragColor = vec4(c, a);
}
`;

function buildProgram(gl) {
  const make = (type, src) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = make(gl.VERTEX_SHADER, VERT);
  const fs = make(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "aCell");
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

function buildMesh(rows) {
  const step = FIELD_DEPTH / rows;
  const cols = Math.max(2, 2 * Math.round(FIELD_HALF_WIDTH / step));
  const stride = cols + 1;
  const verts = new Float32Array(stride * (rows + 1) * 2);
  for (let r = 0; r <= rows; r++)
    for (let c = 0; c <= cols; c++) {
      const i = (r * stride + c) * 2;
      verts[i] = c;
      verts[i + 1] = r;
    }
  const tris = [];
  const lines = [];
  for (let r = 0; r <= rows; r++)
    for (let c = 0; c <= cols; c++) {
      const a = r * stride + c;
      if (c < cols) lines.push(a, a + 1);
      if (r < rows) lines.push(a, a + stride);
      if (c < cols && r < rows)
        tris.push(a, a + 1, a + stride, a + 1, a + stride + 1, a + stride);
    }
  return {
    cols,
    rows,
    step,
    verts,
    tris: new Uint16Array(tris),
    lines: new Uint16Array(lines),
  };
}

export default function RidgelineTerrain({
  background = "#00020B",
  lineColor = "#5435CC",
  accentColor = "#c4b5fd",
  density = 56,
  speed = 65,
  relief = 90,
  cameraHeight = 135,
  fogDistance = 45,
  scan = true,
  scanSpeed = 110,
  hover = 80,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      depth: true,
    });
    if (!gl) return;

    const prog = buildProgram(gl);
    if (!prog) return;

    const U = (n) => gl.getUniformLocation(prog, n);
    const loc = {
      grid: U("uGrid"),
      scroll: U("uScroll"),
      mvp: U("uMVP"),
      amp: U("uAmp"),
      scan: U("uScan"),
      fogFar: U("uFogFar"),
      color: U("uColor"),
      hot: U("uHot"),
      fill: U("uFill"),
    };

    const vbo = gl.createBuffer();
    const triIbo = gl.createBuffer();
    const lineIbo = gl.createBuffer();

    let mesh = buildMesh(density);
    let meshRows = density;

    const uploadMesh = (rows) => {
      mesh = buildMesh(rows);
      meshRows = rows;
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, mesh.verts, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triIbo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.tris, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIbo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.lines, gl.STATIC_DRAW);
    };

    uploadMesh(density);
    gl.enableVertexAttribArray(0);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1);
      const w = root.clientWidth || 1;
      const h = root.clientHeight || 1;
      const bw = Math.max(1, Math.round(w * dpr));
      const bh = Math.max(1, Math.round(h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible && engineRef.current) engineRef.current.start();
    });
    io.observe(root);

    const pointer = { nx: 0, ny: 0, active: false, presence: 0 };
    const cam = { yaw: 0, bank: 0, lift: 0 };
    let scroll = 20;
    let scanZ = 15;
    let clock = 0;
    let raf = 0;
    let last = -1;

    // Parse color helpers
    const bgRgb = [0 / 255, 2 / 255, 11 / 255]; // #00020B
    const lineRgba = [84 / 255, 53 / 255, 204 / 255, 0.85]; // #5435CC
    const hotRgb = [196 / 255, 181 / 255, 253 / 255]; // #c4b5fd

    const draw = (dt) => {
      clock += dt * (speed / 100);
      scroll += dt * (speed / 100) * FLIGHT_SPEED;
      scanZ = (scanZ + dt * (scanSpeed / 100) * SCAN_SPEED) % SCAN_RANGE;

      pointer.presence +=
        ((pointer.active ? 1 : 0) - pointer.presence) * (1 - Math.exp(-dt * 3));
      const k = pointer.presence * Math.min(1, hover / 100);

      const idleYaw = Math.sin(clock * 0.21) * 0.03 + Math.sin(clock * 0.13 + 2) * 0.015;
      const idleBank = Math.sin(clock * 0.17 + 1) * 0.03;
      const idleLift = Math.sin(clock * 0.11) * 0.1;

      const yawT = idleYaw * (1 - k) + pointer.nx * MAX_YAW * (hover / 100) * k;
      const bankT = idleBank * (1 - k) + pointer.nx * MAX_BANK * (hover / 100) * k;
      const liftT = idleLift * (1 - k) - pointer.ny * MAX_LIFT * (hover / 100) * k;

      const ease = 1 - Math.exp(-dt * 2.5);
      cam.yaw += (yawT - cam.yaw) * ease;
      cam.bank += (bankT - cam.bank) * ease;
      cam.lift += (liftT - cam.lift) * ease;

      const eye = Math.max(0.2, cameraHeight / 100) * BASE_EYE;
      const camY = Math.max(0.4, eye * (1 + cam.lift));
      const pitch = BASE_PITCH + (camY / BASE_EYE - 1) * 0.04;
      const aspect = canvas.width / Math.max(1, canvas.height);

      const view = mul(
        rotZ(cam.bank),
        mul(rotX(pitch), mul(rotY(cam.yaw), translate(0, -camY, 0)))
      );
      const mvp = mul(perspective(FOV_Y, aspect, 0.1, 200), view);

      const scrollRows = scroll / mesh.step;
      const base = Math.floor(scrollRows);
      const frac = scrollRows - base;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(bgRgb[0], bgRgb[1], bgRgb[2], 1);
      gl.depthMask(true);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.uniform4f(loc.grid, mesh.cols, mesh.rows, mesh.step, FIELD_HALF_WIDTH);
      gl.uniform2f(loc.scroll, base, frac);
      gl.uniformMatrix4fv(loc.mvp, false, mvp);
      gl.uniform1f(loc.amp, BASE_AMPLITUDE * (relief / 100));
      gl.uniform1f(loc.scan, scan ? scanZ : -1000);
      gl.uniform1f(loc.fogFar, fogDistance);
      gl.uniform3f(loc.hot, hotRgb[0], hotRgb[1], hotRgb[2]);

      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);

      // Opaque mountain body fill
      gl.depthMask(true);
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(1, 1);
      gl.uniform1f(loc.fill, 1);
      gl.uniform4f(loc.color, bgRgb[0], bgRgb[1], bgRgb[2], 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triIbo);
      gl.drawElements(gl.TRIANGLES, mesh.tris.length, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);

      // Wireframe mountain ridges
      gl.depthMask(false);
      gl.uniform1f(loc.fill, 0);
      gl.uniform4f(loc.color, lineRgba[0], lineRgba[1], lineRgba[2], lineRgba[3]);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIbo);
      gl.drawElements(gl.LINES, mesh.lines.length, gl.UNSIGNED_SHORT, 0);
      gl.depthMask(true);
    };

    const frame = (now) => {
      raf = 0;
      const dt = last < 0 ? 0 : Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      if (visible) draw(dt);
      raf = requestAnimationFrame(frame);
    };

    const engine = {
      start: () => {
        if (!raf) raf = requestAnimationFrame(frame);
      },
    };
    engineRef.current = engine;
    engine.start();

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      pointer.nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1));
      pointer.ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1));
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(triIbo);
      gl.deleteBuffer(lineIbo);
      gl.deleteProgram(prog);
    };
  }, [background, lineColor, accentColor, density, speed, relief, cameraHeight, fogDistance, scan, scanSpeed, hover]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ backgroundColor: background, ...style }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
}

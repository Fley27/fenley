import { useEffect, useRef } from 'react'

// Port of spacefs.com's "sand river" dither: a WebGL point-sprite ribbon.
// Particles ride a sine centerline across the viewport, scatter into 23
// quantized lanes around a gaussian core, and flow with time + scroll.

const CLEAR_COUNT = 6
const FLOATS = 12
const STRIDE = FLOATS * 4
const LANES = 23

const FLOW_SECONDS = 120
const SCROLL_FLOW = 0.05
const BEND = 0.09
const BEND_RATE = 3
const CLEAR_PAD = 72
const CLEAR_GROW = 0.3
const WEIGHT = 0.95
const FPS = 60
const FPS_SCROLLING = 30
const MAX_DT = 0.1

// 4 cool tiers + 2 warm tiers, tuned to the Obsidian palette.
const TIERS = [
  [110, 231, 249],
  [139, 124, 255],
  [126, 176, 255],
  [174, 216, 255],
  [255, 158, 125],
  [246, 194, 140],
]

const VERT = `
precision highp float;

attribute vec4 aPath;   // start along the ribbon, rate, lateral offset, base alpha
attribute vec4 aGrain;  // size in css px, jitter x, jitter y, bob amplitude
attribute vec4 aTone;   // cool tier, shimmer phase, warm bias, warm tier

uniform vec2 uRes;
uniform float uDpr;
uniform float uFlow;
uniform float uTime;
uniform float uBend;
uniform float uIntensity;
uniform float uWeight;
uniform vec2 uShape;    // centerline height and amplitude, as fractions of the viewport
uniform vec4 uClear[${CLEAR_COUNT}];   // center x, center y, radius x, radius y
uniform float uClearAmt[${CLEAR_COUNT}];
uniform vec3 uTier[${TIERS.length}];

varying vec3 vColor;
varying float vAlpha;

const float TAU = 6.28318531;
const float CLEAR_DEPTH = 0.84;

float ease(float u) {
  float c = clamp(u, 0.0, 1.0);
  return c * c * (3.0 - 2.0 * c);
}

void main() {
  float t = fract(aPath.x + uFlow * aPath.y);
  float w = uRes.x;
  float h = uRes.y;
  float over = 0.1;

  float x = (-over + t * (1.0 + 2.0 * over)) * w;
  float wave = sin(TAU * (t * 0.92 + 0.58 + uBend));
  float ripple = sin(TAU * (t * 2.1 - uBend * 1.6 + 0.15 + uTime * 0.004));
  float amp = h * (uShape.y + 0.025 * sin(uTime * 0.05));
  float y = h * uShape.x - amp * wave - h * 0.045 * ripple - h * uShape.y * 1.1 * (t - 0.5);

  float band = h * 0.15 * (0.5 + 0.5 * pow(max(abs(wave), 1e-4), 0.7));
  float swirl = sin(x * 0.0037 + uTime * 0.11) * cos(y * 0.0051 - uTime * 0.09)
              + 0.5 * sin(x * 0.0091 - y * 0.0068 + uTime * 0.07);

  y += aPath.z * band + swirl * band * 0.2 + aGrain.z
     + aGrain.w * sin(aTone.y * 1.7 + uTime * 0.5);
  x += aGrain.y;

  float edge = h * 0.05;
  float shimmer = 0.86 + 0.14 * sin(aTone.y + uTime * 0.8);
  float ink = aPath.w * uWeight * shimmer * ease(y / edge) * ease((h - y) / edge);

  for (int i = 0; i < ${CLEAR_COUNT}; i++) {
    vec4 zone = uClear[i];
    float reach = length((vec2(x, y) - zone.xy) / max(zone.zw, vec2(1.0)));
    float veil = 1.0 - smoothstep(0.2, 1.0, reach);
    ink *= 1.0 - uClearAmt[i] * CLEAR_DEPTH * veil * veil * (3.0 - 2.0 * veil);
  }
  ink *= uIntensity;

  float warmth = ease((t - 0.3) / 0.55) * (0.6 + 0.4 * aTone.z);

  gl_Position = vec4(x / w * 2.0 - 1.0, 1.0 - y / h * 2.0, 0.0, 1.0);
  float px = aGrain.x * uDpr;
  float size = max(1.6, px);
  gl_PointSize = size;
  vColor = mix(uTier[int(aTone.x)], uTier[int(aTone.w)], warmth);
  vAlpha = min(1.0, ink) * clamp((px * px) / (size * size), 0.4, 1.0);
}
`

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float a = vAlpha * (1.0 - smoothstep(0.26, 0.5, d));
  gl_FragColor = vec4(vColor * a, a);
}
`

function mulberry32(seed) {
  let a = seed
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gaussian(rand) {
  const u = Math.max(rand(), 1e-6)
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function compile(gl, type, src) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function buildParticles(count, seed) {
  const rand = mulberry32(seed)
  const data = new Float32Array(count * FLOATS)
  for (let i = 0; i < count; i += 1) {
    const t = rand()
    let lane
    let alpha = 0.22 + rand() * 0.44
    if (t < 0.06) {
      lane = 1.15 * gaussian(rand)
      alpha *= 0.6
    } else if (t < 0.4) {
      lane = 0.38 * gaussian(rand)
    } else {
      lane = (Math.floor(rand() * LANES) / (LANES - 1)) * 2 - 1 + 0.016 * gaussian(rand)
    }
    alpha *= Math.exp(-lane * lane * 1.35)
    const k = i * FLOATS
    data[k] = rand()
    data[k + 1] = 0.82 + rand() * 0.36
    data[k + 2] = lane
    data[k + 3] = alpha
    data[k + 4] = 0.75 + rand() * 1.35
    data[k + 5] = 1.4 * gaussian(rand)
    data[k + 6] = 1.4 * gaussian(rand)
    data[k + 7] = t < 0.06 ? 2 + rand() * 7 : rand() * 2.5
    data[k + 8] = Math.floor(4 * rand())
    data[k + 9] = rand() * Math.PI * 2
    data[k + 10] = rand()
    data[k + 11] = 4 + Math.floor(2 * rand())
  }
  return data
}

function createRenderer(canvas) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  const program = gl.createProgram()
  const buffer = gl.createBuffer()
  if (!vs || !fs || !program || !buffer) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const aPath = gl.getAttribLocation(program, 'aPath')
  const aGrain = gl.getAttribLocation(program, 'aGrain')
  const aTone = gl.getAttribLocation(program, 'aTone')
  const loc = (name) => gl.getUniformLocation(program, name)
  const uRes = loc('uRes')
  const uDpr = loc('uDpr')
  const uFlow = loc('uFlow')
  const uTime = loc('uTime')
  const uBend = loc('uBend')
  const uIntensity = loc('uIntensity')
  const uWeight = loc('uWeight')
  const uShape = loc('uShape')
  const uClear = loc('uClear[0]')
  const uClearAmt = loc('uClearAmt[0]')
  const uTier = loc('uTier[0]')

  gl.enableVertexAttribArray(aPath)
  gl.enableVertexAttribArray(aGrain)
  gl.enableVertexAttribArray(aTone)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  const tierFlat = new Float32Array(TIERS.length * 3)
  TIERS.forEach((c, i) => {
    tierFlat[i * 3] = c[0] / 255
    tierFlat[i * 3 + 1] = c[1] / 255
    tierFlat[i * 3 + 2] = c[2] / 255
  })
  gl.uniform3fv(uTier, tierFlat)
  gl.uniform1f(uWeight, WEIGHT)

  let count = 0

  function ensureCount(w, h) {
    const density = w < 768 ? 0.11 : 0.15
    const target = Math.round(Math.min(240000, Math.max(26000, w * h * density)))
    if (count !== 0 && Math.abs(target - count) < 0.15 * count) return
    count = target
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, buildParticles(count, 20261001), gl.STATIC_DRAW)
    gl.vertexAttribPointer(aPath, 4, gl.FLOAT, false, STRIDE, 0)
    gl.vertexAttribPointer(aGrain, 4, gl.FLOAT, false, STRIDE, 16)
    gl.vertexAttribPointer(aTone, 4, gl.FLOAT, false, STRIDE, 32)
  }

  function resize(w, h, dpr) {
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, w, h)
    gl.uniform1f(uDpr, dpr)
    const portrait = h > 1.1 * w
    gl.uniform2f(uShape, portrait ? 0.82 : 0.6, portrait ? 0.09 : 0.2)
    ensureCount(w, h)
  }

  function draw(state) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    if (state.intensity <= 0.001 || count === 0) return
    gl.uniform1f(uFlow, state.flow)
    gl.uniform1f(uTime, state.time)
    gl.uniform1f(uBend, state.bend)
    gl.uniform1f(uIntensity, state.intensity)
    gl.uniform4fv(uClear, state.clear)
    gl.uniform1fv(uClearAmt, state.clearAmount)
    gl.drawArrays(gl.POINTS, 0, count)
  }

  function sample(state) {
    draw(state)
    const px = new Uint8Array(canvas.width * canvas.height * 4)
    gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, px)
    let alpha = 0
    let painted = 0
    let hash = 7
    for (let i = 3; i < px.length; i += 4) {
      const a = px[i]
      alpha += a
      if (a !== 0) painted += 1
    }
    for (let i = 0; i < px.length; i += 52) hash = (Math.imul(hash, 31) + px[i]) | 0
    return { alpha, painted, hash, width: canvas.width, height: canvas.height }
  }

  function dispose() {
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
  }

  return { resize, draw, sample, dispose }
}

function approach(current, target, rate, dt) {
  return current + (target - current) * Math.min(1, rate * dt)
}

export function DustCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const renderer = createRenderer(canvas)
    if (!renderer) return undefined

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = mq.matches
    let raf = 0
    let last = 0
    let lastScroll = window.scrollY
    let w = 0
    let h = 0

    const state = {
      flow: Math.random(),
      time: reduced ? 36 : 0,
      bend: (window.scrollY / Math.max(window.innerHeight, 1)) * BEND,
      intensity: 1,
      clear: new Float32Array(4 * CLEAR_COUNT),
      clearAmount: new Float32Array(CLEAR_COUNT),
    }

    function collectClears() {
      const els = document.querySelectorAll('[data-dust-clear]')
      const vh = window.innerHeight
      let n = 0
      for (const el of els) {
        if (n >= CLEAR_COUNT) break
        const range = document.createRange()
        range.selectNodeContents(el)
        const rect = range.getBoundingClientRect()
        if (rect.width === 0) continue
        const halfW = rect.width / 2
        const halfH = rect.height / 2
        const pad = CLEAR_PAD + CLEAR_GROW * Math.max(halfW, halfH)
        const rx = halfW + pad
        const ry = halfH + pad
        const cx = rect.left + halfW
        const cy = rect.top + halfH
        if (cy + ry < 0 || cy - ry > vh) continue
        state.clear.set([cx, cy, rx, ry], 4 * n)
        state.clearAmount[n] = 1
        n += 1
      }
      state.clearAmount.fill(0, n)
    }

    function drawOnce() {
      collectClears()
      renderer.draw(state)
    }

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      renderer.resize(w, h, Math.min(window.devicePixelRatio || 1, 2))
      drawOnce()
    }

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const scrollY = window.scrollY
      const interval = 1000 / (scrollY === lastScroll ? FPS : FPS_SCROLLING) - 1
      if (now - last < interval) return
      const dt = Math.min(MAX_DT, (now - last) / 1000)
      last = now
      const delta = Math.abs(scrollY - lastScroll)
      lastScroll = scrollY
      state.flow += dt / FLOW_SECONDS + (delta / h) * SCROLL_FLOW
      state.bend = approach(state.bend, (scrollY / h) * BEND, BEND_RATE, dt)
      state.time += dt
      drawOnce()
    }

    function start() {
      if (reduced || raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    function onMotionPref() {
      reduced = mq.matches
      if (reduced) {
        stop()
        drawOnce()
      } else {
        state.time = 0
        start()
      }
    }

    function onScroll() {
      if (!reduced) return
      state.bend = (window.scrollY / h) * BEND
      drawOnce()
    }

    if (process.env.NODE_ENV !== 'production') {
      window.__dustRead = () => {
        state.bend = approach(
          state.bend,
          (window.scrollY / Math.max(h, 1)) * BEND,
          BEND_RATE,
          1
        )
        drawOnce()
        return renderer.sample(state)
      }
    }

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    mq.addEventListener('change', onMotionPref)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      mq.removeEventListener('change', onMotionPref)
      if (window.__dustRead) delete window.__dustRead
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="dust-canvas" aria-hidden="true" />
}

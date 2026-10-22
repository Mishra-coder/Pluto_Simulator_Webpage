/* Sunset city scene drawn on canvas: sky gradient, sun, clouds, three skyline layers with lit windows */

/* small seeded PRNG so a scene looks the same on every load and resize */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function drawSky(ctx, w, h, horizon, sunX) {
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#151a33");
  sky.addColorStop(0.35, "#3d2550");
  sky.addColorStop(0.62, "#a8365a");
  sky.addColorStop(0.82, "#f0612c");
  sky.addColorStop(1, "#ffb04a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const sunY = horizon * 0.86, r = Math.min(w, h) * 0.035;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, w * 0.45);
  glow.addColorStop(0, "rgba(255,214,140,.95)");
  glow.addColorStop(0.08, "rgba(255,170,80,.6)");
  glow.addColorStop(0.4, "rgba(255,110,40,.18)");
  glow.addColorStop(1, "rgba(255,110,40,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff4d6";
  ctx.beginPath(); ctx.arc(sunX, sunY, r, 0, Math.PI * 2); ctx.fill();
}

/* long streaky clouds: dark violet bodies with an orange underside lit by the sun */
function drawClouds(ctx, w, horizon, sunX, rand) {
  ctx.save();
  ctx.filter = `blur(${Math.max(2, w / 500)}px)`;
  for (let i = 0; i < 70; i++) {
    const y = horizon * (0.05 + rand() * 0.72);
    const x = rand() * w * 1.2 - w * 0.1;
    const rw = w * (0.06 + rand() * 0.16), rh = rw * (0.06 + rand() * 0.08);
    const near = 1 - Math.min(1, Math.abs(x - sunX) / w);
    const low = y / horizon;
    ctx.fillStyle = `rgba(${40 + low * 70},${20 + low * 20},${60 - low * 10},${0.35 + rand() * 0.35})`;
    ctx.beginPath(); ctx.ellipse(x, y, rw, rh, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,${120 + near * 70},${60 + near * 40},${(0.18 + near * 0.5) * low})`;
    ctx.beginPath(); ctx.ellipse(x + rw * 0.05, y + rh * 0.55, rw * 0.85, rh * 0.45, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawLayer(ctx, w, h, base, opts, rand) {
  const { color, minH, maxH, minW, maxW, windows, gap } = opts;
  let x = -rand() * maxW;
  while (x < w) {
    const bw = minW + rand() * (maxW - minW);
    const bh = minH + rand() * (maxH - minH) * (rand() < 0.15 ? 1.6 : 1);
    const top = base - bh;
    ctx.fillStyle = color;
    ctx.fillRect(x, top, bw, h - top);
    if (rand() < 0.3) {
      /* spire or stepped crown */
      const sw = bw * (0.2 + rand() * 0.3);
      ctx.fillRect(x + (bw - sw) / 2, top - bh * 0.12, sw, bh * 0.12);
      if (rand() < 0.5) ctx.fillRect(x + bw / 2 - 1, top - bh * 0.28, 2, bh * 0.16);
    }
    if (windows) {
      const cell = Math.max(3, bw / 9), ww = cell * 0.4, wh = cell * 0.5;
      for (let wy = top + cell; wy < h - cell; wy += cell * 1.25) {
        for (let wx = x + cell * 0.6; wx < x + bw - cell * 0.6; wx += cell) {
          if (rand() > windows) continue;
          ctx.fillStyle = `rgba(255,${170 + rand() * 60},${80 + rand() * 60},${0.45 + rand() * 0.5})`;
          ctx.fillRect(wx, wy, ww, wh);
        }
      }
    }
    x += bw + gap * rand();
  }
}

/* paint into a canvas sized to its CSS box. opts: seed, sun (0..1 across), horizon (0..1 down) */
export function paintSkyline(canvas, { seed = 7, sun = 0.75, horizon: hz = 0.7 } = {}) {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const rand = rng(seed);
  const horizon = h * hz, sunX = w * sun;
  const u = Math.max(w, 600) / 1000; /* widths follow the canvas width, heights its height */
  const v = h / 600;

  drawSky(ctx, w, h, horizon, sunX);
  drawClouds(ctx, w, horizon, sunX, rand);

  /* haze at the horizon, then far, mid and near skylines */
  const haze = ctx.createLinearGradient(0, horizon * 0.7, 0, horizon);
  haze.addColorStop(0, "rgba(255,120,60,0)");
  haze.addColorStop(1, "rgba(255,130,70,.35)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon * 0.7, w, horizon * 0.3);
  drawLayer(ctx, w, h, horizon, { color: "#5a2d4e", minH: 15 * v, maxH: 70 * v, minW: 12 * u, maxW: 34 * u, windows: 0, gap: 6 * u }, rand);
  drawLayer(ctx, w, h, horizon + 18 * v, { color: "#2a1a33", minH: 35 * v, maxH: 120 * v, minW: 18 * u, maxW: 48 * u, windows: 0.16, gap: 12 * u }, rand);
  drawLayer(ctx, w, h, horizon + 60 * v, { color: "#120f1c", minH: 45 * v, maxH: 170 * v, minW: 28 * u, maxW: 70 * u, windows: 0.24, gap: 30 * u }, rand);

  /* sunlight spilling over the city */
  const lit = ctx.createRadialGradient(sunX, horizon, 0, sunX, horizon, w * 0.5);
  lit.addColorStop(0, "rgba(255,140,60,.28)");
  lit.addColorStop(1, "rgba(255,140,60,0)");
  ctx.fillStyle = lit;
  ctx.fillRect(0, 0, w, h);
}

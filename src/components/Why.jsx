import { useEffect, useRef } from "react";
import { Icon } from "./Icon.jsx";
import { prefersReducedMotion } from "../hooks.js";

/* Drift the HUD telemetry so the sim preview reads as a live flight (writes the DOM directly: 60 fps, no re-renders) */
function useLiveTelemetry() {
  const refs = { alt: useRef(null), spd: useRef(null), hdg: useRef(null), roll: useRef(null), batt: useRef(null) };
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0, battery = 80;
    const frame = (t) => {
      const s = t / 1000;
      refs.alt.current.textContent = (12.5 + Math.sin(s * 0.7) * 1.4 + Math.sin(s * 2.3) * 0.2).toFixed(1);
      refs.spd.current.textContent = Math.max(0, 4.2 + Math.sin(s * 0.9 + 1) * 1.6).toFixed(1);
      refs.hdg.current.textContent = String(Math.round((152 + Math.sin(s * 0.3) * 18 + 360) % 360)).padStart(3, "0");
      refs.roll.current.style.transform = `rotate(${(Math.sin(s * 0.9) * 9).toFixed(1)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const drain = setInterval(() => {
      battery = battery <= 35 ? 80 : battery - 1;
      refs.batt.current.style.width = battery + "%";
    }, 1500);
    return () => { cancelAnimationFrame(raf); clearInterval(drain); };
  }, []);
  return refs;
}

const PANEL = [
  ["Environment", "New York City"],
  ["Time of day", "Sunset"],
  ["Battery sag", true],
  ["Ground effect", true],
  ["Wind", false],
  ["Camera", "Chase · FPV · Ground"],
];

/* 02 · Why simulate */
export default function Why() {
  const hud = useLiveTelemetry();
  return (
    <section id="why">
      <div className="wrap">
        <div className="why-top">
          <div>
            <span className="eyebrow reveal">Real skills. Real confidence.</span>
            <h2 className="reveal">Build confidence before takeoff.</h2>
            <p className="lede reveal">Learn the controls safely, before the real thing.</p>
            <div className="why-feats">
              <div className="reveal"><span className="icon"><Icon id="i-shield" /></span><h3>No hardware risk</h3><p>Crash freely. Press <span className="kbd">R</span> to reset.</p></div>
              <div className="reveal"><span className="icon"><Icon id="i-bars" /></span><h3>Learn faster</h3><p>Repeat any lesson.</p></div>
              <div className="reveal"><span className="icon"><Icon id="i-gear" /></span><h3>Real physics</h3><p>A real flight controller.</p></div>
            </div>
          </div>
          <div className="sim reveal" aria-label="Preview of the PlutoSim flight screen">
            <img src="/assets/images/missions/precision-delivery-1.webp" alt="PlutoSim in New York City: a drone approaching a delivery zone" loading="lazy" />
            <div className="sim-tele card">
              <div className="sim-status"><Icon id="i-pad" /><span className="batt"><i ref={hud.batt} /></span></div>
              <dl>
                <div><dt>Altitude</dt><dd><b ref={hud.alt}>12.5</b> m</dd></div>
                <div><dt>Speed</dt><dd><b ref={hud.spd}>4.2</b> m/s</dd></div>
                <div><dt>Heading</dt><dd><b ref={hud.hdg}>152</b>°</dd></div>
              </dl>
              <svg className="horizon" viewBox="0 0 120 64" aria-hidden="true">
                <path d="M8 60a52 52 0 0 1 104 0" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
                <g className="roll" ref={hud.roll}><path d="M14 56h92" stroke="var(--signal)" strokeWidth="1.5" /><path d="M60 20l-5 9h10z" fill="var(--signal)" /></g>
              </svg>
              <p className="mode"><i />Altitude Hold</p>
            </div>
            <div className="sim-panel card">
              {PANEL.map(([label, value]) =>
                typeof value === "boolean"
                  ? <div key={label} className="row toggle"><b>{label}</b><i className={value ? "on" : undefined} /></div>
                  : <div key={label} className="row"><small>{label}</small><b>{value}</b></div>
              )}
            </div>
          </div>
        </div>

        <div className="smarter card reveal">
          <div>
            <h2>A safer way to become a better pilot.</h2>
          </div>
          <img className="pad-img" src="/assets/images/controls/gamepad.webp" alt="A game controller" width="1405" height="959" loading="lazy" />
          <ul className="ticks">
            <li><span className="icon"><Icon id="i-cap" /></span><div><b>Guided lessons</b>Shown, then scored.</div></li>
            <li><span className="icon"><Icon id="i-trend" /></span><div><b>Build real skills</b>Control and judgement.</div></li>
            <li><span className="icon"><Icon id="i-star" /></span><div><b>Perfect for all levels</b>Beginner to Acro.</div></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

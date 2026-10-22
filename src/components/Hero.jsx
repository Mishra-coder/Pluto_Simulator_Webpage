import { useEffect, useRef } from "react";
import { Icon } from "./Icon.jsx";
import Scene from "./Scene.jsx";
import { DOWNLOADS, HERO_CARDS } from "../data/site.js";
import { mountDrone } from "../lib/droneViewer.js";

/* 01 · Hero: sunset city, the 3D Pluto, headline, both downloads and four mission cards */
export default function Hero({ platform, onPickMap }) {
  const stage = useRef(null);

  /* three.js + the model load after first paint so they never block the page.
     Each mount gets its own canvas: two renderers sharing one GL context corrupt each other */
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-label", "3D model of the Pluto drone. Drag to rotate.");
    stage.current.appendChild(canvas);
    let dispose = null, cancelled = false;
    mountDrone(stage.current, canvas)
      .then((d) => { if (cancelled) d(); else dispose = d; })
      .catch((err) => console.warn("3D drone unavailable:", err));
    return () => { cancelled = true; dispose?.(); canvas.remove(); };
  }, []);

  /* the visitor's OS gets the orange button and goes first */
  const order = platform === "win" ? ["win", "mac"] : ["mac", "win"];

  return (
    <header className="hero" id="top">
      <Scene className="hero-bg" seed={3} sun={0.82} horizon={0.66} />
      <div className="stage" ref={stage} />
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal">Drone simulator for everyone</span>
          <h1 className="reveal">Learn to fly.<br /><span className="hl">Before</span> you fly.</h1>
          <p className="lede reveal">The realistic drone simulator for Pluto drones. Crash, reset, fly again.</p>
          <div className="ctas reveal">
            {order.map((key, i) => {
              const d = DOWNLOADS[key];
              return <a key={key} className={`btn ${i === 0 ? "btn-signal" : "btn-ghost"}`} href={d.href} download><Icon id={d.icon} />{d.label}</a>;
            })}
          </div>
          <ul className="platforms reveal">
            <li><Icon id="i-apple" /><span>macOS<br />{DOWNLOADS.mac.size}</span></li>
            <li><Icon id="i-win" /><span>Windows 10 / 11<br />{DOWNLOADS.win.size}</span></li>
            <li><Icon id="i-pad" /><span>Works with<br />game controller</span></li>
          </ul>
        </div>
        <div className="hero-cards">
          {HERO_CARDS.map((c) => (
            <a key={c.map} className="mcard reveal" href="#missions" onClick={() => onPickMap(c.map)}>
              <img src={c.img} alt="" loading="lazy" />
              <span><b>{c.label}</b>{c.title}</span>
              <i className="arrow"><Icon id="i-arrow" /></i>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

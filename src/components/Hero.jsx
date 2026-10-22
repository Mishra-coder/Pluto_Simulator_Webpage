import { Icon } from "./Icon.jsx";
import { DOWNLOADS, HERO_CARDS } from "../data/site.js";

/* 01 · Hero: sunset city photo with the Pluto (CSS background), headline, both downloads and four mission cards */
export default function Hero({ platform, onPickMap }) {
  /* the visitor's OS gets the orange button and goes first */
  const order = platform === "win" ? ["win", "mac"] : ["mac", "win"];

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal">Drone simulator for everyone</span>
          <h1 className="reveal">Learn to fly<br /><span className="hl">Before</span> you fly</h1>
          <p className="lede reveal">The realistic drone simulator for Pluto drones Crash reset fly again</p>
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

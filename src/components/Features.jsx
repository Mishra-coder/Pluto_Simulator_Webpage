import { Icon } from "./Icon.jsx";

const FEATURES = [
  ["i-target", "Realistic physics", "Wind, drag and battery sag."],
  ["i-layers", "8 environments", "City, forest, site and indoor."],
  ["i-cap", "Guided training", "15 step-by-step lessons."],
  ["i-star", "Challenging missions", "10 real-world jobs."],
  ["i-drone", "3 drones", "Pluto, Pluto Guru and Racer."],
  ["i-modes", "3 flight modes", "Stabilize, Altitude Hold, Acro."],
];

/* 06 · Features: sunset city photo behind the heading (CSS background), feature grid and controller card */
export default function Features() {
  return (
    <section id="basics" className="has-scene has-photo">
      <div className="wrap">
        <span className="eyebrow reveal">Realistic and practical</span>
        <h2 className="reveal">Everything you need<br />to become a better pilot.</h2>
        <p className="lede reveal">Real physics. Real places. Real skills.</p>
        <div className="feat-wrap">
          <div className="feat-grid">
            {FEATURES.map(([icon, title, text]) => (
              <div key={title} className="feat card reveal"><span className="icon"><Icon id={icon} /></span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
          <a className="pad-card card reveal" href="#controls">
            <img className="pad-img" src="/assets/images/controls/gamepad.webp" alt="" width="1405" height="959" loading="lazy" />
            <div><Icon id="i-pad" className="pad-ic" /><h3>Works with controller</h3><p>Gamepad or RC transmitter.</p></div>
          </a>
        </div>
      </div>
    </section>
  );
}

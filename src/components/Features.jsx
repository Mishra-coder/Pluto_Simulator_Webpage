import { Icon } from "./Icon.jsx";
import Scene from "./Scene.jsx";

const FEATURES = [
  ["i-target", "Realistic physics", "Wind, drag and battery sag."],
  ["i-layers", "8 environments", "City, forest, site and indoor."],
  ["i-cap", "Guided training", "15 step-by-step lessons."],
  ["i-star", "Challenging missions", "10 real-world jobs."],
  ["i-drone", "3 drones", "Pluto, Pluto Guru and Racer."],
  ["i-modes", "3 flight modes", "Stabilize, Altitude Hold, Acro."],
];

/* 06 · Features */
export default function Features() {
  return (
    <section id="basics" className="has-scene">
      <Scene seed={11} sun={0.8} />
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
            <Icon id="gamepad" className="pad-img" viewBox="0 0 400 260" />
            <div><Icon id="i-pad" className="pad-ic" /><h3>Works with controller</h3><p>Gamepad or RC transmitter.</p></div>
          </a>
        </div>
      </div>
    </section>
  );
}

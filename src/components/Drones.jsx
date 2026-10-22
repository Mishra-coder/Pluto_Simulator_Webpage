import { Icon } from "./Icon.jsx";
import { DRONES } from "../data/site.js";

const Specs = ({ specs }) => (
  <dl className="spec">{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
);

/* 05 · Drones: top-view drawings of the three airframes */
export default function Drones() {
  return (
    <section id="drones">
      <div className="wrap">
        <div className="drones">
          <div className="drone-main">
            <span className="eyebrow reveal">Designed for Pluto drones</span>
            <h2 className="reveal">Fly with the<br />Pluto family.</h2>
            <p className="lede reveal">Three airframes, each with its own handling.</p>
            <Icon id="d-pluto" className="drone-art" viewBox="0 0 400 300" />
            <div className="drone-info">
              <div><h3>Pluto</h3><p>160 mm trainer. Stable and forgiving.</p></div>
              <Specs specs={[["Mass", "54 g"], ["Battery", "1S 300 mAh"], ["Max tilt", "22°"]]} />
            </div>
          </div>
          <div className="drone-side">
            {DRONES.map((d) => (
              <article key={d.id} className="dcard card reveal">
                <Icon id={d.id} className="dcard-art" viewBox="0 0 400 300" />
                <span className="tag">{d.tag}</span>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
                <Specs specs={d.specs} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

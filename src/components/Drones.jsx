import { DRONES } from "../data/site.js";

const Specs = ({ specs }) => (
  <dl className="spec">{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
);

/* 05 · Drones: the airframes side by side, each a render over a warm glow with its specs */
export default function Drones() {
  return (
    <section id="drones">
      <div className="wrap">
        <span className="eyebrow reveal">Designed for Pluto drones</span>
        <h2 className="reveal">Fly with the<br />Pluto family.</h2>
        <p className="lede reveal">Three airframes, each with its own handling.</p>
        <div className="drones">
          {DRONES.map((d) => (
            <article key={d.id} className="drone reveal">
              <div className="drone-art"><img src={d.img} alt={d.alt} width={d.size[0]} height={d.size[1]} loading="lazy" /></div>
              <div className="drone-info">
                <div>
                  <h3>{d.name}{d.tag && <span className="tag">{d.tag}</span>}</h3>
                  <p>{d.text}</p>
                </div>
                <Specs specs={d.specs} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

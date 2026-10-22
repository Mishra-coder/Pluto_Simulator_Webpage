import { Icon } from "./Icon.jsx";
import { MAPS, MISSIONS } from "../data/site.js";

const count = (key) => (key === "all" ? MISSIONS.length : MISSIONS.filter((m) => m.map === key).length);

/* 04 · Mission maps: route-map photo behind the heading (CSS background); the selected map lives in App so the hero cards can preselect it */
export default function Missions({ map, onPickMap }) {
  const shown = map === "all" ? MISSIONS : MISSIONS.filter((m) => m.map === map);
  return (
    <section id="missions" className="has-scene has-photo">
      <div className="wrap">
        <span className="eyebrow reveal">Explore diverse environments</span>
        <h2 className="reveal">Mission Maps</h2>
        <p className="lede reveal">10 missions across 4 maps.</p>
        <div className="maps">
          <div className="map-list reveal" role="tablist" aria-label="Maps">
            {MAPS.map((m) => (
              <button key={m.key} role="tab" aria-selected={map === m.key} onClick={() => onPickMap(m.key)}>
                <Icon id={m.icon} />{m.name}<span>{count(m.key)}</span>
              </button>
            ))}
          </div>
          <ul className="mgrid">
            {shown.map((m) => (
              <li key={m.n}>
                <img className={m.look} src={m.img} alt={m.alt} loading="lazy" />
                <div><b>M{m.n}</b><h3>{m.title}</h3><span>{m.where}</span></div>
                <em><Icon id="i-clock" />{m.time}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

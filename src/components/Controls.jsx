import { Icon } from "./Icon.jsx";
import Scene from "./Scene.jsx";

/* callouts on the controller drawing (viewBox 900×420; the pad is drawn at 250,80): label position, leader line, end dot */
const CALLOUTS = [
  { title: "Throttle", sub: "Left stick ↑ ↓", x: 196, y: 64, end: "end", path: "M200 70H370V146", dot: [370, 146] },
  { title: "Yaw", sub: "Left stick ← →", x: 196, y: 286, end: "end", path: "M200 292H310V175H341", dot: [341, 175] },
  { title: "Pitch", sub: "Right stick ↑ ↓", x: 708, y: 102, end: "start", path: "M700 108H500V201", dot: [500, 201] },
  { title: "Roll", sub: "Right stick ← →", x: 708, y: 324, end: "start", path: "M700 330H580V230H529", dot: [529, 230] },
];

const KEYS = [
  [["W", "S"], "Throttle"], [["A", "D"], "Yaw"], [["↑", "↓"], "Pitch"], [["←", "→"], "Roll"],
  [["Enter"], "Arm"], [["Space"], "Auto take-off"], [["C"], "Camera"], [["R"], "Reset"],
];

const SUPPORT = [
  ["i-check", "Plug and play", "Xbox, PlayStation and more."],
  ["i-drone", "RC radios too", "RadioMaster, FrSky, FlySky."],
  ["i-gear", "Adjust settings", "Deadzone, expo, sensitivity."],
  ["i-keyboard", "No pad? No problem", "Keyboard works too."],
];

/* 07 · Controls */
export default function Controls() {
  return (
    <section id="controls" className="has-scene">
      <Scene seed={23} sun={0.7} />
      <div className="wrap">
        <span className="eyebrow reveal">Practise with your setup</span>
        <h2 className="reveal">Fly with a controller</h2>
        <p className="lede reveal">Mode 2, just like a real transmitter.</p>
        <div className="ctl">
          <div className="diagram reveal">
            <svg viewBox="0 0 900 420" role="img" aria-labelledby="dgT">
              <title id="dgT">Controller layout: left stick moves throttle up and down and yaw left and right; right stick moves pitch forward and back and roll left and right.</title>
              <use href="#gamepad" x="250" y="80" width="400" height="260" />
              <g className="lines">
                {CALLOUTS.map((c) => <g key={c.title}><path d={c.path} /><circle cx={c.dot[0]} cy={c.dot[1]} r="5" /></g>)}
              </g>
              <g className="labels">
                {CALLOUTS.map((c) => (
                  <text key={c.title} x={c.x} y={c.y} textAnchor={c.end}><tspan className="t">{c.title}</tspan><tspan x={c.x} dy="26">{c.sub}</tspan></text>
                ))}
              </g>
            </svg>
            <div className="keys" aria-label="Keyboard controls">
              {KEYS.map(([keys, action]) => <span key={action}>{keys.map((k) => <b key={k} className="kbd">{k}</b>)}{action}</span>)}
            </div>
          </div>
          <div className="support card reveal">
            <div className="support-head"><Icon id="i-pad" /><div><h3>Controller support</h3><p>Gamepads and RC transmitters.</p></div></div>
            <div className="support-grid">
              {SUPPORT.map(([icon, title, text]) => <div key={title}><Icon id={icon} /><b>{title}</b><span>{text}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

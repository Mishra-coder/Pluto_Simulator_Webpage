import { Icon } from "./Icon.jsx";

/* callouts on the controller photo (viewBox 900×420 plus head/foot room; the 1405×959 photo is drawn 420 wide at 240,66):
   sticks at 346,137 (left) and 506,204 (right); face buttons Y 561,120 · X 532,148 · B 590,149 · A 561,177; LB 364,78.
   Each entry: label position, leader line, end dot. Leaders are routed so none of them cross */
const CALLOUTS = [
  { title: "Flight mode", sub: "LB · RB bumpers", x: 196, y: -14, end: "end", path: "M200 -8H364V72", dot: [364, 72] },
  { title: "Throttle", sub: "Left stick ↑ ↓", x: 196, y: 64, end: "end", path: "M200 70H346V116", dot: [346, 116] },
  { title: "Yaw", sub: "Left stick ← →", x: 196, y: 286, end: "end", path: "M200 292H296V137H325", dot: [325, 137] },
  { title: "Pitch", sub: "Right stick ↑ ↓", x: 708, y: 0, end: "start", path: "M700 6H506V183", dot: [506, 183] },
  { title: "Auto take off", sub: "Y button", x: 708, y: 114, end: "start", path: "M700 120H574", dot: [574, 120] },
  { title: "Reset", sub: "B button", x: 708, y: 196, end: "start", path: "M700 202H630V149H603", dot: [603, 149] },
  { title: "Arm / Disarm", sub: "A button", x: 708, y: 286, end: "start", path: "M700 292H610V177H574", dot: [574, 177] },
  { title: "Camera view", sub: "X button", x: 708, y: 376, end: "start", path: "M700 382H532V161", dot: [532, 161] },
  { title: "Roll", sub: "Right stick ← →", x: 708, y: 466, end: "start", path: "M700 472H506V226", dot: [506, 226] },
];

const KEYS = [
  [["W", "S"], "Throttle"], [["A", "D"], "Yaw"], [["↑", "↓"], "Pitch"], [["←", "→"], "Roll"],
  [["Enter"], "Arm"], [["Space"], "Auto take off"], [["C"], "Camera"], [["R"], "Reset"],
];

const SUPPORT = [
  ["i-check", "Plug and play", "Xbox PlayStation and more"],
  ["i-drone", "RC radios too", "RadioMaster FrSky FlySky"],
  ["i-gear", "Adjust settings", "Deadzone expo sensitivity"],
  ["i-keyboard", "No pad? No problem", "Keyboard works too"],
];

/* 07 · Controls: sim desk photo behind the heading (CSS background), controller diagram and support card */
export default function Controls() {
  return (
    <section id="controls" className="has-scene has-photo">
      <div className="wrap">
        <span className="eyebrow reveal">Practise with your setup</span>
        <h2 className="reveal">Fly with a controller</h2>
        <p className="lede reveal">Mode 2 just like a real transmitter</p>
        <div className="ctl">
          <div className="diagram reveal">
            <svg viewBox="0 -40 900 545" role="img" aria-labelledby="dgT">
              <title id="dgT">Controller layout: left stick moves throttle up and down and yaw left and right; right stick moves pitch forward and back and roll left and right The bumpers change flight mode A arms and disarms Y takes off automatically X changes the camera view and B resets</title>
              <image className="pad" href="/assets/images/controls/gamepad.webp" x="240" y="66" width="420" height="287" />
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
            <div className="support-head"><Icon id="i-pad" /><div><h3>Controller support</h3><p>Gamepads and RC transmitters</p></div></div>
            <div className="support-grid">
              {SUPPORT.map(([icon, title, text]) => <div key={title}><Icon id={icon} /><b>{title}</b><span>{text}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

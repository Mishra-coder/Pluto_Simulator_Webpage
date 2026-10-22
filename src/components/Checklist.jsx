import { useEffect, useState } from "react";
import { CHECKLIST } from "../data/site.js";

/* Pre-flight checklist with readiness gauge, remembered in this browser when storage is available */
const STORAGE_KEY = "plutosim-checklist";
const GAUGE_CIRCUMFERENCE = 326.7; /* 2πr for r=52 */

function loadChecks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return CHECKLIST.map((_, i) => !!saved[i]);
  } catch {
    return CHECKLIST.map(() => false);
  }
}

export default function Checklist() {
  const [checks, setChecks] = useState(loadChecks);
  const done = checks.filter(Boolean).length, ready = done === checks.length;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checks)); } catch {}
  }, [checks]);

  const toggle = (i) => setChecks((c) => c.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="checklist">
      <div className="wrap check-wrap">
        <div>
          <span className="eyebrow reveal">Before your first real flight</span>
          <h2 className="reveal">The pre-flight checklist.</h2>
          <p className="lede reveal">Tick every item before a real flight.</p>
          <div className={`gauge reveal${ready ? " ready" : ""}`}>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle className="trk" cx="60" cy="60" r="52" fill="none" strokeWidth="8" />
              <circle className="val" cx="60" cy="60" r="52" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray={GAUGE_CIRCUMFERENCE} strokeDashoffset={GAUGE_CIRCUMFERENCE - (GAUGE_CIRCUMFERENCE * done) / checks.length} />
            </svg>
            <div><b>{done} of {checks.length}</b><span>{ready ? "Ready for take-off" : "Not ready for take-off"}</span></div>
          </div>
          <p className="small reveal">In India, check DGCA Digital Sky and the Drone Rules first.</p>
        </div>
        <div className="checklist card reveal">
          {CHECKLIST.map(([title, text], i) => (
            <label key={title} className="ck">
              <input type="checkbox" checked={checks[i]} onChange={() => toggle(i)} />
              <div><b>{title}</b><span>{text}</span></div>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

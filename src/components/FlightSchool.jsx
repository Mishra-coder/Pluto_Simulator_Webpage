import { useState } from "react";
import { Icon } from "./Icon.jsx";
import { LESSON_BLOCKS, LESSONS } from "../data/site.js";

/* 03 · Flight School: training-field photo behind the heading (CSS background); pick a block, see its lessons */
export default function FlightSchool() {
  const [block, setBlock] = useState(LESSON_BLOCKS[0].key);
  return (
    <section id="school" className="has-scene has-photo">
      <div className="wrap">
        <span className="eyebrow reveal">Step by step challenges</span>
        <h2 className="reveal">Flight School</h2>
        <p className="sub reveal">15 lessons One skill at a time</p>
        <div className="seg reveal" role="tablist" aria-label="Lesson blocks">
          {LESSON_BLOCKS.map((b) => (
            <button key={b.key} role="tab" aria-selected={block === b.key} onClick={() => setBlock(b.key)}>
              <Icon id={b.icon} />{b.name}<small>{b.range}</small>
            </button>
          ))}
        </div>
        <ol className="lessons">
          {LESSONS.filter((l) => l.block === block).map((l) => (
            <li key={l.n}><span className="n">L{l.n}</span><h3>{l.title}</h3><p>{l.goal}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

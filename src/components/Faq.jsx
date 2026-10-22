import { FAQ } from "../data/site.js";

/* Frequently asked questions */
export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="faq">
          <h3 className="faq-title reveal">Frequently asked questions</h3>
          {FAQ.map(([q, a]) => <details key={q} className="reveal"><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

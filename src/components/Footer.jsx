import { Icon } from "./Icon.jsx";

const COLUMNS = [
  ["Product", [["#why", "Why PlutoSim"], ["#basics", "Basics"], ["#school", "Flight School"], ["#missions", "Missions"], ["#drones", "Drones"], ["#gallery", "Gallery"]]],
  ["Support", [["#controls", "Controller setup"], ["#checklist", "Pre-flight checklist"], ["#faq", "FAQ"]]],
];

/* 10 · Footer: brand, link columns, copyright. Spacing separates the parts, no rules */
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <a className="brand" href="#top"><img src="/assets/brand/logo.svg" alt="" />PlutoSim</a>
            <p>Learn to fly before you fly.<br />A drone simulator by Drona Aviation.</p>
            <a className="btn btn-ghost btn-sm" href="https://www.dronaaviation.com/" target="_blank" rel="noopener">dronaaviation.com<Icon id="i-arrow" /></a>
          </div>
          {COLUMNS.map(([title, links]) => (
            <nav key={title} className="foot-col" aria-label={title}>
              <h4>{title}</h4>
              {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          ))}
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Drona Aviation. All rights reserved.</span>
          <a href="#top" className="to-top">Back to top<Icon id="i-arrow" /></a>
        </div>
      </div>
    </footer>
  );
}

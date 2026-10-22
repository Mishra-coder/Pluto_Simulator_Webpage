import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon.jsx";
import { DOWNLOADS, NAV_LINKS } from "../data/site.js";

/* Floating nav: solid on scroll, underline for the section in view, mobile menu, download dropdown */
export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    const sections = NAV_LINKS.map(([id]) => document.getElementById(id));
    function onScroll() {
      setSolid(scrollY > 20);
      const line = innerHeight * 0.35;
      let current = null;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= line) current = NAV_LINKS[i][0]; });
      setActive(current);
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const close = (e) => { if (dropdown.current && !dropdown.current.contains(e.target)) dropdown.current.open = false; };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (dropdown.current) dropdown.current.open = false;
      setMenuOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <nav className={`nav${solid ? " solid" : ""}${menuOpen ? " open" : ""}`}>
      <a className="brand" href="#top"><img src="/assets/brand/logo.svg" alt="" />PlutoSim</a>
      <ul id="navLinks">
        {NAV_LINKS.map(([id, label]) => (
          <li key={id}><a href={`#${id}`} className={active === id ? "on" : undefined} onClick={() => setMenuOpen(false)}>{label}</a></li>
        ))}
      </ul>
      <details className="dd" ref={dropdown}>
        <summary className="btn btn-signal btn-sm"><Icon id="i-dl" />Download<Icon id="i-chev" className="chev" /></summary>
        <div className="dd-menu">
          {Object.values(DOWNLOADS).map((d) => (
            <a key={d.os} href={d.href} download><Icon id={d.icon} /><span>{d.os}<small>{d.detail} · {d.size}</small></span></a>
          ))}
        </div>
      </details>
      <button className="menu-btn" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="navLinks" onClick={() => setMenuOpen((o) => !o)}>
        <Icon id={menuOpen ? "i-close" : "i-menu"} />
      </button>
    </nav>
  );
}

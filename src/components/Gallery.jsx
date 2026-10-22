import { useRef, useState } from "react";
import { Icon } from "./Icon.jsx";
import Scene from "./Scene.jsx";
import { GALLERY } from "../data/site.js";

/* 08 · Gallery with a <dialog> lightbox; click the backdrop or press Esc to close */
export default function Gallery() {
  const box = useRef(null);
  const [current, setCurrent] = useState(null);

  const open = (shot) => { setCurrent(shot); box.current.showModal?.(); };

  return (
    <section id="gallery" className="has-scene">
      <Scene seed={42} sun={0.78} />
      <div className="wrap">
        <span className="eyebrow reveal">Beautiful environments</span>
        <h2 className="reveal">Gallery</h2>
        <p className="lede reveal">Real in-game scenes.</p>
        <div className="gal">
          {GALLERY.map((g) => (
            <button key={g.src + g.alt} className="reveal" aria-label={`View larger: ${g.alt}`} onClick={() => open(g)}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <dialog className="lightbox" ref={box} onClick={(e) => { if (e.target === box.current) box.current.close(); }}>
        <form method="dialog"><button className="lb-close" aria-label="Close"><Icon id="i-close" /></button></form>
        {current && <><img src={current.src} alt={current.alt} /><p>{current.alt}</p></>}
      </dialog>
    </section>
  );
}

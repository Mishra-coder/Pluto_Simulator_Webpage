import { useEffect, useRef } from "react";
import { paintSkyline } from "../lib/skyline.js";

/* Decorative sunset city behind a section header; redrawn when the width changes */
export default function Scene({ seed, sun, horizon, className = "" }) {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    let lastW = 0, frame = 0;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === lastW) return; /* ignore height-only changes such as the mobile URL bar */
      lastW = el.clientWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => paintSkyline(el, { seed, sun, horizon }));
    });
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(frame); };
  }, [seed, sun, horizon]);

  return <div className={`scene ${className}`} aria-hidden="true"><canvas ref={canvas} /></div>;
}

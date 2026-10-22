import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* "mac" | "win" | null, from the visitor's OS */
export function usePlatform() {
  const [platform, setPlatform] = useState(null);
  useEffect(() => {
    const p = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
    setPlatform(/win/i.test(p) ? "win" : /mac/i.test(p) ? "mac" : null);
  }, []);
  return platform;
}

/* Fade .reveal elements in the first time they enter the viewport */
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(".reveal")];
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

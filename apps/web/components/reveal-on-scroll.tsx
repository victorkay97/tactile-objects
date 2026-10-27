"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement: content is visible by default.
 * Only offscreen sections are primed for a one-time, gentle entrance.
 * Reduced-motion and browsers without IntersectionObserver stay static.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const elements = [...document.querySelectorAll<HTMLElement>(".landing [data-motion-reveal]")];
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.motionReveal = "visible";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      if (bounds.top <= window.innerHeight * 0.94) continue;
      element.dataset.motionReveal = "pending";
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}

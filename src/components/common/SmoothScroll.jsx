import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Senior Developer Grade Lenis Smooth Scrolling Engine
 * - Buttery smooth 60fps/120fps physics
 * - Integrated with GSAP ScrollTrigger ticker for zero scroll-lag & zero desync
 * - Supports nested [data-lenis-prevent] scroll containers (e.g. product catalog cards)
 * - Exposes window.__lenis and resetLenisScroll for instantaneous clean route transitions
 */
export function resetLenisScroll() {
  if (typeof window !== "undefined") {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Allow new page DOM to measure and inform Lenis + GSAP ScrollTrigger
    setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.resize();
      }
      try {
        ScrollTrigger.refresh();
      } catch {
        // no-op
      }
    }, 100);
  }
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with optimized physics parameters
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Drive Lenis RAF loop via GSAP ticker for frame-perfect sync with zero jitter
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, []);

  return children;
}

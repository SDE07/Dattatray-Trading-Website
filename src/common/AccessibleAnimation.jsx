import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

/**
 * Accessible Fade & Slide Reveal Wrapper using GSAP & useGSAP
 * Automatically respects user's motion preferences (prefers-reduced-motion)
 */
export function GSAPReveal({
  children,
  direction = "up", // "up" | "down" | "left" | "right" | "zoom"
  delay = 0,
  duration = 0.8,
  stagger = 0,
  distance = 40,
  className = "",
  threshold = "top 85%",
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      let fromVars = {
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: threshold,
          toggleActions: "play none none none",
          once: true,
        },
      };

      if (direction === "up") fromVars.y = distance;
      else if (direction === "down") fromVars.y = -distance;
      else if (direction === "left") fromVars.x = distance;
      else if (direction === "right") fromVars.x = -distance;
      else if (direction === "zoom") fromVars.scale = 0.92;

      if (stagger > 0) {
        fromVars.stagger = stagger;
        gsap.from(containerRef.current.children, fromVars);
      } else {
        gsap.from(containerRef.current, fromVars);
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export { gsap, useGSAP, ScrollTrigger };
export default GSAPReveal;

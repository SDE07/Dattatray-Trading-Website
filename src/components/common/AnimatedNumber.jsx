import React, { useState, useEffect, useRef } from "react";

/**
 * AnimatedNumber — Phase 3 upgrade.
 * Golden count-up with ease-out cubic deceleration, shimmer sweep on completion,
 * and a scale-pulse when the number finishes counting.
 * Uses DM Sans (font-counter) for premium tabular numerals.
 */
export default function AnimatedNumber({
  target,
  value,
  suffix = "",
  duration = 2000,
  className = "",
}) {
  const actualTarget = target ?? value ?? 0;
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animFrameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDone(false);
          setShimmer(false);
          const num = parseInt((actualTarget || 0).toString().replace(/\D/g, ""), 10) || 0;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Emil Kowalski spring-out easing: cubic-bezier(0.16, 1, 0.3, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * num));

            if (progress < 1) {
              animFrameId = requestAnimationFrame(animate);
            } else {
              setCount(num);
              setDone(true);
              // Trigger shimmer sweep 60ms after count finishes
              setTimeout(() => setShimmer(true), 60);
            }
          };

          animFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [actualTarget, duration]);

  // Extract non-digit suffix (e.g., "+ MT", "+", "%")
  const displaySuffix = (actualTarget || "").toString().replace(/\d/g, "").trim() || suffix;

  return (
    <span
      ref={ref}
      className={`
        tabular-nums font-counter inline-block
        transition-transform duration-300
        ${done ? "animate-[stat-pulse_0.4s_cubic-bezier(0.16,1,0.3,1)]" : ""}
        ${shimmer ? "animate-golden-shimmer" : ""}
        ${className}
      `}
    >
      {count > 999 ? count.toLocaleString() : count}
      {displaySuffix ? `${displaySuffix}`.replace(/ \+/, "+") : ""}
    </span>
  );
}

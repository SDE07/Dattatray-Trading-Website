import React, { useState, useEffect, useRef } from "react";

/**
 * AnimatedNumber Component
 * Automatically counts up numbers on scroll into viewport using IntersectionObserver
 * and cubic ease-out deceleration curve.
 */
export default function AnimatedNumber({
  target,
  value,
  suffix = "",
  duration = 1800,
  className = "",
}) {
  const actualTarget = target ?? value ?? 0;
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animFrameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const num = parseInt((actualTarget || 0).toString().replace(/\D/g, ""), 10) || 0;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * num));

            if (progress < 1) {
              animFrameId = requestAnimationFrame(animate);
            } else {
              setCount(num);
            }
          };

          animFrameId = requestAnimationFrame(animate);
        } else {
          setCount(0);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
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
    <span ref={ref} className={`tabular-nums ${className}`}>
      {count > 999 ? count.toLocaleString() : count}
      {displaySuffix ? ` ${displaySuffix}`.replace(/ \+/, "+") : ""}
    </span>
  );
}

import React, { useState, useEffect, useRef } from "react";

// ─── Senior UI Developer Animated Number Counter ──────────────────────────
function AnimatedNumber({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animFrameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const num = parseInt(target.toString().replace(/\D/g, ""), 10) || 0;
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [target, duration]);

  const displaySuffix = target.toString().replace(/\d/g, "").trim() || suffix;

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {displaySuffix}
    </span>
  );
}

const statsData = [
  { value: "12+", label: "Countries We Serve" },
  { value: "5000+ MT", label: "Annual Processing Capacity" },
  { value: "100%", label: "Maintained -18°C Cold Chain" },
  { value: "30+", label: "Years Agricultural Leadership" },
];

/**
 * StatsSection: Animated stats counter bar with on-scroll count-up animation.
 */
export default function StatsSection() {
  return (
    <section className="bg-white dark:bg-[#0B1B2F] border-y border-[#E8EEF0] dark:border-white/10 py-6 sm:py-8 lg:py-9 shadow-xs transition-colors duration-300">
      <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 text-center">
        {statsData.map((s, idx) => (
          <div
            key={s.label}
            className={`p-3 sm:p-4 flex flex-col items-center justify-center ${
              idx !== statsData.length - 1 ? "lg:border-r lg:border-[#E8EEF0] dark:lg:border-white/10" : ""
            }`}
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2546] dark:text-white mb-2 tracking-tight leading-none">
              <AnimatedNumber target={s.value} />
            </div>
            <div className="text-[11px] sm:text-xs lg:text-[12.5px] font-bold tracking-[0.14em] uppercase text-[#5D6B7E] dark:text-slate-300 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

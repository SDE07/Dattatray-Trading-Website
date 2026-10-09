import React, { useRef, useState, useEffect } from "react";
import { AnimatedNumber } from "../common";

const statsData = [
  {
    value: "12+",
    label: "Countries We Serve",
   
  },
  {
    value: "5000+ MT",
    label: "Annual Processing Capacity",
   
  },
  {
    value: "100%",
    label: "Maintained -18°C Cold Chain",
    
  },
  {
    value: "30+",
    label: "Years Agricultural Leadership",
    
  },
];

/**
 * StatsSection — Phase 3 redesign.
 * Golden counter numbers (DM Sans font-counter), emerald green labels,
 * faint golden-blush background, warm golden dividers, staggered entrance,
 * shimmer + scale-pulse on count-up completion.
 */
export default function StatsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-[#06100B] py-8 sm:py-10 lg:py-12 overflow-hidden transition-colors duration-300"
    >
      <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((s, idx) => (
            <div
              key={s.label}
              className={`
                relative flex flex-col items-center justify-center
                px-4 py-5 sm:py-6 lg:py-7 text-center
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: isVisible ? `${idx * 90}ms` : "0ms" }}
            >
              {/* Optional icon if present */}
              {s.icon && (
                <div
                  className={`
                    text-xl sm:text-2xl mb-2 leading-none select-none
                    transition-all duration-500
                    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                  `}
                  style={{ transitionDelay: isVisible ? `${idx * 90 + 120}ms` : "0ms" }}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
              )}

              {/* Golden counter number */}
              <div className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-none tracking-tight mb-2 text-[#C8A950] dark:text-[#D4AF37] select-none">
                <AnimatedNumber
                  target={s.value}
                  duration={1800}
                />
              </div>

              {/* Emerald green label */}
              <div className="text-[11px] sm:text-xs lg:text-[12.5px] font-extrabold tracking-[0.14em] uppercase text-[#15803D] dark:text-[#4ADE80] leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

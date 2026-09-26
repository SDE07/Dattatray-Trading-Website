import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ThermometerSnowflake, ShieldCheck, Building2, Truck } from "lucide-react";
import coldChainEcosystemMap from "../../assets/coldchain_ecosystem_map.jpg";
import facilityImg from "../../assets/dattatray_facility.jpg";

/**
 * ColdChainInteractiveMap
 * Interactive Real-Life Facility vs Illustrated Ecosystem Split Reveal
 * using user-specified GSAP clipPath physics:
 * container.addEventListener("mousemove", (e) => {
 *   const x = e.offsetX / container.offsetWidth;
 *   gsap.to(handle, { left: x * 100 + "%", duration: 0.1 });
 *   gsap.to(before, { clipPath: `inset(0 ${(1-x)*100}% 0 0)`, duration: 0.1 });
 * });
 */
export default function ColdChainInteractiveMap() {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const beforeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;
    const before = beforeRef.current;
    if (!container || !handle || !before) return;

    // Initialize at 50%
    gsap.set(handle, { left: "50%" });
    gsap.set(before, { clipPath: "inset(0 50% 0 0)" });

    const updateSlider = (clientX) => {
      const rect = container.getBoundingClientRect();
      const rawX = (clientX - rect.left) / rect.width;
      const x = Math.max(0.02, Math.min(0.98, rawX));

      gsap.to(handle, { left: `${x * 100}%`, duration: 0.1, ease: "power1.out", overwrite: "auto" });
      gsap.to(before, {
        clipPath: `inset(0 ${(1 - x) * 100}% 0 0)`,
        duration: 0.1,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    const handleMouseMove = (e) => {
      updateSlider(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateSlider(e.touches[0].clientX);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(handle, { left: "50%", duration: 0.7, ease: "power2.out" });
      gsap.to(before, { clipPath: "inset(0 50% 0 0)", duration: 0.7, ease: "power2.out" });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/20 shadow-2xl bg-slate-950 select-none cursor-ew-resize group"
      style={{ touchAction: "none" }}
    >
      {/* ── Layer 1 (Right Side / Underneath): Illustrated Schematic Ecosystem Map ── */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={coldChainEcosystemMap}
          alt="Dattatray Traders - Illustrated Cold Chain Ecosystem Diagram"
          className="w-full h-full object-cover block select-none pointer-events-none"
          loading="lazy"
          draggable="false"
        />

        {/* Right Label Pill (Schematic Mode) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg pointer-events-none z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Ecosystem Diagram</span>
        </div>
      </div>

      {/* ── Layer 2 (Left Side / Overlay "Before" Layer): Real-Life Facility & Reefer Fleet ── */}
      <div
        ref={beforeRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <div className="relative w-full h-full">
          {/* Real-Life Facility Photograph */}
          <img
            src={facilityImg}
            alt="Dattatray Traders - Real Life Cold Storage & Food Processing Complex"
            className="w-full h-full object-cover block select-none"
            draggable="false"
          />

          {/* Subtle Contrast & Lighting Grade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Live Facility Badges */}
          <div className="absolute top-[20%] left-[8%] hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-emerald-400/80 text-emerald-300 text-[11px] font-black tracking-wide shadow-xl">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>5,000+ MT PROCESSING PLANT</span>
          </div>

          <div className="absolute bottom-[20%] left-[10%] hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-sky-400/80 text-sky-300 text-[11px] font-black tracking-wide shadow-xl">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            <span>-18°C REEFER DOCKING BAY</span>
          </div>

          {/* Left Label Pill (Real Life View) */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-400 text-emerald-300 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-Life Facility &amp; Fleet</span>
          </div>
        </div>
      </div>

      {/* ── Interactive Draggable Vertical Split Handle ── */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#38BDF8] via-white to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.9)] pointer-events-none -translate-x-1/2 z-30"
        style={{ left: "50%" }}
      >
        {/* Center Circular Grip Knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border-2 border-white shadow-[0_0_24px_rgba(56,189,248,0.9)] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <div className="flex items-center gap-0.5 text-xs font-black text-white">
            <span className="text-emerald-400 text-sm">◀</span>
            <span className="text-[#38BDF8] text-sm">▶</span>
          </div>
        </div>

        {/* Floating Top Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-white/40 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap shadow-md">
          SLIDE
        </div>
      </div>

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg z-20 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Real Facility vs Ecosystem Schematic</span>
      </div>
    </div>
  );
}

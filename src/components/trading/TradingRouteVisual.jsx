import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";
import truckImg from "../../assets/truck.png";

/**
 * TradingRouteVisual Component
 * - Substantially increased, prominent Reefer Truck scale
 * - Pure horizontal, GPU-accelerated cruising motion (zero vertical jump / jitter)
 * - Seamless departure fade-in at India (APMC) and arrival fade-out at Global Ports
 */
export default function TradingRouteVisual() {
  const trackRef = useRef(null);
  const truckRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const truck = truckRef.current;
    if (!track || !truck) return;

    let tl;

    const initAnimation = () => {
      if (tl) tl.kill();

      const trackWidth = track.clientWidth;
      const truckWidth = truck.clientWidth || 220;
      const startX = 0;
      // Position front of truck close to end pin before fade-out
      const endX = Math.max(30, trackWidth - truckWidth + 10);
      const totalDistance = endX - startX;

      // Smooth highway cruising pace (~100px per second)
      const duration = Math.max(8, Math.min(16, totalDistance / 100));

      gsap.set(truck, { x: startX, opacity: 0 });

      tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4, // Natural pause at destination before starting next route
      });

      // 1. Pure linear horizontal cruising across the highway (100% smooth, NO vertical jumping)
      tl.fromTo(
        truck,
        { x: startX },
        {
          x: endX,
          duration: duration,
          ease: "none", // Truly uniform constant velocity
          force3D: true, // Hardware GPU acceleration prevents subpixel rounding jump
        },
        0
      );

      // 2. Smooth departure fade-in at Start Pin (0 to 0.6s)
      tl.fromTo(
        truck,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        0
      );

      // 3. Smooth arrival fade-out at End Pin (final 0.6s)
      tl.to(
        truck,
        { opacity: 0, duration: 0.6, ease: "power1.in" },
        Math.max(0.7, duration - 0.6)
      );
    };

    initAnimation();

    const resizeObserver = new ResizeObserver(() => {
      initAnimation();
    });
    resizeObserver.observe(track);

    return () => {
      if (tl) tl.kill();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full mx-auto py-1 px-1 sm:px-2 select-none relative">
      
      {/* ── TOP ROW: Integrated Road Corridor with Start Pin (Left), Line, Moving Truck & End Pin (Right) ── */}
      <div className="relative w-full h-20 sm:h-22 md:h-24 lg:h-26 flex items-end">
        
        {/* Continuous Highway Road Line (Directly connecting Start to End) */}
        <div className="absolute left-8 right-8 sm:left-12 sm:right-12 bottom-2 h-[2.5px] bg-gradient-to-r from-sky-400 via-[#8CC9D9] via-emerald-400/80 to-rose-500 shadow-[0_0_14px_rgba(140,201,217,0.9)] rounded-full">
          {/* Animated Dashed Stripe */}
          <div className="absolute inset-0 border-t-[2px] border-dashed border-white/80 opacity-70 animate-pulse pointer-events-none" />

          {/* Intermediate Route Waypoints */}
          <div className="absolute -top-1.5 left-0 right-0 flex justify-between px-8 sm:px-16 pointer-events-none opacity-80">
            <div className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_#38bdf8]" />
              <span className="hidden md:inline-block text-[8px] font-bold text-sky-200/80 tracking-widest uppercase mt-0.5">APMC Harvest</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="hidden md:inline-block text-[8px] font-bold text-emerald-200/80 tracking-widest uppercase mt-0.5">-18°C Reefer Fleet</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CC9D9] shadow-[0_0_6px_#8cc9d9]" />
              <span className="hidden md:inline-block text-[8px] font-bold text-[#8CC9D9]/80 tracking-widest uppercase mt-0.5">JNPT Berths</span>
            </div>
          </div>
        </div>

        {/* 1. STARTING PIN (Anchored on the Left end of the road) */}
        <div className="absolute left-0 bottom-0 z-20 flex flex-col items-center">
          <div className="relative flex items-center justify-center group cursor-default">
            {/* Soft blue halo glow */}
            <div className="absolute inset-0 bg-sky-400/30 rounded-full blur-lg pointer-events-none animate-pulse" />
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.95)] transition-transform duration-300 group-hover:scale-110" />
            {/* Pulsing beacon */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
            </span>
          </div>
        </div>

        {/* 2. CONTINUOUS MOVING REEFER TRUCK (Glides smoothly from Start Pin on Left to End Pin on Right) */}
        <div ref={trackRef} className="absolute left-8 right-8 sm:left-12 sm:right-12 bottom-2 h-0 pointer-events-none z-10">
          <div
            ref={truckRef}
            className="absolute will-change-transform"
            style={{
              bottom: "1px",
              left: 0,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Headlight Forward Glow Beam */}
              <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-26 h-7 sm:h-8 md:h-9 bg-gradient-to-r from-[#8CC9D9]/60 via-[#8CC9D9]/20 to-transparent blur-[2.5px] pointer-events-none rounded-r-full" />
              {/* Under-truck Road Glow Aura */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-36 sm:w-46 md:w-58 h-2.5 bg-[#8CC9D9]/45 rounded-full blur-md" />
              {/* Frost vapor trail */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-3.5 bg-gradient-to-l from-[#8CC9D9]/35 to-transparent blur-sm" />
              
              {/* Perfectly Proportioned Reefer Truck (Slightly Decreased for Balanced Scale) */}
              <div className="w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px]">
                <img
                  src={truckImg}
                  alt="Dattatray Continuous Reefer Truck"
                  className="w-full h-auto object-contain filter drop-shadow-[0_5px_14px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. ENDING PIN (Anchored on the Right end of the road) */}
        <div className="absolute right-0 bottom-0 z-20 flex flex-col items-center">
          <div className="relative flex items-center justify-center group cursor-default">
            {/* Vibrant red halo glow */}
            <div className="absolute inset-0 bg-rose-500/35 rounded-full blur-lg pointer-events-none animate-pulse" />
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-rose-500 drop-shadow-[0_0_16px_rgba(244,63,94,0.95)] transition-transform duration-300 group-hover:scale-110" />
            {/* Pulsing beacon */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
            </span>
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW: Streamlined Labels Directly Below Road Baseline ── */}
      <div className="flex items-start justify-between mt-1 px-1">
        {/* Start Label (India - Left Side) */}
        <div className="flex flex-col items-start text-left min-w-[90px] sm:min-w-[120px]">
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            India (IND)
          </h4>
          <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
            Nashik &amp; Mumbai Hub
          </p>
        </div>

        {/* End Label (Global Ports - Right Side) */}
        <div className="flex flex-col items-end text-right min-w-[90px] sm:min-w-[120px]">
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            Global Ports
          </h4>
          <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
            UAE, Saudi, UK, USA
          </p>
        </div>
      </div>

    </div>
  );
}

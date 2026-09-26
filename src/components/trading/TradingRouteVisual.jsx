import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import truckImg from "../../assets/truck.png";

/**
 * TradingRouteVisual Component
 * - Faint blue Starting Point (India) & Red Ending Point (Global Ports)
 * - Compact height, perfectly aligned highway track
 * - Continuous left-to-right Reefer Truck motion with exact wheel-on-road alignment
 */
export default function TradingRouteVisual() {
  return (
    <div className="w-full max-w-2xl lg:max-w-3xl mx-auto py-1 px-2 select-none relative">
      
      {/* ── TOP ROW: Start Pin (Faint Blue) ── Road Line & Moving Truck ── End Pin (Red) ── */}
      <div className="relative flex items-center justify-between">
        
        {/* 1. STARTING PIN (FAINT BLUE) */}
        <div className="flex flex-col items-center justify-center min-w-[90px] sm:min-w-[110px] z-10">
          <div className="relative flex items-center justify-center group cursor-default">
            {/* Ambient soft blue halo glow */}
            <div className="absolute inset-0 bg-sky-400/25 rounded-full blur-lg pointer-events-none animate-pulse" />
            
            {/* Faint Blue MapPin Icon */}
            <MapPin className="w-8 h-8 sm:w-9 sm:h-9 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Pulsing faint blue radar beacon */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
            </span>
          </div>
        </div>

        {/* 2. HIGHWAY ROAD TRACK WITH CONTINUOUS MOVING TRUCK (SITTING ON TOP OF LINE) */}
        <div className="relative flex-1 mx-2 sm:mx-3 h-14 sm:h-16 flex items-end">
          
          {/* Luminous Road Line (Faint Blue to Red Gradient) */}
          <div className="w-full h-[2.5px] bg-gradient-to-r from-sky-300 via-[#8CC9D9] to-rose-500 shadow-[0_0_12px_rgba(140,201,217,0.85)] rounded-full mb-0.5" />
          
          {/* Animated Dashed Pulse Stripe */}
          <div className="absolute bottom-0.5 left-2 right-2 h-[2.5px] border-t-2 border-dashed border-white/75 opacity-70 animate-pulse pointer-events-none" />

          {/* Continuous Moving Reefer Truck (100% visible from Start to End, only fades at destination) */}
          <div className="absolute bottom-0.5 left-0 right-0 h-0 pointer-events-none z-20">
            <motion.div
              className="absolute"
              style={{
                bottom: "1px", // wheels rest precisely on top of the road line
              }}
              animate={{
                left: ["0%", "82%", "85%"],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.92, 1],
              }}
            >
              {/* Rock-solid, smooth gliding truck container */}
              <div className="relative flex flex-col items-center">
                {/* Headlight Forward Glow Beam */}
                <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-14 h-7 bg-gradient-to-r from-[#8CC9D9]/40 to-transparent blur-[2px] pointer-events-none rounded-r-full" />

                {/* Under-truck Cyan Road Aura */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-22 sm:w-28 h-2 bg-[#8CC9D9]/35 rounded-full blur-md" />

                {/* Frost / Speed trail behind truck */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-8 h-2.5 bg-gradient-to-l from-[#8CC9D9]/30 to-transparent blur-sm" />

                {/* Reefer Truck Image */}
                <div className="w-22 sm:w-28 md:w-32">
                  <img
                    src={truckImg}
                    alt="Dattatray Continuous Reefer Truck"
                    className="w-full h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* 3. ENDING PIN (RED ICON) */}
        <div className="flex flex-col items-center justify-center min-w-[90px] sm:min-w-[110px] z-10">
          <div className="relative flex items-center justify-center group cursor-default">
            {/* Ambient vibrant red halo glow */}
            <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-lg pointer-events-none animate-pulse" />
            
            {/* Red MapPin Icon */}
            <MapPin className="w-8 h-8 sm:w-9 sm:h-9 text-rose-500 drop-shadow-[0_0_14px_rgba(244,63,94,0.95)] z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Pulsing red radar beacon */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
            </span>
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW: Clean Labels Aligned Directly Below Location Pins ── */}
      <div className="flex items-start justify-between mt-1">
        
        {/* Start Label (India) */}
        <div className="flex flex-col items-center text-center min-w-[90px] sm:min-w-[110px]">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-950/50 border border-sky-400/25 px-2 py-0.5 rounded-full mb-0.5">
            Starting Point
          </span>
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            India (IND)
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
            Nashik &amp; Mumbai Hub
          </p>
        </div>

        {/* Center Spacer */}
        <div className="flex-1" />

        {/* End Label (Global Ports) */}
        <div className="flex flex-col items-center text-center min-w-[90px] sm:min-w-[110px]">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/50 border border-rose-500/25 px-2 py-0.5 rounded-full mb-0.5">
            Ending Point
          </span>
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            Global Ports
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
            UAE, Saudi, UK, USA
          </p>
        </div>

      </div>

    </div>
  );
}

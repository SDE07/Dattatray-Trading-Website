import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";

// Monthly Batch Testing & Cryo Telemetry Data
const qualityMonthlyData = [
  { month: "Jan", purity: "99.4%", temp: "-18.5°C", compliance: "100%", batches: 142 },
  { month: "Feb", purity: "99.5%", temp: "-18.3°C", compliance: "100%", batches: 156 },
  { month: "Mar", purity: "99.7%", temp: "-18.6°C", compliance: "100%", batches: 178 },
  { month: "Apr", purity: "99.6%", temp: "-18.4°C", compliance: "100%", batches: 164 },
  { month: "May", purity: "99.8%", temp: "-18.7°C", compliance: "100%", batches: 195 },
  { month: "Jun", purity: "99.9%", temp: "-18.8°C", compliance: "100%", batches: 220 },
  { month: "Jul", purity: "99.8%", temp: "-18.5°C", compliance: "100%", batches: 210 },
  { month: "Aug", purity: "99.7%", temp: "-18.4°C", compliance: "100%", batches: 188 },
  { month: "Sep", purity: "99.9%", temp: "-18.7°C", compliance: "100%", batches: 235 },
  { month: "Oct", purity: "99.8%", temp: "-18.6°C", compliance: "100%", batches: 215 },
  { month: "Nov", purity: "99.9%", temp: "-18.9°C", compliance: "100%", batches: 248 },
  { month: "Dec", purity: "100%", temp: "-19.0°C", compliance: "100%", batches: 260 },
];

const yValues = [115, 100, 75, 90, 65, 30, 55, 70, 45, 60, 35, 20];

export default function QualityTelemetryGraph() {
  const [activeBar, setActiveBar] = useState(5); // Default June active
  const activeData = qualityMonthlyData[activeBar !== null ? activeBar : 5];

  return (
    <div className="relative w-full p-2 sm:p-4 text-white overflow-hidden transition-all duration-300">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Graph Header with Live Growth Metric Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#8CC9D9]/20 border border-[#8CC9D9]/40 flex items-center justify-center text-[#8CC9D9]">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-white block leading-none">
              Quality &amp; Cold-Chain Telemetry
            </span>
            <span className="text-[10.5px] text-slate-300">Continuous -18°C Cryo Sensor Logs</span>
          </div>
        </div>

        {/* Live Status Pill with Faint Blue Trade Enquiry Color */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8CC9D9]/20 text-[#8CC9D9] text-xs font-black border border-[#8CC9D9]/50 shadow-xs">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#8CC9D9]" />
          <span>99.8% Batch Purity</span>
        </span>
      </div>

      {/* Chart Legend & Interactive Hover Readout */}
      <div className="flex items-center justify-between gap-4 text-[11px] mb-3 pb-2 border-b border-white/10 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white font-medium">
            <span className="w-3 h-1 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span className="text-slate-200">Purity Grade (Sortex)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-3 h-0.5 border-b border-dashed border-white/70" />
            <span className="text-slate-300">-18°C Stability</span>
          </div>
        </div>

        {/* Active Month Real-Time Telemetry Readout with Faint Blue Trade Enquiry Color */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBar}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 text-xs font-mono bg-[#8CC9D9]/20 border border-[#8CC9D9]/50 px-3 py-0.5 rounded-full shadow-sm backdrop-blur-sm"
          >
            <span className="font-bold text-[#8CC9D9]">{activeData.month}:</span>
            <span className="font-black text-white">{activeData.purity}</span>
            <span className="text-emerald-400 font-bold">{activeData.temp}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SVG GRAPH AREA */}
      <div className="relative w-full h-40 sm:h-44 pt-1">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full border-b border-dashed border-white/30" />
          <div className="w-full border-b border-dashed border-white/30" />
          <div className="w-full border-b border-dashed border-white/30" />
          <div className="w-full border-b border-dashed border-white/30" />
        </div>

        {/* Main SVG Spline Chart */}
        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
          <defs>
            {/* Vibrant Red Area Gradient Fill */}
            <linearGradient id="redAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Red Pulse Line Glow Filter */}
            <filter id="redLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.937   0 0 0 0 0.267   0 0 0 0 0.267  0 0 0 1 0"
                in="blur"
                result="coloredBlur"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated Area Gradient (Red Fill) */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            d="M 25 115 C 45 110, 50 100, 64 100 C 80 100, 90 75, 103 75 C 120 75, 128 90, 142 90 C 160 90, 168 65, 181 65 C 198 65, 205 30, 220 30 C 235 30, 245 55, 259 55 C 275 55, 285 70, 298 70 C 315 70, 325 45, 337 45 C 352 45, 362 60, 376 60 C 392 60, 400 35, 415 35 C 430 35, 440 20, 454 20 L 454 150 L 25 150 Z"
            fill="url(#redAreaGrad)"
          />

          {/* Secondary Dotted Line (Thermal Tolerance at -18°C) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M 25 135 C 45 130, 50 120, 64 125 C 80 130, 90 110, 103 112 C 120 115, 128 120, 142 118 C 160 116, 168 105, 181 108 C 198 110, 205 85, 220 90 C 235 95, 245 105, 259 102 C 275 100, 285 112, 298 110 C 315 108, 325 95, 337 92 C 352 90, 362 100, 376 98 C 392 95, 400 82, 415 80 C 430 78, 440 68, 454 65"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Primary Spline Line (Vibrant Glowing RED Curve as requested) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            d="M 25 115 C 45 110, 50 100, 64 100 C 80 100, 90 75, 103 75 C 120 75, 128 90, 142 90 C 160 90, 168 65, 181 65 C 198 65, 205 30, 220 30 C 235 30, 245 55, 259 55 C 275 55, 285 70, 298 70 C 315 70, 325 45, 337 45 C 352 45, 362 60, 376 60 C 392 60, 400 35, 415 35 C 430 35, 440 20, 454 20"
            stroke="#EF4444"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            filter="url(#redLineGlow)"
          />

          {/* Active Coordinate Target Dot (VIBRANT RED PULSE) */}
          {activeBar !== null && (
            <g>
              {/* Vertical red guideline */}
              <line
                x1={25 + activeBar * 39}
                y1="10"
                x2={25 + activeBar * 39}
                y2="150"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.8"
              />
              {/* Pulsing Outer Red Ring */}
              <circle
                cx={25 + activeBar * 39}
                cy={yValues[activeBar]}
                r="10"
                className="fill-red-500/40 animate-ping"
              />
              {/* Solid Center Node with Red Accent */}
              <circle
                cx={25 + activeBar * 39}
                cy={yValues[activeBar]}
                r="5"
                className="fill-red-500 stroke-2 stroke-white"
              />
            </g>
          )}
        </svg>

        {/* Interactive Hover Columns (12 Months Trigger Areas) */}
        <div className="absolute inset-0 flex items-stretch justify-between z-20">
          {qualityMonthlyData.map((d, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveBar(idx)}
              className="flex-1 cursor-pointer flex flex-col justify-end items-center group/col"
            >
              <div
                className={`w-full h-full rounded-md transition-colors duration-150 ${
                  activeBar === idx ? "bg-red-500/15" : "group-hover/col:bg-white/5"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* X-AXIS MONTH LABELS */}
      <div className="flex items-center justify-between pt-2.5 px-1 text-[10px] sm:text-xs font-mono font-medium border-t border-white/10 text-slate-300">
        {qualityMonthlyData.map((d, idx) => (
          <span
            key={idx}
            onClick={() => setActiveBar(idx)}
            className={`cursor-pointer transition-all ${
              activeBar === idx
                ? "text-red-400 font-bold scale-110 underline underline-offset-4"
                : "hover:text-white text-slate-400"
            }`}
          >
            {d.month}
          </span>
        ))}
      </div>

    </div>
  );
}

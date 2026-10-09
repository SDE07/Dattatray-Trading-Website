import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { QualityPipelineAnimation, SplitTextHeading } from "../components/common";
import QualityCertificationsSection from "../components/quality/QualityCertificationsSection";
import QualityTelemetryGraph from "../components/quality/QualityTelemetryGraph";
import { useTheme } from "../context/ThemeContext";

export default function QualityPage() {
  const { isDark } = useTheme();
  const heroHeadingRef = useRef(null);

  // GSAP Bounce-In Effect for Hero Heading (matching About page & Products page)
  useEffect(() => {
    if (!heroHeadingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".heading-bounce", {
        y: -100,
        opacity: 0,
        duration: 1.1,
        ease: "bounce.out",
        stagger: 0.15,
      });
    }, heroHeadingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FBFC] dark:bg-[#06100B] text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. GRAND HERO BANNER - GREEN & GOLDEN THEME
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#01140E] via-[#022117] to-[#010E09]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs in Golden & Emerald Harmony */}
        <div
          className="absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none bg-[#D4AF37]/20"
        />
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none bg-emerald-600/20"
        />
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none bg-[#C8A950]/15"
        />

        <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* LEFT SIDE: Heading & Badges */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-4" ref={heroHeadingRef}>
              
            
              {/* Main Page Heading */}
              <div className="py-1 space-y-2">
                <h1 className="font-sans tracking-tight leading-[1.08]">
                  <span
                    className="heading-bounce block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] select-none transition-all duration-500"
                  >
                    WORLD-CLASS COLD CHAIN
                  </span>
                  <span className="heading-bounce block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    FOOD SAFETY PROTOCOLS
                  </span>
                </h1>

                <div className="heading-bounce flex items-center gap-2 pt-1">
                  <div
                    className="h-[2px] w-8 rounded-full bg-[#D4AF37]"
                  />
                  <span
                    className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.14em] sm:tracking-[0.25em] text-[#F3E5AB]"
                  >
                    FARM-GATE TO PORT TEMPERATURE INTEGRITY
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <p
                className="text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl text-emerald-100/90"
              >
                From farm-gate harvest through sub-zero individual quick freezing (IQF) to international containerized export, Dattatray Traders engineers zero nutritional degradation, certified microbiological purity, and unbroken -18°C temperature telemetry.
              </p>

              {/* Trust Badges Bar */}
              <div className="heading-bounce pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-white/90 font-bold">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>APEDA &amp; FSSAI Grade A Certified</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>-18°C GPS Monitored Cold Chain</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>100% Lot Traceability</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: The Requested Animated Spline Quality Telemetry Graph */}
            <div className="lg:col-span-6 xl:col-span-5 flex justify-center w-full">
              <QualityTelemetryGraph />
            </div>

          </div>
        </div>

        {/* ── Smooth Slanted Bottom Wave Transition ── */}
        <div className="absolute -bottom-[2px] left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-[#F9FBFC] dark:fill-[#06100B] transition-colors duration-300 translate-y-[1px]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,125 L0,125 Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. UPPER SIDE SECTION: SUB-ZERO FARM-TO-PORT QUALITY VERIFICATION PIPELINE
             - Section Padding: Generous left and right padding
             - Left Side: Clean minimal Dattatray Traders quality standard
             - Right Side: 15-Stage Animated Connect Pipeline (No wrapper border/bg)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-18 lg:py-22 max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] mb-3.5 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37]" />
            <span>Rigorous Protocols</span>
          </div>
          <SplitTextHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            Sub-Zero Farm-to-Port{" "}
            <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
              Quality Verification Pipeline
            </span>
          </SplitTextHeading>
          <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every batch undergoes systematic sensory evaluation, moisture testing, and microbiological analysis before certification for delivery.
          </p>
        </div>

        {/* 2-Column Split: Increased gap between left & right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* LEFT SIDE: Dattatray Traders Gives Overall Best Quality */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Tolerance Quality Standard</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#021A13] dark:text-white tracking-tight leading-snug">
              Overall Best Quality, Guaranteed from{" "}
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Farm Gate to Port
              </span>
            </h3>

            {/* Concise, High-Impact Summary */}
            <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 leading-relaxed">
              At Dattatray Traders, uncompromising quality is our signature hallmark. We combine automated optical Sortex laser grading, -35°C cryogenic flash-freezing, and continuous satellite cold-chain telemetry to ensure zero degradation, certified purity, and 100% cellular vitality in every shipment.
            </p>

            {/* Sleek 2x2 Feature Micro-Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#032015] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-[#021A13] dark:text-slate-200">99.8% Sortex Laser Grade</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#032015] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-[#021A13] dark:text-slate-200">-35°C Rapid Cryo IQF</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#032015] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-[#021A13] dark:text-slate-200">NABL &amp; 0.8mm X-Ray Cleared</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#032015] border border-slate-200/90 dark:border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-[#021A13] dark:text-slate-200">-18°C Satellite IoT Fleet</span>
              </div>
            </div>

            {/* Compact Minimalist Metrics Row */}
            <div className="py-3 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-center">
              <div>
                <span className="block text-base sm:text-lg font-black text-[#D4AF37]">99.8%</span>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Sortex Purity</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/15" />
              <div>
                <span className="block text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">-18°C</span>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Cryo-Lock</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/15" />
              <div>
                <span className="block text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">100%</span>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Traceable</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/15" />
              <div>
                <span className="block text-base sm:text-lg font-black text-[#021A13] dark:text-white">15+</span>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">QA Checks</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] hover:scale-105 text-[#021A13] font-black text-xs sm:text-sm shadow-md shadow-[#D4AF37]/25 transition-all"
              >
                <span>Request QA Specs &amp; Lab COA</span>
                <ArrowRight className="w-4 h-4 text-[#021A13]" />
              </Link>
            </div>

          </div>

          {/* RIGHT SIDE: 15-Stage Animated Connect Beam Pipeline */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full bg-transparent border-0 shadow-none p-0 flex justify-center">
              <QualityPipelineAnimation hideHeader={true} className="py-0 px-0" />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. DOWN SIDE SECTION: INTERNATIONALLY RECOGNISED STANDARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <QualityCertificationsSection />

      {/* ══════════════════════════════════════════════════════════════════════
          4. COLD-CHAIN CONTINUOUS TEMPERATURE DATA LOGGING GUARANTEE BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-r from-[#021A13] via-[#042A1E] to-[#01140E] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-[#D4AF37]/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#F3E5AB]">
                -18°C Deep Freeze Assurance
              </span>
              <SplitTextHeading
                as="h3"
                className="text-lg sm:text-xl md:text-2xl font-black text-white mt-1 leading-snug"
              >
                Continuous Cold-Chain Temperature Data Logging
              </SplitTextHeading>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl leading-relaxed">
                Every reefer container and cold room is equipped with GPS-synced continuous temperature dataloggers ensuring unbroken -18°C preservation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#021A13] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Request QA Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

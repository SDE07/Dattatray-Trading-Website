import React, { useEffect, useRef } from "react";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

export default function ContactPage() {
  const { isDark } = useTheme();
  const heroHeadingRef = useRef(null);

  // GSAP Bounce-In Effect for Hero Heading (matching About, Trading, Products & Quality pages)
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
    <div className="bg-[#F9FBFC] dark:bg-[#07111E] text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      {/* Contact Grand Hero Banner */}
      <section
        className={`relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#06101E] via-[#09172A] to-[#0B1F38]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs */}
        <div
          className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#1E56C8]/25" : "bg-emerald-600/20"
          }`}
        />
        <div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#38BDF8]/20" : "bg-emerald-400/15"
          }`}
        />
        <div
          className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#0284C7]/15" : "bg-teal-600/15"
          }`}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center" ref={heroHeadingRef}>
          <div
            className={`heading-bounce inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm transition-all duration-500 ${
              isDark
                ? "bg-sky-950/70 border border-sky-500/35 text-[#38BDF8]"
                : "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
            }`}
          >
            <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
            <span>WE'D LOVE TO HEAR FROM YOU</span>
          </div>

          <div className="py-2 space-y-2">
            <h1 className="font-sans tracking-tight leading-[1.08]">
              <span
                className={`heading-bounce block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text select-none transition-all duration-500 ${
                  isDark
                    ? "bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] drop-shadow-[0_4px_30px_rgba(56,189,248,0.35)]"
                    : "bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 drop-shadow-[0_4px_30px_rgba(16,185,129,0.35)]"
                }`}
              >
                GET IN TOUCH WITH
              </span>
              <span className="heading-bounce block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                DATTATRAY TRADERS
              </span>
            </h1>

            <div className="heading-bounce flex items-center justify-center gap-2 pt-1">
              <div
                className={`h-[2px] w-8 rounded-full transition-all duration-500 ${
                  isDark ? "bg-[#38BDF8]" : "bg-emerald-400"
                }`}
              />
              <span
                className={`text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] transition-all duration-500 ${
                  isDark ? "text-[#38BDF8]" : "text-emerald-400"
                }`}
              >
                COMMERCIAL INQUIRIES &amp; GLOBAL CONTRACTS
              </span>
              <div
                className={`h-[2px] w-8 rounded-full transition-all duration-500 ${
                  isDark ? "bg-[#38BDF8]" : "bg-emerald-400"
                }`}
              />
            </div>
          </div>

          <p
            className={`heading-bounce mx-auto mt-2 max-w-xl text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDark ? "text-slate-300" : "text-emerald-100/80"
            }`}
          >
            Questions about our IQF frozen vegetables, wholesale food service supply, cold storage facilities, or export partnerships? Reach our commercial desk and we'll get back to you within one business day.
          </p>

          {/* Quick Contact Badges */}
          <div className="heading-bounce mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs font-bold text-white/90">
            <a
              href="tel:+919822000000"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full backdrop-blur-md border transition-all ${
                isDark
                  ? "bg-white/10 hover:bg-sky-950/60 border-white/15 hover:border-[#38BDF8]"
                  : "bg-white/10 hover:bg-emerald-950/60 border-white/15 hover:border-emerald-400"
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
              +91 98220 00000
            </a>
            <a
              href="mailto:trade@dattatraytraders.com"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full backdrop-blur-md border transition-all ${
                isDark
                  ? "bg-white/10 hover:bg-sky-950/60 border-white/15 hover:border-[#38BDF8]"
                  : "bg-white/10 hover:bg-emerald-950/60 border-white/15 hover:border-emerald-400"
              }`}
            >
              <Mail className={`w-3.5 h-3.5 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
              trade@dattatraytraders.com
            </a>
            <span
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
            >
              <MapPin className={`w-3.5 h-3.5 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
              APMC Market Yard, Maharashtra
            </span>
          </div>
        </div>

        {/* ── Smooth Slanted Bottom Wave Transition ── */}
        <div className="absolute -bottom-[2px] left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-[#F9FBFC] dark:fill-[#07111E] transition-colors duration-300 translate-y-[1px]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,125 L0,125 Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
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
    <div className="bg-white dark:bg-[#06100B] text-[#1F2937] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      {/* Contact Grand Hero Banner */}
      <section
        className={`relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#01140E] via-[#022117] to-[#010E09]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs in Golden & Emerald Harmony */}
        <div
          className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#D4AF37]/15" : "bg-[#D4AF37]/20"
          }`}
        />
        <div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-emerald-600/20" : "bg-[#15803D]/25"
          }`}
        />
        <div
          className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#C8A950]/15" : "bg-[#C8A950]/20"
          }`}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center" ref={heroHeadingRef}>
         

          <div className="py-2 space-y-2">
            <h1 className="font-sans tracking-tight leading-[1.08]">
              <span className="heading-bounce block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] select-none transition-all duration-500">
                GET IN TOUCH WITH
              </span>
              <span className="heading-bounce block text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                DATTATRAY TRADERS
              </span>
            </h1>

            <div className="heading-bounce flex items-center justify-center gap-2 pt-1">
              <div className="h-[2px] w-8 rounded-full bg-[#D4AF37] transition-all duration-500" />
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[#F3E5AB] transition-all duration-500">
                COMMERCIAL INQUIRIES &amp; GLOBAL CONTRACTS
              </span>
              <div className="h-[2px] w-8 rounded-full bg-[#D4AF37] transition-all duration-500" />
            </div>
          </div>

         

          {/* Quick Contact Badges */}
          <div className="heading-bounce mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs font-bold text-white/90">
            <a
              href="tel:+919822000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full backdrop-blur-md bg-white/10 hover:bg-[#15803D]/60 border border-white/15 hover:border-[#D4AF37] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              +91 98220 00000
            </a>
            <a
              href="mailto:trade@dattatraytraders.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full backdrop-blur-md bg-white/10 hover:bg-[#15803D]/60 border border-white/15 hover:border-[#D4AF37] transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              trade@dattatraytraders.com
            </a>
            <span
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              APMC Market Yard, Maharashtra
            </span>
          </div>
        </div>

        {/* ── Smooth Slanted Bottom Wave Transition ── */}
        <div className="absolute -bottom-[2px] left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-white dark:fill-[#06100B] transition-colors duration-300 translate-y-[1px]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,125 L0,125 Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

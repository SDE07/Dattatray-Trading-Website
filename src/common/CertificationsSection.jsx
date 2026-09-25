import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, BadgeCheck, CheckCircle2, FileCheck2, ArrowUpRight } from "lucide-react";
import cert1 from "../assets/certificates/cert1.png";
import cert2 from "../assets/certificates/cert2.png";
import cert3 from "../assets/certificates/cert3.png";
import cert4 from "../assets/certificates/cert4.png";
import cert5 from "../assets/certificates/cert5.png";
import cert6 from "../assets/certificates/cert6.png";

const certificationsList = [
  {
    id: "fssai",
    title: "FSSAI",
    authority: "Govt. of India",
    desc: "Food Safety Standards",
    badge: "License Active",
    img: cert1,
  },
  {
    id: "iso22000",
    title: "ISO 22000",
    authority: "FSMS System",
    desc: "Quality Management",
    badge: "Certified Facility",
    img: cert2,
  },
  {
    id: "haccp",
    title: "HACCP",
    authority: "Codex Alimentarius",
    desc: "Critical Control Points",
    badge: "Audit Verified",
    img: cert3,
  },
  {
    id: "apeda",
    title: "APEDA",
    authority: "Ministry of Commerce",
    desc: "Export Authority",
    badge: "Registered Exporter",
    img: cert4,
  },
  {
    id: "usfda",
    title: "USFDA",
    authority: "U.S. FDA Standards",
    desc: "Global Compliance",
    badge: "FDA Compliant",
    img: cert5,
  },
  {
    id: "halal",
    title: "HALAL",
    authority: "Islamic Food Council",
    desc: "Certified Food",
    badge: "100% Compliant",
    img: cert6,
  },
];

export default function CertificationsSection() {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-14 sm:py-18 lg:py-20 overflow-hidden bg-gradient-to-b from-white via-[#F7FAFC] to-[#EEF5F8] dark:from-[#07111E] dark:via-[#09172A] dark:to-[#07111E] transition-colors duration-300"
    >
      {/* Dynamic Ambient Background Glows in Dattatray Palette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gradient-to-r from-[#8CC9D9]/15 via-[#1E56C8]/8 to-[#8CC9D9]/15 rounded-full blur-[140px]" />
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#8CC9D9]/18 rounded-full blur-[110px]" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#1E56C8]/12 rounded-full blur-[110px]" />
      </div>

      <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Section Header ─── */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 bg-[#EBF5FA] dark:bg-[#0B1B2F] border border-[#CDE5F0] dark:border-[#38BDF8]/30 text-[#0B2546] dark:text-[#38BDF8] text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
            <span>100% CERTIFIED FOOD SAFETY</span>
          </div>

          {/* Main Heading with Diagonal Floating Verified Badge on the Right */}
          <div className="relative inline-block mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.18]">
              Globally Trusted <br />
              <span className="bg-gradient-to-r from-[#0284C7] via-[#0E7490] to-[#1E56C8] dark:from-[#38BDF8] dark:via-[#8CC9D9] dark:to-[#60A5FA] bg-clip-text text-transparent">
                Quality Certifications
              </span>
            </h2>

            {/* Diagonal Floating Verified Badge */}
            <div className="absolute -top-3 sm:-top-4 -right-4 sm:-right-8 lg:-right-14 transform rotate-[9deg] hover:rotate-0 hover:scale-110 transition-all duration-300 select-none z-20 cursor-default">
              <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-white dark:bg-[#0B1B2F] border border-blue-200 dark:border-[#38BDF8]/40 shadow-[0_6px_16px_rgba(37,99,235,0.12)] dark:shadow-[0_6px_16px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-[#38BDF8] fill-blue-50 dark:fill-cyan-950/40 shrink-0" />
                <span className="font-extrabold text-xs sm:text-[13px] tracking-wide text-blue-800 dark:text-slate-100 flex items-center gap-0.5">
                  Verified <span className="text-blue-500 dark:text-[#38BDF8] font-black text-xs">✓</span>
                </span>
              </div>  
            </div>
          </div>
        </div>

        {/* ─── Interactive Staggered Timeline Row with Connecting Blue Line ─── */}
        <div className="relative z-10">

          {/* Precision Connecting Blue Line across the 6 Circular Medallions */}
          <div
            className={`hidden lg:block absolute top-[72px] left-[8.33%] right-[8.33%] h-[2.5px] bg-[#93C5FD] dark:bg-[#38BDF8]/60 shadow-[0_0_10px_rgba(147,197,253,0.8)] dark:shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all duration-1000 delay-200 z-0 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-75"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-75 animate-pulse" />
          </div>

          {/* 6 Circular Medallions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-5 relative z-10">
            {certificationsList.map((cert, idx) => {
              const delayMs = 120 + idx * 120;

              return (
                <div
                  key={cert.id}
                  className={`group flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-90"
                  }`}
                  style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
                >
                  {/* Circular Seal Medallion */}
                  <div className="relative w-32 h-32 sm:w-34 sm:h-34 lg:w-36 lg:h-36 rounded-full bg-white dark:bg-[#0B1B2F] border-2 border-[#DCEBF4] dark:border-white/15 group-hover:border-[#38BDF8] shadow-[0_8px_24px_rgba(11,37,70,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] group-hover:shadow-[0_16px_36px_rgba(30,86,200,0.18)] flex items-center justify-center p-3 sm:p-3.5 transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-2 cursor-pointer z-10 group-hover:ring-4 group-hover:ring-[#8CC9D9]/25">
                    
                    {/* Inner Circular Card Container */}
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FAFCFD] via-white to-[#F2F7FA] dark:from-[#0E223D] dark:via-[#0B1B2F] dark:to-[#07111E] border border-slate-100 dark:border-white/10 flex items-center justify-center p-3 shadow-inner">
                      <img
                        src={cert.img}
                        alt={`${cert.title} Quality Seal`}
                        className="w-full h-full object-contain filter group-hover:drop-shadow-md transition-all duration-300 select-none"
                        loading="lazy"
                      />
                    </div>

                    {/* Ambient Glow behind medallion on hover */}
                    <div className="absolute inset-0 rounded-full bg-[#8CC9D9]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
                  </div>

                  {/* Title Below Circle */}
                  <h3 className="mt-4 text-base sm:text-lg font-black text-[#0B2546] dark:text-slate-100 tracking-tight group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] transition-colors leading-tight">
                    {cert.title}
                  </h3>

                  {/* Subtitle / Scope */}
                  <p className="text-xs font-semibold text-[#64748B] dark:text-slate-400 mt-1 leading-snug">
                    {cert.desc}
                  </p>

                  {/* Status Pill Badge */}
                  <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] dark:text-emerald-400 bg-[#ECFDF5] dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-[#A7F3D0] dark:border-emerald-800/80 shadow-2xs group-hover:bg-[#D1FAE5] dark:group-hover:bg-emerald-900/60 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-400 shrink-0" />
                    <span>{cert.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Global Compliance Assurance Dossier Strip (High-Contrast White & Cyan on Deep Navy) ─── */}
        <div
          className={`mt-14 sm:mt-18 rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-[#0B2546] via-[#103560] to-[#16447A] dark:from-[#0B1B2F] dark:via-[#0F2847] dark:to-[#173860] border border-[#8CC9D9]/30 shadow-[0_12px_32px_rgba(11,37,70,0.35)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#8CC9D9]/20 border border-[#8CC9D9]/40 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner">
              <FileCheck2 className="w-6 h-6 text-[#8CC9D9]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white tracking-tight">
                Audit Reports &amp; Lab Certifications Available for Export Buyers
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-snug">
                We supply full Certificates of Analysis (COA), pesticide residue test sheets, and phytosanitary clearance docs with every consignment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="mailto:trade@dattatraytraders.com?subject=Inquiry%20for%20Audit%20Reports%20and%20Certificates"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5.5 py-2.5 rounded-full bg-[#8CC9D9] hover:bg-white text-[#0B2546] font-black text-xs sm:text-sm shadow-lg shadow-black/20 hover:shadow-[#8CC9D9]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Request Audit Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

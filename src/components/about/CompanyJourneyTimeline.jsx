import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { SplitTextHeading } from "../common";

const journeySteps = [
  {
    step: 1,
    year: "1998 — Inception",
    title: "Farm-Gate Aggregation & APMC Mandi Roots",
    description:
      "Established foundational trading operations at APMC Market Yard, Maharashtra. Partnered directly with 500+ regional agricultural growers to procure farm-fresh vegetables, pulses, and grains with transparent electronic weighing and quality grading.",
    highlight: "Direct farmer relationships & wholesale mandi network",
  },
  {
    step: 2,
    year: "2008 — Cold Infrastructure",
    title: "Cold Storage bays & Post-Harvest Preservation",
    description:
      "Constructed commercial pre-cooling facilities and centralized multi-commodity cold rooms at our regional hub, curtailing post-harvest perishability and establishing high-volume buffer storage for seasonal commodities.",
    highlight: "Multi-chamber cold rooms & humidity management",
  },
  {
    step: 3,
    year: "2016 — IQF Manufacturing",
    title: "IQF Blast Freezing & Pure Veg Packaged Lines",
    description:
      "Commissioned state-of-the-art Individual Quick Freezing (IQF) lines operating at -40°C. Introduced retail and foodservice packs of IQF green peas, golden sweet corn, and dedicated vegetarian ready-to-fry snack specialties.",
    highlight: "Rapid cryo-freezing preserving natural cellular nutrition",
  },
  {
    step: 4,
    year: "2020 — Fleet Logistics",
    title: "Active GPS Reefer Fleet & Pan-India Distribution",
    description:
      "Expanded a dedicated corporate fleet of temperature-controlled refrigerated trucks equipped with real-time IoT thermal telemetry, ensuring zero cold-chain breaks for leading hotel chains, QSRs, and national wholesale distributors.",
    highlight: "-18°C guaranteed transit with live IoT tracking",
  },
  {
    step: 5,
    year: "Present & Beyond — Global Reach",
    title: "Certified Global Export Desk & International Contracts",
    description:
      "Secured APEDA, ISO 22000, and FSSAI international certifications. Dispatches standardized 40ft reefer shipping containers and air cargo to import partners across the Middle East, Southeast Asia, Europe, and neighboring territories.",
    highlight: "Global port clearance, lab certification & batch traceability",
  },
];

export default function CompanyJourneyTimeline() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 420;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#059669]/5 dark:bg-[#059669]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

      {/* ── Top Section: Full-Width Executive Heading & Badges ── */}
      <div className="relative z-10 mb-10 sm:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-6 border-b border-slate-200/80 dark:border-white/10">
          
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#059669] dark:text-[#34D399]">
                Company Journey &amp; Milestones
              </span>
            </div>

            <SplitTextHeading
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#1F2937] dark:text-white leading-[1.15] tracking-tight"
            >
              Our growth story from inception till date.
            </SplitTextHeading>

            <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              A clear sequence of generational dedication, cold-chain modernization, and unwavering trade integrity connecting agricultural farm-gate aggregation to global dining tables.
            </p>
          </div>

          {/* Quick Metrics & Carousel Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 shrink-0">
            {/* Quick Metrics Chips */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#0E1B15] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span className="text-[#059669] dark:text-[#34D399] font-black text-lg block leading-none">25+ Years</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mandi Heritage</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#0E1B15] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <span className="text-[#D4AF37] dark:text-[#F3E5AB] font-black text-lg block leading-none">50k+ MT</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Dispatched</span>
              </div>
            </div>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous milestone"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0E1B15] text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#059669] hover:text-white hover:border-[#059669] dark:hover:bg-[#059669] transition-all shadow-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next milestone"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0E1B15] text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#059669] hover:text-white hover:border-[#059669] dark:hover:bg-[#059669] transition-all shadow-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ── Horizontal Stepper & Connected Cards Track (After Heading) ── */}
      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className="relative z-10 overflow-x-auto pb-6 pt-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="relative inline-flex gap-6 sm:gap-8 min-w-full px-1">
          
          {/* Continuous Horizontal Gradient Timeline Connector Line running across all milestone nodes */}
          <div
            className="absolute top-[23px] left-[55px] right-[55px] h-[3px] bg-gradient-to-r from-[#0284C7] via-[#059669] to-[#D4AF37] dark:from-[#38BDF8] dark:via-[#10B981] dark:to-[#F3E5AB] rounded-full z-0"
            aria-hidden="true"
          />

          {journeySteps.map((item) => (
            <div
              key={item.step}
              className="relative w-[340px] sm:w-[390px] lg:w-[420px] shrink-0 flex flex-col group"
              style={{ scrollSnapAlign: "start" }}
            >
              
              {/* Stepper Node & Vertical Drop Stem */}
              <div className="relative z-10 flex flex-col items-center mb-6">
                {/* Circular Numbered Node */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0284C7] dark:bg-[#0284C7] text-white font-black text-sm sm:text-base flex items-center justify-center shadow-lg shadow-[#0284C7]/30 ring-4 ring-[#FDFCFA] dark:ring-[#06100B] group-hover:scale-110 group-hover:bg-[#059669] transition-all duration-300">
                  {item.step}
                </div>

                {/* Vertical stem connecting the node into the card */}
                <div className="w-[2px] h-5 bg-gradient-to-b from-[#0284C7] to-slate-200 dark:to-white/10" />
              </div>

              {/* Milestone Card Body */}
              <div className="flex-1 rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#0E1B15]/95 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:border-[#0284C7]/50 dark:hover:border-[#38BDF8]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                
                <div>
                  {/* Card Header with Icon, Year Tag, and Title */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-700/60 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>

                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#1F2937] dark:text-white tracking-tight leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Milestone Key Capability Pill */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#059669] dark:text-[#34D399]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#34D399] shrink-0" />
                  <span className="line-clamp-1">{item.highlight}</span>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Subtle Horizontal Drag/Scroll Hint for Mobile */}
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-400 dark:text-slate-500 font-medium sm:hidden">
        <span>Swipe horizontally to explore milestones</span>
        <ChevronRight size={14} />
      </div>
    </section>
  );
}

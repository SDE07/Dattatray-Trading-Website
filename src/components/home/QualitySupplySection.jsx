import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  MessageCircle,
  Truck,
  Store,
  Globe2,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import facilityImg from "../../assets/dattatray_facility.jpg";
import reeferFleetImg from "../../assets/dattatray_reefer_fleet.jpg";
import iqfProcessingImg from "../../assets/dattatray_iqf_processing.jpg";
import SplitTextHeading from "../common/SplitTextHeading";

const facilitySlides = [
  {
    id: "facility",
    title: "Cold Storage & Processing Facility",
    badge: "Watch Facility Tour",
    image: facilityImg,
    alt: "Dattatray Traders - State of the Art Cold Storage & Food Processing Facility",
    stats: [
      { val: "5000+ MT", label: "Cold Storage Capacity", highlight: false },
      { val: "-18°C", label: "Deep IQF Freezing", highlight: true },
      { val: "100%", label: "Hygienic & Certified", highlight: false },
      { val: "12+", label: "Export Destinations", highlight: true },
    ],
    complianceTag: "APEDA & FSSAI COMPLIANT",
    fleetTag: "Continuous Reefer Fleet",
  },
  {
    id: "export",
    title: "Merchant Export & Logistics Terminal",
    badge: "Global Reefer Network",
    image: reeferFleetImg,
    alt: "Dattatray Trading Company - Port Reefer Terminal & Export Fleet",
    stats: [
      { val: "12+", label: "Countries Supplied", highlight: true },
      { val: "100%", label: "Unbroken Cold Chain", highlight: false },
      { val: "Multi-Ton", label: "Bulk Shipments", highlight: true },
      { val: "30+", label: "Years Agro Heritage", highlight: false },
    ],
    complianceTag: "GLOBAL MERCHANT EXPORT",
    fleetTag: "UAE, UK, Singapore & USA",
  },
  {
    id: "iqf",
    title: "Hygienic IQF Vegetable Processing Line",
    badge: "IQF Freezing Technology",
    image: iqfProcessingImg,
    alt: "Dattatray Trading Company - Advanced IQF Freezing and Sorting Line",
    stats: [
      { val: "4 Hours", label: "Farm Harvest to IQF", highlight: true },
      { val: "0%", label: "Preservatives Added", highlight: false },
      { val: "500+", label: "HoReCa Kitchens Supplied", highlight: true },
      { val: "Grade A", label: "Optical Sortex Cleaned", highlight: false },
    ],
    complianceTag: "HORECA & INSTITUTIONAL SUPPLY",
    fleetTag: "Consistent Year-Round Supply",
  },
];

/**
 * QualitySupplySection: Company narrative & GSAP 3D interactive layered card deck.
 */
export default function QualitySupplySection({ onOpenStoryModal }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);
  const deckContainerRef = useRef(null);

  // GSAP card fan and shuffle animation using user's formula:
  // gsap.to(".card", {
  //   x: (i) => (i - 2) * 25,
  //   rotation: (i) => (i - 2) * 8,
  //   duration: 0.5,
  //   ease: "back.out(1.4)"
  // });
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      cards.forEach((card, idx) => {
        // layer: 0 = front active card, 1 = middle card, 2 = back card
        const layer = (idx - activeSlide + facilitySlides.length) % facilitySlides.length;
        // i corresponds to depth index where i=2 is front, i=1 is middle, i=0 is back
        const i = facilitySlides.length - 1 - layer;

        gsap.to(card, {
          x: (i - 2) * 25,
          rotation: (i - 2) * 8,
          y: (i - 2) * 16,
          scale: 1 - layer * 0.04,
          zIndex: (i + 1) * 10,
          opacity: layer === 0 ? 1 : 0.95,
          duration: 0.5,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      });
    },
    { scope: deckContainerRef, dependencies: [activeSlide] }
  );

  // Shuffle next card with lift & drop physics
  const shuffleNextCard = useCallback(() => {
    const cards = gsap.utils.toArray(".reefer-deck-card");
    const frontCard = cards[activeSlide];

    if (frontCard) {
      gsap.to(frontCard, {
        y: -110,
        x: 20,
        rotation: 6,
        scale: 1.04,
        zIndex: 50,
        duration: 0.32,
        ease: "power2.out",
        onComplete: () => {
          setActiveSlide((prev) => (prev + 1) % facilitySlides.length);
        },
      });
    } else {
      setActiveSlide((prev) => (prev + 1) % facilitySlides.length);
    }
  }, [activeSlide]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(() => {
      shuffleNextCard();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, shuffleNextCard]);

  const handleCardClick = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        shuffleNextCard();
      }, 4500);
    }
    shuffleNextCard();
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 lg:pr-2">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E56C8]/8 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/15 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC9D9] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC9D9]" />
            </span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em]">
              DATTATRAY TRADING COMPANY
            </span>
          </div>

          {/* Main Headline */}
          <SplitTextHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15]"
          >
            Quality Frozen Foods. <br className="hidden sm:inline" />
            <span className="text-[#1E56C8] dark:text-[#38BDF8]">Reliable Supply.</span> Global Reach.
          </SplitTextHeading>

          {/* Division Pill Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#5D6B7E] dark:text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-[#EBF5FA] dark:bg-white/10 text-[#0B2546] dark:text-slate-200 hover:bg-[#8CC9D9]/25 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors border border-[#D0E7F2]/60 dark:border-white/10">Frozen Foods</span>
            <span className="text-[#BFD2DC] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#EBF5FA] dark:bg-white/10 text-[#0B2546] dark:text-slate-200 hover:bg-[#8CC9D9]/25 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors border border-[#D0E7F2]/60 dark:border-white/10">HoReCa Supply</span>
            <span className="text-[#BFD2DC] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#EBF5FA] dark:bg-white/10 text-[#0B2546] dark:text-slate-200 hover:bg-[#8CC9D9]/25 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors border border-[#D0E7F2]/60 dark:border-white/10">Wholesale</span>
            <span className="text-[#BFD2DC] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#EBF5FA] dark:bg-white/10 text-[#0B2546] dark:text-slate-200 hover:bg-[#8CC9D9]/25 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors border border-[#D0E7F2]/60 dark:border-white/10">Retail</span>
            <span className="text-[#BFD2DC] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#EBF5FA] dark:bg-white/10 text-[#0B2546] dark:text-slate-200 hover:bg-[#8CC9D9]/25 hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors border border-[#D0E7F2]/60 dark:border-white/10">Merchant Export</span>
          </div>

          {/* Description Narrative */}
          <p className="text-sm sm:text-base text-[#5D6B7E] dark:text-slate-300 leading-relaxed">
            Dattatray Trading Company is engaged in the trading, wholesale, retail and merchant export of frozen food products. We supply quality frozen vegetables and frozen ready-to-eat snacks to hotels, restaurants, cafés, caterers, distributors, retailers, institutions and international buyers.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#1E56C8] hover:bg-[#1546AA] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white dark:bg-[#0B1B2F] hover:bg-[#F9FBFC] dark:hover:bg-slate-800 text-[#0B2546] dark:text-white hover:text-[#1E56C8] dark:hover:text-[#38BDF8] font-extrabold text-xs sm:text-sm border-2 border-[#1E56C8]/25 dark:border-white/20 hover:border-[#1E56C8] dark:hover:border-[#38BDF8] shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Send Enquiry</span>
              <ArrowUpRight className="w-4 h-4 text-[#1E56C8] dark:text-[#38BDF8]" />
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Dattatray%20Traders,%20I%20would%20like%20to%20inquire%20about%20frozen%20food%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Serving Across Key Sectors Strip */}
          <div className="pt-7 border-t border-[#E8EEF0] dark:border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5D6B7E] dark:text-slate-400 mb-3.5">
              Serving Across Key Sectors
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
              {/* Sector 1 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-white dark:bg-[#0B1B2F] border border-[#E8EEF0] dark:border-white/10 hover:border-[#1E56C8]/40 dark:hover:border-[#38BDF8]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#E8EEF0] dark:bg-slate-800 group-hover:bg-[#1E56C8] dark:group-hover:bg-[#1E56C8] text-[#0B2546] dark:text-[#8CC9D9] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0B2546] dark:text-slate-200 group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] truncate">HoReCa &amp; Hotels</span>
              </div>

              {/* Sector 2 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-white dark:bg-[#0B1B2F] border border-[#E8EEF0] dark:border-white/10 hover:border-[#1E56C8]/40 dark:hover:border-[#38BDF8]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#E8EEF0] dark:bg-slate-800 group-hover:bg-[#1E56C8] dark:group-hover:bg-[#1E56C8] text-[#0B2546] dark:text-[#8CC9D9] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0B2546] dark:text-slate-200 group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] truncate">B2B Wholesalers</span>
              </div>

              {/* Sector 3 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-white dark:bg-[#0B1B2F] border border-[#E8EEF0] dark:border-white/10 hover:border-[#1E56C8]/40 dark:hover:border-[#38BDF8]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#E8EEF0] dark:bg-slate-800 group-hover:bg-[#1E56C8] dark:group-hover:bg-[#1E56C8] text-[#0B2546] dark:text-[#8CC9D9] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0B2546] dark:text-slate-200 group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] truncate">Retail Stores</span>
              </div>

              {/* Sector 4 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-white dark:bg-[#0B1B2F] border border-[#E8EEF0] dark:border-white/10 hover:border-[#1E56C8]/40 dark:hover:border-[#38BDF8]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#E8EEF0] dark:bg-slate-800 group-hover:bg-[#1E56C8] dark:group-hover:bg-[#1E56C8] text-[#0B2546] dark:text-[#8CC9D9] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0B2546] dark:text-slate-200 group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] truncate">Global Importers</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Layered Card Stack */}
        <div
          className="lg:col-span-5 relative flex items-center justify-center pt-8 sm:pt-10 lg:pt-0"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            ref={deckContainerRef}
            className="relative w-full max-w-[540px] xl:max-w-[580px] 2xl:max-w-[620px] h-[410px] sm:h-[460px] lg:h-[500px] cursor-pointer select-none group"
            onClick={handleCardClick}
            title="Click card to shuffle"
          >
            {facilitySlides.map((slide, idx) => {
              const rel = (idx - activeSlide + facilitySlides.length) % facilitySlides.length;
              const isFront = rel === 0;

              return (
                <div
                  key={slide.id}
                  className="card reefer-deck-card absolute inset-0 w-full h-full rounded-[26px] sm:rounded-[30px] overflow-hidden border border-white/60 bg-[#241426] shadow-2xl transform-gpu select-none"
                >
                  {/* Facility Slide Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/25 pointer-events-none" />

                  {/* Soft Sky-Blue Frosted Overlay for Cards Behind */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      !isFront ? "opacity-100 bg-[#B8D7E8]/85" : "opacity-0"
                    }`}
                  />

                  {/* Foreground Card Content */}
                  <div
                    className={`relative w-full h-full flex flex-col justify-between p-5 sm:p-7 z-20 transition-opacity duration-300 ${
                      isFront ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between w-full">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenStoryModal?.();
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-[#8CC9D9] text-white hover:text-[#0B1B2F] border border-white/30 hover:border-[#8CC9D9] backdrop-blur-md text-xs font-black shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{slide.badge}</span>
                      </button>

                      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8CC9D9] animate-pulse" />
                        <span>Click card to shuffle</span>
                      </div>
                    </div>

                    {/* Vertical Slider Track */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        shuffleNextCard();
                      }}
                      className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-2.5 h-32 sm:h-36 bg-white/25 hover:bg-white/35 backdrop-blur-md rounded-full p-0.5 z-30 flex flex-col justify-start cursor-pointer transition-colors shadow-inner"
                      title="Click to cycle card"
                    >
                      <div
                        className="w-full h-10 sm:h-11 bg-white rounded-full shadow-lg transition-transform duration-500 ease-out"
                        style={{
                          transform: `translateY(${activeSlide * 38}px)`,
                        }}
                      />
                    </div>

                    {/* Bottom Card Content: Overlay Statistics */}
                    <div className="space-y-3.5 pointer-events-none">
                      <div className="grid grid-cols-2 gap-4">
                        {slide.stats.map((st) => (
                          <div key={st.label}>
                            <div
                              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                                st.highlight ? "text-[#8CC9D9]" : "text-white"
                              }`}
                            >
                              {st.val}
                            </div>
                            <div className="text-[11px] font-semibold text-white/85">
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
                        <span className="font-bold text-white uppercase tracking-wider">
                          {slide.complianceTag}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#8CC9D9] font-bold">
                          {slide.fleetTag} <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

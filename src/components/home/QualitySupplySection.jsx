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
  const isTransitioningRef = useRef(false);

  // Clean, uncluttered optical depth stack with fluid smooth easing
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      cards.forEach((card, idx) => {
        // layer: 0 = front active card, 1 = middle card, 2 = back card
        const layer = (idx - activeSlide + facilitySlides.length) % facilitySlides.length;

        if (layer === 0) {
          // Front active card: perfectly centered, crisp, elevated
          gsap.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            zIndex: 30,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else if (layer === 1) {
          // Middle card: clean optical depth tuck behind, no awkward side protrusion
          gsap.to(card, {
            x: 0,
            y: 14,
            rotation: -0.5,
            scale: 0.96,
            zIndex: 20,
            opacity: 0.88,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          // Back card: foundation layer neatly aligned
          gsap.to(card, {
            x: 0,
            y: 26,
            rotation: 0.5,
            scale: 0.92,
            zIndex: 10,
            opacity: 0.65,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    },
    { scope: deckContainerRef, dependencies: [activeSlide] }
  );

  // Smooth, fluid card shuffle
  const shuffleNextCard = useCallback(() => {
    if (isTransitioningRef.current) return;
    const cards = gsap.utils.toArray(".reefer-deck-card");
    const frontCard = cards[activeSlide];

    if (frontCard) {
      isTransitioningRef.current = true;
      gsap.to(frontCard, {
        y: -36,
        opacity: 0.4,
        scale: 0.96,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveSlide((prev) => (prev + 1) % facilitySlides.length);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 450);
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
    if (isTransitioningRef.current) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        shuffleNextCard();
      }, 4500);
    }
    shuffleNextCard();
  };

  return (
    <section className="w-full bg-white dark:bg-[#06100B] py-14 sm:py-20 lg:py-24 transition-colors duration-300">
      <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 lg:pr-2">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] dark:bg-white/5 border border-[#15803D]/20 dark:border-[#22C55E]/30 text-[#15803D] dark:text-[#4ADE80]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
            </span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.18em]">
              DATTATRAY TRADING COMPANY
            </span>
          </div>

          {/* Main Headline */}
          <SplitTextHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight leading-[1.15]"
          >
            Quality Frozen Foods. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
              Reliable Supply.
            </span>{" "}
            Global Reach.
          </SplitTextHeading>

          {/* Division Pill Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#4B5563] dark:text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-[#F4F9F5] dark:bg-white/5 text-[#1F2937] dark:text-slate-200 hover:bg-[#DCFCE7] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors border border-[#E1EFE4] dark:border-white/10">Frozen Foods</span>
            <span className="text-[#D1D5DB] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4F9F5] dark:bg-white/5 text-[#1F2937] dark:text-slate-200 hover:bg-[#DCFCE7] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors border border-[#E1EFE4] dark:border-white/10">HoReCa Supply</span>
            <span className="text-[#D1D5DB] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4F9F5] dark:bg-white/5 text-[#1F2937] dark:text-slate-200 hover:bg-[#DCFCE7] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors border border-[#E1EFE4] dark:border-white/10">Wholesale</span>
            <span className="text-[#D1D5DB] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4F9F5] dark:bg-white/5 text-[#1F2937] dark:text-slate-200 hover:bg-[#DCFCE7] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors border border-[#E1EFE4] dark:border-white/10">Retail</span>
            <span className="text-[#D1D5DB] dark:text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4F9F5] dark:bg-white/5 text-[#1F2937] dark:text-slate-200 hover:bg-[#DCFCE7] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors border border-[#E1EFE4] dark:border-white/10">Merchant Export</span>
          </div>

          {/* Description Narrative */}
          <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed">
            Dattatray Trading Company is engaged in the trading, wholesale, retail and merchant export of frozen food products. We supply quality frozen vegetables and frozen ready-to-eat snacks to hotels, restaurants, cafés, caterers, distributors, retailers, institutions and international buyers.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white dark:bg-[#0E1B15] hover:bg-[#F9FBFC] dark:hover:bg-slate-800 text-[#1F2937] dark:text-white hover:text-[#15803D] dark:hover:text-[#4ADE80] font-extrabold text-xs sm:text-sm border-2 border-[#15803D]/25 dark:border-white/20 hover:border-[#15803D] dark:hover:border-[#4ADE80] shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Send Enquiry</span>
              <ArrowUpRight className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" />
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
          <div className="pt-7 border-t border-[#EFECE6] dark:border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B7280] dark:text-slate-400 mb-3.5">
              Serving Across Key Sectors
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
              {/* Sector 1 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-[#FAFAFA] dark:bg-[#0E1B15] border border-[#E5E7EB] dark:border-white/10 hover:border-[#15803D]/50 hover:bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#EAEAEA] dark:bg-slate-800 group-hover:bg-[#15803D] dark:group-hover:bg-[#15803D] text-[#1F2937] dark:text-[#4ADE80] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-slate-200 group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] truncate">HoReCa &amp; Hotels</span>
              </div>

              {/* Sector 2 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-[#FAFAFA] dark:bg-[#0E1B15] border border-[#E5E7EB] dark:border-white/10 hover:border-[#15803D]/50 hover:bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#EAEAEA] dark:bg-slate-800 group-hover:bg-[#15803D] dark:group-hover:bg-[#15803D] text-[#1F2937] dark:text-[#4ADE80] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-slate-200 group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] truncate">B2B Wholesalers</span>
              </div>

              {/* Sector 3 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-[#FAFAFA] dark:bg-[#0E1B15] border border-[#E5E7EB] dark:border-white/10 hover:border-[#15803D]/50 hover:bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#EAEAEA] dark:bg-slate-800 group-hover:bg-[#15803D] dark:group-hover:bg-[#15803D] text-[#1F2937] dark:text-[#4ADE80] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-slate-200 group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] truncate">Retail Stores</span>
              </div>

              {/* Sector 4 */}
              <div className="group min-w-0 inline-flex items-center justify-start sm:justify-center gap-2 px-2.5 sm:px-2.5 py-2 rounded-xl bg-[#FAFAFA] dark:bg-[#0E1B15] border border-[#E5E7EB] dark:border-white/10 hover:border-[#15803D]/50 hover:bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#EAEAEA] dark:bg-slate-800 group-hover:bg-[#15803D] dark:group-hover:bg-[#15803D] text-[#1F2937] dark:text-[#4ADE80] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1F2937] dark:text-slate-200 group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] truncate">Global Importers</span>
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
                  className="card reefer-deck-card absolute inset-0 w-full h-full rounded-[26px] sm:rounded-[30px] overflow-hidden border border-white/60 bg-[#142318] shadow-2xl transform-gpu select-none"
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

                  {/* Soft Frosted Overlay for Cards Behind */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      !isFront ? "opacity-100 bg-[#0A1F14]/75 backdrop-blur-[2px]" : "opacity-0"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-[#15803D] text-white border border-white/30 hover:border-[#22C55E] backdrop-blur-md text-xs font-black shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{slide.badge}</span>
                      </button>

                      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
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
                                st.highlight ? "text-[#D4AF37]" : "text-white"
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
                        <span className="inline-flex items-center gap-1.5 text-[#4ADE80] font-bold">
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
      </div>
    </section>
  );
}

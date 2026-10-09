import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import {
  Building,
  Truck,
  Handshake,
  Sparkles,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Anchor,
  Leaf,
  Ship,
  Store,
  UtensilsCrossed,
  Building2,
  Users,
  Package,
  Globe,
} from "lucide-react";
import TradingRouteVisual from "../components/trading/TradingRouteVisual";
import ImageSlider3D from "../components/lightswind/3d-image-slider";
import tradeCtaBg from "../assets/trade_cta_bg.png";

import { SplitTextHeading } from "../components/common";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger, Flip);

const marketIcons = {
  "Retail & Food Service": Store,
  "HORECA & Modern Trade": UtensilsCrossed,
  "HORECA & Foodservice Chains": UtensilsCrossed,
  "Indian Grocery & Supermarket Chains": Store,
  "Indian Grocery & Retail Distribution": Store,
  "Specialty & Organic Food Retail": Store,
  "Private Label & Distribution": Building2,
  "Rotterdam Gateway Hub": Building2,
  "Premium Retail Chains & QSRs": Store,
  "Premium Retail Chains & HORECA": UtensilsCrossed,
  "Ethnic Food Retail & Wholesalers": Users,
  "Specialty Food Import & B2B": Package,
  "Global HQ & Processing Facilities": Building,
  "Institutional Foodservice": UtensilsCrossed,
};

const exportRegions = [
  {
    continent: "Europe",
    accent: "from-blue-500 to-blue-700",
    borderAccent: "hover:border-blue-500/50",
    badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/40",
    countries: [
      { flag: "https://flagcdn.com/w80/gb.png", region: "United Kingdom", markets: "Retail & Food Service", port: "Port of Felixstowe / London Gateway" },
      { flag: "https://flagcdn.com/w80/de.png", region: "Germany", markets: "Private Label & Distribution", port: "Port of Hamburg" },
      { flag: "https://flagcdn.com/w80/nl.png", region: "Netherlands", markets: "Rotterdam Gateway Hub", port: "Port of Rotterdam" },
    ],
  },
  {
    continent: "UAE, GCC & KSA",
    accent: "from-amber-500 to-amber-700",
    borderAccent: "hover:border-amber-500/50",
    badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",
    countries: [
      { flag: "https://flagcdn.com/w80/ae.png", region: "UAE", markets: "HORECA & Modern Trade", port: "Jebel Ali Port (Dubai)" },
      { flag: "https://flagcdn.com/w80/sa.png", region: "Saudi Arabia (KSA)", markets: "HORECA & Foodservice Chains", port: "Jeddah Islamic Port" },
      { flag: "https://flagcdn.com/w80/kw.png", region: "GCC / Kuwait", markets: "Retail & Food Service", port: "Shuwaikh Port" },
      { flag: "https://flagcdn.com/w80/qa.png", region: "Qatar", markets: "Institutional Foodservice", port: "Hamad Port" },
    ],
  },
  {
    continent: "Americas",
    accent: "from-red-500 to-red-700",
    borderAccent: "hover:border-red-500/50",
    badgeColor: "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800/40",
    countries: [
      { flag: "https://flagcdn.com/w80/us.png", region: "United States", markets: "Indian Grocery & Supermarket Chains", port: "Port of NY/NJ & Long Beach" },
      { flag: "https://flagcdn.com/w80/ca.png", region: "Canada", markets: "Indian Grocery & Retail Distribution", port: "Port of Vancouver & Montreal" },
    ],
  },
  {
    continent: "Asia Pacific",
    accent: "from-emerald-500 to-emerald-700",
    borderAccent: "hover:border-emerald-500/50",
    badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40",
    countries: [
      { flag: "https://flagcdn.com/w80/in.png", region: "India", markets: "Global HQ & Processing Facilities", port: "JNPT Nhava Sheva & Mundra" },
      { flag: "https://flagcdn.com/w80/au.png", region: "Australia", markets: "Specialty & Organic Food Retail", port: "Port of Sydney & Melbourne" },
      { flag: "https://flagcdn.com/w80/nz.png", region: "New Zealand", markets: "Ethnic Food Retail & Wholesalers", port: "Port of Auckland" },
      { flag: "https://flagcdn.com/w80/sg.png", region: "Singapore", markets: "Premium Retail Chains & QSRs", port: "Port of Singapore" },
      { flag: "https://flagcdn.com/w80/my.png", region: "Malaysia", markets: "Premium Retail Chains & HORECA", port: "Port Klang" },
      { flag: "https://flagcdn.com/w80/jp.png", region: "Japan", markets: "Specialty Food Import & B2B", port: "Port of Tokyo & Yokohama" },
    ],
  },
];

// Flatten all countries with tags
const allExportCountries = exportRegions.flatMap((group) =>
  group.countries.map((c) => ({
    ...c,
    continent: group.continent,
    accent: group.accent,
    borderAccent: group.borderAccent,
    badgeColor: group.badgeColor,
  }))
);

export default function TradingPage() {
  const { isDark } = useTheme();
  const heroHeadingRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const panelsTrackRef = useRef(null);
  const corridorsContainerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(1);

  // GSAP Flip Interaction Handler for Stage Cards
  const handleStageSelect = (stageIdx) => {
    if (activeStage === stageIdx) return;
    const cards = corridorsContainerRef.current?.querySelectorAll(".corridor-card");
    if (!cards) {
      setActiveStage(stageIdx);
      return;
    }
    const state = Flip.getState(cards);
    setActiveStage(stageIdx);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.4,
        ease: "power2.inOut",
        absolute: false,
      });
    });
  };

  // GSAP Bounce-In Effect for Hero Heading
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

  // GSAP Pinned Horizontal Panels Animation
  useEffect(() => {
    const container = horizontalContainerRef.current;
    const track = panelsTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel-card", track);
      if (!panels.length) return;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => "+=" + container.offsetWidth,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const tradingDivisions = [
    {
      id: "horeca",
      num: "01",
      title: "HoReCa & Institutional Foodservice Supply",
      badge: "HOTELS, CATERERS & CLOUD KITCHENS",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
      accentBg: "bg-amber-500/15 text-amber-500",
      icon: Building,
      desc: "Dedicated institutional bulk distribution supplying 5-star hotels, multi-chain restaurants, hospital cafeterias, flight kitchens, and rapid cloud kitchens across Western & Central India.",
      metrics: [
        { label: "Packs Offered", val: "1kg, 2.5kg & 5kg Foodservice" },
        { label: "Dispatch Frequency", val: "Daily Scheduled Slots" },
        { label: "Key Commodities", val: "IQF Green Peas, Sweet Corn, French Fries & Paneer" }
      ],
      features: [
        "Unbroken cold-chain delivery direct to your kitchen freezer",
        "Consistent sizing, zero blemish tolerance, uniform cooking results",
        "Flexible weekly standing orders with consolidated billing",
        "Dedicated account manager & emergency backup stock reserves"
      ]
    },
    {
      id: "wholesale",
      num: "02",
      title: "Pan-India Wholesale & B2B Reefer Fleet",
      badge: "FULL-TRUCKLOAD (FTL) & CONSOLIDATION",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-[#8CC9D9]",
      accentBg: "bg-cyan-500/15 text-cyan-400",
      icon: Truck,
      desc: "Direct volume supply for regional FMCG stockists, wholesale agro-mandis, and supermarket cold storage warehouses with continuous IoT temperature telemetry.",
      metrics: [
        { label: "Fleet Capacity", val: "5 MT to 25 MT Multizone Reefers" },
        { label: "Core Temp", val: "-18°C to -25°C Continuous" },
        { label: "Insurance", val: "100% Comprehensive Transit Cover" }
      ],
      features: [
        "Daily FTL dispatches with live GPS route & temperature telemetry",
        "Tamper-evident container bolt seals and digital temperature data loggers",
        "Pre-cooled loading bays preventing heat shock during transit",
        "Volume-tiered commercial pricing and seasonal forward booking contracts"
      ]
    },
    {
      id: "export",
      num: "03",
      title: "Merchant Export & Global Cold-Chain Shipping",
      badge: "APEDA & FSSAI CERTIFIED MULTI-PORT EXPORT",
      color: "from-sky-500/20 to-indigo-500/10 border-sky-500/30 text-sky-400",
      accentBg: "bg-sky-500/15 text-sky-400",
      icon: Globe2,
      desc: "Licensed export operations handling container stuffing, phytosanitary clearances, ocean freight reefer booking, and expedited customs forwarding to international seaports.",
      metrics: [
        { label: "Primary Ports", val: "JNPT (Nhava Sheva) & Mundra Port" },
        { label: "Export Destinations", val: "UAE, Saudi, UK, USA, Singapore & EU" },
        { label: "Certifications", val: "APEDA, FSSAI, ISO 22000, Agmark" }
      ],
      features: [
        "40ft High-Cube Reefer Containers with unbroken -18°C setpoint",
        "Complete export documentation: Certificate of Origin, Phytosanitary, Bill of Lading",
        "Pre-shipment SGS / NABL accredited laboratory clearance for every container",
        "Direct trade clearing via international Letter of Credit (LC) and TT terms"
      ]
    },
    {
      id: "mandi",
      num: "04",
      title: "Direct APMC Mandi Sourcing & Pre-Harvest Sourcing",
      badge: "LICENSED COMMISSION OPERATIONS",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
      accentBg: "bg-emerald-500/15 text-emerald-400",
      icon: Handshake,
      desc: "Direct procurement footprint across premier agricultural APMC mandis in Maharashtra, enabling direct auction bidding, aggregate volume purchasing, and pre-harvest farmer partnerships.",
      metrics: [
        { label: "Annual Volume", val: "5,000+ Metric Tons Procured" },
        { label: "Farmer Clusters", val: "2,500+ Verified Direct Growers" },
        { label: "Quality Audit", val: "On-site Moisture, Brix & Sizing" }
      ],
      features: [
        "Spot auction bidding at verified market yards ensures best harvest pricing",
        "Direct pre-harvest contracts with assured buyback terms for regional growers",
        "Elimination of excessive middle tiers, ensuring fresher harvest turnaround",
        "Prompt, transparent financial settlement directly empowering agrarian communities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FBFC] dark:bg-[#06100B] text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. GRAND HERO BANNER WITH CONDITIONAL THEME ADAPTATION
             - Light Mode: Rich Botanical Green Palette (Emerald / Jade / Mint)
             - Dark Theme: Blueish Palette (Deep Midnight Navy / Cyan / Sky Blue)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-20 sm:pt-30 md:pt-36 pb-34 sm:pb-34 md:pb-38 overflow-hidden text-white transition-all duration-500 ${
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

        <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4 sm:space-y-5">
          
          {/* TOP PORTION: Heading on Left & Action Buttons Vertically Centered on Right */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">
            
            {/* Left: Badge, Heading & Subtitle */}
            <div className="max-w-3xl space-y-3 sm:space-y-3.5">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm bg-emerald-950/70 border border-[#D4AF37]/40 text-[#F3E5AB]"
              >
                <span className="leading-tight">PAN-INDIA DISTRIBUTION • GLOBAL MERCHANT EXPORT</span>
              </div>

              {/* Main Page Heading */}
              <div className="py-0.5 space-y-1.5">
                <h1 className="font-sans tracking-tight leading-[1.08]">
                  <span
                    className="heading-bounce block text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] select-none transition-all duration-500"
                  >
                    B2B AGRO TRADING
                  </span>
                  <span className="heading-bounce block text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    &amp; MULTIMODAL EXPORT
                  </span>
                </h1>

                <div className="heading-bounce flex items-center gap-2 pt-0.5">
                  <div
                    className="h-[2px] w-8 rounded-full bg-[#D4AF37]"
                  />
                  <span
                    className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[#F3E5AB]"
                  >
                    COLD-CHAIN DISTRIBUTION &amp; APMC PROCUREMENT
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons Perfectly Centered Vertically */}
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#021A13]"
              >
                <span>Inquire Commercial Bulk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="#divisions-container"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-emerald-950/50 text-white border border-emerald-500/30 hover:border-[#D4AF37]"
              >
                <span>View Trading Divisions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* FULL-WIDTH MULTIMODAL HIGHWAY ROUTE: Left Start Point (India) to Right End Point (Global Ports) */}
          <div className="w-full pt-4 sm:pt-6 pb-1">
            <TradingRouteVisual />
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
          2. MULTIMODAL INFRASTRUCTURE & PORT NETWORK CORRIDORS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#F9FBFC] dark:bg-[#06100B] border-b border-slate-200/80 dark:border-white/10 transition-colors relative overflow-hidden">
        
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#1E56C8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] mb-3.5 shadow-sm">
              <Anchor className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37]" />
              <span>Multimodal Transit Corridors</span>
            </div>
            <SplitTextHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15] mb-3"
            >
              From APMC Market Yards to <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Global Container Berths
              </span>
            </SplitTextHeading>
            <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Operating a seamless 3-stage cold chain corridor connecting Nashik, Pune, and Mumbai processing hubs with major western container terminals.
            </p>
          </div>

          {/* 3 Corridor Stage Cards with GSAP Flip Interactive Selection */}
          <div ref={corridorsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            
            {/* Stage 01 */}
            <div
              onClick={() => handleStageSelect(1)}
              className={`corridor-card cursor-pointer group relative rounded-3xl bg-white dark:bg-[#0E1B15] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                activeStage === 1
                  ? "ring-2 ring-emerald-500 border-emerald-500 shadow-[0_20px_45px_rgba(16,185,129,0.2)] scale-[1.02] bg-emerald-50/20 dark:bg-emerald-950/30"
                  : "border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-1"
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              
              {/* Ambient corner glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header with Step badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                      STAGE 01 • ORIGIN
                    </span>
                    {activeStage === 1 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
                        ● Active Phase
                      </span>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform shadow-sm ${
                    activeStage === 1
                      ? "bg-emerald-500 text-white scale-110 shadow-emerald-500/30"
                      : "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 group-hover:scale-110"
                  }`}>
                    <Leaf className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0B2546] dark:text-white tracking-tight leading-snug">
                    Farm Gate &amp; Mandi Pre-Cooling
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    Nashik &amp; Ahilyanagar Direct Hubs
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Direct procurement from Nashik &amp; Ahilyanagar farm clusters with rapid hydro-cooling and pre-cooling within 3 hours of harvest to arrest cellular respiration.
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>5,000+ MT Bulk Cold Warehousing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Rapid 3-Hour Post-Harvest Pre-Cooling</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Moisture, Brix &amp; Size Grading Audit</span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Tag */}
              <div className={`p-4 border-t flex items-center justify-between text-xs font-black transition-colors ${
                activeStage === 1
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
                  : "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}>
                <span>✦ Farm Gate Direct Traceability</span>
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Stage 02 */}
            <div
              onClick={() => handleStageSelect(2)}
              className={`corridor-card cursor-pointer group relative rounded-3xl bg-white dark:bg-[#0E1B15] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                activeStage === 2
                  ? "ring-2 ring-[#38BDF8] border-[#38BDF8] shadow-[0_20px_45px_rgba(56,189,248,0.2)] scale-[1.02] bg-sky-50/20 dark:bg-sky-950/30"
                  : "border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-sky-500/40 hover:-translate-y-1"
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-blue-500" />
              
              {/* Ambient corner glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header with Step badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-500/30 text-sky-700 dark:text-[#38BDF8]">
                      STAGE 02 • TRANSIT
                    </span>
                    {activeStage === 2 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38BDF8] text-slate-900 text-[9px] font-black uppercase tracking-wider animate-pulse">
                        ● Active Phase
                      </span>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform shadow-sm ${
                    activeStage === 2
                      ? "bg-[#38BDF8] text-slate-900 scale-110 shadow-sky-500/30"
                      : "bg-sky-500/10 dark:bg-sky-500/20 text-[#38BDF8] group-hover:scale-110"
                  }`}>
                    <Truck className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0B2546] dark:text-white tracking-tight leading-snug">
                    -18°C Reefer Highway Transport
                  </h3>
                  <span className="text-[11px] font-bold text-[#38BDF8] block mt-0.5">
                    Continuous IoT Telemetry &amp; GPS Tracking
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Dedicated company-supervised refrigerated container fleet equipped with automated IoT thermal alarms, dual-generator backups, and tamper-proof bolt seals.
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>100% Zero Thermal Breaches Track Record</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>-18°C to -25°C Continuous Setpoint Control</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Real-Time Geo-Fencing &amp; Tamper Alarms</span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Tag */}
              <div className={`p-4 border-t flex items-center justify-between text-xs font-black transition-colors ${
                activeStage === 2
                  ? "bg-sky-500/15 border-sky-500/30 text-sky-900 dark:text-sky-200"
                  : "bg-sky-50/60 dark:bg-sky-950/30 border-sky-100 dark:border-sky-500/20 text-sky-700 dark:text-[#38BDF8]"
              }`}>
                <span>✦ Active IoT Temperature Data Logging</span>
                <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Stage 03 */}
            <div
              onClick={() => handleStageSelect(3)}
              className={`corridor-card cursor-pointer group relative rounded-3xl bg-white dark:bg-[#0E1B15] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                activeStage === 3
                  ? "ring-2 ring-purple-500 border-purple-500 shadow-[0_20px_45px_rgba(168,85,247,0.2)] scale-[1.02] bg-purple-50/20 dark:bg-purple-950/30"
                  : "border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-purple-500/40 hover:-translate-y-1"
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />
              
              {/* Ambient corner glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header with Step badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-500/30 text-purple-700 dark:text-purple-300">
                      STAGE 03 • EXPORT BERTH
                    </span>
                    {activeStage === 3 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
                        ● Active Phase
                      </span>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform shadow-sm ${
                    activeStage === 3
                      ? "bg-purple-500 text-white scale-110 shadow-purple-500/30"
                      : "bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 group-hover:scale-110"
                  }`}>
                    <Ship className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0B2546] dark:text-white tracking-tight leading-snug">
                    JNPT &amp; Mundra Deep-Sea Export
                  </h3>
                  <span className="text-[11px] font-bold text-purple-500 dark:text-purple-400 block mt-0.5">
                    Direct Ocean Reefer Container Staging
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Expedited customs green-channel forwarding, phytosanitary clearance, and automated reefer container plug-in at Western India's primary gateway sea berths.
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Global Port Linkages across 12+ Nations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>40ft High-Cube Reefer Ocean Freight</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B2546] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Complete Export Documentation &amp; LC Settlement</span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Tag */}
              <div className={`p-4 border-t flex items-center justify-between text-xs font-black transition-colors ${
                activeStage === 3
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-900 dark:text-purple-200"
                  : "bg-purple-50/60 dark:bg-purple-950/30 border-purple-100 dark:border-purple-500/20 text-purple-700 dark:text-purple-300"
              }`}>
                <span>✦ Direct Deep-Sea Berth Dispatch</span>
                <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2.5 GLOBAL EXPORT FOOTPRINT & INTERNATIONAL DESTINATIONS (CURRYMIYA EXPORT)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 max-w-[96%] 2xl:max-w-[1660px] mx-auto px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header - Clean Centered / Left Aligned without filters */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] mb-3.5 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37]" />
              <span>APEDA &amp; FSSAI Certified Global Corridors</span>
            </div>
            <SplitTextHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15] mb-2"
            >
              Global Export Destinations &amp;{" "}
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Distribution Markets
              </span>
            </SplitTextHeading>
            <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 mt-1 max-w-3xl font-medium leading-relaxed">
              Supplying premier frozen vegetables, IQF commodities, and processed agro lines to institutional buyers, ethnic grocery chains, and supermarket networks across 30+ countries.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>360° Global Reefer Corridors</span>
          </div>
        </div>

        {/* 3D Rotating Horizontal Slider for Country Destination Cards - Large Nation Flags & Snug Fit */}
        <div className="relative z-10 w-full min-h-[400px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
          <ImageSlider3D
            items={allExportCountries}
            duration={36}
            cardWidth="22.5em"
            cardAspectRatio="4/3.2"
            perspective="75em"
            renderItem={(country) => {
              const Icon = marketIcons[country.markets] || Store;
              return (
                <div
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0E1B15] p-4 sm:p-5 shadow-2xl ${country.borderAccent} hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full w-full select-none`}
                >
                  {/* Top Color Accent Line */}
                  <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${country.accent}`} />

                  <div className="flex flex-col items-center text-center">
                    {/* Enlarged Flag with Market Icon badge */}
                    <div className="relative mb-2 mt-1">
                      <img
                        src={country.flag}
                        alt={country.region}
                        className="w-36 sm:w-40 h-22 sm:h-24 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-xl ring-1 ring-black/10 group-hover:scale-105 transition-transform"
                        loading="lazy"
                        draggable="false"
                      />
                      <div
                        className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${country.accent} text-white rounded-full p-2 shadow-md border-2 border-white dark:border-slate-800`}
                      >
                        <Icon size={15} strokeWidth={2.5} />
                      </div>
                    </div>

                    <h4 className="font-black text-[#0B2546] dark:text-white text-lg sm:text-xl leading-tight group-hover:text-[#1E56C8] dark:group-hover:text-[#8CC9D9] transition-colors mt-1">
                      {country.region}
                    </h4>
                    
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">
                      {country.continent}
                    </span>

                    <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold leading-tight w-full shadow-inner">
                      {country.markets}
                    </div>
                  </div>

                  {/* Port of Entry */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="truncate pr-1">⚓ {country.port}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. GSAP PINNED HORIZONTAL TRADING DIVISIONS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="divisions-container"
        ref={horizontalContainerRef}
        className="relative overflow-hidden py-10 sm:py-14 bg-gradient-to-b from-[#F9FBFC] via-slate-100/60 to-[#F9FBFC] dark:from-[#06100B] dark:via-[#0E1B15] dark:to-[#06100B] transition-colors duration-300"
      >
        {/* Ambient decorative glowing spots */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#8CC9D9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#3B1F3A]/20 dark:bg-[#059669]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[96%] 2xl:max-w-[1660px] mx-auto px-4 sm:px-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] mb-3.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37]" />
              <span>Core Trading Verticals</span>
            </div>
            <SplitTextHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15] mb-2"
            >
              Specialized B2B{" "}
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Cold-Chain Supply Divisions
              </span>
            </SplitTextHeading>
            <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 mt-1 max-w-2xl font-medium leading-relaxed">
              Scroll horizontally to inspect our end-to-end institutional HoReCa distribution, wholesale reefer fleet, global merchant export, and APMC mandi procurement capabilities.
            </p>
          </div>

          {/* Scroll indicator with animated track dots */}
          <div className="hidden sm:flex items-center gap-3 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-sm shrink-0">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Scroll to Explore
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8CC9D9] animate-ping" />
              <span className="text-xs font-black text-[#0B2546] dark:text-[#8CC9D9]">4 Verticals ➔</span>
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Track */}
        <div
          ref={panelsTrackRef}
          className="panels-track flex flex-nowrap w-full will-change-transform"
        >
          {tradingDivisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className="panel-card w-full min-w-full shrink-0 px-3 sm:px-6 lg:px-10 flex justify-center items-center"
              >
                <div className="w-full max-w-5xl rounded-3xl bg-white dark:bg-[#0E1B15] border border-slate-200/90 dark:border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
                  {/* Ambient corner card gradient */}
                  <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${div.color} rounded-full blur-3xl pointer-events-none opacity-40`} />

                  {/* Top Bar: Number + Category Badge + Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-slate-300 dark:text-slate-600 font-mono tracking-tighter">
                        {div.num}
                      </span>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-[#3B1F3A] dark:text-[#8CC9D9] border border-slate-200 dark:border-white/10">
                        {div.badge}
                      </span>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl ${div.accentBg} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* 2-Column Content Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left Column: Title, Desc, Metrics */}
                    <div className="lg:col-span-7 space-y-4">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B2546] dark:text-white tracking-tight leading-tight">
                        {div.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 leading-relaxed font-medium">
                        {div.desc}
                      </p>

                      {/* 3 Metrics Pills */}
                      <div className="grid grid-cols-3 gap-2.5 py-3.5 px-4 rounded-2xl bg-slate-50 dark:bg-[#06100B] border border-slate-200/70 dark:border-white/10">
                        {div.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                              {m.label}
                            </span>
                            <span className="block text-xs sm:text-sm font-black text-[#0B2546] dark:text-white mt-0.5 leading-tight">
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Capabilities & Action CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 bg-slate-50/70 dark:bg-[#0A1611]/80 p-5 rounded-2xl border border-slate-200/60 dark:border-white/10">
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Operational Highlights:
                        </span>
                        {div.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#475569] dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-[11px] font-black text-[#0B2546] dark:text-white">
                            Commercial Bulk Supply
                          </span>
                          <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            Direct Contract Pricing
                          </span>
                        </div>
                        <Link
                          to={`/contact?segment=${div.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#3B1F3A] hover:bg-[#522c51] dark:bg-[#1E56C8] dark:hover:bg-[#17449e] text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                          <span>Request Quote</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. COMMERCIAL TRADE TERMS & FAQ CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/15 p-8 sm:p-12 lg:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#06100B]">
          
          {/* Background Image Layer with Beautiful Visual Depth */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={tradeCtaBg}
              alt="Dattatray Export Logistics"
              className="w-full h-full object-cover object-center lg:object-right opacity-80 dark:opacity-70 filter brightness-90 contrast-105 transform scale-105 transition-transform duration-700 hover:scale-100"
            />
            {/* Elegant Directional Gradient for Perfect Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06100B] via-[#06100B]/90 to-[#06100B]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06100B]/80 via-transparent to-[#06100B]/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-3.5 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Commercial Escrow &amp; Transparent Terms</span>
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              Ready to Lock in Contract Volume or{" "}
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Procure Spot Loads?
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-medium drop-shadow">
              Connect directly with our Chief Trading Officer for institutional price sheets, harvest projections, and customized cold-chain delivery schedules.
            </p>
          </div>

          {/* Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3.5 shrink-0 bg-black/30 backdrop-blur-md p-2 sm:p-2.5 rounded-full border border-white/10 shadow-2xl">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] hover:brightness-110 text-[#01140E] font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Contact Trading Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300"
            >
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

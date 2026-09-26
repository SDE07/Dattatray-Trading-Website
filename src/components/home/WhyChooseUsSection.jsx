import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Truck,
  Globe2,
  Leaf,
  PackageCheck,
  Headset,
} from "lucide-react";
import whyChooseHeroImg from "../../assets/why_choose_hero_hd.png";
import dattatrayLogo from "../../assets/logo.png";
import SplitTextHeading from "../common/SplitTextHeading";

// Custom Rupee Coin Stack Icon
const RupeeCoinStackIcon = ({ className = "w-5 h-5 text-white" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="15.5" cy="7" rx="4.5" ry="1.8" fill="white" fillOpacity="0.9" />
    <path
      d="M11 7v6.5c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V7"
      stroke="white"
      strokeWidth="1.2"
      fill="white"
      fillOpacity="0.3"
    />
    <path
      d="M11 10.2c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8"
      stroke="white"
      strokeWidth="1.2"
    />
    <circle cx="8" cy="14" r="5.2" fill="white" />
    <text
      x="8"
      y="16.6"
      textAnchor="middle"
      fill="#C0392B"
      fontSize="7"
      fontWeight="900"
      fontFamily="sans-serif"
    >
      ₹
    </text>
  </svg>
);

const whyChooseLeft = [
  {
    icon: Leaf,
    title: "Quality Products",
    desc: "Frozen vegetables and ready-to-eat snacks from trusted suppliers.",
    gradient: "bg-gradient-to-br from-[#2ECC71] via-[#27AE60] to-[#1E824C]",
  },
  {
    icon: PackageCheck,
    title: "Wide Product Range",
    desc: "Vegetables, ready-to-eat snacks and multiple categories under one platform.",
    gradient: "bg-gradient-to-br from-[#F39C12] via-[#E67E22] to-[#D35400]",
  },
  {
    icon: RupeeCoinStackIcon,
    title: "Competitive Pricing",
    desc: "Wholesale-oriented pricing based on quantity and specifications.",
    gradient: "bg-gradient-to-br from-[#E74C3C] via-[#C0392B] to-[#96281B]",
  },
];

const whyChooseRight = [
  {
    icon: Truck,
    title: "Reliable Supply",
    desc: "Consistent and timely supply for regular and bulk requirements.",
    gradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
  },
  {
    icon: Globe2,
    title: "Domestic & International",
    desc: "Serving customers across India and global markets.",
    gradient: "bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]",
  },
  {
    icon: Headset,
    title: "Customer Focused Service",
    desc: "Understanding your needs and providing suitable solutions.",
    gradient: "bg-gradient-to-br from-[#06B6D4] via-[#0891B2] to-[#0E7490]",
  },
];

/**
 * WhyChooseUsSection: 3-column layout with left/right feature cards & center hero image.
 */
export default function WhyChooseUsSection() {
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const FeatureCard = ({ feature, idx, side }) => {
    const Icon = feature.icon;
    const delayMs = 250 + idx * 120;
    const isLeft = side === "left";
    const slideDir = isLeft ? "-translate-x-8" : "translate-x-8";

    return (
      <div
        className={`group relative w-full max-w-[350px] sm:max-w-[370px] xl:max-w-[390px] flex items-center justify-between gap-3 sm:gap-3.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white dark:bg-[#0B1B2F] border-2 border-[#1E56C8] dark:border-[#38BDF8]/60 shadow-[0_4px_16px_rgba(30,86,200,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(30,86,200,0.18)] dark:hover:shadow-[0_8px_24px_rgba(56,189,248,0.25)] hover:border-[#13429E] dark:hover:border-[#38BDF8] transition-all duration-300 hover:-translate-y-0.5 cursor-default ${
          isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${slideDir}`
        }`}
        style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
      >
        {!isLeft && (
          <div className="relative shrink-0 p-[3px] rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 shadow-[0_3px_8px_rgba(0,0,0,0.18)] ring-1 ring-slate-200 dark:ring-white/10">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 ${feature.gradient}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            </div>
          </div>
        )}

        <div className={`flex-1 min-w-0 ${isLeft ? "text-right pr-1 sm:pr-2" : "text-left pl-1 sm:pl-2"}`}>
          <h4 className="text-[14px] sm:text-[15px] font-black text-[#0B2546] dark:text-white tracking-tight leading-snug mb-0.5">
            {feature.title}
          </h4>
          <p className="text-[11px] sm:text-[12px] text-[#475569] dark:text-slate-300 leading-snug">
            {feature.desc}
          </p>
        </div>

        {isLeft && (
          <div className="relative shrink-0 p-[3px] rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 shadow-[0_3px_8px_rgba(0,0,0,0.18)] ring-1 ring-slate-200 dark:ring-white/10">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 ${feature.gradient}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#F9FBFC] via-white to-[#F4F8FA] dark:from-[#07111E] dark:via-[#09172A] dark:to-[#07111E] py-14 sm:py-18 lg:py-20 overflow-hidden transition-colors duration-300"
    >
      {/* Ambient light behind central woman */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-b from-[#8CC9D9]/15 dark:from-[#38BDF8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E56C8]/8 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/15 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8] text-[11px] font-black uppercase tracking-[0.2em] mb-3.5 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E56C8] dark:text-[#38BDF8]" />
            Why Choose Us
          </div>
          <SplitTextHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15]"
          >
            Why Choose <span className="text-[#1E56C8] dark:text-[#38BDF8]">Dattatray</span> Trading?
          </SplitTextHeading>
        </div>

        {/* 3-Column Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-6 xl:gap-10 w-full mx-auto">

          {/* Left Column: 3 Feature Cards */}
          <div className="w-full lg:w-[350px] xl:w-[380px] flex flex-col items-center lg:items-end space-y-4 sm:space-y-4.5 order-2 lg:order-1 shrink-0">
            {whyChooseLeft.map((f, i) => (
              <FeatureCard key={f.title} feature={f} idx={i} side="left" />
            ))}
          </div>

          {/* Center Column: Hero Image with Logo Watermark and Ribbon */}
          <div
            className={`flex-1 flex flex-col items-center justify-center order-1 lg:order-2 px-2 transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative flex flex-col items-center">
              {/* Dattatray Watermark Logo & Halo */}
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[400px] lg:w-[440px] xl:w-[460px] h-[320px] sm:h-[400px] lg:h-[440px] xl:h-[460px] pointer-events-none -z-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8CC9D9]/25 via-[#1E56C8]/15 dark:from-[#38BDF8]/25 dark:via-[#1E56C8]/20 to-transparent rounded-full blur-2xl transform scale-100" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-dashed border-[#1E56C8]/25 dark:border-[#38BDF8]/35 animate-[spin_90s_linear_infinite]" />
                <div className="absolute inset-7 sm:inset-9 rounded-full border border-[#8CC9D9]/35 dark:border-[#8CC9D9]/45" />

                <img
                  src={dattatrayLogo}
                  alt="Dattatray Trading Watermark"
                  className="w-[84%] h-[84%] object-contain opacity-[0.22] dark:opacity-[0.32] filter drop-shadow-sm select-none"
                />
              </div>

              {/* Foreground Hero Image */}
              <img
                src={whyChooseHeroImg}
                alt="Dattatray Trading Company - Connecting Good Food to a Better Tomorrow"
                className="w-full max-w-[200px] sm:max-w-[230px] lg:max-w-[255px] xl:max-w-[275px] h-auto object-contain mx-auto select-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)] relative z-10 transition-transform duration-500 hover:scale-102"
                loading="lazy"
              />

              {/* Luxury Branded Ribbon Banner */}
              <div
                className={`text-center mt-3.5 sm:mt-4 transition-all duration-700 delay-500 overflow-visible ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="relative inline-flex flex-col items-center px-5 sm:px-7 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-b from-white via-[#F6FAFC] to-[#E5F1F5] dark:from-[#0B1B2F] dark:via-[#0E2542] dark:to-[#07111E] border-2 border-[#8CC9D9]/50 dark:border-[#38BDF8]/40 shadow-[0_8px_20px_rgba(30,86,200,0.10)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight bg-gradient-to-r from-[#0B2546] via-[#1E56C8] to-[#0284C7] dark:from-white dark:via-[#8CC9D9] dark:to-[#38BDF8] bg-clip-text text-transparent uppercase">
                      Connecting Good Food
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-xs sm:text-[13px] font-extrabold italic tracking-wide bg-gradient-to-r from-[#059669] via-[#10B981] to-[#047857] dark:from-[#34D399] dark:via-[#6EE7B7] dark:to-[#10B981] bg-clip-text text-transparent font-serif">
                      to a Better Tomorrow
                    </span>
                    <Leaf className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/30 shrink-0 -rotate-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="w-full lg:w-[350px] xl:w-[380px] flex flex-col items-center lg:items-start space-y-4 sm:space-y-4.5 order-3 shrink-0">
            {whyChooseRight.map((f, i) => (
              <FeatureCard key={f.title} feature={f} idx={i} side="right" />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

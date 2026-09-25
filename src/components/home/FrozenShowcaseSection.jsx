import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import packGreenPeas from "../../assets/pack_green_peas.jpg";
import packSamosaSpringrolls from "../../assets/pack_samosa_springrolls.jpg";
import packMangoPulp from "../../assets/pack_mango_pulp.jpg";
import packMomosFries from "../../assets/pack_momos_fries.jpg";

const marqueeProductsRow1 = [
  {
    id: "peas-corn",
    name: "IQF Green Peas & Sweet Corn",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "mango-pulp",
    name: "Alphonso Mango Pulp",
    category: "fruit-pulps",
    image: packMangoPulp,
    link: "/products?category=fruit-pulps",
  },
  {
    id: "sweet-corn",
    name: "Sweet Corn Kernels",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "pure-pulp-can",
    name: "Canned Alphonso Purée",
    category: "fruit-pulps",
    image: packMangoPulp,
    link: "/products?category=fruit-pulps",
  },
  {
    id: "mixed-veg",
    name: "4-Way Diced Mixed Veg",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "green-peas-bulk",
    name: "Bulk Green Peas (Grade A)",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
  },
];

const marqueeProductsRow2 = [
  {
    id: "samosa-rolls",
    name: "Punjabi Samosas & Spring Rolls",
    category: "rte-snacks",
    image: packSamosaSpringrolls,
    link: "/products?category=rte-snacks",
  },
  {
    id: "momos-fries",
    name: "Veg Momos & Golden Fries",
    category: "rte-snacks",
    image: packMomosFries,
    link: "/products?category=rte-snacks",
  },
  {
    id: "cocktail-samosa",
    name: "Crispy Cocktail Samosas",
    category: "rte-snacks",
    image: packSamosaSpringrolls,
    link: "/products?category=rte-snacks",
  },
  {
    id: "french-fries-classic",
    name: "Crispy Golden French Fries",
    category: "rte-snacks",
    image: packMomosFries,
    link: "/products?category=rte-snacks",
  },
  {
    id: "spring-rolls-deluxe",
    name: "Authentic Veg Spring Rolls",
    category: "rte-snacks",
    image: packSamosaSpringrolls,
    link: "/products?category=rte-snacks",
  },
  {
    id: "himalayan-momos",
    name: "Steamed Himalayan Momos",
    category: "rte-snacks",
    image: packMomosFries,
    link: "/products?category=rte-snacks",
  },
];

/**
 * FrozenShowcaseSection: Rich Deep Navy / Ocean Blue theme in Dark Mode with dual opposite marquee.
 */
export default function FrozenShowcaseSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#0A192F] via-[#071324] to-[#040C18] dark:from-[#07111E] dark:via-[#09172A] dark:to-[#040B14] border-y border-[#38BDF8]/25 py-12 sm:py-16 lg:py-20 relative overflow-hidden text-[#E2E8F0]">
      {/* Ambient Blue Glowing Flares */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1E56C8]/25 dark:bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-[#38BDF8]/20 dark:bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#0284C7]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/35 text-[#38BDF8] text-[11px] font-black uppercase tracking-[0.18em]">
            <span>Export &amp; HoReCa Packs</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.12]">
            Frozen Food &amp; <br />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8CC9D9] to-[#60A5FA] bg-clip-text text-transparent">
              Ready-to-Cook
            </span>
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
            Frozen snacks, momos, parathas, green peas, sweet corn, and tropical pulps flash-frozen at their peak. Ready when you are.
          </p>

          {/* Button */}
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#1E56C8] hover:from-[#38BDF8] hover:to-[#0284C7] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#0284C7]/25 hover:shadow-[#38BDF8]/40 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: 2 Rows of Floating Food Products (Opposite Marquee) */}
        <div className="lg:col-span-8 xl:col-span-8 relative overflow-hidden space-y-4">
          {/* Gradient Fade Masks in Sleek Navy Blues */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0A192F] dark:from-[#07111E] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#040C18] dark:from-[#040B14] to-transparent z-20" />

          {/* Row 1: Scrolling LEFT */}
          <div className="overflow-hidden py-1">
            <div className="animate-marquee-left flex items-center gap-4 sm:gap-5">
              {[...marqueeProductsRow1, ...marqueeProductsRow1].map((p, idx) => (
                <Link
                  key={`compact-r1-${p.id}-${idx}`}
                  to={p.link}
                  className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-[#0F223A]/80 hover:bg-[#152E4E] border border-white/10 hover:border-[#38BDF8]/70 backdrop-blur-md w-36 sm:w-44 lg:w-48 shrink-0 transition-all duration-300 hover:scale-105 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_28px_rgba(56,189,248,0.25)]"
                  title={p.name}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white text-center truncate w-full mt-2.5 px-1 group-hover:text-[#38BDF8] transition-colors">
                    {p.name.split("&")[0].trim()}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling RIGHT */}
          <div className="overflow-hidden py-1">
            <div className="animate-marquee-right flex items-center gap-4 sm:gap-5">
              {[...marqueeProductsRow2, ...marqueeProductsRow2].map((p, idx) => (
                <Link
                  key={`compact-r2-${p.id}-${idx}`}
                  to={p.link}
                  className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-[#0F223A]/80 hover:bg-[#152E4E] border border-white/10 hover:border-[#38BDF8]/70 backdrop-blur-md w-36 sm:w-44 lg:w-48 shrink-0 transition-all duration-300 hover:scale-105 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_28px_rgba(56,189,248,0.25)]"
                  title={p.name}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white text-center truncate w-full mt-2.5 px-1 group-hover:text-[#38BDF8] transition-colors">
                    {p.name.split("&")[0].trim()}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

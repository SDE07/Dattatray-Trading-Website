import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import packGreenPeas from "../../assets/pack_green_peas.jpg";
import packSweetCorn from "../../assets/pack_sweet_corn.jpg";
import packSamosaSpringrolls from "../../assets/pack_samosa_springrolls.jpg";
import packMangoPulp from "../../assets/pack_mango_pulp.jpg";
import packMomosFries from "../../assets/pack_momos_fries.jpg";
import packMalabarParatha from "../../assets/pack_malabar_paratha.jpg";
import packPureVegSnacks from "../../assets/pure_veg_snacks.jpg";

// Mixed Type Blend 1: Balanced synergy of IQF Vegetables, Ready-to-Cook Snacks & Fruit Pulps
const marqueeProductsRow1 = [
  {
    id: "peas-corn",
    name: "IQF Green Peas & Sweet Corn",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "samosa-rolls",
    name: "Punjabi Samosas & Rolls",
    category: "rte-snacks",
    image: packSamosaSpringrolls,
    link: "/products?category=rte-snacks",
  },
  {
    id: "mango-pulp",
    name: "Alphonso Mango Pulp",
    category: "fruit-pulps",
    image: packMangoPulp,
    link: "/products?category=fruit-pulps",
  },
  {
    id: "french-fries",
    name: "Crispy Golden French Fries",
    category: "rte-snacks",
    image: packMomosFries,
    link: "/products?category=rte-snacks",
  },
  {
    id: "sweet-corn",
    name: "Golden Sweet Corn Kernels",
    category: "frozen-vegetables",
    image: packSweetCorn,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "malabar-paratha",
    name: "Flaky Malabar Parathas",
    category: "rte-snacks",
    image: packMalabarParatha,
    link: "/products?category=rte-snacks",
  },
];

// Mixed Type Blend 2: Interleaved gourmet snacks, diced vegetables and puree
const marqueeProductsRow2 = [
  {
    id: "momos-fries",
    name: "Veg Momos & Golden Fries",
    category: "rte-snacks",
    image: packMomosFries,
    link: "/products?category=rte-snacks",
  },
  {
    id: "pure-veg-mix",
    name: "Chef Special Veg Medley",
    category: "frozen-vegetables",
    image: packPureVegSnacks,
    link: "/products?category=frozen-vegetables",
  },
  {
    id: "canned-pulp",
    name: "Canned Alphonso Purée",
    category: "fruit-pulps",
    image: packMangoPulp,
    link: "/products?category=fruit-pulps",
  },
  {
    id: "cocktail-samosa",
    name: "Crispy Cocktail Samosas",
    category: "rte-snacks",
    image: packSamosaSpringrolls,
    link: "/products?category=rte-snacks",
  },
  {
    id: "green-peas-bulk",
    name: "Bulk Grade-A Green Peas",
    category: "frozen-vegetables",
    image: packGreenPeas,
    link: "/products?category=frozen-vegetables",
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
 * FrozenShowcaseSection: Senior Executive Design
 * Clean Faint White / Warm Canvas matching the whole website seamlessly.
 * No dividing lines, smooth organic edge masks, and rich mixed-type product cards.
 */
export default function FrozenShowcaseSection() {
  return (
    <section className="relative w-full bg-white dark:bg-[#06100B] py-14 sm:py-18 lg:py-20 overflow-hidden text-[#1F2937] dark:text-[#E2E8F0] transition-colors duration-300">
      {/* ── Soft Ambient Warm Golden & Emerald Glow Orbs ── */}
      <div className="absolute -top-16 left-8 w-80 sm:w-96 h-80 sm:h-96 bg-[#C8A950]/8 dark:bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-16 right-8 w-80 sm:w-96 h-80 sm:h-96 bg-[#059669]/6 dark:bg-[#059669]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F2937] dark:text-white tracking-tight leading-[1.12]">
            Frozen Food &amp;{" "}
            <span className="block bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
              Ready-to-Cook
            </span>
          </h3>

          <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed max-w-md">
            A diverse, harmonious blend of flash-frozen green peas, sweet corn, golden samosas, authentic momos, flaky parathas, and rich Alphonso mango pulp. Frozen at peak harvest freshness.
          </p>

          {/* Senior High-Impact CTA Button */}
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:opacity-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#15803D]/25 hover:shadow-[#15803D]/35 border border-[#22C55E]/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: 2 Rows of Floating Food Products (Opposite Marquee with Faint Fade Masks) */}
        <div className="lg:col-span-8 xl:col-span-8 relative overflow-hidden space-y-4 sm:space-y-5">
          {/* Extended Gradient Fade Masks for Flawless Blending into Pure White Canvas */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-44 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#06100B] dark:via-[#06100B]/85 dark:to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white via-white/85 to-transparent dark:from-[#06100B] dark:via-[#06100B]/85 dark:to-transparent z-20" />

          {/* Row 1: Scrolling LEFT (Mixed Variety with Golden Gradient Cards) */}
          <div className="overflow-hidden py-1">
            <div className="animate-marquee-left flex items-center gap-4 sm:gap-5">
              {[...marqueeProductsRow1, ...marqueeProductsRow1].map((p, idx) => (
                <Link
                  key={`mixed-r1-${p.id}-${idx}`}
                  to={p.link}
                  className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#FFFDF7] via-[#FAF5EA] to-[#F5EBD7] dark:from-[#0E1B15] dark:via-[#0B1611] dark:to-[#06100B] border border-[#C8A950]/35 dark:border-[#D4AF37]/25 w-40 sm:w-48 lg:w-52 shrink-0 transition-all duration-300 hover:scale-105 shadow-[0_8px_24px_rgba(200,169,80,0.12)] hover:shadow-[0_14px_36px_rgba(200,169,80,0.25)] hover:border-[#C8A950]"
                  title={p.name}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-[#1F2937] dark:text-white group-hover:text-[#15803D] dark:group-hover:text-[#D4AF37] text-center truncate w-full mt-3 px-1 transition-colors">
                    {p.name.split("&")[0].trim()}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling RIGHT (Mixed Variety with Golden Gradient Cards) */}
          <div className="overflow-hidden py-1">
            <div className="animate-marquee-right flex items-center gap-4 sm:gap-5">
              {[...marqueeProductsRow2, ...marqueeProductsRow2].map((p, idx) => (
                <Link
                  key={`mixed-r2-${p.id}-${idx}`}
                  to={p.link}
                  className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#FFFDF7] via-[#FAF5EA] to-[#F5EBD7] dark:from-[#0E1B15] dark:via-[#0B1611] dark:to-[#06100B] border border-[#C8A950]/35 dark:border-[#D4AF37]/25 w-40 sm:w-48 lg:w-52 shrink-0 transition-all duration-300 hover:scale-105 shadow-[0_8px_24px_rgba(200,169,80,0.12)] hover:shadow-[0_14px_36px_rgba(200,169,80,0.25)] hover:border-[#C8A950]"
                  title={p.name}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-[#1F2937] dark:text-white group-hover:text-[#15803D] dark:group-hover:text-[#D4AF37] text-center truncate w-full mt-3 px-1 transition-colors">
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

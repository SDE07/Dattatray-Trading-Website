import React from "react";
import {
  Star,
  ThermometerSnowflake,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  Info
} from "lucide-react";

/**
 * Reusable B2B & Wholesale Product Card Component
 * - Large visual presentation & crisp packaging view
 * - Interactive "More Info" hover overlay on image
 * - Dattatray Logo Violet Brand Palette (#3B1F3A)
 * - Single prominent "Enquiry" button
 * - Zero consumer pricing
 */
export default function ProductCard({
  product,
  onEnquiry,
  onQuickView,
}) {
  const {
    name,
    isVeg,
    image,
    pack,
    rating,
    reviews,
    tag,
    specs = {},
  } = product;

  const handleAction = () => {
    if (onEnquiry) onEnquiry(product);
    else if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative bg-white dark:bg-[#0B1B2F] rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:border-[#3B1F3A]/40 dark:hover:border-[#8CC9D9]/50 shadow-[0_6px_25px_-5px_rgba(59,31,58,0.08)] dark:shadow-none hover:shadow-[0_22px_45px_-10px_rgba(59,31,58,0.22)] dark:hover:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.65)] transition-all duration-300 transform-gpu hover:-translate-y-1.5 overflow-hidden h-full">
      
      {/* ── Top Header: Veg/Non-Veg & Tag ── */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        {/* Diet Indicator Pill */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-white/10">
          <div
            className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
              isVeg ? "border-emerald-600 bg-white" : "border-rose-600 bg-white"
            }`}
            title={isVeg ? "100% Vegetarian" : "Non-Vegetarian"}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? "bg-emerald-600" : "bg-rose-600"
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-black uppercase tracking-wider ${
              isVeg ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
            }`}
          >
            {isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        {/* Feature / Commercial Tag */}
        {tag && (
          <span className="text-[10px] font-black uppercase tracking-wider text-[#3B1F3A] dark:text-[#8CC9D9] bg-[#3B1F3A]/10 dark:bg-white/10 px-2.5 py-1 rounded-full border border-[#3B1F3A]/20 dark:border-white/10 shrink-0">
            {tag}
          </span>
        )}
      </div>

      {/* ── Product Packaging Image Box (Increased Size with Hover More Info) ── */}
      <div
        onClick={handleAction}
        className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-4 bg-gradient-to-b from-slate-50 via-slate-50/70 to-slate-100/70 dark:from-[#071322]/90 dark:to-[#0B1B2F]/90 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group/img border border-slate-100 dark:border-white/5"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover/img:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Cold-Chain Badge in Fresh Emerald Green */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1.5 border border-emerald-400/40 shadow-md shadow-emerald-950/20 backdrop-blur-md pointer-events-none z-10">
          <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-200" />
          <span>{specs.temp || "-18°C Cryo-Lock"}</span>
        </div>

        {/* Interactive "More Info" Glassmorphic Hover Overlay */}
        <div className="absolute inset-0 bg-[#0B2546]/45 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
          <span className="px-4 py-2 rounded-xl bg-white/95 dark:bg-[#0B1B2F]/95 text-[#0B2546] dark:text-white font-black text-xs shadow-2xl flex items-center gap-2 border border-white/60 transform scale-90 group-hover/img:scale-100 transition-all duration-300 hover:scale-105">
            <Info className="w-4 h-4 text-[#0284C7] dark:text-[#8CC9D9]" />
            <span>More Info</span>
          </span>
        </div>
      </div>

      {/* ── Product Title & Specifications ── */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3
            onClick={handleAction}
            className="text-sm sm:text-base md:text-lg font-black text-[#0B2546] dark:text-white leading-snug hover:text-[#3B1F3A] dark:hover:text-[#8CC9D9] transition-colors cursor-pointer line-clamp-2 break-words"
            title={name}
          >
            {name}
          </h3>

          {/* Pack Size & Master Carton Details */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-[#3B1F3A] dark:text-slate-200 bg-[#3B1F3A]/8 dark:bg-white/10 px-2 sm:px-2.5 py-1 rounded-md border border-[#3B1F3A]/15 dark:border-white/5 text-[10px] sm:text-xs break-words">
              📦 {pack}
            </span>
            {specs.cartonQty && (
              <span className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium">
                • {specs.cartonQty}
              </span>
            )}
          </div>
        </div>

        {/* Specifications Strip (Shelf Life & Rating) */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Shelf Life: <strong className="text-slate-800 dark:text-slate-200">{specs.shelfLife || "12 Months"}</strong></span>
          </div>

          <div className="flex items-center gap-1 font-black text-slate-800 dark:text-slate-200 bg-amber-500/10 px-2 py-0.5 rounded text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
            <span className="text-slate-400 text-[10px]">({reviews})</span>
          </div>
        </div>

        {/* ── Single Prominent "Enquiry" Button in Signature Frozen Cyan Palette ── */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={handleAction}
            className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#8CC9D9] via-[#68ADC0] to-[#559CAA] hover:from-[#78BCD0] hover:to-[#458C9B] text-[#123741] font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_6px_20px_-4px_rgba(140,201,217,0.55)] hover:shadow-[0_10px_26px_-4px_rgba(140,201,217,0.7)] border border-[#8CC9D9]/40 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer group/btn"
          >
            <Send className="w-3.5 h-3.5 text-[#3B1F3A] group-hover:translate-x-0.5 transition-transform" />
            <span>Enquiry</span>
          </button>
        </div>

      </div>

    </div>
  );
}

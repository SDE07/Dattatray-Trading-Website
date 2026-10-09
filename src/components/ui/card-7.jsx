import React, { useState } from "react";
import { ArrowUpRight, Sparkles, ShieldCheck, ThermometerSnowflake } from "lucide-react";

/**
 * InteractiveProductCard (card-7)
 * Sleek, image-centric product card inspired by 21st.dev card-7 specification:
 * - High-res image with smooth zoom transition on hover
 * - Brand logo badge in glass container
 * - Dynamic price badge
 * - Gradient overlay for enhanced typography readability
 * - Pagination indicator dots for visual flair
 * - Seamless support for both direct props and B2B catalog items
 */
export function InteractiveProductCard({
  title,
  description,
  price,
  imageUrl,
  logoUrl,
  product,
  onEnquiry,
  onQuickView,
  className = "",
  ...props
}) {
  const [activeDot, setActiveDot] = useState(0);

  // Normalize data from either explicit props or wrapped product object
  const item = product || {};
  const displayTitle = title || item.name || item.title || "Cold-Chain Product";
  const displayDescription =
    description ||
    item.description ||
    item.tag ||
    "Farm-procured and flash-frozen at -18°C for commercial kitchens & export.";
  const displayImage =
    imageUrl || item.image || item.imageUrl;
  const displayPrice =
    price !== undefined
      ? (typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price)
      : item.price !== undefined
      ? `₹${item.price.toLocaleString("en-IN")}`
      : "Wholesale APMC";

  const isVeg = item.isVeg !== undefined ? item.isVeg : true;
  const tag = item.tag || (isVeg ? "100% Veg" : "Non-Veg");

  const handleAction = (e) => {
    if (e) e.stopPropagation();
    if (onEnquiry) onEnquiry(item.id ? item : { ...props, title: displayTitle, price: displayPrice });
    else if (onQuickView) onQuickView(item.id ? item : { ...props, title: displayTitle, price: displayPrice });
  };

  return (
    <div
      onClick={handleAction}
      className={`group relative w-full h-[470px] sm:h-[500px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-[#8CC9D9]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between select-none ${className}`}
    >
      {/* ── Background Product Image with Hover Scale ── */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        {displayImage ? (
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out select-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-500">
            <Sparkles className="w-12 h-12" />
          </div>
        )}

        {/* Cinematic Gradient Vignette Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25 group-hover:via-black/35 transition-all duration-500 pointer-events-none" />
      </div>

      {/* ── Top Header Bar: Logo & Price Pill ── */}
      <div className="relative z-10 p-4 sm:p-5 flex items-start justify-between gap-3">
        {/* Brand Logo / Cryo-Chain Badge */}
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center p-2 shadow-md">
              <img src={logoUrl} alt="Brand Logo" className="w-full h-full object-contain filter drop-shadow" />
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-[#8CC9D9]" />
              <span>-18°C IQF</span>
            </div>
          )}

          {/* Diet Pill */}
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/15">
            <div
              className={`w-2 h-2 rounded-full ${
                isVeg ? "bg-emerald-400" : "bg-rose-500"
              }`}
            />
            <span className="text-[10px] font-black uppercase tracking-wider text-white">
              {tag}
            </span>
          </div>
        </div>

        {/* Dynamic Price Pill Badge */}
        <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-1">
          <span>{displayPrice}</span>
        </div>
      </div>

      {/* ── Bottom Content Area: Typography, Pagination Dots & Action ── */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end space-y-2">
        {/* Pack / Subtitle Badge */}
        {item.pack && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-[#8CC9D9] border border-white/20">
              {item.pack.split("/")[0].trim()}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug group-hover:text-[#8CC9D9] transition-colors line-clamp-1"
          title={displayTitle}
        >
          {displayTitle}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed line-clamp-2">
          {displayDescription}
        </p>

        {/* Visual Pagination Dots (Card-7 Signature Feature) */}
        <div className="flex items-center gap-1.5 pt-1">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDot(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeDot === idx
                  ? "w-6 bg-gradient-to-r from-emerald-400 to-[#8CC9D9] shadow-xs"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide dot ${idx + 1}`}
            />
          ))}
          <span className="text-[10px] font-bold text-slate-300 ml-2 tracking-wide uppercase">
            APEDA Assured
          </span>
        </div>

        {/* Action Button Bar */}
        <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commercial FCL / Bulk</span>
          </div>

          <button
            type="button"
            onClick={handleAction}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default InteractiveProductCard;

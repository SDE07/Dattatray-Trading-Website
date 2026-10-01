import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroBanner from "../../assets/landingpage.png";

/**
 * HeroSection: Full-bleed upper banner with interactive touchpoints & mapped routing.
 * Phase 2 — Golden + Green palette, content protection, parallax effect,
 * updated hotspot ring colors, and golden mobile action strip.
 */
export default function HeroSection({ onOpenStoryModal }) {
  const imgRef = useRef(null);

  // Subtle parallax scroll on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      const speed = 0.18;
      imgRef.current.style.transform = `translateY(${scrollY * speed}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#1A1008] pt-0"
    >
      {/* Full-bleed banner container */}
      <div className="relative w-full overflow-hidden select-none image-shield">
        <img
          ref={imgRef}
          src={heroBanner}
          alt="Dattatray Traders - Premium Frozen Foods - Good Food Lives Longer With Us"
          className="w-full h-auto block select-none will-change-transform"
          loading="eager"
          fetchPriority="high"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Invisible watermark — shows if screenshot is color-edited */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.018] rotate-[-22deg] z-[1]">
          <span className="text-5xl font-black text-white whitespace-nowrap tracking-widest">
            © Dattatray Traders
          </span>
        </div>

        {/* Interactive Elements Layer */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* 1. Interactive Pill Button: "Explore Our Products" */}
          <Link
            to="/products"
            className="pointer-events-auto absolute left-[38%] top-[76%] w-[24%] h-[12%] rounded-full cursor-pointer hover:ring-2 hover:ring-[#D4AF37]/60 hover:bg-white/8 active:scale-95 transition-all focus:outline-none"
            title="Explore Our Products"
            aria-label="Explore Our Frozen Products Collection"
          />

          {/* 2. Interactive Hotspot: "12+ Countries We Serve" */}
          <Link
            to="/trading?segment=export"
            className="pointer-events-auto absolute left-[75%] top-[65%] w-[22%] h-[18%] rounded-xl cursor-pointer hover:bg-black/5 active:scale-95 transition-all focus:outline-none"
            title="12+ Countries We Serve - Global Export Division"
            aria-label="12+ Countries We Serve"
          />

          {/* 3. Working Interactive Text Link: "EXPLORE OUR PRODUCTS ->" */}
          <Link
            to="/products"
            className="pointer-events-auto absolute left-[75%] top-[88%] w-[22%] h-[8%] rounded-md cursor-pointer hover:bg-black/5 active:scale-95 transition-all focus:outline-none"
            title="Explore All Products"
            aria-label="Explore All Products"
          />

          {/* Right Division Badges */}
          <Link
            to="/trading?segment=horeca"
            className="pointer-events-auto absolute left-[83%] top-[13.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 hover:bg-white/12 transition-all duration-200"
            title="HoReCa & Foodservice Supply Division"
            aria-label="HoReCa Supply Division"
          />
          <Link
            to="/trading?segment=wholesale"
            className="pointer-events-auto absolute left-[83%] top-[23.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 hover:bg-white/12 transition-all duration-200"
            title="Wholesale & Bulk B2B Distribution"
            aria-label="Wholesale B2B Distribution"
          />
          <Link
            to="/products"
            className="pointer-events-auto absolute left-[83%] top-[33.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 hover:bg-white/12 transition-all duration-200"
            title="Retail Consumer Packs"
            aria-label="Retail Consumer Packs"
          />
          <Link
            to="/trading?segment=export"
            className="pointer-events-auto absolute left-[83%] top-[43.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 hover:bg-white/12 transition-all duration-200"
            title="Merchant Export & Global Shipping"
            aria-label="Merchant Export Division"
          />

          {/* Watch Our Story Video Trigger */}
          <button
            type="button"
            onClick={onOpenStoryModal}
            className="pointer-events-auto absolute left-[77%] top-[78%] w-[18%] h-[7%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#15803D]/50 hover:bg-white/12 transition-all duration-200 cursor-pointer"
            title="Watch Our Story"
            aria-label="Watch Our Story Modal"
          />
        </div>
      </div>

      {/* Mobile Quick Action Strip — Golden + Green palette */}
      <div className="sm:hidden bg-[#1A1008] border-t border-[#D4AF37]/20 px-4 py-3 flex items-center justify-around gap-2.5">
        <Link
          to="/products"
          className="flex-1 py-2.5 px-3 text-center text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#14532D] to-[#15803D] hover:from-[#0F3E22] hover:to-[#14532D] text-white rounded-full shadow-md shadow-green-900/30 transition-all active:scale-95"
        >
          View Products
        </Link>
        <Link
          to="/contact"
          className="flex-1 py-2.5 px-3 text-center text-xs font-black uppercase tracking-wider bg-transparent text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] rounded-full shadow-md transition-all active:scale-95"
        >
          Send Enquiry
        </Link>
      </div>
    </section>
  );
}

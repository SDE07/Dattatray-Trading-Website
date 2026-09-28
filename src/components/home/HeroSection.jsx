import React from "react";
import { Link } from "react-router-dom";
import heroBanner from "../../assets/landingpage.png";

/**
 * HeroSection: Full-bleed upper banner with interactive touchpoints & mapped routing.
 */
export default function HeroSection({ onOpenStoryModal }) {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#4B0421] pt-0"
    >
      {/* Full-bleed banner container */}
      <div className="relative w-full overflow-hidden select-none">
        <img
          src={heroBanner}
          alt="Dattatray Traders - Premium Frozen Foods - Good Food Lives Longer With Us"
          className="w-full h-auto block select-none pointer-events-auto"
          loading="eager"
          fetchPriority="high"
        />

        {/* Interactive Elements Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. Working Interactive Pill Button: "Explore Our Products" */}
          <Link
            to="/products"
            className="pointer-events-auto absolute left-[38%] top-[76%] w-[24%] h-[12%] rounded-full cursor-pointer hover:ring-2 hover:ring-[#8CC9D9] hover:bg-white/10 active:scale-95 transition-all focus:outline-none"
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
            className="pointer-events-auto absolute left-[83%] top-[13.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8CC9D9] hover:bg-white/15 transition-all duration-200"
            title="HoReCa & Foodservice Supply Division"
            aria-label="HoReCa Supply Division"
          />
          <Link
            to="/trading?segment=wholesale"
            className="pointer-events-auto absolute left-[83%] top-[23.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8CC9D9] hover:bg-white/15 transition-all duration-200"
            title="Wholesale & Bulk B2B Distribution"
            aria-label="Wholesale B2B Distribution"
          />
          <Link
            to="/products"
            className="pointer-events-auto absolute left-[83%] top-[33.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8CC9D9] hover:bg-white/15 transition-all duration-200"
            title="Retail Consumer Packs"
            aria-label="Retail Consumer Packs"
          />
          <Link
            to="/trading?segment=export"
            className="pointer-events-auto absolute left-[83%] top-[43.5%] w-[13.5%] h-[8%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8CC9D9] hover:bg-white/15 transition-all duration-200"
            title="Merchant Export & Global Shipping"
            aria-label="Merchant Export Division"
          />

          {/* Watch Our Story Video Trigger */}
          <button
            type="button"
            onClick={onOpenStoryModal}
            className="pointer-events-auto absolute left-[77%] top-[78%] w-[18%] h-[7%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8CC9D9] hover:bg-white/15 transition-all duration-200 cursor-pointer"
            title="Watch Our Story"
            aria-label="Watch Our Story Modal"
          />
        </div>
      </div>

      {/* Mobile Quick Action Strip (only on mobile screens sm:hidden) */}
      <div className="sm:hidden bg-[#380217] border-t border-white/10 px-4 py-3 flex items-center justify-around gap-2.5">
        <Link
          to="/products"
          className="flex-1 py-2.5 px-3 text-center text-xs font-black uppercase tracking-wider bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] rounded-full shadow-md transition-all active:scale-95"
        >
          View Products
        </Link>
        <Link
          to="/contact"
          className="flex-1 py-2.5 px-3 text-center text-xs font-black uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-full shadow-md transition-all active:scale-95"
        >
          Send Enquiry
        </Link>
      </div>
    </section>
  );
}

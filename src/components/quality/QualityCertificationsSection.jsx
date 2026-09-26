import React from "react";
import { motion } from "framer-motion";
import { SplitTextHeading } from "../common";

// Ribbon / Medal Award SVG matching the exact screenshot badge iconography
const RibbonIcon = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const CERTIFICATIONS = [
  {
    id: "fssai",
    title: "FSSAI",
    subtitle: "Food Safety & Standards Authority of India",
    bgClass: "bg-[#E8FAF0] dark:bg-[#064E3B]/20 border-[#A3E9C8] dark:border-[#059669]/40",
    iconColor: "text-[#065F46] dark:text-[#34D399]",
    badgeText: "Govt. of India License",
  },
  {
    id: "haccp",
    title: "HACCP",
    subtitle: "Hazard Analysis Critical Control Point",
    bgClass: "bg-[#EAF6FF] dark:bg-[#0C4A6E]/20 border-[#BAE6FD] dark:border-[#0284C7]/40",
    iconColor: "text-[#0284C7] dark:text-[#38BDF8]",
    badgeText: "Critical Hazard Free",
  },
  {
    id: "iso22000",
    title: "ISO 22000",
    subtitle: "International Food Safety Management",
    bgClass: "bg-[#F5F0FF] dark:bg-[#581C87]/20 border-[#E9D5FF] dark:border-[#9333EA]/40",
    iconColor: "text-[#7E22CE] dark:text-[#C084FC]",
    badgeText: "FSMS Global Audit",
  },
  {
    id: "brc",
    title: "BRC",
    subtitle: "British Retail Consortium Global Standard",
    bgClass: "bg-[#FFF0F3] dark:bg-[#881337]/20 border-[#FECDD3] dark:border-[#E11D48]/40",
    iconColor: "text-[#BE123C] dark:text-[#FB7185]",
    badgeText: "Retail Benchmark",
  },
  {
    id: "halal",
    title: "Halal",
    subtitle: "Certified Halal for global Muslim markets",
    bgClass: "bg-[#FEFCE8] dark:bg-[#713F12]/20 border-[#FEF08A] dark:border-[#CA8A04]/40",
    iconColor: "text-[#B45309] dark:text-[#FACC15]",
    badgeText: "100% Shariah Compliant",
  },
  {
    id: "apeda",
    title: "APEDA",
    subtitle: "Agricultural & Processed Food Export Authority",
    bgClass: "bg-[#E6F8F9] dark:bg-[#164E63]/20 border-[#A5F3FC] dark:border-[#0891B2]/40",
    iconColor: "text-[#0E7490] dark:text-[#22D3EE]",
    badgeText: "Registered Exporter",
  },
];

export default function QualityCertificationsSection() {
  return (
    <section className="py-14 sm:py-18 lg:py-22 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#065F46] dark:text-[#34D399] block mb-2">
            CERTIFICATIONS
          </span>
          <SplitTextHeading
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2546] dark:text-white tracking-tight"
          >
            Internationally Recognised Standards
          </SplitTextHeading>
          <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Every batch processed and dispatched by Dattatray Traders conforms strictly to international statutory food safety codes and sanitary mandates.
          </p>
        </div>

        {/* 6 Pastel Cards Grid (2 rows x 3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl sm:rounded-3xl border p-6 flex items-center gap-4 sm:gap-5 shadow-xs transition-shadow duration-300 hover:shadow-md ${cert.bgClass}`}
            >
              {/* Ribbon Emblem */}
              <div className={`shrink-0 ${cert.iconColor}`}>
                <RibbonIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 font-medium leading-snug">
                  {cert.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

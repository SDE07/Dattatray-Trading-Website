import React, { useState } from "react";
import {
  HeroSection,
  StatsSection,
  QualitySupplySection,
  FrozenShowcaseSection,
  GlobalExportSection,
  WhyChooseUsSection,
  StoryModal,
} from "../components/home";
import CertificationsSection from "../common/CertificationsSection";

/**
 * HomePage Component
 * Modular, performance-optimized, senior-developer architecture.
 * Cleanly separated into independent section components for optimal rendering speed and maintainability.
 */
export default function HomePage() {
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  return (
    <div className="bg-[#F9FBFC] dark:bg-[#07111E] min-h-screen text-[#1E1520] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      {/* 1. Full-bleed Hero Banner with Hotspot Touchpoints */}
      <HeroSection onOpenStoryModal={() => setStoryModalOpen(true)} />

      {/* 2. On-Scroll Animated Stats Number Line */}
      <StatsSection />

      {/* 3. Company Overview, Division Pills & GSAP 3D Layered Card Stack */}
      <QualitySupplySection onOpenStoryModal={() => setStoryModalOpen(true)} />

      {/* 4. Deep Plum Full-Width Frozen Food Showcase with Dual Marquee */}
      <FrozenShowcaseSection />

      {/* 5. Global Export Network with Pinpoint India Subcontinent SVG Overlay & Pillars */}
      <GlobalExportSection />

      {/* 6. Why Choose Us Section (Brochure Perfect 3-Column Layout) */}
      <WhyChooseUsSection />

      {/* 7. Globally Trusted Quality Certifications Section */}
      <CertificationsSection />

      {/* 8. Video Story Modal Dialog */}
      <StoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
      />
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

// ============================================================================
// HIGH-FIDELITY VECTOR SVG LOGOS FOR FOOD SAFETY & QUALITY CHECKPOINTS
// ============================================================================

// S1: Optical Sortex (Visual defect detection)
const OpticalSortexLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#0284C7" />
    <circle cx="24" cy="24" r="10" stroke="#FFF" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
    <circle cx="24" cy="24" r="4.5" fill="#FFF" />
    <path d="M12 24h4m16 0h4M24 12v4m0 16v4" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// S2: Brix Testing (Maturity & sugar refractometer)
const BrixRefractometerLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#F59E0B" />
    <path d="M24 10v28M16 18h16M18 24h12M16 30h16" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="38" r="3" fill="#FFF" />
  </svg>
);

// S3: Moisture Meter (Digital moisture check)
const MoistureMeterLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#0D9488" />
    <path d="M24 12c-5 6-9 11-9 16a9 9 0 0018 0c0-5-4-10-9-16z" fill="#FFF" />
    <path d="M22 25l2 2 4-4" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// S4: -35°C Cryo IQF Tunnel
const CryoIQFLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#2563EB" />
    <path d="M24 10v28M10 24h28M14 14l20 20M14 34L34 14" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3.5" fill="#93C5FD" />
  </svg>
);

// S5: Zero Additives / 100% Pure Organic
const ZeroAdditivesLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#16A34A" />
    <path d="M14 34c0-12 10-20 20-20-2 10-8 20-20 20z" fill="#FFF" />
    <path d="M17 31c6-6 10-10 17-17" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// S6: Steam Blanching (Enzyme deactivation)
const SteamBlanchingLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#EA580C" />
    <path d="M18 36c-2-4-2-8 0-12s2-8 0-12M24 36c-2-4-2-8 0-12s2-8 0-12M30 36c-2-4-2-8 0-12s2-8 0-12" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// S7: Microbial Plating (Pathogen lab test)
const MicrobialPlatingLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#7C3AED" />
    <circle cx="24" cy="24" r="13" stroke="#FFF" strokeWidth="2.5" fill="none" />
    <circle cx="20" cy="21" r="2.5" fill="#DDD6FE" />
    <circle cx="28" cy="23" r="3" fill="#FFF" />
    <circle cx="22" cy="28" r="2" fill="#C4B5FD" />
  </svg>
);

// S8: Pesticide Gas Chromatography Scan
const PesticideLabScanLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#059669" />
    <path d="M21 12h6v6l6 14a2 2 0 01-2 3H17a2 2 0 01-2-3l6-14v-6z" stroke="#FFF" strokeWidth="2.2" fill="none" />
    <path d="M17 28h14" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// S9: Inline Metal Detector & X-Ray Scanner
const MetalDetectionLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#475569" />
    <rect x="12" y="14" width="24" height="20" rx="3" stroke="#FFF" strokeWidth="2.2" fill="none" />
    <path d="M12 24h24M24 14v20" stroke="#FFF" strokeWidth="2" strokeDasharray="2 2" />
    <circle cx="24" cy="24" r="4" fill="#38BDF8" />
  </svg>
);

// S10: -18°C Cold Room Cryo-Lock
const CryoLockLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#0284C7" />
    <path d="M24 12v18M18 20l6-6 6 6" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="15" y="28" width="18" height="8" rx="2" fill="#FFF" />
    <circle cx="24" cy="32" r="1.5" fill="#0284C7" />
  </svg>
);

// S11: GPS Telemetry Datalogger
const GPSTelemetryLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#3B82F6" />
    <circle cx="24" cy="24" r="5" fill="#FFF" />
    <path d="M15 24a9 9 0 0118 0M11 24a13 13 0 0126 0" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// S12: Barrier Pouch Nitrogen Flush
const NitrogenSealLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#6366F1" />
    <path d="M15 14h18l-3 20H18l-3-20z" stroke="#FFF" strokeWidth="2.2" fill="none" />
    <path d="M13 14h22" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M21 24h6M24 21v6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// S13: APEDA Export Regulatory Compliance
const APEDAExportLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#D97706" />
    <circle cx="24" cy="24" r="12" stroke="#FFF" strokeWidth="2" fill="none" />
    <path d="M24 16v16M20 20l4-4 4 4M20 28l4 4 4-4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// S14: FSSAI Food Safety Standards
const FSSAILogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#047857" />
    <path d="M24 10l11 5v9c0 8-5 13-11 15-6-2-11-7-11-15v-9l11-5z" fill="#FFF" />
    <path d="M19 24l3.5 3.5 6.5-6.5" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// S15: Phytosanitary & Quarantine Certificate
const PhytosanitaryLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="12" fill="#0891B2" />
    <circle cx="24" cy="24" r="12" stroke="#FFF" strokeWidth="2" fill="none" />
    <path d="M12 24h24M24 12c4 4 6 8 6 12s-2 8-6 12M24 12c-4 4-6 8-6 12s2 8 6 12" stroke="#FFF" strokeWidth="1.8" />
  </svg>
);

// ============================================================================
// CENTRAL DESTINATION ACCREDITATION SVGS (BOTTOM CONVERGENCE HUB)
// ============================================================================

const APEDAHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500 fill-current">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.5L12 11.5 6.5 8 12 4.5zM6 9.5l5 3.2v5.8l-5-3.1V9.5zm12 5.9l-5 3.1v-5.8l5-3.2v5.9z" />
  </svg>
);

const FSSAIHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500 fill-current">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const ISO22000HubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-500 fill-current">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HACCPHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-500 fill-current">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5h-2v-2h2v2zm1.5-5.2l-.9.9c-.7.7-1.1 1.3-1.1 2.3h-2v-.5c0-1.1.4-2.1 1.2-2.8l1.2-1.2c.4-.4.6-.9.6-1.5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .8-.3 1.6-.9 2.1z" />
  </svg>
);

const ColdChainHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-400 fill-current">
    <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ============================================================================
// CHECKPOINTS PIPELINE DEFINITION (5 COLUMNS x 3 ROWS = 15 STAGES)
// ============================================================================

const QUALITY_STAGES = [
  // Column 0: Farm Gate & Sorting
  {
    id: "sortex",
    name: "Optical Sortex",
    category: "Farm Gate Sorting",
    desc: "Bichromatic optical laser cameras eliminate blemishes, discoloration, and foreign botanical particles.",
    standard: "99.8% Sortex Grade",
    logo: OpticalSortexLogo,
    colIndex: 0,
  },
  {
    id: "brix",
    name: "Brix Testing",
    category: "Farm Gate Sorting",
    desc: "Digital refractometer maturity analysis ensures peak sweetness, density, and harvest consistency.",
    standard: "Brix 12°-16° Checked",
    logo: BrixRefractometerLogo,
    colIndex: 0,
  },
  {
    id: "moisture",
    name: "Moisture Meter",
    category: "Farm Gate Sorting",
    desc: "High-frequency dielectric moisture sensor ensures precise harvest water content before freezing.",
    standard: "Uniform Moisture Verified",
    logo: MoistureMeterLogo,
    colIndex: 0,
  },

  // Column 1: IQF Freezing Line
  {
    id: "cryo-iqf",
    name: "-35°C Cryo IQF",
    category: "Fluidized Bed Freezing",
    desc: "Fluidized IQF tunnel flash-freezes individual pieces within 4 minutes, preserving cellular structure.",
    standard: "Cellular Nutrition Locked",
    logo: CryoIQFLogo,
    colIndex: 1,
  },
  {
    id: "zero-additives",
    name: "Zero Preservatives",
    category: "Fluidized Bed Freezing",
    desc: "No artificial chemicals or sodium preservatives; natural sub-zero thermal preservation only.",
    standard: "100% Clean Label",
    logo: ZeroAdditivesLogo,
    colIndex: 1,
  },
  {
    id: "blanching",
    name: "Steam Blanching",
    category: "Fluidized Bed Freezing",
    desc: "Micro-controlled 95°C steam bath deactivates polyphenol oxidase enzymes, maintaining bright color.",
    standard: "Enzymatic Inactivation",
    logo: SteamBlanchingLogo,
    colIndex: 1,
  },

  // Column 2: Laboratory Testing
  {
    id: "microbial",
    name: "Microbial Plating",
    category: "In-House QA Labs",
    desc: "Pathogen assays testing total plate count (TPC), E. coli, Salmonella, and Listeria per APEDA criteria.",
    standard: "Zero Microbial Pathogens",
    logo: MicrobialPlatingLogo,
    colIndex: 2,
  },
  {
    id: "pesticide",
    name: "Pesticide Residue",
    category: "In-House QA Labs",
    desc: "GC-MS & LC-MS/MS multi-residue pesticide and chemical pollutant screening conforming to EU MRLs.",
    standard: "EU & USFDA Compliant",
    logo: PesticideLabScanLogo,
    colIndex: 2,
  },
  {
    id: "metal-xray",
    name: "Inline X-Ray",
    category: "In-House QA Labs",
    desc: "Automated magnetic and dual-energy X-ray detection for sub-millimeter ferrous and non-ferrous metals.",
    standard: "0.8mm Sensitivity Screen",
    logo: MetalDetectionLogo,
    colIndex: 2,
  },

  // Column 3: Cold Chain & Packing
  {
    id: "cryo-lock",
    name: "-18°C Cryo-Lock",
    category: "Cold-Chain Integrity",
    desc: "Unbroken sub-zero storage chambers with automated refrigeration recovery and thermal containment.",
    standard: "Continuous -18°C Hold",
    logo: CryoLockLogo,
    colIndex: 3,
  },
  {
    id: "telemetry",
    name: "GPS Telemetry",
    category: "Cold-Chain Integrity",
    desc: "Satellite-connected IoT temperature dataloggers broadcasting live GPS position and thermal logs.",
    standard: "Live IoT Data Monitored",
    logo: GPSTelemetryLogo,
    colIndex: 3,
  },
  {
    id: "nitrogen",
    name: "Nitrogen Flush",
    category: "Cold-Chain Integrity",
    desc: "Multi-barrier food-grade pouches nitrogen-flushed to displace oxygen and eliminate freezer burn.",
    standard: "Hermetic Barrier Seal",
    logo: NitrogenSealLogo,
    colIndex: 3,
  },

  // Column 4: Export Compliance
  {
    id: "apeda",
    name: "APEDA Clearances",
    category: "Global Export Compliance",
    desc: "Official documentation and batch certification with the Agricultural and Processed Food Export Authority.",
    standard: "Certified Export Consignment",
    logo: APEDAExportLogo,
    colIndex: 4,
  },
  {
    id: "fssai",
    name: "FSSAI Grade A",
    category: "Global Export Compliance",
    desc: "Strict adherence to Indian food safety acts, hygiene manufacturing practices, and lab audits.",
    standard: "Central License 100% Valid",
    logo: FSSAILogo,
    colIndex: 4,
  },
  {
    id: "phytosanitary",
    name: "Phytosanitary Pass",
    category: "Global Export Compliance",
    desc: "International port quarantine, pest-free fumigation, and health certificates for 12+ destination nations.",
    standard: "Quarantine Clear Certificate",
    logo: PhytosanitaryLogo,
    colIndex: 4,
  },
];

export default function QualityPipelineAnimation({ hideHeader = false, className = "" }) {
  const [hoveredId, setHoveredId] = useState(null);

  // Group into 5 columns
  const cols = [0, 1, 2, 3, 4].map((colIdx) =>
    QUALITY_STAGES.filter((item) => item.colIndex === colIdx)
  );

  const activeItem = QUALITY_STAGES.find((it) => it.id === hoveredId);

  return (
    <div className={`w-full bg-transparent text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 ${className || "py-10 px-2 sm:px-6 lg:px-8"}`}>

      {/* Header Eyebrow & Live Status Indicator (if not hidden) */}
      {!hideHeader && (
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/20 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8] text-xs font-black uppercase tracking-[0.18em] mb-3.5 shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Rigorous Protocols</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2546] dark:text-white tracking-tight mb-3">
            Our Multi-Stage Quality Verification Process
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every batch undergoes systematic sensory evaluation, moisture testing, and microbiological analysis before certification for delivery.
          </p>
        </div>
      )}

      {/* MAIN CONNECT PIPELINE CONTAINER */}
      <div className="w-full max-w-2xl flex flex-col items-center relative pb-2">
        
        {/* UNIFIED BACKGROUND SVG CONNECTING BEAMS */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 380" fill="none">
            <defs>
              <linearGradient id="coldChainBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8CC9D9" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1E56C8" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 5 FULL VERTICAL + CURVED PATHS CONNECTING ALL 3 ROWS TO CENTRAL HUB */}
            {[
              { id: 0, d: "M 50 35 L 50 210 C 50 280, 250 260, 250 360" },
              { id: 1, d: "M 150 35 L 150 210 C 150 280, 250 270, 250 360" },
              { id: 2, d: "M 250 35 L 250 360" },
              { id: 3, d: "M 350 35 L 350 210 C 350 280, 250 270, 250 360" },
              { id: 4, d: "M 450 35 L 450 210 C 450 280, 250 260, 250 360" },
            ].map((pathItem) => {
              const isColHovered = hoveredId
                ? QUALITY_STAGES.find((a) => a.id === hoveredId)?.colIndex === pathItem.id
                : false;

              return (
                <g key={pathItem.id}>
                  {/* Base Guide Path */}
                  <path
                    d={pathItem.d}
                    stroke="currentColor"
                    className={`transition-colors duration-300 ${
                      isColHovered
                        ? "text-[#1E56C8] dark:text-[#38BDF8] stroke-[2.5]"
                        : "text-slate-200 dark:text-white/10 stroke-[1.5]"
                    }`}
                  />

                  {/* Animated Dashed Active Beam */}
                  <motion.path
                    d={pathItem.d}
                    stroke="url(#coldChainBeamGrad)"
                    strokeWidth={isColHovered ? "3" : "1.8"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "8 16", strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -120 }}
                    transition={{
                      repeat: Infinity,
                      duration: isColHovered ? 1.4 : 3,
                      ease: "linear",
                    }}
                  />

                  {/* Traveling Pulse Particle */}
                  <motion.circle
                    r={isColHovered ? "5" : "3.5"}
                    fill="#38BDF8"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2 + pathItem.id * 0.35,
                      ease: "easeInOut",
                    }}
                    style={{
                      offsetPath: `path('${pathItem.d}')`,
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* TOP SECTION: 5 COLUMNS OF FOOD SAFETY CHECKPOINTS */}
        <div className="grid grid-cols-5 gap-2.5 sm:gap-4 w-full z-10 justify-items-center mb-14">
          {cols.map((colItems, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2.5 sm:gap-4 items-center">
              {colItems.map((item) => {
                const IconComponent = item.logo;
                const isHovered = hoveredId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.09, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`group relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl border flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer shadow-sm ${
                      isHovered
                        ? "bg-white dark:bg-[#0E223D] border-[#1E56C8] dark:border-[#38BDF8] shadow-lg shadow-sky-500/20"
                        : "bg-white/95 dark:bg-[#0B1B2F]/95 border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <IconComponent />
                    </div>

                    {/* Tiny Checkpoint Subtitle */}
                    <span className="hidden sm:block text-[9px] font-black text-slate-600 dark:text-slate-300 truncate max-w-full text-center mt-1">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* DYNAMIC CHECKPOINT DETAILS CARD (UPON HOVER) */}
        <div className="w-full z-10 min-h-[72px] mb-2 px-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0B1B2F]/95 border border-[#1E56C8]/30 dark:border-[#38BDF8]/40 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 text-left"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1E56C8] dark:text-[#38BDF8] bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 px-2 py-0.5 rounded-full">
                      {activeItem.category}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0B2546] dark:text-white truncate">
                      {activeItem.name}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#5D6B7E] dark:text-slate-300 leading-snug line-clamp-2">
                    {activeItem.desc}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10.5px] font-black">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeItem.standard}</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* BOTTOM SECTION: 5 CORE ACCREDITED STANDARDS HUB */}
        <div className="w-full max-w-md z-10 flex flex-col items-center pt-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6 px-5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0B1B2F]/95 border border-slate-200/90 dark:border-white/10 shadow-md">
            <div title="APEDA Government of India Export License" className="hover:scale-115 transition-transform cursor-pointer">
              <APEDAHubLogo />
            </div>
            <div title="FSSAI Central Food Safety License" className="hover:scale-115 transition-transform cursor-pointer">
              <FSSAIHubLogo />
            </div>
            <div title="ISO 22000 Food Safety Management" className="hover:scale-115 transition-transform cursor-pointer">
              <ISO22000HubLogo />
            </div>
            <div title="HACCP Risk Prevention Standard" className="hover:scale-115 transition-transform cursor-pointer">
              <HACCPHubLogo />
            </div>
            <div title="Continuous -18°C Cryo-Chain Guarantee" className="hover:scale-115 transition-transform cursor-pointer">
              <ColdChainHubLogo />
            </div>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">
            Central Accredited Quality &amp; Compliance Hub
          </span>
        </div>

      </div>

    </div>
  );
}

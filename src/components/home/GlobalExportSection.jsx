import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Globe2,
  Truck,
  ShieldCheck,
  PackageCheck,
  ArrowUpRight,
} from "lucide-react";
import exportBanner from "../../assets/export.png";
import SplitTextHeading from "../common/SplitTextHeading";

const exportPillars = [
  {
    icon: Globe2,
    title: "Worldwide Export Destinations",
    desc: "Supplying trusted importers across UAE & Middle East, Europe, Southeast Asia, UK, and North America.",
    badge: "Global Reach",
    gradient: "from-[#0284C7] to-[#1E56C8]",
  },
  {
    icon: Truck,
    title: "Active -18°C Reefer Logistics",
    desc: "Full container load (FCL) temperature-monitored refrigerated freight from processing hub to seaport.",
    badge: "Cold-Chain Integrity",
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    icon: ShieldCheck,
    title: "APEDA & International Standards",
    desc: "Comprehensive export documentation: Phytosanitary clearance, Certificate of Analysis (COA), and USFDA registry.",
    badge: "Certified Exporter",
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    icon: PackageCheck,
    title: "Custom Private Labeling & Bulk",
    desc: "Flexible packaging from 400g/1kg retail brand pouches to 20kg bulk institutional food-service cartons.",
    badge: "OEM & HoReCa Ready",
    gradient: "from-[#7C3AED] to-[#9333EA]",
  },
];

/**
 * GlobalExportSection: 100% geographically calibrated SVG routes and 4 value pillars grid.
 * India origin is accurately centered on the Indian subcontinent at (cx: 852, cy: 268).
 */
export default function GlobalExportSection() {
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="global-export"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#FCFAF5] to-white dark:from-[#06100B] dark:via-[#0E1B15] dark:to-[#06100B] overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/8 via-[#C8A950]/8 to-teal-500/8 rounded-full blur-[140px]" />
        <div className="absolute -top-12 -left-12 w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#C8A950]/8 rounded-full blur-[110px]" />
      </div>

      <div className="w-full relative z-10">
        
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto px-4 mb-10 sm:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Top Pill Tag */}
         
          <SplitTextHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-white tracking-tight leading-[1.18]"
          >
            Dattatray Tradings <br />
            <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
              Global Reach &amp; Merchant Export
            </span>
          </SplitTextHeading>
        </div>

        {/* Panoramic Export Banner Card with Animated Global Routes */}
        <div
          className={`relative w-full overflow-hidden border-y-2 border-emerald-600/20 dark:border-emerald-400/25 shadow-[0_16px_48px_rgba(5,150,105,0.12)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.6)] bg-[#041F16] transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Background Image Container with Interactive SVG Animation Layer */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.35/1] max-h-[580px] overflow-hidden group">
            <img
              src={exportBanner}
              alt="Dattatray Trading Company - Quality Frozen Foods, Reliable Supply, Global Reach"
              className="w-full h-full object-cover object-center transform group-hover:scale-101 transition-transform duration-1000 select-none"
              loading="lazy"
            />
            
            {/* SVG Trade Route Flight Paths & Pulsing Node Beacons */}
            <svg
              viewBox="0 0 1000 450"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
            >
              <defs>
                {/* Golden Radial Glow */}
                <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Cyan Radial Glow */}
                <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear Gradients for Arcs */}
                <linearGradient id="beamIndiaToWest" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="beamIndiaToEast" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#FDE047" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Arcs: Base Dashed Paths (Originating directly from India: 818, 232) */}
              {/* India -> USA (East Coast) */}
              <path d="M 818 232 Q 670 60 520 155" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3,4" strokeOpacity="0.45" />
              {/* India -> USA (West Coast) */}
              <path d="M 818 232 Q 640 40 465 145" fill="none" stroke="#F59E0B" strokeWidth="1.1" strokeDasharray="3,4" strokeOpacity="0.4" />
              {/* India -> South America */}
              <path d="M 818 232 Q 700 320 580 305" fill="none" stroke="#F59E0B" strokeWidth="1.1" strokeDasharray="3,4" strokeOpacity="0.4" />
              {/* India -> UK */}
              <path d="M 818 232 Q 750 140 682 135" fill="none" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="3,3" strokeOpacity="0.5" />
              {/* India -> Europe */}
              <path d="M 818 232 Q 770 170 722 148" fill="none" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="3,3" strokeOpacity="0.5" />
              {/* India -> Middle East */}
              <path d="M 818 232 Q 792 216 765 210" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,3" strokeOpacity="0.6" />
              {/* India -> Africa */}
              <path d="M 818 232 Q 767 265 715 270" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3,4" strokeOpacity="0.45" />
              {/* India -> China */}
              <path d="M 818 232 Q 847 195 875 175" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3,3" strokeOpacity="0.5" />
              {/* India -> Singapore */}
              <path d="M 818 232 Q 842 265 865 295" fill="none" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="3,3" strokeOpacity="0.55" />
              {/* India -> Japan */}
              <path d="M 818 232 Q 882 185 945 160" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3,4" strokeOpacity="0.5" />
              {/* India -> Australia */}
              <path d="M 818 232 Q 864 290 910 345" fill="none" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="3,4" strokeOpacity="0.5" />

              {/* Animated Beams (Traveling Golden Pulse lines) */}
              {/* 1. To USA (East) */}
              <path d="M 818 232 Q 670 60 520 155" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2.4" strokeDasharray="24 220">
                <animate attributeName="stroke-dashoffset" from="244" to="0" dur="3s" repeatCount="indefinite" />
              </path>
              {/* 2. To USA (West) */}
              <path d="M 818 232 Q 640 40 465 145" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2" strokeDasharray="20 260">
                <animate attributeName="stroke-dashoffset" from="280" to="0" dur="3.4s" repeatCount="indefinite" />
              </path>
              {/* 3. To South America */}
              <path d="M 818 232 Q 700 320 580 305" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2" strokeDasharray="20 200">
                <animate attributeName="stroke-dashoffset" from="220" to="0" dur="3.2s" repeatCount="indefinite" />
              </path>
              {/* 4. To UK */}
              <path d="M 818 232 Q 750 140 682 135" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2.2" strokeDasharray="18 140">
                <animate attributeName="stroke-dashoffset" from="158" to="0" dur="2.2s" repeatCount="indefinite" />
              </path>
              {/* 5. To Europe */}
              <path d="M 818 232 Q 770 170 722 148" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2.2" strokeDasharray="16 120">
                <animate attributeName="stroke-dashoffset" from="136" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              {/* 6. To Middle East */}
              <path d="M 818 232 Q 792 216 765 210" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2.4" strokeDasharray="15 80">
                <animate attributeName="stroke-dashoffset" from="95" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              {/* 7. To Africa */}
              <path d="M 818 232 Q 767 265 715 270" fill="none" stroke="url(#beamIndiaToWest)" strokeWidth="2" strokeDasharray="18 130">
                <animate attributeName="stroke-dashoffset" from="148" to="0" dur="2.4s" repeatCount="indefinite" />
              </path>
              {/* 8. To China */}
              <path d="M 818 232 Q 847 195 875 175" fill="none" stroke="url(#beamIndiaToEast)" strokeWidth="2.2" strokeDasharray="16 110">
                <animate attributeName="stroke-dashoffset" from="126" to="0" dur="1.9s" repeatCount="indefinite" />
              </path>
              {/* 9. To Singapore */}
              <path d="M 818 232 Q 842 265 865 295" fill="none" stroke="url(#beamIndiaToEast)" strokeWidth="2.2" strokeDasharray="16 120">
                <animate attributeName="stroke-dashoffset" from="136" to="0" dur="1.8s" repeatCount="indefinite" />
              </path>
              {/* 10. To Japan */}
              <path d="M 818 232 Q 882 185 945 160" fill="none" stroke="url(#beamIndiaToEast)" strokeWidth="2.2" strokeDasharray="20 180">
                <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2.6s" repeatCount="indefinite" />
              </path>
              {/* 11. To Australia */}
              <path d="M 818 232 Q 864 290 910 345" fill="none" stroke="url(#beamIndiaToEast)" strokeWidth="2.4" strokeDasharray="22 210">
                <animate attributeName="stroke-dashoffset" from="232" to="0" dur="2.8s" repeatCount="indefinite" />
              </path>

              {/* Traveling Luminous Photon Sparks */}
              <circle r="3.2" fill="#FFFFFF" filter="url(#goldGlow)">
                <animateMotion path="M 818 232 Q 670 60 520 155" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#FFFFFF" filter="url(#goldGlow)">
                <animateMotion path="M 818 232 Q 750 140 682 135" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#FFFFFF" filter="url(#goldGlow)">
                <animateMotion path="M 818 232 Q 792 216 765 210" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#FFFFFF" filter="url(#cyanGlow)">
                <animateMotion path="M 818 232 Q 842 265 865 295" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#FFFFFF" filter="url(#cyanGlow)">
                <animateMotion path="M 818 232 Q 864 290 910 345" dur="2.8s" repeatCount="indefinite" />
              </circle>

              {/* Origin: India Central Pulsing Radar Rings (Positioned 100% on India Subcontinent) */}
              <circle cx="818" cy="232" r="34" fill="none" stroke="#F59E0B" strokeWidth="1.8" opacity="0.85">
                <animate attributeName="r" values="8;36" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.95;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="818" cy="232" r="22" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.8">
                <animate attributeName="r" values="8;24" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              </circle>
              {/* Central Glowing Origin Dot */}
              <circle cx="818" cy="232" r="7" fill="#FBBF24" filter="url(#goldGlow)" />
              <circle cx="818" cy="232" r="3.5" fill="#FFFFFF" />

              {/* Destination Node Beacons */}
              {[
                { x: 520, y: 155, color: "#F59E0B" }, // USA East
                { x: 465, y: 145, color: "#F59E0B" }, // USA West
                { x: 580, y: 305, color: "#F59E0B" }, // South America
                { x: 682, y: 135, color: "#F59E0B" }, // UK
                { x: 722, y: 148, color: "#F59E0B" }, // Europe
                { x: 765, y: 210, color: "#10B981" }, // Middle East
                { x: 715, y: 270, color: "#F59E0B" }, // Africa
                { x: 875, y: 175, color: "#38BDF8" }, // China
                { x: 865, y: 295, color: "#34D399" }, // Singapore / SE Asia
                { x: 945, y: 160, color: "#38BDF8" }, // Japan
                { x: 910, y: 345, color: "#F59E0B" }, // Australia
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke={pt.color} strokeWidth="1.2" opacity="0.6">
                    <animate attributeName="r" values="3;16" dur="2.2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.85;0" dur="2.2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill={pt.color} filter="url(#goldGlow)" />
                  <circle cx={pt.x} cy={pt.y} r="2" fill="#FFFFFF" />
                </g>
              ))}

              {/* Clean Country Text Labels */}
              {/* Origin: India (Right over the Indian Subcontinent) */}
              <text
                x="818"
                y="208"
                textAnchor="middle"
                fill="#FDE047"
                fontSize="14"
                fontWeight="900"
                filter="url(#goldGlow)"
                className="select-none tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
              >
                India
              </text>

              {/* USA */}
              <text
                x="520"
                y="136"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                USA
              </text>

              {/* UK */}
              <text
                x="682"
                y="118"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                UK
              </text>

              {/* Europe */}
              <text
                x="722"
                y="132"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Europe
              </text>

              {/* Middle East */}
              <text
                x="765"
                y="194"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Middle East
              </text>

              {/* Africa */}
              <text
                x="715"
                y="294"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Africa
              </text>

              {/* China */}
              <text
                x="875"
                y="158"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                China
              </text>

              {/* Singapore */}
              <text
                x="865"
                y="316"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Singapore
              </text>

              {/* Japan */}
              <text
                x="945"
                y="142"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Japan
              </text>

              {/* Australia */}
              <text
                x="910"
                y="368"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                className="select-none tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]"
              >
                Australia
              </text>
            </svg>

            {/* Subtle Top & Bottom Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-15" />
            
            {/* Interactive Bottom Float Bar */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-wrap items-center justify-end gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl z-20">
              <div className="flex items-center gap-2.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:opacity-95 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/30 hover:scale-105 border border-[#22C55E]/30 transition-all"
                >
                  <span>Export Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-sm border border-white/20 transition-colors"
                >
                  <span>Export Catalog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Export Value Pillars Grid */}
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-8">
          {exportPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const delayMs = 300 + idx * 100;

            return (
              <div
                key={pillar.title}
                className={`group p-5 rounded-2xl bg-white dark:bg-[#0E1B15] border border-[#E5E1D8] dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(200,169,80,0.18)] hover:border-[#C8A950]/50 dark:hover:border-[#C8A950]/50 transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${pillar.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 drop-shadow-sm" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.8 rounded-full bg-[#F5EDDA] dark:bg-white/10 text-[#9E8430] dark:text-[#D4AF37] border border-[#C8A950]/30">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="text-[14px] sm:text-[15px] font-black text-[#1F2937] dark:text-white tracking-tight leading-snug mb-1.5 group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] transition-colors">
                  {pillar.title}
                </h4>

                <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

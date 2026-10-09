import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Globe2,
  ThermometerSnowflake,
  GraduationCap,
  Microscope,
  Ship,
  Sparkles,
  Mail,
  Phone,
  Copy,
  Check,
  BookOpen,
  Compass,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import {
  AnimatedNumber,
  HangingIdCard,
  ThreeDImagePageflip,
  SplitTextHeading,
} from "../components/common";

// Assets
import logoImg from "../assets/logo.png";
import chefleadshipImg from "../assets/chefleadship.png";
import executiveHeroImg from "../assets/executive_leader_hero.jpg";
import directorOneImg from "../assets/leader_director_one.jpg";
import directorTwoImg from "../assets/leader_director_two.jpg";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

export default function LeadershipPage() {
  const { isDark } = useTheme();
  const headingRef = useRef(null);
  const heroImageRef = useRef(null);
  const bookRef = useRef(null);

  // Active book page leaf state
  const [currentTurnedLeaf, setCurrentTurnedLeaf] = useState(1);
  const [copiedEmail, setCopiedEmail] = useState(null);

  const handleCopyEmail = (email, name = "Director") => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success(`Copied ${name}'s email to clipboard`, {
      description: email,
    });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyPhone = (phone, name = "Director") => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    toast.success(`Copied phone protocol for ${name}`, {
      description: phone,
    });
  };

  // GSAP Bounce-In Effect matching Dattatray Traders Hero standard
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".heading-bounce", {
        y: -40,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
      });

      if (heroImageRef.current) {
        gsap.from(heroImageRef.current, {
          scale: 0.92,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.25,
        });
      }
    }, headingRef);

    return () => ctx.revert();
  }, []);

  // Leadership Pillars
  const leadershipPillars = [
    {
      number: "01",
      title: "Ethical Farm Economics",
      description:
        "Direct empowerment of regional growers with guaranteed floor pricing, technical harvest advisory, and zero intermediary exploitation.",
      icon: Users,
    },
    {
      number: "02",
      title: "Unbroken Cryo Integrity",
      description:
        "Every metric governed by scientific precision: maintaining the -18°C setpoint without compromise from harvest blanching to maritime container discharge.",
      icon: ThermometerSnowflake,
    },
    {
      number: "03",
      title: "Global Regulatory Stewardship",
      description:
        "Zero pesticide residues, strict APEDA registration, and full traceability ensuring Indian agro produce meets the highest worldwide benchmarks.",
      icon: ShieldCheck,
    },
    {
      number: "04",
      title: "Sustainable Infrastructure",
      description:
        "Investing in solar-assisted cold stores, energy-efficient IQF blast freezers, and recyclable packaging materials to protect future generations.",
      icon: Globe2,
    },
  ];

  // Quick navigation director tabs & synchronized active leader data
  const directorDirectory = [
    {
      shortName: "Cover",
      leafIndex: 0,
      name: "Executive Board Directory",
      role: "Corporate Governance & Agro Trade Council",
      badge: "GOVERNANCE DOSSIER",
      email: "leadership@dattatraytraders.com",
      phone: "+91 94220 00000 / Executive Protocol Office",
      bio: "Established in 1994, Dattatray Traders' executive board oversees unbroken -18°C cryo-telemetry, 5,000+ MT cold-chain scale, and direct partnerships with 15,000+ regional farmers across Maharashtra.",
      credentials: [
        { text: "Three Decades of Agro Trade Stewardship", icon: Award },
        { text: "APEDA Registered Multi-Corridor Export Network", icon: Globe2 },
        { text: "State-of-the-Art IQF & Blast Cryo Facilities", icon: ThermometerSnowflake },
      ],
      ctaText: "Inquire Corporate Advisory",
    },
    {
      shortName: "Shri Dattatray",
      leafIndex: 1,
      name: "Shri Dattatray Shinde",
      role: "Founder & Chairman of the Board",
      badge: "VISIONARY FOUNDER",
      email: "dattatray.shinde@dattatraytraders.com",
      phone: "+91 94220 00000 / Board Secretariat",
      bio: "Pioneered modern agricultural trading in Maharashtra's primary harvest belt in 1994. Under his stewardship, Dattatray Traders scaled into an unbroken multi-crore cold-chain enterprise commanding 5,000+ MT capacity.",
      credentials: [
        { text: "Excellence in Agro-Logistics Lifetime Award", icon: Award },
        { text: "Maharashtra APMC Committee Board Advisory", icon: Users },
        { text: "Pioneer in Regional IQF Cryo-Storage Integration", icon: ThermometerSnowflake },
      ],
      ctaText: "Connect with Chairman",
    },
    {
      shortName: "Dr. Meera",
      leafIndex: 2,
      name: "Dr. Meera Deshmukh",
      role: "Director – Cryo-Quality & Global Compliance",
      badge: "TECHNICAL & QA GOVERNANCE",
      email: "meera.deshmukh@dattatraytraders.com",
      phone: "+91 94220 00001 / Quality Protocol Division",
      bio: "Oversees microbiological food safety protocols, APEDA phytosanitary export documentation, and continuous -18°C cryo-telemetry across all processing hubs. Lead auditor for ISO 22000 and HACCP compliance.",
      credentials: [
        { text: "Ph.D. in Food Processing & Cryo-Technology", icon: GraduationCap },
        { text: "Senior APEDA Technical Advisory Consultant", icon: ShieldCheck },
        { text: "Certified Lead Auditor: ISO 22000 & HACCP", icon: Microscope },
      ],
      ctaText: "Connect with QA Director",
    },
    {
      shortName: "Vikramaditya",
      leafIndex: 3,
      name: "Vikramaditya Shinde",
      role: "Chief Commercial Officer & Export Head",
      badge: "GLOBAL COMMERCE & LOGISTICS",
      email: "vikramaditya@dattatraytraders.com",
      phone: "+91 94220 00002 / JNPT & Mundra Export Desk",
      bio: "Directs multimodal reefer shipping corridors linking JNPT (Nhava Sheva) and Mundra with GCC, UK, and European distribution hubs. Specialist in large-scale institutional procurement contracts.",
      credentials: [
        { text: "MBA in International Supply Chain Management", icon: GraduationCap },
        { text: "Executive Member, Indo-Arab Chamber of Commerce", icon: Globe2 },
        { text: "Architect of Zero-Loss Maritime Reefer Corridors", icon: Ship },
      ],
      ctaText: "Connect with Export Desk",
    },
    {
      shortName: "Master Chef",
      leafIndex: 4,
      name: "Master Chef Leadership",
      role: "Director of Culinary & Quality Advisory",
      badge: "CULINARY R&D & SENSORY QUALITY",
      email: "culinary.leadership@dattatraytraders.com",
      phone: "+91 94220 00003 / Sensory Testing Kitchen",
      bio: "Formulates recipe protocols and sensory quality baselines for quick-frozen vegetables, purees, and snacks, ensuring original farm freshness and nutritional texture are sealed without artificial stabilizers.",
      credentials: [
        { text: "Board Certified Executive Culinary Director", icon: Award },
        { text: "Sensory Quality Assessment & Texture Specialist", icon: Sparkles },
        { text: "Architect of HoReCa Ready-to-Cook Standards", icon: CheckCircle2 },
      ],
      ctaText: "Connect with Culinary Team",
    },
  ];

  // Active director object based on turned leaf
  const activeDirector =
    directorDirectory.find((d) => d.leafIndex === currentTurnedLeaf) ||
    directorDirectory[1];

  // ─── 3D Book Leaves Setup (Open 2-Page Spreads with Reduced Content) ──────────
  const bookPages = [
    // ─── LEAF 0 ───
    {
      id: 0,
      frontContent: (
        <div className="w-full h-full flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br from-[#022117] via-[#043324] to-[#01140E] text-white border-2 border-emerald-500/40 relative overflow-hidden select-none">
          <div className="absolute inset-3 border border-amber-400/30 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 border border-amber-400/15 rounded-lg pointer-events-none" />

          {/* Top Header */}
          <div className="flex items-center justify-between z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-950/90 border border-emerald-400/40 text-emerald-300">
              BOARD DOSSIER
            </span>
            <span className="text-[10px] font-mono text-amber-300/80 tracking-widest">
              EST. 1994
            </span>
          </div>

          {/* Center Emblem & Title */}
          <div className="flex flex-col items-center text-center my-auto z-10 space-y-3">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-emerald-950/80 border-2 border-amber-400/60 p-2.5 shadow-2xl flex items-center justify-center">
              <img
                src={logoImg}
                alt="Dattatray Traders Logo"
                className="w-full h-full object-contain filter drop-shadow brightness-0 invert"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] uppercase font-black tracking-[0.25em] text-amber-400/90">
                OFFICIAL GOVERNANCE DIRECTORY
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase drop-shadow-md">
                Executive Board
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-[220px] mx-auto font-medium leading-relaxed">
                Dattatray Traders Agro-Cold Chain Enterprise
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center z-10 pt-2 border-t border-emerald-500/20">
            <p className="text-[9.5px] text-amber-300/70 font-mono tracking-wider">
              CONFIDENTIAL • APMC HEADQUARTERS
            </p>
            <p className="text-[10px] text-emerald-300/80 mt-0.5 font-bold animate-pulse">
              Click or Flip to Open Ledger →
            </p>
          </div>
        </div>
      ),
      backContent: (
        // LEFT PAGE OF SPREAD 1: Photo of Shri Dattatray Shinde
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
          <img
            src={executiveHeroImg}
            alt="Shri Dattatray Shinde"
            className="w-full h-full object-cover object-top select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/40">
              VISIONARY FOUNDER
            </span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
            <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 font-bold mb-0.5">
              30+ YEARS STEWARDSHIP
            </p>
            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
              Shri Dattatray Shinde
            </h4>
            <p className="text-[11px] text-slate-300 font-medium">
              Founder &amp; Chairman of the Board
            </p>
          </div>
        </div>
      ),
      frontBadge: "COVER",
      backBadge: "FOUNDER",
    },

    // ─── LEAF 1 ───
    {
      id: 1,
      frontContent: (
        // RIGHT PAGE OF SPREAD 1: Dossier Details of Shri Dattatray Shinde (Reduced Content)
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#021A13] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-[#01140E] text-emerald-700 dark:text-[#F3E5AB] border border-emerald-200 dark:border-[#D4AF37]/40">
                BOARD EXECUTIVE
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">
                PAGE 01
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Shri Dattatray Shinde
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#D4AF37] mt-0.5">
                Founder &amp; Chairman of the Board
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#01140E] border border-slate-200/90 dark:border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">
                    dattatray.shinde@dattatraytraders.com
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyEmail(
                      "dattatray.shinde@dattatraytraders.com",
                      "Shri Dattatray Shinde",
                    )
                  }
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "dattatray.shinde@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-[#D4AF37]/20">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">
                    +91 94220 00000 • Executive Protocol
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyPhone("+91 94220 00000", "Shri Dattatray Shinde")
                  }
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Pioneered modern agricultural trade in Maharashtra in 1994,
              expanding into an unbroken 5,000+ MT cold-chain network.
            </p>

            <div className="space-y-1.5 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                { text: "Excellence in Agro-Logistics Award", icon: Award },
                { text: "Maharashtra APMC Committee Board Advisory", icon: Users },
                { text: "Pioneer in Regional IQF Cryo-Storage", icon: ThermometerSnowflake },
              ].map((item, idx) => {
                const itemText = typeof item === "string" ? item : (item?.text || "");
                const ItemIcon = (typeof item === "object" && item?.icon) ? item.icon : CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <ItemIcon className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>{itemText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-[#D4AF37]/20">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] dark:text-[#01140E] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Connect with Chairman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ),
      backContent: (
        // LEFT PAGE OF SPREAD 2: Photo of Dr. Meera Deshmukh
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
          <img
            src={directorOneImg}
            alt="Dr. Meera Deshmukh"
            className="w-full h-full object-cover object-top select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-sky-300 border border-sky-400/40">
              TECHNICAL &amp; QA GOVERNANCE
            </span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
            <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 font-bold mb-0.5">
              18+ YEARS EXPERIENCE
            </p>
            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
              Dr. Meera Deshmukh
            </h4>
            <p className="text-[11px] text-slate-300 font-medium">
              Director – Cryo-Quality &amp; Global Compliance
            </p>
          </div>
        </div>
      ),
      frontBadge: "CHAIRMAN",
      backBadge: "QA DIRECTOR",
    },

    // ─── LEAF 2 ───
    {
      id: 2,
      frontContent: (
        // RIGHT PAGE OF SPREAD 2: Dossier Details of Dr. Meera Deshmukh
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#021A13] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-[#01140E] text-emerald-700 dark:text-[#F3E5AB] border border-emerald-200 dark:border-[#D4AF37]/40">
                QUALITY COUNCIL
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">
                PAGE 02
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Dr. Meera Deshmukh
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#D4AF37] mt-0.5">
                Director – Cryo-Quality &amp; Global Compliance
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#01140E] border border-slate-200/90 dark:border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">
                    meera.deshmukh@dattatraytraders.com
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyEmail(
                      "meera.deshmukh@dattatraytraders.com",
                      "Dr. Meera Deshmukh",
                    )
                  }
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "meera.deshmukh@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-[#D4AF37]/20">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">
                    +91 94220 00001 • Quality Protocol
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyPhone("+91 94220 00001", "Dr. Meera Deshmukh")
                  }
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug text-justify [text-justify:inter-word] [text-wrap:pretty]">
              Oversees microbiological safety, APEDA phytosanitary export
              certifications, and continuous -18°C cryo-telemetry across all
              processing hubs.
            </p>

            <div className="space-y-1.5 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                { text: "Ph.D. in Food Processing & Cryo-Technology", icon: GraduationCap },
                { text: "Senior APEDA Technical Advisory Consultant", icon: ShieldCheck },
                { text: "Certified Lead Auditor: ISO 22000 & HACCP", icon: Microscope },
              ].map((item, idx) => {
                const itemText = typeof item === "string" ? item : (item?.text || "");
                const ItemIcon = (typeof item === "object" && item?.icon) ? item.icon : CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <ItemIcon className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>{itemText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-[#D4AF37]/20">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] dark:text-[#01140E] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Connect with QA Director</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ),
      backContent: (
        // LEFT PAGE OF SPREAD 3: Photo of Vikramaditya Shinde
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
          <img
            src={directorTwoImg}
            alt="Vikramaditya Shinde"
            className="w-full h-full object-cover object-top select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/40">
              GLOBAL COMMERCE &amp; LOGISTICS
            </span>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
            <p className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 font-bold mb-0.5">
              14+ YEARS EXPERIENCE
            </p>
            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
              Vikramaditya Shinde
            </h4>
            <p className="text-[11px] text-slate-300 font-medium">
              Chief Commercial Officer &amp; Export Head
            </p>
          </div>
        </div>
      ),
      frontBadge: "QA DIRECTOR",
      backBadge: "COMMERCIAL HEAD",
    },

    // ─── LEAF 3 ───
    {
      id: 3,
      frontContent: (
        // RIGHT PAGE OF SPREAD 3: Dossier Details of Vikramaditya Shinde
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#021A13] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-[#01140E] text-emerald-700 dark:text-[#F3E5AB] border border-emerald-200 dark:border-[#D4AF37]/40">
                TRADE GOVERNANCE
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">
                PAGE 03
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Vikramaditya Shinde
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#D4AF37] mt-0.5">
                Chief Commercial Officer &amp; Export Head
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#01140E] border border-slate-200/90 dark:border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">
                    vikramaditya@dattatraytraders.com
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyEmail(
                      "vikramaditya@dattatraytraders.com",
                      "Vikramaditya Shinde",
                    )
                  }
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "vikramaditya@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-[#D4AF37]/20">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">
                    +91 94220 00002 • Export Trade Desk
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyPhone("+91 94220 00002", "Vikramaditya Shinde")
                  }
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug text-justify [text-justify:inter-word] [text-wrap:pretty]">
              Directs multimodal reefer container shipping corridors linking
              JNPT and Mundra with GCC and European distribution hubs.
            </p>

            <div className="space-y-1.5 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                { text: "MBA in International Supply Chain Management", icon: GraduationCap },
                { text: "Executive Member, Indo-Arab Chamber of Commerce", icon: Globe2 },
                { text: "Architect of Zero-Loss Maritime Reefer Corridors", icon: Ship },
              ].map((item, idx) => {
                const itemText = typeof item === "string" ? item : (item?.text || "");
                const ItemIcon = (typeof item === "object" && item?.icon) ? item.icon : CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <ItemIcon className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>{itemText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-[#D4AF37]/20">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] dark:text-[#01140E] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Connect with Export Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ),
      backContent: (
        // LEFT PAGE OF SPREAD 4: Photo of Master Chef Leadership
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E] flex flex-col items-center justify-center p-4 text-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-emerald-950/80 backdrop-blur-md p-2 border-2 border-[#D4AF37]/60 shadow-2xl mb-3">
            <img
              src={chefleadshipImg}
              alt="Master Chef Leadership"
              className="w-full h-full object-contain filter drop-shadow bg-white rounded-full p-1.5"
            />
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/40 mb-1.5">
            DIRECTOR OF CULINARY &amp; QUALITY
          </span>

          <h4 className="text-base sm:text-lg font-black text-white leading-tight">
            Master Chef Leadership
          </h4>
          <p className="text-[11px] text-slate-300 font-medium mt-0.5 max-w-[200px]">
            15+ Years Culinary R&amp;D and Flavor Integrity Lead
          </p>
        </div>
      ),
      frontBadge: "COMMERCIAL HEAD",
      backBadge: "CULINARY DIRECTOR",
    },

    // ─── LEAF 4 ───
    {
      id: 4,
      frontContent: (
        // RIGHT PAGE OF SPREAD 4: Dossier Details of Master Chef Leadership
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#021A13] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-[#01140E] text-emerald-700 dark:text-[#F3E5AB] border border-emerald-200 dark:border-[#D4AF37]/40">
                CULINARY R&amp;D
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">
                PAGE 04
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Master Chef Leadership
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#D4AF37] mt-0.5">
                Director of Culinary &amp; Quality
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#01140E] border border-slate-200/90 dark:border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">
                    culinary.leadership@dattatraytraders.com
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyEmail(
                      "culinary.leadership@dattatraytraders.com",
                      "Chef Rajesh Ranveer",
                    )
                  }
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ===
                  "culinary.leadership@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-[#D4AF37]/20">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">
                    +91 94220 00003 • Sensory Testing Kitchen
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyPhone("+91 94220 00003", "Chef Rajesh Ranveer")
                  }
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug text-justify [text-justify:inter-word] [text-wrap:pretty]">
              Formulates recipe protocols and sensory quality baselines for
              quick-frozen vegetables and snacks, sealing original farm freshness.
            </p>

            <div className="space-y-1.5 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                { text: "Board Certified Executive Culinary Director", icon: Award },
                { text: "Sensory Quality Assessment Specialist", icon: Sparkles },
                { text: "Architect of HoReCa Frozen Standards", icon: CheckCircle2 },
              ].map((item, idx) => {
                const itemText = typeof item === "string" ? item : (item?.text || "");
                const ItemIcon = (typeof item === "object" && item?.icon) ? item.icon : CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 dark:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <ItemIcon className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>{itemText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-[#D4AF37]/20">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] dark:text-[#01140E] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Connect with Culinary Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ),
      backContent: (
        // ENDPLATE: Corporate Governance Summary
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-gradient-to-br from-[#021A13] via-[#042A1E] to-[#01140E] text-white border-2 border-[#D4AF37]/40 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-950 border border-[#D4AF37]/40 text-[#F3E5AB]">
                GOVERNANCE LEDGER
              </span>
              <span className="text-[9.5px] font-mono text-[#D4AF37]">
                ENDPLATE
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
              Corporate Governance
            </h3>

            <p className="text-[11px] text-slate-200 leading-snug text-justify [text-justify:inter-word] [text-wrap:pretty]">
              Unbroken -18°C cold-chain integrity, APEDA export standards, and
              grower welfare governed under direct board oversight.
            </p>

            <div className="pt-2 space-y-2 border-t border-emerald-500/20">
              <div className="flex items-center gap-2.5 text-[10.5px] text-slate-200">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#F3E5AB]" />
                </div>
                <span>APEDA Phytosanitary &amp; FSSAI Standard Compliant</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10.5px] text-slate-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <ThermometerSnowflake className="w-2.5 h-2.5 text-emerald-300" />
                </div>
                <span>-18°C Cryo-Telemetry Continuous Audit Logs</span>
              </div>
              <div className="flex items-center gap-2.5 text-[10.5px] text-slate-200">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Globe2 className="w-2.5 h-2.5 text-[#F3E5AB]" />
                </div>
                <span>Direct Export Corridors: JNPT &amp; Mundra</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-emerald-500/20 flex items-center justify-between">
            <button
              type="button"
              onClick={() => bookRef.current?.reset()}
              className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>← Return to Cover</span>
            </button>
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#01140E] shadow-md transition-all hover:scale-105 active:scale-95 font-black"
            >
              Contact Board
            </Link>
          </div>
        </div>
      ),
      frontBadge: "CULINARY DIRECTOR",
      backBadge: "ENDPLATE",
    },
  ];

  return (
    <div className="bg-[#F9FBFC] dark:bg-[#06100B] min-h-screen text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      {/* ═════════════════════════════════════════════════════════════════════════════
          TOP GRAND HERO BANNER WITH CONDITIONAL THEME ADAPTATION:
          - Matching AboutPage dimensions, typography hierarchy, font sizes & responsive spacing
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-20 sm:pt-24 pb-16 sm:pb-16 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#01140E] via-[#022117] to-[#010E09]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs in Golden & Emerald Harmony */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none bg-[#D4AF37]/20" />
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none bg-emerald-600/20" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none bg-[#C8A950]/15" />

        <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* ── Left Side: Interactive GSAP Bounce-In Heading & Subheading ── */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4">
              {/* Badge */}
            

              {/* ✦ GSAP Bounce-In Animated Heading (Golden & White) ✦ */}
              <div ref={headingRef} className="py-2 space-y-2">
                <h1 className="font-sans tracking-tight leading-[1.05]">
                  <span className="heading-bounce block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] select-none transition-all duration-500">
                    EMPOWERING LEADERS,
                  </span>

                  <span className="heading-bounce block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    INSPIRING SUCCESS
                  </span>
                </h1>

                <div className="heading-bounce flex items-center gap-2 pt-1">
                  <div className="h-[2px] w-8 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[#F3E5AB]">
                    DRIVING COLD-CHAIN EXCELLENCE &amp; SUSTAINABLE TRADE
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl text-emerald-100/90 font-normal text-justify [text-justify:inter-word] [text-wrap:pretty]">
                Empowering people, inspiring teams, and building strong leadership to drive sustainable growth and global success with uncompromised integrity across every tier of governance.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-3.5">
                <a
                  href="#our-leaders"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#021A13]"
                >
                  <span>Explore Leaders</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#our-leaders"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-emerald-950/50 text-white border border-emerald-500/30 hover:border-[#D4AF37]"
                >
                  <span>Open Executive Ledger</span>
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ── Right Side: Interactive Hanging ID Badge with Chef Leadership & Physics ── */}
            <div
              className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center select-none py-2"
              ref={heroImageRef}
            >
              <div className="relative w-full max-w-[480px] flex flex-col items-center justify-center">
                <div className="relative z-10 w-full flex justify-center -mt-4 sm:-mt-6">
                  <HangingIdCard
                    ropeLength={95}
                    ropeColor="#042a1e"
                    name="Master Chef Leadership"
                    role="Director of Culinary & Quality"
                    badgeId="DT-CHEF-01"
                    accentColor="#D4AF37"
                    avatarImage={chefleadshipImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Smooth Slanted Bottom Wave Transition ── */}
        <div className="absolute -bottom-[2px] left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-[#F9FBFC] dark:fill-[#06100B] transition-colors duration-300 translate-y-[1px]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,125 L0,125 Z"></path>
          </svg>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          SECTION 2: "OUR LEADERS" SIDE-BY-SIDE INTERACTIVE EXECUTIVE SHOWCASE
          - Section Heading matching TradingPage/AboutPage signature SplitTextHeading
          - Left Side: 3D Pageflip Book (Auto-Flip + Centered Endplate)
          - Right Side: Synchronized Spotlight Card with Matching Equal Height
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        id="our-leaders"
        className={`pt-14 sm:pt-20 pb-8 sm:pb-12 transition-colors duration-300 relative ${
          isDark ? "bg-[#06100B]" : "bg-[#F9FBFC]"
        }`}
      >
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Section Header matching AboutPage Signature Style ── */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
            
            <SplitTextHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-white tracking-tight leading-[1.15]"
            >
              Our Executive{" "}
              <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                Board &amp; Leadership
              </span>
            </SplitTextHeading>

            
          </div>

          {/* Side-by-Side Grid with Perfectly Balanced Equal Height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
            {/* ── LEFT SIDE: Increased Size 3D Pageflip Book with Auto-Flip ── */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-between overflow-visible">
              <div className="w-full flex justify-center overflow-x-auto py-2 no-scrollbar">
                <ThreeDImagePageflip
                  ref={bookRef}
                  pages={bookPages}
                  defaultTurnedIndex={1}
                  pageWidth={320}
                  pageHeight={455}
                  perspective={1400}
                  peekAngle={14}
                  duration={0.7}
                  shadowIntensity={0.12}
                  spineShift={true}
                  accentColor={isDark ? "#D4AF37" : "#059669"}
                  autoplay={true}
                  autoplayInterval={4500}
                  pauseOnHover={true}
                  onPageChange={(turned) => setCurrentTurnedLeaf(turned)}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* ── RIGHT SIDE: Active Leader Spotlight Card with Matching Height ── */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
              <div
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between flex-1 shadow-xl ${
                  isDark
                    ? "bg-gradient-to-br from-[#021A13] via-[#03261A] to-[#010E09] border-[#D4AF37]/35 shadow-2xl"
                    : "bg-white border-slate-200/90 shadow-slate-200/50"
                }`}
              >
                {/* Top: Header Badges & Names */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-[#01140E] text-emerald-700 dark:text-[#F3E5AB] border border-emerald-200 dark:border-[#D4AF37]/40">
                      {activeDirector.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400">
                      {currentTurnedLeaf === 0
                        ? "Cover Leaf"
                        : `Director 0${currentTurnedLeaf} / 04`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {activeDirector.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#D4AF37] mt-1">
                      {activeDirector.role}
                    </p>
                  </div>

                  {/* Email Address & Contact Card */}
                  <div className="py-3 px-4 rounded-2xl bg-slate-50 dark:bg-[#01140E] border border-slate-200/80 dark:border-[#D4AF37]/30 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 min-w-0 pr-2">
                        <Mail className="w-4 h-4 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                        <a
                          href={`mailto:${activeDirector.email}`}
                          className="hover:underline truncate font-sans font-medium text-[13px] tracking-tight hover:text-emerald-600 dark:hover:text-[#F3E5AB] transition-colors"
                        >
                          {activeDirector.email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyEmail(
                            activeDirector.email,
                            activeDirector.name,
                          )
                        }
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedEmail === activeDirector.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-[#D4AF37]/20">
                      <div className="flex items-center gap-2.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium tracking-tight truncate">
                          {activeDirector.phone}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPhone(
                            activeDirector.phone,
                            activeDirector.name,
                          )
                        }
                        className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                        title="Copy phone number"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Executive Bio Narrative */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify [text-justify:inter-word] [text-wrap:pretty]">
                    {activeDirector.bio}
                  </p>

                  {/* Governance Credentials Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#D4AF37]/20">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      GOVERNANCE &amp; BOARD FOCUS:
                    </p>
                    <div className="space-y-2">
                      {activeDirector?.credentials?.map((cred, idx) => {
                        const credText = typeof cred === "string" ? cred : (cred?.text || "");
                        const CredIcon = (typeof cred === "object" && cred?.icon) ? cred.icon : CheckCircle2;
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200"
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-400/40 flex items-center justify-center shrink-0">
                              <CredIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="font-medium">{credText}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 mt-auto border-t border-slate-100 dark:border-[#D4AF37]/20">
                  <Link
                    to="/contact"
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:from-[#15803D] hover:to-[#14532D] text-white shadow-lg dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] dark:text-[#01140E] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <span>{activeDirector.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          SECTION 3: CORE LEADERSHIP PILLARS & STRATEGIC GOVERNANCE
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 transition-colors duration-300 relative">
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#022A1C] border border-emerald-200 dark:border-[#D4AF37]/40 text-emerald-800 dark:text-[#F3E5AB] text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37]" />
                <span>STRATEGIC GOVERNANCE CODE</span>
              </div>

              <SplitTextHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] dark:text-white tracking-tight leading-[1.15]"
              >
                Four Pillars of{" "}
                <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                  Enduring Leadership
                </span>
              </SplitTextHeading>

            

              <div className="pt-3 space-y-4">
                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-950/30 dark:from-[#D4AF37]/25 dark:via-[#022A1C] dark:to-[#010E09] border border-emerald-500/30 dark:border-[#D4AF37]/40 text-emerald-600 dark:text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-[15px] font-black text-slate-900 dark:text-white">
                      Zero Compromise on Cold Chain
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5 leading-relaxed">
                      Strict -18°C temperature telemetry recorded throughout storage and reefer transit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-950/30 dark:from-[#D4AF37]/25 dark:via-[#022A1C] dark:to-[#010E09] border border-emerald-500/30 dark:border-[#D4AF37]/40 text-emerald-600 dark:text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-[15px] font-black text-slate-900 dark:text-white">
                      Direct Farmer Economic Dignity
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5 leading-relaxed">
                      Timely settlements and guaranteed procurement contracts for over 15,000 grower families.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-950/30 dark:from-[#D4AF37]/25 dark:via-[#022A1C] dark:to-[#010E09] border border-emerald-500/30 dark:border-[#D4AF37]/40 text-emerald-600 dark:text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-[15px] font-black text-slate-900 dark:text-white">
                      Institutional Global Trade
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5 leading-relaxed">
                      Multi-port containerized reefer exports meeting APEDA, FSSAI, and international phytosanitary laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: 4 Pillar Cards with Permanent Red React Icons & Stable Colors */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {leadershipPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.number}
                    className={`relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:scale-[1.015] shadow-sm hover:shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-[#021A13] via-[#021F17] to-[#01140E] border-emerald-900/40"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl sm:text-3xl font-black text-slate-300 dark:text-slate-600">
                          {pillar.number}
                        </span>
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-[#C62828] dark:text-[#EF5350] border border-red-200/80 dark:border-red-900/50 shadow-sm"
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 " />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-6 [text-wrap:pretty]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          SECTION 4: LEADERSHIP IMPACT COUNTER METRICS
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        className={`py-14 sm:py-16 border-y transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-[#01140E] via-[#022A1C] to-[#010E09] border-[#D4AF37]/40"
            : "bg-gradient-to-r from-emerald-950 via-[#03241A] to-emerald-950 text-white border-emerald-900"
        }`}
      >
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950]">
                <AnimatedNumber target={30} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#F3E5AB]">
                Years Agro Stewardship
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950]">
                <AnimatedNumber target={5000} suffix="+ MT" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#F3E5AB]">
                Annual Cryo Storage
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950]">
                <AnimatedNumber target={12} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#F3E5AB]">
                Global Export Ports
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950]">
                <AnimatedNumber target={15000} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#F3E5AB]">
                Partner Farmers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
  Mail,
  Phone,
  Copy,
  Check,
  BookOpen,
  Compass,
  RotateCcw
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { AnimatedNumber, HangingIdCard, ThreeDImagePageflip, SplitTextHeading } from "../components/common";

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
    toast.success(`Copied email to clipboard`, {
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
          delay: 0.25
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
      description: "Direct empowerment of regional growers with guaranteed floor pricing, technical harvest advisory, and zero intermediary exploitation.",
      icon: Users
    },
    {
      number: "02",
      title: "Unbroken Cryo Integrity",
      description: "Every metric governed by scientific precision: maintaining the -18°C setpoint without compromise from harvest blanching to maritime container discharge.",
      icon: ThermometerSnowflake
    },
    {
      number: "03",
      title: "Global Regulatory Stewardship",
      description: "Zero pesticide residues, strict APEDA registration, and full traceability ensuring Indian agro produce meets the highest worldwide benchmarks.",
      icon: ShieldCheck
    },
    {
      number: "04",
      title: "Sustainable Infrastructure",
      description: "Investing in solar-assisted cold stores, energy-efficient IQF blast freezers, and recyclable packaging materials to protect future generations.",
      icon: Globe2
    }
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
        "Three Decades of Agro Trade Stewardship",
        "APEDA Registered Multi-Corridor Export Network",
        "State-of-the-Art IQF & Blast Cryo Facilities"
      ],
      ctaText: "Inquire Corporate Advisory"
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
        "Excellence in Agro-Logistics Lifetime Award",
        "Maharashtra APMC Committee Board Advisory",
        "Pioneer in Regional IQF Cryo-Storage Integration"
      ],
      ctaText: "Connect with Chairman"
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
        "Ph.D. in Food Processing & Cryo-Technology",
        "Senior APEDA Technical Advisory Consultant",
        "Certified Lead Auditor: ISO 22000 & HACCP"
      ],
      ctaText: "Connect with QA Director"
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
        "MBA in International Supply Chain Management",
        "Executive Member, Indo-Arab Chamber of Commerce",
        "Architect of Zero-Loss Maritime Reefer Corridors"
      ],
      ctaText: "Connect with Export Desk"
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
        "Board Certified Executive Culinary Director",
        "Sensory Quality Assessment & Texture Specialist",
        "Architect of HoReCa Ready-to-Cook Standards"
      ],
      ctaText: "Connect with Culinary Team"
    },
  ];

  // Active director object based on turned leaf
  const activeDirector = directorDirectory.find(d => d.leafIndex === currentTurnedLeaf) || directorDirectory[1];

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
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#081526] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-sky-950/80 text-emerald-700 dark:text-[#38BDF8] border border-emerald-200 dark:border-sky-800/40">
                BOARD EXECUTIVE
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">PAGE 01</span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Shri Dattatray Shinde
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#38BDF8] mt-0.5">
                Founder &amp; Chairman of the Board
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0E223D] border border-slate-200/90 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#38BDF8] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">dattatray.shinde@dattatraytraders.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail("dattatray.shinde@dattatraytraders.com", "Shri Dattatray Shinde")}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "dattatray.shinde@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">+91 94220 00000 • Executive Protocol</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone("+91 94220 00000", "Shri Dattatray Shinde")}
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Pioneered modern agricultural trade in Maharashtra in 1994, expanding into an unbroken 5,000+ MT cold-chain network.
            </p>

            <div className="space-y-1 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                "Excellence in Agro-Logistics Award",
                "Maharashtra APMC Committee Board Advisory",
                "Pioneer in Regional IQF Cryo-Storage"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 dark:from-[#1E56C8] dark:via-[#0284C7] dark:to-[#38BDF8] dark:hover:from-[#2563EB] dark:hover:to-[#60A5FA] dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
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
        // RIGHT PAGE OF SPREAD 2: Dossier Details of Dr. Meera Deshmukh (Reduced Content)
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#081526] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-sky-950/80 text-emerald-700 dark:text-[#38BDF8] border border-emerald-200 dark:border-sky-800/40">
                QUALITY COUNCIL
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">PAGE 02</span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Dr. Meera Deshmukh
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#38BDF8] mt-0.5">
                Director – Cryo-Quality &amp; Global Compliance
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0E223D] border border-slate-200/90 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#38BDF8] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">meera.deshmukh@dattatraytraders.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail("meera.deshmukh@dattatraytraders.com", "Dr. Meera Deshmukh")}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "meera.deshmukh@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">+91 94220 00001 • Quality Protocol</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone("+91 94220 00001", "Dr. Meera Deshmukh")}
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Oversees microbiological safety, APEDA phytosanitary export certifications, and continuous -18°C cryo-telemetry across all processing hubs.
            </p>

            <div className="space-y-1 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                "Ph.D. in Food Processing & Cryo-Technology",
                "Senior APEDA Technical Advisory Consultant",
                "Certified Lead Auditor: ISO 22000 & HACCP"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 dark:from-[#1E56C8] dark:via-[#0284C7] dark:to-[#38BDF8] dark:hover:from-[#2563EB] dark:hover:to-[#60A5FA] dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
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
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-400/40">
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
        // RIGHT PAGE OF SPREAD 3: Dossier Details of Vikramaditya Shinde (Reduced Content)
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#081526] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-sky-950/80 text-emerald-700 dark:text-[#38BDF8] border border-emerald-200 dark:border-sky-800/40">
                TRADE GOVERNANCE
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">PAGE 03</span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Vikramaditya Shinde
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#38BDF8] mt-0.5">
                Chief Commercial Officer &amp; Export Head
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0E223D] border border-slate-200/90 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#38BDF8] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">vikramaditya@dattatraytraders.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail("vikramaditya@dattatraytraders.com", "Vikramaditya Shinde")}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "vikramaditya@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">+91 94220 00002 • Export Trade Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone("+91 94220 00002", "Vikramaditya Shinde")}
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Directs multimodal reefer container shipping corridors linking JNPT and Mundra with GCC and European distribution hubs.
            </p>

            <div className="space-y-1 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                "MBA in International Supply Chain Management",
                "Executive Member, Indo-Arab Chamber of Commerce",
                "Architect of Zero-Loss Maritime Reefer Corridors"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 dark:from-[#1E56C8] dark:via-[#0284C7] dark:to-[#38BDF8] dark:hover:from-[#2563EB] dark:hover:to-[#60A5FA] dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
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
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/15 backdrop-blur-md p-2 border-2 border-white/40 shadow-2xl mb-3">
            <img
              src={chefleadshipImg}
              alt="Master Chef Leadership"
              className="w-full h-full object-contain filter drop-shadow bg-white rounded-full p-1.5"
            />
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/40 mb-1.5">
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
        // RIGHT PAGE OF SPREAD 4: Dossier Details of Master Chef Leadership (Reduced Content)
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-white dark:bg-[#081526] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-sky-950/80 text-emerald-700 dark:text-[#38BDF8] border border-emerald-200 dark:border-sky-800/40">
                CULINARY R&amp;D
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">PAGE 04</span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Master Chef Leadership
              </h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-[#38BDF8] mt-0.5">
                Director of Culinary &amp; Quality
              </p>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0E223D] border border-slate-200/90 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 min-w-0 pr-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-[#38BDF8] shrink-0" />
                  <span className="truncate font-sans font-medium tracking-tight text-[11.5px] select-all">culinary.leadership@dattatraytraders.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail("culinary.leadership@dattatraytraders.com", "Chef Rajesh Ranveer")}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === "culinary.leadership@dattatraytraders.com" ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="font-medium tracking-tight truncate">+91 94220 00003 • Sensory Testing Kitchen</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone("+91 94220 00003", "Chef Rajesh Ranveer")}
                  className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  <Copy className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Formulates recipe protocols and sensory quality baselines for quick-frozen vegetables and snacks, sealing original farm flavour.
            </p>

            <div className="space-y-1 pt-0.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Key Credentials:
              </p>
              {[
                "Board Certified Executive Culinary Director",
                "Sensory Quality Assessment Specialist",
                "Architect of HoReCa Frozen Standards"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/contact"
              className="w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 dark:from-[#1E56C8] dark:via-[#0284C7] dark:to-[#38BDF8] dark:hover:from-[#2563EB] dark:hover:to-[#60A5FA] dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Connect with Culinary Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ),
      backContent: (
        // ENDPLATE: Corporate Governance Summary (Content Reduced to fit comfortably)
        <div className="w-full h-full p-4 sm:p-5 flex flex-col bg-gradient-to-br from-[#06101E] via-[#09172A] to-[#0B1F38] text-white border-2 border-slate-700 select-none overflow-hidden">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest bg-sky-950 border border-sky-500/40 text-sky-300">
                GOVERNANCE LEDGER
              </span>
              <span className="text-[9.5px] font-mono text-slate-400">ENDPLATE</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
              Corporate Governance
            </h3>

            <p className="text-[11px] text-slate-300 leading-snug">
              Unbroken -18°C cold-chain integrity, APEDA export standards, and grower welfare governed under direct board oversight.
            </p>

            <div className="pt-1.5 space-y-1.5 border-t border-slate-800">
              <div className="flex items-center gap-2 text-[10.5px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>APEDA Phytosanitary &amp; FSSAI Standard Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-[10.5px] text-slate-300">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>-18°C Cryo-Telemetry Continuous Audit Logs</span>
              </div>
              <div className="flex items-center gap-2 text-[10.5px] text-slate-300">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Direct Export Corridors: JNPT &amp; Mundra</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => bookRef.current?.reset()}
              className="text-xs font-bold text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>← Return to Cover</span>
            </button>
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
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
    <div className="bg-[#F9FBFC] dark:bg-[#07111E] min-h-screen text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      
      {/* ═════════════════════════════════════════════════════════════════════════════
          TOP GRAND HERO BANNER
          - Single 1-Line Horizontal Heading: "Empowering Leaders, Transforming Organizations"
          - Minimized 2-Line Subtitle Description
          - Interactive Hanging ID Badge with Chef Leadership & Continuous Sway Physics
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-28 sm:pt-32 pb-24 sm:pb-32 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#06101E] via-[#09172A] to-[#0B1F38]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs */}
        <div
          className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#1E56C8]/25" : "bg-emerald-600/20"
          }`}
        />
        <div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#38BDF8]/20" : "bg-emerald-400/15"
          }`}
        />
        <div
          className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#0284C7]/15" : "bg-teal-600/15"
          }`}
        />

        <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            
            {/* ── Left Side: 1-Line Horizontal Heading & Subheading ── */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-5" ref={headingRef}>
              
              {/* ✦ 1-LINE HORIZONTAL DUAL HEADING ("Empowering Leaders, Transforming Organizations") ✦ */}
              <div className="py-1 space-y-2">
                <h1 className="font-sans tracking-tight leading-tight select-none">
                  <span className="heading-bounce inline text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black text-emerald-400 dark:text-[#38BDF8] drop-shadow-md">
                    Empowering Leaders,{" "}
                  </span>
                  <span className="heading-bounce inline text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black text-white drop-shadow-md">
                    Transforming Organizations
                  </span>
                </h1>

                {/* Subtitle Accent Bar */}
                <div className="heading-bounce flex items-center gap-2 pt-1">
                  <div
                    className={`h-[2px] w-8 rounded-full transition-all duration-500 ${
                      isDark ? "bg-[#38BDF8]" : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] transition-all duration-500 ${
                      isDark ? "text-[#38BDF8]" : "text-emerald-400"
                    }`}
                  >
                    DRIVING COLD-CHAIN EXCELLENCE &amp; SUSTAINABLE TRADE
                  </span>
                </div>
              </div>

              {/* Description (strictly 2 clean, balanced lines) */}
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal transition-colors duration-500 ${
                  isDark ? "text-slate-300" : "text-emerald-100/90"
                }`}
                style={{ textWrap: "balance" }}
              >
                Comprehensive leadership solutions designed to unlock potential, inspire teams, and drive sustainable success for your organization.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                <a
                  href="#our-leaders"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border ${
                    isDark
                      ? "border-[#38BDF8]/60 bg-sky-950/40 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06101E] shadow-[#38BDF8]/20"
                      : "border-emerald-400/70 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-400 hover:text-[#021A13] shadow-emerald-500/20"
                  }`}
                >
                  <span>Explore Leaders</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#our-leaders"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#60A5FA] hover:to-[#1E56C8] text-[#06101E] shadow-xl shadow-[#0284C7]/30"
                      : "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-300 hover:to-emerald-500 text-slate-950 shadow-xl shadow-emerald-950/40"
                  }`}
                >
                  <span>Open Executive Ledger</span>
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* ── Right Side: Interactive Hanging ID Badge with Chef Leadership & Physics ── */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center relative" ref={heroImageRef}>
              <div className="relative w-full max-w-[500px] flex flex-col items-center justify-center">
                <div className="relative z-10 w-full flex justify-center pt-2">
                  <HangingIdCard
                    ropeLength={115}
                    ropeColor={isDark ? "#0284C7" : "#042a1e"}
                    name="Master Chef Leadership"
                    role="Director of Culinary & Quality"
                    badgeId="DT-CHEF-01"
                    accentColor={isDark ? "#38BDF8" : "#059669"}
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
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-[#F9FBFC] dark:fill-[#07111E] transition-colors duration-300 translate-y-[1px]"
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
      <section id="our-leaders" className={`pt-12 sm:pt-16 pb-6 sm:pb-8 transition-colors duration-300 relative ${
        isDark ? "bg-[#07111E]" : "bg-[#F9FBFC]"
      }`}>
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ── Section Header matching TradingPage & AboutPage Signature Style ── */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/20 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8] text-xs font-black uppercase tracking-[0.2em] mb-2.5 sm:mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>EXECUTIVE GOVERNANCE &amp; DIRECTORS</span>
            </div>
            
            <SplitTextHeading
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.02] sm:leading-[1.05] mb-2.5"
            >
              Our Executive <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-600 via-[#1E56C8] to-[#38BDF8] dark:from-emerald-400 dark:via-[#38BDF8] dark:to-sky-300 bg-clip-text text-transparent">
                Board
              </span>
            </SplitTextHeading>
            
            <p className="text-xs sm:text-sm md:text-base text-[#5D6B7E] dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Guiding three decades of agricultural market stewardship, cold-chain innovation, and global compliance.
            </p>

          
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
                  shadowIntensity={0.45}
                  spineShift={true}
                  accentColor={isDark ? "#38BDF8" : "#059669"}
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
                    ? "bg-[#0E223D] border-slate-800 shadow-slate-950/50"
                    : "bg-white border-slate-200/90 shadow-slate-200/50"
                }`}
              >
                {/* Top: Header Badges & Names */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-sky-950 text-emerald-700 dark:text-[#38BDF8] border border-emerald-200 dark:border-sky-800/50">
                      {activeDirector.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {currentTurnedLeaf === 0 ? "Cover Leaf" : `Director 0${currentTurnedLeaf} / 04`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {activeDirector.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#38BDF8] mt-1">
                      {activeDirector.role}
                    </p>
                  </div>

                  {/* Email Address & Contact Card with Senior Frontend Text Spacing & Sonner Toasts */}
                  <div className="py-3 px-4 rounded-2xl bg-slate-50 dark:bg-[#071322] border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 min-w-0 pr-2">
                        <Mail className="w-4 h-4 text-emerald-600 dark:text-[#38BDF8] shrink-0" />
                        <a
                          href={`mailto:${activeDirector.email}`}
                          className="hover:underline truncate font-sans font-medium text-[13px] tracking-tight hover:text-emerald-600 dark:hover:text-[#38BDF8] transition-colors"
                        >
                          {activeDirector.email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(activeDirector.email, activeDirector.name)}
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedEmail === activeDirector.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex items-center gap-2.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium tracking-tight truncate">{activeDirector.phone}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(activeDirector.phone, activeDirector.name)}
                        className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90 shrink-0 cursor-pointer"
                        title="Copy phone number"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Executive Bio Narrative */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeDirector.bio}
                  </p>

                  {/* Governance Credentials Checklist */}
                  <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Governance &amp; Board Focus:
                    </p>
                    {activeDirector.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/contact"
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 dark:from-[#1E56C8] dark:via-[#0284C7] dark:to-[#38BDF8] dark:hover:from-[#2563EB] dark:hover:to-[#60A5FA] dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
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
          ✦ Enhanced with GSAP Draggable LiveSnap Inertia Physics Grid (.ball) ✦
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="pt-6 sm:pt-8 pb-14 sm:pb-20 transition-colors duration-300 relative">
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/20 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8] text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                <Compass className="w-3.5 h-3.5" />
                <span>OUR STRATEGIC CODE</span>
              </div>

              <SplitTextHeading
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-tight"
              >
                Four Pillars of{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-[#1E56C8] to-[#38BDF8] dark:from-emerald-400 dark:via-[#38BDF8] dark:to-sky-300 bg-clip-text text-transparent">
                  Enduring Leadership
                </span>
              </SplitTextHeading>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Modern agribusiness demands more than trade execution—it requires unwavering ethical compass, scientific rigor, and farmer-centric economics.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Compromise on Cold Chain</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Strict -18°C temperature telemetry recorded throughout storage and transit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Direct Farmer Economic Dignity</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Timely settlements and guaranteed procurement contracts for over 15,000 grower families.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Institutional Global Trade</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Multi-port containerized reefer exports meeting APEDA, FSSAI, and international phytosanitary laws.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: 4 Pillar Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {leadershipPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.number}
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? "bg-[#0E223D] border-slate-800 hover:border-sky-500/50"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-300 dark:text-slate-700">
                        {pillar.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isDark ? "bg-sky-950 text-[#38BDF8]" : "bg-sky-50 text-[#123741]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
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
            ? "bg-gradient-to-r from-[#06101E] via-[#09172A] to-[#06101E] border-slate-800"
            : "bg-gradient-to-r from-emerald-950 via-[#03241A] to-emerald-950 text-white border-emerald-900"
        }`}
      >
        <div className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                <AnimatedNumber target={30} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-slate-300">
                Years Agro Stewardship
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                <AnimatedNumber target={5000} suffix="+ MT" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-slate-300">
                Annual Cryo Storage
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                <AnimatedNumber target={12} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-slate-300">
                Global Export Ports
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                <AnimatedNumber target={15000} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-slate-300">
                Partner Farmers
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ThermometerSnowflake,
  Globe2,
  Users,
  Award,
  Building2,
  ArrowRight,
  Leaf,
  Truck,
  HeartHandshake,
  MessageCircle,
  Play,
  Eye,
  Target,
} from "lucide-react";
import facilityImg from "../assets/dattatray_facility.jpg";
import iqfProcessingImg from "../assets/dattatray_iqf_processing.jpg";
import reeferFleetImg from "../assets/dattatray_reefer_fleet.jpg";
import frozenSupplyZoneImg from "../assets/frozen_supply_zone.jpg";
import dattatrayLogo from "../assets/logo.png";
import pureVegSnacksImg from "../assets/pure_veg_snacks.jpg";
import coldChainEcosystemMap from "../assets/coldchain_ecosystem_map.jpg";
import truckImg from "../assets/truck2.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { SplitTextHeading, AnimatedNumber } from "../components/common";
import ColdChainInteractiveMap from "../components/about/ColdChainInteractiveMap";

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutPage Component
 * Features:
 * - Top Full-Bleed Grand Hero Banner: Green in Light mode, Blueish in Dark mode
 * - Clickable Brand Emblem with animated radial halo on the right
 * - Slanted curved wave transition
 * - Comprehensive About sections moved down with brochure-perfect alignment & responsive padding matching the Contact page
 */
export default function AboutPage() {
  const { isDark } = useTheme();
  const headingRef = useRef(null);
  const logoSceneRef = useRef(null);
  const logoCubeRef = useRef(null);
  const firstBallRef = useRef(null);
  const lastBallRef = useRef(null);
  const truckRef = useRef(null);
  const ctaBannerRef = useRef(null);

  // Scroll to Leadership section if routed to #leadership or /leadership:
  useEffect(() => {
    if (window.location.hash === "#leadership" || window.location.pathname === "/leadership") {
      const timer = setTimeout(() => {
        const el = document.getElementById("leadership");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // GSAP Bounce-In Effect for Hero Heading:
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".text", {
        y: -100,
        opacity: 0,
        duration: 1.1,
        ease: "bounce.out",
        stagger: 0.15,
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to #leadership if hash is present
  useEffect(() => {
    if (window.location.hash === "#leadership") {
      const timer = setTimeout(() => {
        const el = document.getElementById("leadership");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // 3D Interactive Logo Cube / Emblem on mousemove (User Specification):
  // scene.addEventListener("mousemove", (e) => {
  //   rotY += (e.clientX - lastX) * 0.5;
  //   rotX -= (e.clientY - lastY) * 0.5;
  //   gsap.to(cube, { rotateX: rotX, rotateY: rotY, duration: 0.3 });
  // });
  useEffect(() => {
    const scene = logoSceneRef.current;
    const cube = logoCubeRef.current;
    if (!scene || !cube) return;

    let lastX = 0;
    let lastY = 0;
    let rotX = 0;
    let rotY = 0;
    let isMoving = false;

    const handleMouseEnter = (e) => {
      isMoving = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isMoving) {
        lastX = e.clientX;
        lastY = e.clientY;
        isMoving = true;
        return;
      }
      rotY += (e.clientX - lastX) * 0.5;
      rotX -= (e.clientY - lastY) * 0.5;
      lastX = e.clientX;
      lastY = e.clientY;

      // Realistic angle dampening limits for sleek premium feel
      rotX = Math.max(-28, Math.min(28, rotX));
      rotY = Math.max(-32, Math.min(32, rotY));

      gsap.to(cube, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      isMoving = false;
      rotX = 0;
      rotY = 0;
      gsap.to(cube, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    scene.addEventListener("mouseenter", handleMouseEnter);
    scene.addEventListener("mousemove", handleMouseMove);
    scene.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scene.removeEventListener("mouseenter", handleMouseEnter);
      scene.removeEventListener("mousemove", handleMouseMove);
      scene.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Kinetic Newton's Cradle Animation (Momentum loop requested by user):
  // const tl = gsap.timeline({ repeat: -1 });
  // tl.to(firstBall, { rotation: -30, duration: 0.3, transformOrigin: "top" })
  //   .to(firstBall, { rotation: 0, duration: 0.3 })
  //   .to(lastBall, { rotation: 30, duration: 0.3 }, "-=0.05")
  //   .to(lastBall, { rotation: 0, duration: 0.3 });
  useEffect(() => {
    const firstBall = firstBallRef.current;
    const lastBall = lastBallRef.current;
    if (!firstBall || !lastBall) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(firstBall, { rotation: -30, duration: 0.3, transformOrigin: "top" })
      .to(firstBall, { rotation: 0, duration: 0.3 })
      .to(lastBall, { rotation: 30, duration: 0.3 }, "-=0.05")
      .to(lastBall, { rotation: 0, duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, []);

  // Reefer Truck Driving Scroll Animation:
  useEffect(() => {
    const truck = truckRef.current;
    const banner = ctaBannerRef.current;
    if (!truck || !banner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        truck,
        {
          x: 260,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: banner,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "30+", label: "Years Agro Leadership" },
    { value: "5000+ MT", label: "Annual Processing Capacity" },
    { value: "12+", label: "Global Export Nations" },
    { value: "500+", label: "HoReCa & Trade Partners" },
  ];

  const missionPoints = [
    "Fostering Sustainable Growth and Direct Farm Sourcing",
    "Innovating for an Unbroken -18°C Cold Chain Future",
    "Customer-Centric HoReCa and Export Solutions",
    "Building Stronger Global Partnerships & Farmer Communities",
  ];

  const visionPoints = [
    "Inspiring Modern Cold-Chain Infrastructure & Logistics",
    "Pioneering Sustainable Agricultural Export Benchmarks",
    "Empowering Regional Growers with Assured Fair Procurement",
    "Zero Preservative Flash-Freezing for Optimal Nutrition",
  ];

  const coreValues = [
    {
      index: "01",
      icon: ShieldCheck,
      title: "Uncompromising Quality",
      desc: "Every batch of frozen vegetables and snacks undergoes stringent multi-stage optical sorting and microbiological testing.",
      tag: "Optical Sorting & Lab Tested",
    },
    {
      index: "02",
      icon: ThermometerSnowflake,
      title: "-18°C Cold Integrity",
      desc: "Continuous temperature monitoring across processing, storage, and reefer transit guarantees farm-fresh taste.",
      tag: "Unbroken Cryo-Chain",
    },
    {
      index: "03",
      icon: HeartHandshake,
      title: "Farmer Partnership",
      desc: "Direct ethical tie-ups with verified agricultural growers in rich fertile belts ensure consistent high-grade harvest.",
      tag: "Direct Farm Procurement",
    },
    {
      index: "04",
      icon: Globe2,
      title: "Global Compliance",
      desc: "Fully certified operations meeting APEDA, FSSAI, ISO, and international destination import standards.",
      tag: "APEDA, FSSAI & ISO Certified",
    },
  ];

  return (
    <div className="bg-[#F9FBFC] dark:bg-[#07111E] min-h-screen text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      
      {/* ═════════════════════════════════════════════════════════════════════════════
          TOP GRAND HERO BANNER WITH CONDITIONAL THEME ADAPTATION:
          - Light Mode: Rich Botanical Green Palette (Emerald / Jade / Mint)
          - Dark Theme (Toggle in Black): Blueish Palette (Deep Midnight Navy / Cyan / Sky Blue)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-28 sm:pt-32 pb-24 sm:pb-32 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#06101E] via-[#09172A] to-[#0B1F38]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs (Conditional: Emerald Green in Light, Cyan/Navy in Dark) */}
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
            
            {/* ── Left Side: Interactive GSAP Bounce-In Heading & Subheading ── */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4">
              
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm transition-all duration-500 ${
                  isDark
                    ? "bg-sky-950/70 border border-sky-500/35 text-[#38BDF8]"
                    : "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
                }`}
              >
                <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
                <span className="leading-tight">ESTABLISHED 1994 • THREE DECADES OF TRUST</span>
              </div>

              {/* ✦ GSAP Bounce-In Animated Heading (Conditional Gradient) ✦ */}
              <div ref={headingRef} className="py-2 space-y-2">
                <h1 className="font-sans tracking-tight leading-[1.05]">
                  <span
                    className={`text block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text select-none transition-all duration-500 ${
                      isDark
                        ? "bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] drop-shadow-[0_4px_30px_rgba(56,189,248,0.35)]"
                        : "bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 drop-shadow-[0_4px_30px_rgba(16,185,129,0.35)]"
                    }`}
                  >
                    DATTATRAY
                  </span>
                  <span className="text block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    TRADING COMPANY
                  </span>
                </h1>

                <div className="text flex items-center gap-2 pt-1">
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
                    PIONEERING AGRO &amp; COLD-CHAIN EXCELLENCE
                  </span>
                </div>
              </div>

              <p
                className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl transition-colors duration-500 ${
                  isDark ? "text-slate-300" : "text-emerald-100/80"
                }`}
              >
                Bridging fertile Indian agricultural belts with international cold-chain logistics. Delivering premium IQF deep-frozen vegetables, ready-to-cook snacks, and fruit pulps with unbroken -18°C temperature integrity.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-3.5">
                <Link
                  to="/products"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#60A5FA] hover:to-[#1E56C8] text-[#06101E] shadow-[#0284C7]/35"
                      : "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-300 hover:to-emerald-500 text-slate-950 shadow-emerald-950/50 hover:shadow-emerald-500/30"
                  }`}
                >
                  <span>Explore Catalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 ${
                    isDark
                      ? "hover:bg-sky-950/50 text-white border border-white/20 hover:border-[#38BDF8]"
                      : "hover:bg-emerald-950/50 text-white border border-emerald-500/30 hover:border-emerald-400/80"
                  }`}
                >
                  <span>Contact Trade Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* ── Right Side: 3D Interactive Brand Logo Emblem (GSAP 3D Cube Physics) ── */}
            <div
              ref={logoSceneRef}
              className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center [perspective:1000px] select-none py-4"
            >
              <div
                ref={logoCubeRef}
                className={`relative group w-full max-w-[360px] sm:max-w-[420px] aspect-square rounded-[36px] bg-gradient-to-tr from-white/[0.09] via-white/[0.13] to-white/[0.04] backdrop-blur-xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-shadow duration-500 cursor-pointer [transform-style:preserve-3d] ${
                  isDark
                    ? "border border-white/15 hover:border-[#38BDF8]/80 hover:shadow-[0_24px_60px_rgba(56,189,248,0.35)]"
                    : "border border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_24px_60px_rgba(16,185,129,0.35)]"
                }`}
              >
                <Link
                  to="/"
                  title="Dattatray Trading Company - Click to View Home"
                  className="block w-full h-full [transform-style:preserve-3d]"
                >
                  {/* Radial Glow Halo Behind Logo */}
                  <div
                    style={{ transform: "translateZ(-15px)" }}
                    className={`absolute inset-4 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none ${
                      isDark
                        ? "bg-gradient-to-tr from-[#38BDF8]/30 via-[#1E56C8]/25 to-transparent"
                        : "bg-gradient-to-tr from-emerald-500/30 via-teal-600/25 to-transparent"
                    }`}
                  />
                  
                  {/* Animated Dashed Orbit Accent */}
                  <div
                    style={{ transform: "translateZ(10px)" }}
                    className={`absolute inset-5 rounded-full border border-dashed animate-[spin_60s_linear_infinite] pointer-events-none ${
                      isDark
                        ? "border-[#38BDF8]/30 group-hover:border-[#38BDF8]/60"
                        : "border-emerald-500/30 group-hover:border-emerald-400/60"
                    }`}
                  />
                  <div
                    style={{ transform: "translateZ(15px)" }}
                    className={`absolute inset-10 rounded-full pointer-events-none ${
                      isDark ? "border-[#38BDF8]/20" : "border-emerald-500/20"
                    }`}
                  />

                  {/* High-Def Brand Logo with 3D Depth Elevation */}
                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="relative w-full h-full flex flex-col items-center justify-center text-center z-10 [transform-style:preserve-3d]"
                  >
                    <img
                      src={dattatrayLogo}
                      alt="Dattatray Trading Company Logo"
                      className="w-[82%] h-[82%] object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)] group-hover:scale-108 transition-transform duration-500 select-none pointer-events-none"
                    />
                    <span
                      style={{ transform: "translateZ(20px)" }}
                      className={`mt-2 text-[11px] font-black uppercase tracking-[0.22em] transition-colors ${
                        isDark
                          ? "text-[#38BDF8] group-hover:text-sky-200"
                          : "text-emerald-400 group-hover:text-emerald-200"
                      }`}
                    >
                      Click to Explore Homepage ↗
                    </span>
                  </div>
                </Link>
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
          ABOUT SECTION 2: CENTERED BOLD MANIFESTO STATEMENT
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="w-full   py-12 sm:py-16 transition-colors duration-300">
        <div className="w-full max-w-[94%] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-base sm:text-xl lg:text-[22px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed sm:leading-relaxed">
            At <strong className="text-[#0B2546] dark:text-white font-black">Dattatray Trading Company</strong>, we are committed to revolutionizing the frozen food and agro-supply industry with <span className="text-[#1E56C8] dark:text-[#38BDF8] font-black">innovative, sustainable, and temperature-controlled solutions</span>. With decades of proven leadership delivering exceptional bulk and retail consignments, we combine <strong className="text-[#0B2546] dark:text-white font-black">state-of-the-art IQF freezing technology</strong>, experienced agronomy, and customer-centric approaches to bring visions of fresh, healthy food to life.
          </p>
        </div>
      </section>


      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 1: PURE VEG ZONE & READY-TO-COOK DELICACIES (FULL WIDTH EDGE-TO-EDGE)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0C4EA2] dark:bg-[#073673] py-14 sm:py-20 text-white">
        
        {/* Diagonal Green Polygon Overlay - Spanning Full Screen Width */}
        <div className="absolute inset-0 bg-[#35A53B] dark:bg-[#1E7726] pointer-events-none hidden lg:block [clip-path:polygon(42%_0,100%_0,100%_100%,70%_100%)]" />
        <div className="absolute inset-0 bg-[#35A53B] dark:bg-[#1E7726] pointer-events-none lg:hidden [clip-path:polygon(0_52%,100%_44%,100%_100%,0_100%)]" />

        {/* Top Playful Curlicue Loop Wire Doodle */}
        <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none opacity-85">
          <svg
            className="w-72 sm:w-[480px] lg:w-[620px] h-9 sm:h-12 text-white"
            viewBox="0 0 520 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          >
            <path d="M10,25 C30,4 45,4 35,25 C25,42 50,42 60,25 C75,4 90,4 80,25 C70,42 95,42 105,25 C120,4 135,4 125,25 C115,42 140,42 150,25 C165,4 180,4 170,25 C160,42 185,42 195,25 C210,4 225,4 215,25 C205,42 230,42 240,25 C255,4 270,4 260,25 C250,42 275,42 285,25 C300,4 315,4 305,25 C295,42 320,42 330,25 C345,4 360,4 350,25 C340,42 365,42 375,25 C390,4 405,4 395,25 C385,42 410,42 420,25 C435,4 450,4 440,25 C430,42 455,42 465,25 C480,4 495,12 510,25" />
          </svg>
        </div>

        {/* Inner Centered Content Container */}
        <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center text-white">
            
            {/* ── Left Column (on Royal Blue): Dattatray Frozen Veg Story ── */}
            <div className="lg:col-span-5 space-y-4 pt-4 sm:pt-6 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                <span>100% PURE VEGETARIAN DELICACIES</span>
              </div>

              <div className="space-y-3 text-white/95 text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed font-medium">
                <p>
                  <strong>Dattatray Traders</strong> offers a comprehensive range of premium frozen vegetarian and ready-to-cook agricultural food products.
                </p>
                <p>
                  Our range is celebrated as authentic <em>Farm-Fresh Gourmet Fast Food</em> — far crisper, tastier, and healthier than street fast-food options, and quick and easy to prepare at home or in commercial kitchens.
                </p>
                <p>
                  All our products are flash-frozen with the cutting-edge method of <strong>-18°C IQF (Individually Quick Frozen) technology</strong> that preserves unbroken freshness, essential nutrients, and natural flavors completely preservative-free.
                </p>
                <p>
                  Enjoy hygienic, nutritious, high-protein, delicious, and crunchy ready-to-cook snacks!
                </p>
                <p className="text-white/90 text-xs sm:text-[13px] leading-normal pt-1 border-t border-white/20">
                  <span className="font-black text-amber-300">Over 40+ Veg Delicacies:</span> Golden French Fries, Crispy Paneer Bites, Veg Burger Patties, Potato Samosas, Spring Rolls, Kababs, Sweet Corn, and IQF Green Peas, among others.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0C4EA2] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ── Center Column: Overlapping Golden Food Dishes (Fries + Paneer Nuggets) ── */}
            <div className="lg:col-span-4 relative flex items-center justify-center my-4 lg:my-0">
              
              {/* Radiating Orange Burst Doodles (Top-left & Bottom-left accents) */}
              <div className="absolute -top-6 left-2 sm:left-6 pointer-events-none select-none z-0">
                <svg className="w-14 h-14 text-amber-400" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="25" y1="10" x2="25" y2="0" />
                  <line x1="15" y1="15" x2="5" y2="5" />
                  <line x1="10" y1="25" x2="0" y2="25" />
                </svg>
              </div>

              <div className="absolute bottom-2 -left-4 sm:left-0 pointer-events-none select-none z-0">
                <svg className="w-16 h-16 text-amber-400" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
                  <line x1="30" y1="45" x2="30" y2="58" />
                  <line x1="18" y1="42" x2="6" y2="54" />
                  <line x1="12" y1="30" x2="0" y2="30" />
                  <line x1="18" y1="18" x2="6" y2="6" />
                </svg>
              </div>

              {/* Floating Green Sparkle Accent */}
              <div className="absolute top-2 right-4 sm:right-10 pointer-events-none select-none z-0 text-emerald-200">
                <svg className="w-8 h-8 text-emerald-200 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
                </svg>
              </div>

              {/* High-Resolution Mouth-Watering Food Platter */}
              <div className="relative z-10 w-full max-w-[360px] sm:max-w-[410px] lg:max-w-[440px] group">
                <div className="rounded-[30px] overflow-hidden p-2 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={pureVegSnacksImg}
                    alt="Dattatray Traders Pure Veg Frozen Delicacies - Golden Crispy French Fries & Fried Paneer Nuggets with Ketchup Dip"
                    className="w-full h-auto object-contain rounded-[26px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] select-none"
                    loading="lazy"
                  />
                </div>

                {/* Micro Pill Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <span>★</span>
                  <span>CRISP • PURE VEG • ZERO PRESERVATIVES</span>
                </div>
              </div>

            </div>

            {/* ── Right Column (on Fresh Green): PURE VEG ZONE! & Dedicated Facility ── */}
            <div className="lg:col-span-3 space-y-4 pl-0 lg:pl-4 xl:pl-6 text-white">
              
              {/* Iconic "PURE VEG ZONE!" Playful Bold Headline */}
              <div className="space-y-0 select-none">
                <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-wider leading-none uppercase text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                  PURE
                </h3>
                <div className="text-6xl sm:text-7xl lg:text-[84px] font-black tracking-tight leading-[0.9] uppercase text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] -my-0.5">
                  VEG
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-wider leading-none uppercase text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                  ZONE!
                </h3>
              </div>

              {/* Facility Narrative */}
              <div className="space-y-2.5 text-white/95 text-[13.5px] sm:text-[14.5px] leading-relaxed font-medium">
                <p>
                  We have created a completely separate, dedicated production facility exclusively for our vegetarian agro products.
                </p>
                <p>
                  Spread over an expansive area of modern cold-chain infrastructure in Maharashtra's prime fertile belt, this processing unit is truly avant-garde in its nature.
                </p>
                <p className="text-xs sm:text-[13px] text-white/90 pt-1">
                  Equipped with multi-temperature IQF freezing tunnels, robotic sorting, and strict zero cross-contamination protocols.
                </p>
              </div>

              {/* Badges / Checkpoints */}
              <div className="pt-2 space-y-1.5 border-t border-white/20">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>100% Segregated Vegetarian Lines</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>5,000+ MT Certified Cold Storage</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>APEDA, FSSAI & ISO 22000 Compliant</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 3: 4-COLUMN HORIZONTAL STATS BAR
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`p-4 sm:p-6 flex flex-col items-center justify-center ${
                idx !== stats.length - 1 ? "lg:border-r lg:border-slate-200 dark:lg:border-white/10" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2546] dark:text-white mb-2 tracking-tight">
                <AnimatedNumber target={s.value} />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 4: UNIFIED VISION & MISSION (FULL WIDTH EDGE-TO-EDGE)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-gradient-to-br from-[#0B2546] via-[#091F3B] to-[#061528] dark:from-[#051121] dark:via-[#071930] dark:to-[#030C18] border-y border-white/10 overflow-hidden py-14 sm:py-20 text-white">
        
        {/* Ambient Lighting Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#1E56C8]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* ── Left Column: Stacked Vision & Mission (Matching Reference Alignment) ── */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-7 sm:space-y-8">
              
              {/* 1. Vision Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Vision
                  </h3>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 leading-relaxed font-normal">
                  To revolutionize the agricultural export and cold-chain industry by creating sustainable, zero-waste farm-to-table networks that empower regional farming communities and deliver peak natural nutrition across global markets.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
                    ✦ Sustainable Farm Sourcing
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
                    ✦ -18°C Cryo-Integrity
                  </span>
                </div>
              </div>

              {/* Elegant Divider Line */}
              <div className="h-px w-full bg-gradient-to-r from-emerald-500/30 via-white/10 to-transparent" />

              {/* 2. Mission Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner shrink-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Mission
                  </h3>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-slate-300 leading-relaxed font-normal">
                  To deliver exceptional frozen foods, IQF vegetables, and farm commodities through precision engineering, uncompromised food safety, and customer-first agility, fostering lifelong trust and value with international clients and commercial partners.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold">
                    ✦ APEDA &amp; FSSAI Compliant
                  </span>
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold">
                    ✦ Global Export Reliability
                  </span>
                </div>
              </div>

            </div>

            {/* ── Right Column: Interactive GSAP Clip-Path Cold-Chain Ecosystem Slider ── */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <ColdChainInteractiveMap />
            </div>

          </div>

        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 6: FOUNDATIONAL VALUES & WHAT SETS DATTATRAY APART (LEADERSHIP)
          (Kinetic Newton's Cradle Perpetual Momentum Animation + 4 Integrated Pillars on Left,
           Executive Heading, Narrative & Trust Accreditations on Right)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section id="leadership" className="relative w-full bg-slate-50 dark:bg-[#07111E] border-y border-slate-200 dark:border-white/10 py-16 sm:py-24 transition-colors duration-500 overflow-hidden">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 dark:bg-[#38BDF8]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 dark:bg-[#1E56C8]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* ═════════════════════════════════════════════════════════════════
                LEFT SECTION: GRAND KINETIC NEWTON'S CRADLE (SLIGHTLY REDUCED WIDTH)
            ═════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1">
              <div className="relative p-4 sm:p-8 overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
                
                {/* Subtle Ambient Inner Glow */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/10 dark:bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-500/10 dark:bg-[#1E56C8]/10 rounded-full blur-3xl pointer-events-none" />

                {/* ✦ Grand Kinetic Newton's Cradle Rig (Balanced Size & Embedded Titles) ✦ */}
                <div className="relative w-full flex flex-col items-center select-none py-4">
                  
                  {/* Top Overhead Support Bar (Brushed Titanium / Polished Chrome Beam) */}
                  <div className="relative w-[300px] sm:w-[380px] lg:w-[370px] xl:w-[410px] h-6 sm:h-7 rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 shadow-md border border-white/60 dark:border-white/20 flex items-center justify-between px-3.5 z-20">
                    <div className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-300 shadow-inner" />
                    <div className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">
                      MOMENTUM • 4 FOUNDATIONAL PILLARS
                    </div>
                    <div className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-300 shadow-inner" />
                  </div>

                  {/* Suspended Pendulums Container with Balanced Proportional Spheres */}
                  <div className="flex items-start justify-center h-44 sm:h-52 pt-0">
                    
                    {/* Ball 01 (Left Swing: firstBall) */}
                    <div
                      ref={firstBallRef}
                      className="w-[70px] sm:w-[86px] lg:w-[86px] xl:w-[96px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-emerald-400 dark:from-slate-600 dark:to-emerald-400" />
                      {/* Increased Size Chrome / Emerald Sphere with Title */}
                      <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] lg:w-[86px] lg:h-[86px] xl:w-[96px] xl:h-[96px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#0F2844] dark:via-[#091F35] dark:to-[#04111E] shadow-[0_12px_28px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_32px_rgba(16,185,129,0.25),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-emerald-500/60 dark:border-emerald-400/60 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            01
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] font-black text-[#0B2546] dark:text-white leading-[1.15] tracking-tight">
                          Uncompromising<br />Quality
                        </span>
                      </div>
                    </div>

                    {/* Ball 02 (Center Ball 1) */}
                    <div
                      className="w-[70px] sm:w-[86px] lg:w-[86px] xl:w-[96px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-sky-400 dark:from-slate-600 dark:to-sky-400" />
                      {/* Increased Size Chrome / Sky Sphere with Title */}
                      <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] lg:w-[86px] lg:h-[86px] xl:w-[96px] xl:h-[96px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#0F2844] dark:via-[#091F35] dark:to-[#04111E] shadow-[0_12px_28px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_32px_rgba(56,189,248,0.25),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-sky-500/60 dark:border-sky-400/60 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-600 dark:text-[#38BDF8]" />
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-[#38BDF8]">
                            02
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] font-black text-[#0B2546] dark:text-white leading-[1.15] tracking-tight">
                          -18°C Cold<br />Integrity
                        </span>
                      </div>
                    </div>

                    {/* Ball 03 (Center Ball 2) */}
                    <div
                      className="w-[70px] sm:w-[86px] lg:w-[86px] xl:w-[96px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-teal-400 dark:from-slate-600 dark:to-teal-400" />
                      {/* Increased Size Chrome / Teal Sphere with Title */}
                      <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] lg:w-[86px] lg:h-[86px] xl:w-[96px] xl:h-[96px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#0F2844] dark:via-[#091F35] dark:to-[#04111E] shadow-[0_12px_28px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_32px_rgba(20,184,166,0.25),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-teal-500/60 dark:border-teal-400/60 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
                            03
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] font-black text-[#0B2546] dark:text-white leading-[1.15] tracking-tight">
                          Farmer<br />Partnership
                        </span>
                      </div>
                    </div>

                    {/* Ball 04 (Right Swing: lastBall) */}
                    <div
                      ref={lastBallRef}
                      className="w-[70px] sm:w-[86px] lg:w-[86px] xl:w-[96px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-blue-500 dark:from-slate-600 dark:to-blue-500" />
                      {/* Increased Size Chrome / Royal Blue Sphere with Title */}
                      <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] lg:w-[86px] lg:h-[86px] xl:w-[96px] xl:h-[96px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#0F2844] dark:via-[#091F35] dark:to-[#04111E] shadow-[0_12px_28px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_32px_rgba(30,86,200,0.25),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-blue-500/60 dark:border-blue-400/60 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                            04
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10.5px] lg:text-[10px] xl:text-[11.5px] font-black text-[#0B2546] dark:text-white leading-[1.15] tracking-tight">
                          Global<br />Compliance
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Kinetic Energy Ground Reflection */}
                  <div className="w-52 sm:w-72 h-3 rounded-full bg-slate-400/20 dark:bg-emerald-400/15 blur-md" />
                </div>

              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                RIGHT SECTION: HEADING, NARRATIVE, PROOF POINTS & PARTNER CTA (INCREASED WIDTH)
            ═════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 flex flex-col justify-center space-y-6">
              
              {/* Eyebrow Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#38BDF8]/15 text-emerald-600 dark:text-[#38BDF8] border border-emerald-500/20 dark:border-[#38BDF8]/30 text-xs font-black uppercase tracking-[0.2em]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-[#38BDF8]" />
                  <span>Foundational Values</span>
                </div>
              </div>

              {/* Main Heading */}
              <SplitTextHeading
                as="h2"
                className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0B2546] dark:text-white tracking-tight leading-[1.15]"
              >
                What Sets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-sky-400 dark:to-blue-400">
                  Dattatray Apart
                </span>
              </SplitTextHeading>

              {/* Descriptive Story Paragraphs */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Perpetual momentum driven by four interconnected pillars of agro excellence, unbroken cold-chain discipline, and global compliance.
              </p>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Just like the rhythmic transfer of kinetic energy in physics, every phase of our operation—from soil preparation and ethical farmer procurement to IQF flash freezing and worldwide container freight—works in perpetual synchronization. When one pillar excels, the entire supply chain delivers unmatched consistency.
              </p>

              {/* Bulleted Verification Checklist */}
              <div className="space-y-3 pt-2">
                {[
                  "Multi-stage optical sorting & microbiological lab clearance",
                  "Continuous -18°C temperature telemetry across reefer transit",
                  "Empowering 2,500+ farming families with direct ethical procurement",
                  "Fully certified operations meeting APEDA, FSSAI, ISO & destination import standards",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 dark:from-[#38BDF8] dark:to-[#1E56C8] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-sky-400/40 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <span>View Product Catalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 7: GLOBAL PARTNERSHIP CTA BANNER WITH DRIVING REEFER TRUCK
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div
          ref={ctaBannerRef}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0B2546] via-[#1546AA] to-[#0284C7] p-8 sm:p-12 lg:p-14 text-white shadow-2xl"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 -mb-16 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8CC9D9]">
                Ready to Expand Your Frozen Food Supply?
              </span>
              <SplitTextHeading
                as="h3"
                className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white"
              >
                Partner with India’s Dependable Cold-Chain Exporter
              </SplitTextHeading>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Connect with our commodity trading desk for customized product specifications, container load quotes, and scheduled export dispatch schedules.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC9D9] hover:bg-white text-[#0B2546] font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Send Trade Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 transition-all duration-300"
                >
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>

            {/* Right Branded Reefer Truck Column with Driving Scroll Animation */}
            <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative mt-6 lg:mt-0">
              
              {/* Floating Reefer Telemetry Status Badge */}
              <div className="absolute -top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2546]/85 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GPS Tracked -18°C Reefer Fleet</span>
              </div>

              {/* Animated Truck Element */}
              <div
                ref={truckRef}
                className="relative w-full max-w-[540px] xl:max-w-[620px] 2xl:max-w-[660px] select-none"
              >
                <img
                  src={truckImg}
                  alt="Dattatray Trading Company Reefer Truck Fleet"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

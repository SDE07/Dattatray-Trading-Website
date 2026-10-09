import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ThermometerSnowflake,
  Globe2,
  Users,
  Award,
  ArrowRight,
  Leaf,
  HeartHandshake,
  Eye,
  Target,
  Sprout,
  Snowflake,
  Globe,
  Microscope,
} from "lucide-react";
import pureVegSnacksImg from "../assets/pure_veg_snacks.jpg";
import truckImg from "../assets/truck2.png";
import planeImg from "../assets/plane.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { SplitTextHeading, AnimatedNumber, FocusFrameBorder } from "../components/common";
import ColdChainInteractiveMap from "../components/about/ColdChainInteractiveMap";
import CompanyJourneyTimeline from "../components/about/CompanyJourneyTimeline";

const ThreeLogoSphere = lazy(() => import("../components/about/ThreeLogoSphere"));

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
  const firstBallRef = useRef(null);
  const lastBallRef = useRef(null);
  const truckRef = useRef(null);
  const planeRef = useRef(null);
  const ctaBannerRef = useRef(null);

  // Scroll to Leadership section if routed to #leadership or /leadership:
  useEffect(() => {
    if (window.location.hash === "#leadership" || window.location.pathname === "/leadership") {
      const timer = setTimeout(() => {
        const el = document.getElementById("leadership");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
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

  // Reefer Truck & Cargo Plane Driving/Flying Scroll Animation:
  useEffect(() => {
    const truck = truckRef.current;
    const plane = planeRef.current;
    const banner = ctaBannerRef.current;
    if (!banner) return;

    const ctx = gsap.context(() => {
      if (truck) {
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
          },
        );
      }

      if (plane) {
        gsap.fromTo(
          plane,
          {
            x: 100,
            y: -15,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: banner,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }, banner);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "30+", label: "Years Agro Leadership" },
    { value: "5000+ MT", label: "Annual Processing Capacity" },
    { value: "12+", label: "Global Export Nations" },
    { value: "500+", label: "HoReCa & Trade Partners" },
  ];



  return (
    <div className="bg-[#F9FBFC] dark:bg-[#06100B] min-h-screen text-[#0B2546] dark:text-[#F1F5F9] transition-colors duration-300 overflow-x-hidden">
      {/* ═════════════════════════════════════════════════════════════════════════════
          TOP GRAND HERO BANNER WITH CONDITIONAL THEME ADAPTATION:
          - Light Mode: Rich Botanical Green Palette (Emerald / Jade / Mint)
          - Dark Theme (Toggle in Black): Blueish Palette (Deep Midnight Navy / Cyan / Sky Blue)
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
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm bg-emerald-950/70 border border-[#D4AF37]/40 text-[#F3E5AB]">
                <span className="leading-tight">
                  ESTABLISHED 1994 • THREE DECADES OF TRUST
                </span>
              </div>

              {/* ✦ GSAP Bounce-In Animated Heading (Green & Gold) ✦ */}
              <div ref={headingRef} className="py-2 space-y-2">
                <h1 className="font-sans tracking-tight leading-[1.05]">
                  <span className="text block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)] select-none transition-all duration-500">
                    DATTATRAY
                  </span>
                  <span className="text block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    TRADING COMPANY
                  </span>
                </h1>

                <div className="text flex items-center gap-2 pt-1">
                  <div className="h-[2px] w-8 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[#F3E5AB]">
                    PIONEERING AGRO &amp; COLD-CHAIN EXCELLENCE
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl text-emerald-100/90 font-normal text-justify [text-justify:inter-word] [text-wrap:pretty]">
                From India’s fertile farms to the world — delivering premium
                frozen foods with trusted cold-chain excellence. Preserving
                freshness at every single mile with uncompromised −18°C
                temperature integrity.
              </p>
              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-3.5">
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#021A13]"
                >
                  <span>Explore Catalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-emerald-950/50 text-white border border-emerald-500/30 hover:border-[#D4AF37]"
                >
                  <span>Contact Trade Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ── Right Side: 3D Interactive Brand Logo Spherical Ball (Three.js WebGL Engine) ── */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center select-none py-2">
              <Suspense
                fallback={
                  <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-950/20 animate-pulse">
                    <span className="text-xs text-[#F3E5AB] font-semibold tracking-wider uppercase">Loading 3D Emblem…</span>
                  </div>
                }
              >
                <ThreeLogoSphere />
              </Suspense>
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
          ABOUT SECTION 2: CENTERED BOLD MANIFESTO STATEMENT
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-12 sm:py-16 transition-colors duration-300">
        <div className="w-full max-w-[98%] xl:max-w-[1500px] mx-auto px-8 sm:px-12 lg:px-16 text-center space-y-4">
          <p className="text-base sm:text-xl lg:text-[22px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed sm:leading-relaxed">
            At{" "}
            <strong className="text-[#021A13] dark:text-white font-black">
              Dattatray Trading Company
            </strong>
            , we are committed to revolutionizing the frozen food and
            agro-supply industry with{" "}
            <span className="text-[#059669] dark:text-[#34D399] font-black">
              innovative, sustainable, and temperature-controlled solutions
            </span>
            . With decades of proven leadership delivering exceptional bulk and
            retail consignments, we combine{" "}
            <strong className="text-[#021A13] dark:text-white font-black">
              state-of-the-art IQF freezing technology
            </strong>
            , experienced agronomy, and customer-centric approaches to bring
            visions of fresh, healthy food to life.
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 1: PURE VEG ZONE & READY-TO-COOK DELICACIES (GREEN & GOLDEN)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#01140E] via-[#022A1C] to-[#010E09] border-y-2 border-[#D4AF37]/50 py-16 sm:py-24 text-white">
        {/* Ambient Radial Golden & Emerald Light Blooms */}
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-radial from-[#D4AF37]/25 via-emerald-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial from-[#059669]/30 via-emerald-950/20 to-transparent blur-3xl pointer-events-none" />

        {/* Diagonal Green & Golden Glass Polygon Overlay - Spanning Full Screen Width */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/15 via-[#047857]/35 to-[#011E15]/65 pointer-events-none hidden lg:block [clip-path:polygon(40%_0,100%_0,100%_100%,68%_100%)] border-l border-[#D4AF37]/35" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669]/30 via-[#022A1C]/50 to-[#01140E]/80 pointer-events-none lg:hidden [clip-path:polygon(0_52%,100%_44%,100%_100%,0_100%)]" />

        {/* Top Playful Curlicue Loop Wire Doodle */}
        <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none opacity-90">
          <svg
            className="w-72 sm:w-[480px] lg:w-[620px] h-9 sm:h-12 text-[#D4AF37] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center text-white">
            {/* ── Left Column: Dattatray Frozen Veg Story ── */}
            <div className="lg:col-span-5 space-y-4 pt-4 sm:pt-6 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#022A1C]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#F3E5AB] text-xs font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% PURE VEGETARIAN DELICACIES</span>
              </div>

              <div className="space-y-3 text-white/95 text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed font-medium text-justify [text-justify:inter-word] [text-wrap:pretty]">
                <p>
                  <strong className="text-[#F3E5AB] font-bold">
                    Dattatray Traders
                  </strong>{" "}
                  offers a comprehensive range of premium frozen vegetarian and
                  ready-to-cook agricultural food products.
                </p>
                <p>
                  Our range is celebrated as authentic{" "}
                  <em>Farm-Fresh Gourmet Fast Food</em> — far crisper, tastier,
                  and healthier than street fast-food options, and quick and
                  easy to prepare at home or in commercial kitchens.
                </p>
                <p>
                  All our products are flash-frozen with the cutting-edge method
                  of{" "}
                  <strong className="text-emerald-300">
                    -18°C IQF (Individually Quick Frozen) technology
                  </strong>{" "}
                  that preserves unbroken freshness, essential nutrients, and
                  natural flavors completely preservative-free.
                </p>
                <p>
                  Enjoy hygienic, nutritious, high-protein, delicious, and
                  crunchy ready-to-cook snacks!
                </p>
                <p className="text-white/90 text-xs sm:text-[13px] leading-normal pt-2 border-t border-[#D4AF37]/25">
                  <span className="font-black text-[#F3E5AB]">
                    Over 40+ Veg Delicacies:
                  </span>{" "}
                  Golden French Fries, Crispy Paneer Bites, Veg Burger Patties,
                  Potato Samosas, Spring Rolls, Kababs, Sweet Corn, and IQF
                  Green Peas, among others.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#021A13] font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#01140E]/80 hover:bg-[#022A1C] text-white border border-[#D4AF37]/50 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
              </div>
            </div>

            {/* ── Center Column: Overlapping Golden Food Dishes (Fries + Paneer Nuggets) ── */}
            <div className="lg:col-span-4 relative flex items-center justify-center my-4 lg:my-0">
              {/* Radiating Golden Burst Doodles */}
              <div className="absolute -top-6 left-2 sm:left-6 pointer-events-none select-none z-0">
                <svg
                  className="w-14 h-14 text-[#D4AF37]"
                  viewBox="0 0 50 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="25" y1="10" x2="25" y2="0" />
                  <line x1="15" y1="15" x2="5" y2="5" />
                  <line x1="10" y1="25" x2="0" y2="25" />
                </svg>
              </div>

              <div className="absolute bottom-2 -left-4 sm:left-0 pointer-events-none select-none z-0">
                <svg
                  className="w-16 h-16 text-[#D4AF37]"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                >
                  <line x1="30" y1="45" x2="30" y2="58" />
                  <line x1="18" y1="42" x2="6" y2="54" />
                  <line x1="12" y1="30" x2="0" y2="30" />
                  <line x1="18" y1="18" x2="6" y2="6" />
                </svg>
              </div>

              {/* Floating Emerald Sparkle Accent */}
              <div className="absolute top-2 right-4 sm:right-10 pointer-events-none select-none z-0 text-[#D4AF37]">
                <svg
                  className="w-8 h-8 text-[#D4AF37] animate-pulse"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
                </svg>
              </div>

              {/* High-Resolution Food Platter Card with Golden/Emerald Glow */}
              <div className="relative z-10 w-full max-w-[360px] sm:max-w-[410px] lg:max-w-[440px] group">
                <div className="rounded-[30px] overflow-hidden p-2.5 bg-gradient-to-br from-[#D4AF37]/30 via-emerald-950/40 to-[#010E09]/60 backdrop-blur-xl border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={pureVegSnacksImg}
                    alt="Dattatray Traders Pure Veg Frozen Delicacies - Golden Crispy French Fries & Fried Paneer Nuggets with Ketchup Dip"
                    className="w-full h-auto object-contain rounded-[24px] select-none"
                    loading="lazy"
                  />
                </div>

                {/* Micro Pill Badge in Rich Gold */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#01140E] font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center gap-1.5 whitespace-nowrap border border-[#D4AF37]">
                  <span className="text-[#01140E]">★</span>
                  <span>CRISP • PURE VEG • ZERO PRESERVATIVES</span>
                </div>
              </div>
            </div>

            {/* ── Right Column: PURE VEG ZONE! & Dedicated Facility ── */}
            <div className="lg:col-span-3 space-y-4 pl-0 lg:pl-4 xl:pl-6 text-white">
              {/* Iconic "PURE VEG ZONE!" Gradient Golden Headline */}
              <div className="space-y-0 select-none">
                <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-wider leading-none uppercase bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                  PURE
                </h3>
                <div className="text-6xl sm:text-7xl lg:text-[84px] font-black tracking-tight leading-[0.9] uppercase bg-gradient-to-br from-[#D4AF37] via-[#FFF2B2] to-[#C8A950] bg-clip-text text-transparent drop-shadow-[0_8px_25px_rgba(212,175,55,0.45)] -my-0.5">
                  VEG
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-wider leading-none uppercase bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                  ZONE!
                </h3>
              </div>

              {/* Facility Narrative */}
              <div className="space-y-2.5 text-white/95 text-[13.5px] sm:text-[14.5px] leading-relaxed font-medium text-justify [text-justify:inter-word] [text-wrap:pretty]">
                <p>
                  We have created a completely separate, dedicated production
                  facility exclusively for our vegetarian agro products.
                </p>
                <p>
                  Spread over an expansive area of modern cold-chain
                  infrastructure in Maharashtra's prime fertile belt, this
                  processing unit is truly avant-garde in its nature.
                </p>
                <p className="text-xs sm:text-[13px] text-[#F3E5AB]/90 pt-1">
                  Equipped with multi-temperature IQF freezing tunnels, robotic
                  sorting, and strict zero cross-contamination protocols.
                </p>
              </div>

              {/* Badges / Checkpoints */}
              <div className="pt-2 space-y-2 border-t border-[#D4AF37]/30">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>100% Segregated Vegetarian Lines</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>5,000+ MT Certified Cold Storage</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
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
                idx !== stats.length - 1
                  ? "lg:border-r lg:border-slate-200 dark:lg:border-white/10"
                  : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#021A13] dark:text-[#D4AF37] mb-2 tracking-tight">
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
          ABOUT SECTION 4: UNIFIED VISION & MISSION (CLEAN NATIVE BACKGROUND)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-14 sm:py-20 transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            {/* ── Left Column: Stacked Vision & Mission ── */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-7 sm:space-y-8">
              {/* 1. Vision Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 dark:bg-[#022A1C] border border-emerald-500/30 dark:border-[#D4AF37]/50 flex items-center justify-center text-emerald-700 dark:text-[#D4AF37] shadow-sm shrink-0">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#021A13] dark:text-[#F3E5AB] tracking-tight">
                    Visio
                    <span className="text-red-600 dark:text-red-500">n</span>
                  </h3>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify [text-justify:inter-word] [text-wrap:pretty]">
                  To revolutionize the agricultural export and cold-chain
                  industry by creating sustainable, zero-waste farm-to-table
                  networks that empower regional farming communities and deliver
                  peak natural nutrition across global markets.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-bold shadow-xs">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                    <span>Sustainable Farm Sourcing</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-bold shadow-xs">
                    <Snowflake className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                    <span>-18°C Cryo-Integrity</span>
                  </span>
                </div>
              </div>

              {/* Elegant Divider Line */}
              <div className="h-px w-full bg-slate-200 dark:bg-white/15" />

              {/* 2. Mission Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 dark:bg-[#022A1C] border border-emerald-500/30 dark:border-[#D4AF37]/50 flex items-center justify-center text-emerald-700 dark:text-[#D4AF37] shadow-sm shrink-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#021A13] dark:text-[#F3E5AB] tracking-tight">
                    Missio
                    <span className="text-red-600 dark:text-red-500">n</span>
                  </h3>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify [text-justify:inter-word] [text-wrap:pretty]">
                  To deliver exceptional frozen foods, IQF vegetables, and farm
                  commodities through precision engineering, uncompromised food
                  safety, and customer-first agility, fostering lifelong trust
                  and value with international clients and commercial partners.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                    <span>APEDA &amp; FSSAI Compliant</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-[#022A1C]/90 border border-emerald-500/25 dark:border-[#D4AF37]/45 text-emerald-800 dark:text-[#F3E5AB] text-xs font-bold shadow-xs">
                    <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4AF37] shrink-0" />
                    <span>Global Export Reliability</span>
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
      <section
        id="leadership"
        className="relative w-full bg-slate-50 dark:bg-[#06100B] border-y border-slate-200 dark:border-[#D4AF37]/20 py-16 sm:py-24 transition-colors duration-500 overflow-hidden"
      >
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 dark:bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 dark:bg-[#059669]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            {/* ═════════════════════════════════════════════════════════════════
                LEFT SECTION: GRAND KINETIC NEWTON'S CRADLE (LARGER & ENHANCED PROPORTIONS)
            ═════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1">
              <div className="relative p-2 sm:p-4 overflow-visible flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]">
                {/* Subtle Ambient Inner Glow */}
                <div className="absolute -top-16 -left-16 w-80 h-80 bg-emerald-500/10 dark:bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-teal-500/10 dark:bg-[#059669]/10 rounded-full blur-3xl pointer-events-none" />

                {/* ✦ Grand Kinetic Newton's Cradle Rig (Balanced Size & Embedded Titles) ✦ */}
                <div className="relative w-full flex flex-col items-center select-none py-4">
                  {/* Top Overhead Support Bar (Brushed Titanium / Polished Chrome Beam) */}
                  <div className="relative w-[340px] sm:w-[420px] lg:w-[480px] xl:w-[460px] h-7 sm:h-8 rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 shadow-lg border border-white/60 dark:border-white/20 flex items-center justify-between px-4 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500 dark:bg-slate-300 shadow-inner" />
                    <div className="text-[9px] sm:text-[10.5px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100">
                      MOMENTUM • 4 FOUNDATIONAL PILLARS
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500 dark:bg-slate-300 shadow-inner" />
                  </div>

                  {/* Suspended Pendulums Container with Balanced Proportional Spheres */}
                  <div className="flex items-start justify-center h-48 sm:h-56 pt-0">
                    {/* Ball 01 (Left Swing: firstBall) */}
                    <div
                      ref={firstBallRef}
                      className="w-[82px] sm:w-[98px] lg:w-[98px] xl:w-[108px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-emerald-500 dark:from-slate-600 dark:to-emerald-400" />
                      {/* Increased Size Chrome / Emerald Sphere with Title */}
                      <div className="w-[82px] h-[82px] sm:w-[98px] sm:h-[98px] lg:w-[98px] lg:h-[98px] xl:w-[108px] xl:h-[108px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#022A1C] dark:via-[#011C13] dark:to-[#010E09] shadow-[0_14px_32px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_36px_rgba(5,150,105,0.35),inset_0_2px_5px_rgba(212,175,55,0.3)] border-2 border-emerald-500/70 dark:border-emerald-400/80 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            01
                          </span>
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] lg:text-[10.5px] xl:text-[12px] font-black text-[#021A13] dark:text-[#F3E5AB] leading-[1.15] tracking-tight">
                          Uncompromising
                          <br />
                          Quality
                        </span>
                      </div>
                    </div>

                    {/* Ball 02 (Center Ball 1) */}
                    <div
                      className="w-[82px] sm:w-[98px] lg:w-[98px] xl:w-[108px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-teal-500 dark:from-slate-600 dark:to-teal-400" />
                      {/* Increased Size Chrome / Teal Sphere with Title */}
                      <div className="w-[82px] h-[82px] sm:w-[98px] sm:h-[98px] lg:w-[98px] lg:h-[98px] xl:w-[108px] xl:h-[108px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#022A1C] dark:via-[#011C13] dark:to-[#010E09] shadow-[0_14px_32px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_36px_rgba(20,184,166,0.35),inset_0_2px_5px_rgba(212,175,55,0.3)] border-2 border-teal-500/70 dark:border-teal-400/80 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <ThermometerSnowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
                          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
                            02
                          </span>
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] lg:text-[10.5px] xl:text-[12px] font-black text-[#021A13] dark:text-[#F3E5AB] leading-[1.15] tracking-tight">
                          -18°C Cold
                          <br />
                          Integrity
                        </span>
                      </div>
                    </div>

                    {/* Ball 03 (Center Ball 2) */}
                    <div
                      className="w-[82px] sm:w-[98px] lg:w-[98px] xl:w-[108px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-amber-500 dark:from-slate-600 dark:to-[#D4AF37]" />
                      {/* Increased Size Chrome / Gold Sphere with Title */}
                      <div className="w-[82px] h-[82px] sm:w-[98px] sm:h-[98px] lg:w-[98px] lg:h-[98px] xl:w-[108px] xl:h-[108px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#022A1C] dark:via-[#011C13] dark:to-[#010E09] shadow-[0_14px_32px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_36px_rgba(212,175,55,0.35),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-amber-500/70 dark:border-[#D4AF37]/80 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-[#D4AF37]" />
                          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-[#D4AF37]">
                            03
                          </span>
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] lg:text-[10.5px] xl:text-[12px] font-black text-[#021A13] dark:text-[#F3E5AB] leading-[1.15] tracking-tight">
                          Farmer
                          <br />
                          Partnership
                        </span>
                      </div>
                    </div>

                    {/* Ball 04 (Right Swing: lastBall) */}
                    <div
                      ref={lastBallRef}
                      className="w-[82px] sm:w-[98px] lg:w-[98px] xl:w-[108px] flex flex-col items-center select-none"
                      style={{ transformOrigin: "top" }}
                    >
                      {/* Suspension Wire */}
                      <div className="w-[2px] h-20 sm:h-28 bg-gradient-to-b from-slate-400 via-slate-300 to-[#D4AF37] dark:from-slate-600 dark:to-[#F3E5AB]" />
                      {/* Increased Size Chrome / Royal Gold Sphere with Title */}
                      <div className="w-[82px] h-[82px] sm:w-[98px] sm:h-[98px] lg:w-[98px] lg:h-[98px] xl:w-[108px] xl:h-[108px] -mt-1 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-[#022A1C] dark:via-[#011C13] dark:to-[#010E09] shadow-[0_14px_32px_rgba(0,0,0,0.22),inset_0_3px_8px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_36px_rgba(212,175,55,0.4),inset_0_2px_5px_rgba(255,255,255,0.3)] border-2 border-[#D4AF37]/70 dark:border-[#F3E5AB]/80 flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer hover:scale-105 transition-transform group">
                        <div className="flex items-center gap-1 mb-0.5">
                          <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B4882F] dark:text-[#F3E5AB]" />
                          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#B4882F] dark:text-[#F3E5AB]">
                            04
                          </span>
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] lg:text-[10.5px] xl:text-[12px] font-black text-[#021A13] dark:text-[#F3E5AB] leading-[1.15] tracking-tight">
                          Global
                          <br />
                          Compliance
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kinetic Energy Ground Reflection */}
                  <div className="w-60 sm:w-80 h-3.5 rounded-full bg-emerald-500/20 dark:bg-[#D4AF37]/20 blur-md" />
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                RIGHT SECTION: HEADING, NARRATIVE, PROOF POINTS & PARTNER CTA (INCREASED WIDTH)
            ═════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 flex flex-col justify-center space-y-6">
              {/* Main Heading */}
              <SplitTextHeading
                as="h2"
                className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#111827] dark:text-white tracking-tight leading-[1.15]"
              >
                What Sets{" "}
                <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                  Dattatray Apart
                </span>
              </SplitTextHeading>

              {/* Descriptive Story Paragraphs (Balanced & Justified Equal Width) */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify [text-justify:inter-word] [text-wrap:pretty]">
                Perpetual momentum driven by four interconnected pillars of agro
                excellence, unbroken cold-chain discipline, and global
                compliance across worldwide destination terminals.
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-justify [text-justify:inter-word] [text-wrap:pretty]">
                Just like the rhythmic transfer of kinetic energy in physics,
                every phase of our operation—from soil preparation and ethical
                farmer procurement to IQF flash freezing and worldwide container
                freight—works in perpetual synchronization. When one pillar
                excels, the entire supply chain delivers unmatched consistency.
              </p>

              {/* Bulleted Verification Checklist with Dedicated React Icons */}
              <div className="space-y-3.5 pt-2">
                {[
                  {
                    icon: Microscope,
                    text: "Multi-stage optical sorting & microbiological lab clearance",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                    bgBadge:
                      "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/25 dark:border-emerald-400/35",
                  },
                  {
                    icon: ThermometerSnowflake,
                    text: "Continuous -18°C temperature telemetry across reefer transit",
                    iconColor: "text-teal-600 dark:text-teal-400",
                    bgBadge:
                      "bg-teal-500/10 dark:bg-teal-500/20 border-teal-500/25 dark:border-teal-400/35",
                  },
                  {
                    icon: Users,
                    text: "Empowering 2,500+ farming families with direct ethical procurement",
                    iconColor: "text-amber-600 dark:text-[#D4AF37]",
                    bgBadge:
                      "bg-amber-500/10 dark:bg-[#D4AF37]/20 border-amber-500/25 dark:border-[#D4AF37]/35",
                  },
                  {
                    icon: Award,
                    text: "Fully certified operations meeting APEDA, FSSAI, ISO & destination import standards",
                    iconColor: "text-yellow-600 dark:text-[#F3E5AB]",
                    bgBadge:
                      "bg-yellow-500/10 dark:bg-yellow-500/20 border-yellow-500/25 dark:border-[#F3E5AB]/35",
                  },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3.5 group">
                      <div
                        className={`w-8 h-8 rounded-xl ${item.bgBadge} ${item.iconColor} flex items-center justify-center shrink-0 border shadow-xs transition-transform group-hover:scale-110`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-[14.5px] font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] text-white dark:text-[#01140E] font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white dark:text-[#01140E]" />
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#021A13]/80 border border-slate-200 dark:border-[#D4AF37]/30 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <span>View Product Catalog</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-[#D4AF37]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION: LEADERSHIP ANCHOR SECTION (#leadership)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section
        id="leadership"
        className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div
          className={`p-8 sm:p-12 rounded-3xl border transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-br from-[#021A13] via-[#03261A] to-[#010E09] border-[#D4AF37]/30 shadow-2xl"
              : "bg-gradient-to-br from-white via-[#F5FAF8] to-[#EBF5F1] border-emerald-100 shadow-md"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Empowering Leaders, <span className="bg-gradient-to-r from-[#B4882F] via-[#D4AF37] to-[#C8A950] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] bg-clip-text text-transparent">
                 Transforming Organizations 
                </span>
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                Comprehensive leadership solutions designed to unlock potential,
                inspire teams, and drive sustainable success for your
                organization through transformative leadership. Explore our
                solutions for Individuals, Organizations, and Government
                institutions.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
              <Link
                to="/leadership"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                  isDark
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#01140E]"
                    : "bg-gradient-to-r from-emerald-600 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white shadow-emerald-700/20"
                }`}
              >
                <span>Visit Full Leadership Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 7: GLOBAL PARTNERSHIP CTA BANNER WITH DRIVING REEFER TRUCK & AIR FREIGHT
      ═════════════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <FocusFrameBorder color="#D4AF37" duration={2.4}>
          <div
            ref={ctaBannerRef}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#021A13] via-[#042A1E] to-[#01140E] p-8 sm:p-12 lg:p-14 text-white shadow-[0_25px_60px_rgba(1,14,9,0.5)] border border-[#D4AF37]/35"
          >
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 -mb-16 w-80 h-60 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              {/* Left Content Column with Air Cargo Plane Starting at Top-Left */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-4 relative">
                {/* Dynamic Flying Air Cargo Plane Facing Opposite (Left) */}
                <div
                  ref={planeRef}
                  className="relative w-[150px] sm:w-[190px] lg:w-[210px] xl:w-[230px] -mb-1 pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                >
                  <img
                    src={planeImg}
                    alt="Dattatray Air Cargo Export Plane"
                    className="w-full h-auto object-contain transform -scale-x-100 rotate-2 hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F3E5AB] bg-[#022A1C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-block border border-[#D4AF37]/40 shadow-xs">
                  Ready to Expand Your Frozen Food Supply?
                </span>
                <SplitTextHeading
                  as="h3"
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md"
                >
                  Partner with India’s Dependable Cold-Chain Exporter
                </SplitTextHeading>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                  Connect with our commodity trading desk for customized product
                  specifications, container load quotes, and scheduled export
                  dispatch schedules.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C8A950] text-[#01140E] font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 hover:brightness-110 transition-all duration-300"
                  >
                    <span>Send Trade Inquiry</span>
                    <ArrowUpRight className="w-4 h-4 text-[#01140E]" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 transition-all duration-300"
                  >
                    <span>Explore Products</span>
                  </Link>
                </div>
              </div>

              {/* Right Branded Reefer Truck Column */}
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end justify-center relative mt-6 lg:mt-0">
                {/* Animated Truck Element */}
                <div
                  ref={truckRef}
                  className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[540px] xl:max-w-[580px] select-none z-0 mt-4 sm:mt-0"
                >
                  <img
                    src={truckImg}
                    alt="Dattatray Trading Company Reefer Truck Fleet"
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </FocusFrameBorder>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════════════
          ABOUT SECTION 8: COMPANY JOURNEY & EVOLUTION TIMELINE (INCEPTION TILL DATE)
      ═════════════════════════════════════════════════════════════════════════════ */}
      <CompanyJourneyTimeline />
    </div>
  );
}


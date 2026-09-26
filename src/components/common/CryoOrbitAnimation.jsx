import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import productHeroImg from "../../assets/productheroimg.png";

gsap.registerPlugin(MotionPathPlugin);

/**
 * CryoOrbitAnimation
 * - Uses productheroimg.png (Thermometer "FROZEN FOOD" emblem) at the center
 * - Increased size for grand visual impact
 * - 3 Concentric / 3D-angled Cryogenic Orbits with Frozen Snowflake Icons
 * - Continuous infinite motion using GSAP MotionPathPlugin
 */
export default function CryoOrbitAnimation() {
  const containerRef = useRef(null);
  const sat1Ref = useRef(null);
  const sat2Ref = useRef(null);
  const sat3Ref = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orbit 1: Inner Orbit (Clockwise, 5s)
      if (sat1Ref.current) {
        gsap.to(sat1Ref.current, {
          motionPath: {
            path: "#orbitPath1",
            align: "#orbitPath1",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          duration: 5,
          ease: "none",
          repeat: -1,
        });
      }

      // Orbit 2: Middle Orbit (Counter-Clockwise, 8s)
      if (sat2Ref.current) {
        gsap.to(sat2Ref.current, {
          motionPath: {
            path: "#orbitPath2",
            align: "#orbitPath2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0.33,
            end: 1.33,
          },
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      }

      // Orbit 3: Outer Orbit (Clockwise, 11s)
      if (sat3Ref.current) {
        gsap.to(sat3Ref.current, {
          motionPath: {
            path: "#orbitPath3",
            align: "#orbitPath3",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0.66,
            end: 1.66,
          },
          duration: 11,
          ease: "none",
          repeat: -1,
        });
      }

      // Center Product Hero Image soft pulse & floating glint
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          scale: 1.05,
          duration: 2.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center select-none pointer-events-none"
    >
      {/* Ambient background Cryo Aura (High-clarity cyan & white radial glow) */}
      <div className="absolute inset-4 bg-radial from-[#38BDF8]/30 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* SVG Container holding tracks, satellites, and the frozen food icon */}
      <svg
        viewBox="0 0 420 420"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Pure Luminous White / Cyan Gradient Definitions for Orbit Tracks */}
          <linearGradient id="whiteOrbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="whiteOrbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8CC9D9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="whiteOrbitGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
          </linearGradient>

          {/* Gradients for Central Core Backdrop - High Contrast Jewel Backdrop */}
          <radialGradient id="coreBackdrop" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B2546" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#042A1E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#021A13" stopOpacity="1" />
          </radialGradient>

          {/* Brilliant White & Cyan Glow Filters */}
          <filter id="whiteGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="satGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Orbit Track 1 & Satellite 1 (Inner, Angle -18deg, Center: 210, 210) ── */}
        <g transform="rotate(-18 210 210)">
          {/* Track 1: rx=94, ry=62 (Bright, crisp white dashed orbit) */}
          <path
            id="orbitPath1"
            d="M 116 210 a 94 62 0 1 0 188 0 a 94 62 0 1 0 -188 0 Z"
            stroke="url(#whiteOrbitGrad1)"
            strokeWidth="2.2"
            strokeDasharray="6 8"
            filter="url(#whiteGlow)"
          />

          {/* Satellite 1: Frozen Snowflake Badge (Crisp High-Contrast White/Cyan) */}
          <g ref={sat1Ref} id="sat1" filter="url(#satGlow)">
            <circle cx="0" cy="0" r="17" fill="#061A28" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="0" cy="0" r="14" fill="#0B2546" />
            {/* Snowflake Icon Vector in Pure White / Cyan */}
            <g stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round">
              <line x1="0" y1="-8" x2="0" y2="8" />
              <line x1="-8" y1="0" x2="8" y2="0" />
              <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" />
              <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" />
              <line x1="-2.5" y1="-6" x2="0" y2="-8" />
              <line x1="2.5" y1="-6" x2="0" y2="-8" />
              <line x1="-2.5" y1="6" x2="0" y2="8" />
              <line x1="2.5" y1="6" x2="0" y2="8" />
              <circle cx="0" cy="0" r="1.5" fill="#38BDF8" />
            </g>
          </g>
        </g>

        {/* ── Orbit Track 2 & Satellite 2 (Middle, Angle 26deg, Center: 210, 210) ── */}
        <g transform="rotate(26 210 210)">
          {/* Track 2: rx=142, ry=90 (Luminous White Orbit Line) */}
          <path
            id="orbitPath2"
            d="M 68 210 a 142 90 0 1 0 284 0 a 142 90 0 1 0 -284 0 Z"
            stroke="url(#whiteOrbitGrad2)"
            strokeWidth="2.2"
            strokeDasharray="7 9"
            filter="url(#whiteGlow)"
          />

          {/* Satellite 2: Glowing Ice Crystal Sparkle Badge */}
          <g ref={sat2Ref} id="sat2" filter="url(#satGlow)">
            <circle cx="0" cy="0" r="18" fill="#021A13" stroke="#38BDF8" strokeWidth="2.2" />
            <circle cx="0" cy="0" r="15" fill="#0B2546" />
            {/* 4-point Ice Crystal Sparkle Vector */}
            <path
              d="M 0 -10 Q 0 0 10 0 Q 0 0 0 10 Q 0 0 -10 0 Q 0 0 0 -10 Z"
              fill="#FFFFFF"
            />
            <circle cx="0" cy="0" r="3" fill="#38BDF8" />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
        </g>

        {/* ── Orbit Track 3 & Satellite 3 (Outer, Angle -32deg, Center: 210, 210) ── */}
        <g transform="rotate(-32 210 210)">
          {/* Track 3: rx=190, ry=118 (High-Contrast White Orbit Line) */}
          <path
            id="orbitPath3"
            d="M 20 210 a 190 118 0 1 0 380 0 a 190 118 0 1 0 -380 0 Z"
            stroke="url(#whiteOrbitGrad3)"
            strokeWidth="2.2"
            strokeDasharray="8 10"
            filter="url(#whiteGlow)"
          />

          {/* Satellite 3: Cryo Frost Snowflake Badge */}
          <g ref={sat3Ref} id="sat3" filter="url(#satGlow)">
            <circle cx="0" cy="0" r="19" fill="#061A28" stroke="#FFFFFF" strokeWidth="2.2" />
            <circle cx="0" cy="0" r="15.5" fill="#38BDF8" />
            {/* Dark crisp snowflake vector for maximum contrast */}
            <g stroke="#06101E" strokeWidth="1.8" strokeLinecap="round">
              <line x1="0" y1="-9" x2="0" y2="9" />
              <line x1="-9" y1="0" x2="9" y2="0" />
              <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5" />
              <line x1="-6.5" y1="6.5" x2="6.5" y2="-6.5" />
              <circle cx="0" cy="0" r="2" fill="#06101E" />
            </g>
          </g>
        </g>

        {/* ── CENTER: FROZEN FOOD HERO IMAGE (productheroimg.png) ── */}
        <g id="centerCore" transform="translate(210, 210)">
          {/* Outer Ambient Glow Ring */}
          <circle
            cx="0"
            cy="0"
            r="68"
            fill="url(#coreBackdrop)"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            filter="url(#whiteGlow)"
          />
          <circle
            cx="0"
            cy="0"
            r="62"
            fill="#051E16"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />

          {/* Animated Product Hero Image with intense drop-shadow glow */}
          <g ref={coreRef}>
            <image
              href={productHeroImg}
              x="-56"
              y="-56"
              width="112"
              height="112"
              preserveAspectRatio="xMidYMid meet"
              className="filter drop-shadow-[0_0_20px_rgba(56,189,248,0.95)]"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/components/lib/utils";
import logoImg from "../../assets/logo.png";

// ─── SVG Black Lanyard Ribbon Rope & Premium Metal Swivel Clip ─────────────────
const Lanyard = ({ length = 90, color = "#042a1e" }) => {
  const clampY = length - 12;
  const ringY = length;
  const hookY = length + 10;

  return (
    <svg
      width="60"
      height={length + 32}
      viewBox={`0 0 60 ${length + 32}`}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        {/* Metal clamp & swivel ring gradient */}
        <linearGradient id="metalGoldChrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3E5AB" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B4882F" />
          <stop offset="100%" stopColor="#785B1B" />
        </linearGradient>

        <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="30%" stopColor="#64748b" />
          <stop offset="60%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Hook gradient */}
        <linearGradient id="hookSteel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="40%" stopColor="#64748b" />
          <stop offset="80%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Ribbon fabric texture shading */}
        <linearGradient id="strapTexture" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {/* Main Lanyard Ribbon Strap */}
      <rect
        x="16"
        y="0"
        width="28"
        height={clampY + 4}
        rx="3"
        fill={color || "#042a1e"}
      />
      {/* Strap fabric depth shading */}
      <rect
        x="16"
        y="0"
        width="28"
        height={clampY + 4}
        rx="3"
        fill="url(#strapTexture)"
      />

      {/* Strap double stitching lines */}
      <line
        x1="18.5"
        y1="0"
        x2="18.5"
        y2={clampY + 4}
        stroke="#D4AF37"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="4 2"
      />
      <line
        x1="41.5"
        y1="0"
        x2="41.5"
        y2={clampY + 4}
        stroke="#D4AF37"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* Center woven spine highlight */}
      <line
        x1="30"
        y1="0"
        x2="30"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />

      {/* Metallic Ribbon Crimp Clamp */}
      <rect
        x="13"
        y={clampY}
        width="34"
        height="11"
        rx="2.5"
        fill="url(#metalGoldChrome)"
        stroke="#785B1B"
        strokeWidth="0.8"
      />
      {/* Metallic Screws / Rivets */}
      <circle cx="17.5" cy={clampY + 5.5} r="1.5" fill="#ffffff" stroke="#785B1B" strokeWidth="0.5" />
      <circle cx="42.5" cy={clampY + 5.5} r="1.5" fill="#ffffff" stroke="#785B1B" strokeWidth="0.5" />

      {/* Swivel Ring Loop */}
      <path
        d={`M 20 ${clampY + 10} C 20 ${ringY + 6}, 40 ${ringY + 6}, 40 ${clampY + 10}`}
        fill="none"
        stroke="url(#metalChrome)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Swivel Center Joint */}
      <rect
        x="26"
        y={ringY + 2}
        width="8"
        height="6"
        rx="1.5"
        fill="url(#metalChrome)"
      />

      {/* Heavy Duty Metal Snap Hook (Clips directly through punch slot) */}
      <path
        d={`M 27 ${ringY + 7} 
           L 27 ${hookY + 6} 
           C 27 ${hookY + 15}, 33 ${hookY + 15}, 33 ${hookY + 6} 
           L 33 ${ringY + 7}`}
        fill="none"
        stroke="url(#hookSteel)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Spring Clip Latch Lever */}
      <line
        x1="28.5"
        y1={hookY + 1}
        x2="28.5"
        y2={hookY + 9}
        stroke="#ffffff"
        strokeWidth="1.2"
      />
    </svg>
  );
};

// ─── Main HangingIdCard Component ─────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  ropeLength  = 90,
  ropeColor   = "#042a1e",
  className,
  name        = "Master Chef Leadership",
  role        = "Director of Culinary & Quality",
  badgeId     = "DT-CHEF-01",
  avatarImage,
}) => {
  // Pure GPU-Accelerated Hardware Physics Refs (Zero React Re-render Lag)
  const cardRef          = useRef(null);
  const sheenRef         = useRef(null);
  const rafRef           = useRef(null);
  const startTimeRef     = useRef(null);
  const prevTimeRef      = useRef(null);
  
  const angleRef         = useRef(0);
  const isDraggingRef    = useRef(false);
  const dragStartX       = useRef(0);
  const dragStartAngle   = useRef(0);
  const impulseAngleRef  = useRef(0);
  const impulseVelRef    = useRef(0);
  const prevDragAngleRef = useRef(0);

  const tilt3DRef        = useRef({ x: 0, y: 0 });
  const isHoveredRef     = useRef(false);

  // ── 60/120fps Hardware Physics Loop (Runs directly on GPU without React re-renders) ──
  useEffect(() => {
    let active = true;

    const tick = (now) => {
      if (!active) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      if (prevTimeRef.current === null) prevTimeRef.current = now;

      const t = (now - startTimeRef.current) / 1000;
      const dt = Math.min((now - prevTimeRef.current) / 1000, 0.033);
      prevTimeRef.current = now;

      // Smooth, natural organic pendulum sway
      const primarySway = Math.sin(t * 2.2) * 0.09;
      const secondarySway = Math.sin(t * 1.1 + 0.6) * 0.018;
      const continuousAmbientAngle = primarySway + secondarySway;

      let currentAngle = continuousAmbientAngle;

      if (!isDraggingRef.current) {
        if (Math.abs(impulseAngleRef.current) > 0.0002 || Math.abs(impulseVelRef.current) > 0.002) {
          const springK = 26;
          const damping = 3.0;
          const springAcc = -springK * impulseAngleRef.current - damping * impulseVelRef.current;

          impulseVelRef.current += springAcc * dt;
          impulseAngleRef.current += impulseVelRef.current * dt;

          currentAngle += impulseAngleRef.current;
        } else {
          impulseAngleRef.current = 0;
          impulseVelRef.current = 0;
        }
        angleRef.current = currentAngle;
      }

      // Direct GPU Transform Updates (Buttery 120 FPS, 0% CPU Lag)
      if (cardRef.current) {
        const deg = angleRef.current * (180 / Math.PI);
        const rotY = deg * 0.32 + (isHoveredRef.current ? tilt3DRef.current.y : 0);
        const rotX = isHoveredRef.current ? tilt3DRef.current.x : 0;

        cardRef.current.style.transform = `perspective(1000px) rotateZ(${deg}deg) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        cardRef.current.style.filter = `drop-shadow(${deg * 0.75}px 22px 28px rgba(0,0,0,0.55))`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Pointer Drag & Flick Events ─────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartAngle.current = angleRef.current;
    prevDragAngleRef.current = angleRef.current;
    impulseVelRef.current = 0;
  }, []);

  const onPointerMove = useCallback((e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      tilt3DRef.current = {
        x: ((clampedY - 50) / 50) * -6,
        y: ((clampedX - 50) / 50) * 6,
      };

      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle 220px at ${clampedX}% ${clampedY}%, rgba(255,255,255,0.85) 0%, rgba(212,175,55,0.4) 30%, rgba(5,150,105,0.2) 60%, transparent 80%)`;
      }
    }

    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 140; 
    const targetAngle = dragStartAngle.current - dx / L;
    const clamped = Math.max(-1.15, Math.min(1.15, targetAngle));
    angleRef.current = clamped;
  }, [ropeLength]);

  const onPointerUp = useCallback((e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    isDraggingRef.current = false;

    const now = performance.now();
    const t = (now - (startTimeRef.current || now)) / 1000;
    const ambientNow = Math.sin(t * 2.2) * 0.09 + Math.sin(t * 1.1 + 0.6) * 0.018;
    impulseAngleRef.current = angleRef.current - ambientNow;
  }, []);

  // ── Tap / Click Impulse ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    impulseVelRef.current = (Math.random() > 0.5 ? 1 : -1) * 2.8;
  }, []);

  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (sheenRef.current) sheenRef.current.style.opacity = "0.38";
  }, []);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    tilt3DRef.current = { x: 0, y: 0 };
    if (sheenRef.current) sheenRef.current.style.opacity = "0.15";
  }, []);

  return (
    <div
      className={cn("flex flex-col items-center select-none", className)}
      style={{ touchAction: "none" }}
    >
      {/* Ceiling Mount Bracket / Anchor Eyelet with Gold Ring */}
      <div className="w-6 h-6 rounded-full shadow-2xl z-20 relative bg-gradient-to-br from-[#022A1C] to-[#01140E] border-2 border-[#D4AF37] flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F3E5AB] animate-ping opacity-75 absolute" />
        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
      </div>

      {/* The Hanging Pendulum Assembly */}
      <div 
        ref={cardRef}
        className="flex flex-col items-center cursor-grab active:cursor-grabbing will-change-transform"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          transformOrigin: "top center",
          marginTop: "-6px"
        }}
      >
        {/* Lanyard Strap with Snap Hook */}
        <div style={{ pointerEvents: "none" }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ✦ SENIOR EXECUTIVE BADGE (Clean Emerald-Obsidian & Radiant Gold Accents) ✦ */}
        <div className="relative w-68 sm:w-76 md:w-80 rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-[#D4AF37]/60 bg-white dark:bg-[#021A13] pointer-events-none mt-[-10px] group">
          
          {/* Card Slot Punch Hole */}
          <div className="flex justify-center pt-3 pb-1.5 bg-gradient-to-r from-[#021A13] via-[#042A1E] to-[#021A13] border-b border-[#D4AF37]/30">
            <div className="w-10 h-3 rounded-full bg-black border border-[#D4AF37]/40 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1.5 rounded-full bg-[#01140E] opacity-95" />
            </div>
          </div>

          {/* Interactive Dynamic Holographic Sheen Layer */}
          <div
            ref={sheenRef}
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
            style={{
              opacity: 0.15,
              background: "radial-gradient(circle 220px at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(212,175,55,0.4) 30%, rgba(5,150,105,0.2) 60%, transparent 80%)",
              mixBlendMode: "overlay"
            }}
          />

          {children ?? (
            <div className="flex flex-col h-full relative z-10">
              
              {/* Card Header Banner: Rich Forest Obsidian & Emerald Glow with Golden Trim */}
              <div className="px-5 pt-5 pb-4 flex flex-col items-center gap-2 relative overflow-hidden bg-gradient-to-br from-[#022A1C] via-[#044E34] to-[#01140E] border-b border-[#D4AF37]/30">
                {/* Background ambient light flare */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Metallic Gold EMV Smart Security Chip with Micro Circuit Traces */}
                <div className="absolute top-3.5 left-4 w-7 h-5 rounded-[4px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#C8A950] border border-[#B4882F] shadow-md flex items-center justify-center">
                  <div className="w-5 h-3.5 border border-[#8C6B1F]/60 rounded-[2px] grid grid-cols-2 gap-[1px] p-[0.5px]">
                    <div className="bg-[#8C6B1F]/30" />
                    <div className="bg-[#8C6B1F]/30" />
                    <div className="bg-[#8C6B1F]/30" />
                    <div className="bg-[#8C6B1F]/30" />
                  </div>
                </div>

                {/* Luxury Brand Medallion with Genuine Full-Color Dattatray Logo */}
                <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D4AF37]/50 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white p-0.5 shadow-sm border border-[#D4AF37]/40">
                    <img
                      src={logoImg}
                      alt="Dattatray Traders Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[8.5px] font-black tracking-widest text-[#F3E5AB] font-sans">
                    DATTATRAY
                  </span>
                </div>

                {/* CHEF AVATAR WITH RADIANT EMERALD & GOLD DUAL RING */}
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md mt-1 border-2 border-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden p-1.5 relative">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1 shadow-inner">
                    {avatarImage ? (
                      <img
                        src={avatarImage}
                        alt={name}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-[#021A13]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body Information */}
              <div className="bg-white dark:bg-[#01140E] px-5 py-4 flex flex-col items-center gap-1.5 flex-1 text-center">
                
                {/* Leader Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight mt-0.5">
                  {name}
                </h3>
                
                {/* Leader Subtitle Role */}
                <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#F3E5AB] leading-tight tracking-wide">
                  {role}
                </p>

                {/* Divider Line */}
                <div className="my-2 w-full border-t border-slate-200 dark:border-[#D4AF37]/25" />

                {/* Realistic Barcode */}
                <div className="flex gap-[2.5px] items-end h-7 px-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 dark:bg-slate-200 rounded-[0.5px]"
                      style={{
                        width: i % 4 === 0 ? "3.5px" : i % 2 === 0 ? "2px" : "1.2px",
                        height: `${55 + Math.sin(i * 1.2) * 35}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Badge Serial */}
                <p className="text-[11px] font-mono font-bold tracking-widest mt-0.5 text-[#059669] dark:text-[#D4AF37]">
                  {badgeId}
                </p>

                {/* Verified Board Status Pill with Active Gold / Emerald Badge */}
                <div className="mt-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#C8A950] text-white dark:text-[#01140E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#01140E] animate-pulse" />
                  <span>BOARD CERTIFIED • EXECUTIVE</span>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HangingIdCard;

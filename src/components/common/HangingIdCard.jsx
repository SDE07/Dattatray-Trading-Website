import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/components/lib/utils";
import logoImg from "../../assets/logo.png";

// ─── SVG Black Lanyard Ribbon Rope & Premium Metal Swivel Clip ─────────────────
const Lanyard = ({ length = 120, color = "#042a1e" }) => {
  const clampY = length;
  const ringY = length + 12;
  const hookY = length + 22;

  return (
    <svg
      width="56"
      height={length + 48}
      viewBox={`0 0 56 ${length + 48}`}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        {/* Metal clamp & swivel ring gradient */}
        <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="30%" stopColor="#334155" />
          <stop offset="55%" stopColor="#64748b" />
          <stop offset="85%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Hook gradient */}
        <linearGradient id="hookSteel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="40%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Ribbon fabric texture shading */}
        <linearGradient id="strapTexture" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Main Lanyard Ribbon Strap */}
      <rect
        x="15"
        y="0"
        width="26"
        height={clampY + 4}
        rx="3"
        fill={color || "#042a1e"}
      />
      {/* Strap fabric depth shading */}
      <rect
        x="15"
        y="0"
        width="26"
        height={clampY + 4}
        rx="3"
        fill="url(#strapTexture)"
      />

      {/* Strap double stitching lines */}
      <line
        x1="17"
        y1="0"
        x2="17"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="4 2.5"
      />
      <line
        x1="39"
        y1="0"
        x2="39"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="4 2.5"
      />

      {/* Center woven spine highlight */}
      <line
        x1="28"
        y1="0"
        x2="28"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="1.5"
      />

      {/* Metallic Ribbon Crimp Clamp */}
      <rect
        x="12"
        y={clampY}
        width="32"
        height="12"
        rx="3"
        fill="url(#metalChrome)"
        stroke="#0f172a"
        strokeWidth="1"
      />
      {/* Metallic Screws / Rivets */}
      <circle cx="16" cy={clampY + 6} r="1.6" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
      <circle cx="40" cy={clampY + 6} r="1.6" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />

      {/* Swivel Ring Loop */}
      <path
        d={`M 18 ${clampY + 11} C 18 ${ringY + 8}, 38 ${ringY + 8}, 38 ${clampY + 11}`}
        fill="none"
        stroke="url(#metalChrome)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Swivel Center Joint */}
      <rect
        x="24"
        y={ringY + 3}
        width="8"
        height="7"
        rx="1.5"
        fill="url(#metalChrome)"
      />

      {/* Heavy Duty Metal Snap Hook */}
      <path
        d={`M 25 ${ringY + 9} 
           L 25 ${hookY + 8} 
           C 25 ${hookY + 18}, 31 ${hookY + 18}, 31 ${hookY + 8} 
           L 31 ${ringY + 9}`}
        fill="none"
        stroke="url(#hookSteel)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Spring Clip Latch Lever */}
      <line
        x1="26"
        y1={hookY + 2}
        x2="26"
        y2={hookY + 12}
        stroke="#f1f5f9"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// ─── Main HangingIdCard Component ─────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  ropeLength  = 115,
  ropeColor   = "#042a1e",
  className,
  name        = "Master Chef Leadership",
  role        = "Director of Culinary & Quality",
  badgeId     = "DT-CHEF-01",
  accentColor = "#059669",
  avatarImage,
}) => {
  // Continuous Harmonic Oscillator + Damped User Impulse Physics
  const rafRef           = useRef(null);
  const startTimeRef     = useRef(null);
  const prevTimeRef      = useRef(null);
  const isDraggingRef    = useRef(false);
  const dragStartX       = useRef(0);
  const dragStartAngle   = useRef(0);
  const impulseAngleRef  = useRef(0); // user-induced offset angle
  const impulseVelRef    = useRef(0); // user-induced angular velocity
  const prevDragAngleRef = useRef(0);

  const [angle, setAngle] = useState(0);
  const [, setIsDragState] = useState(false);

  // ── Physics loop (Continuous Natural Sway + Seamless User Drag Momentum) ──
  const tick = useCallback((now) => {
    if (startTimeRef.current === null) startTimeRef.current = now;
    if (prevTimeRef.current === null) prevTimeRef.current = now;

    const t = (now - startTimeRef.current) / 1000; // elapsed seconds
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05);
    prevTimeRef.current = now;

    // 1. Organic, Continuous Dual-Harmonic Ambient Pendulum Sway
    // Primary relaxed pendulum: ~2.4s period (~0.42 Hz) with ~6.8 degrees amplitude
    // Secondary micro-flutter: gives natural living air resistance feel
    const primarySway = Math.sin(t * 2.6) * 0.115;
    const secondarySway = Math.sin(t * 1.4 + 0.8) * 0.025;
    const continuousAmbientAngle = primarySway + secondarySway;

    let currentAngle = continuousAmbientAngle;

    if (!isDraggingRef.current) {
      // 2. Damped restoring spring for user-induced impulses (drags, flicks, taps)
      // Gradually damp impulse towards 0 so it smoothly blends into continuous sway
      if (Math.abs(impulseAngleRef.current) > 0.0005 || Math.abs(impulseVelRef.current) > 0.005) {
        const springK = 28;     // Spring stiffness restoring to ambient
        const damping = 3.2;    // Damping factor for smooth natural decay
        const springAcc = -springK * impulseAngleRef.current - damping * impulseVelRef.current;

        impulseVelRef.current += springAcc * dt;
        impulseAngleRef.current += impulseVelRef.current * dt;

        currentAngle += impulseAngleRef.current;
      }
      setAngle(currentAngle);
    } else {
      // While dragging, track velocity for release flick
      if (dt > 0) {
        impulseVelRef.current = (angle - prevDragAngleRef.current) / dt;
      }
      prevDragAngleRef.current = angle;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [angle]);

  // ── Start physics loop ──────────────────────────────────────────────────────
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // ── Pointer Drag & Flick Events ─────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragState(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = angle;
    prevDragAngleRef.current = angle;
    impulseVelRef.current = 0;
  }, [angle]);

  const onPointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 140; 
    const targetAngle = dragStartAngle.current - dx / L;
    const clamped = Math.max(-1.25, Math.min(1.25, targetAngle));
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    setIsDragState(false);

    // Calculate impulse difference from continuous ambient sway
    const now = performance.now();
    const t = (now - (startTimeRef.current || now)) / 1000;
    const ambientNow = Math.sin(t * 2.6) * 0.115 + Math.sin(t * 1.4 + 0.8) * 0.025;
    impulseAngleRef.current = angle - ambientNow;
  }, [angle]);

  // ── Tap / Click Impulse ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    // Give a delightful push impulse on click
    impulseVelRef.current = 3.2;
  }, []);

  const cardRotateDeg = angle * (180 / Math.PI);
  const cardRotateYDeg = cardRotateDeg * 0.32; // subtle 3D tilt

  return (
    <div
      className={cn("flex flex-col items-center select-none", className)}
      style={{ touchAction: "none" }}
    >
      {/* Ceiling Mount Bracket / Anchor Eyelet */}
      <div className="w-5 h-5 rounded-full shadow-xl z-20 relative bg-emerald-950 dark:bg-sky-950 border-2 border-emerald-400 dark:border-sky-400 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </div>

      {/* The Hanging Pendulum Assembly (Lanyard + Lock Clip + Card) */}
      <div 
        className="flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform duration-75"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `perspective(1000px) rotateZ(${cardRotateDeg}deg) rotateY(${cardRotateYDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-8px",
          filter: `drop-shadow(${cardRotateDeg * 0.9}px 24px 28px rgba(0,0,0,0.45))`
        }}
      >
        {/* Lanyard Strap with Snap Hook */}
        <div style={{ pointerEvents: "none" }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ✦ SENIOR DESIGNER INCREASED CARD SIZE (w-68 sm:w-76 md:w-80) ✦ */}
        <div className="relative w-68 sm:w-76 md:w-80 rounded-[28px] overflow-hidden shadow-2xl border-2 border-emerald-500/50 dark:border-sky-500/50 bg-white dark:bg-[#09182C] pointer-events-none mt-[-18px]">
          
          {/* Real Lanyard Card Slot Punch Hole */}
          <div className="flex justify-center pt-3 pb-1.5 bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80">
            <div className="w-10 h-3 rounded-full bg-zinc-950 dark:bg-black border border-zinc-500/40 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1.5 rounded-full bg-zinc-900 opacity-95" />
            </div>
          </div>

          {/* Laminated PVC Specular Sheen (Diagonal Glass Reflection) */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-30"
            style={{
              background: "linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)"
            }}
          />

          {children ?? (
            <div className="flex flex-col h-full relative z-10">
              
              {/* Card Header Banner with Rich Gradient */}
              <div
                className="px-5 pt-4 pb-4 flex flex-col items-center gap-2 relative"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, #061A28 100%)`
                }}
              >
                {/* Metallic Gold EMV Smart Security Chip */}
                <div className="absolute top-3.5 left-4 w-7 h-5 rounded-[4px] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border border-amber-600/70 shadow-sm flex items-center justify-center">
                  <div className="w-5 h-3.5 border border-amber-700/40 rounded-[2px] grid grid-cols-2 gap-[1px] p-[0.5px]">
                    <div className="bg-amber-600/30" />
                    <div className="bg-amber-600/30" />
                    <div className="bg-amber-600/30" />
                    <div className="bg-amber-600/30" />
                  </div>
                </div>

                {/* Dattatray Brand Logo in Header */}
                <div className="absolute top-3 right-4 h-7 sm:h-8 max-w-[100px] flex items-center justify-end">
                  <img
                    src={logoImg}
                    alt="Dattatray Traders"
                    className="h-full w-auto object-contain filter drop-shadow brightness-0 invert opacity-95"
                  />
                </div>

                {/* PROMINENT CHEF AVATAR (Increased Proportions for Senior Impact) */}
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur-md mt-1 border-2 border-white/60 shadow-2xl overflow-hidden p-2">
                  {avatarImage ? (
                    <img
                      src={avatarImage}
                      alt={name}
                      className="w-full h-full object-contain filter drop-shadow bg-white rounded-full p-1"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-white/95" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Card Body Information */}
              <div className="bg-white dark:bg-[#071322] px-5 py-4 flex flex-col items-center gap-1.5 flex-1 text-center">
                
                {/* Leader Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight mt-0.5">
                  {name}
                </h3>
                
                {/* Leader Subtitle Role */}
                <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#38BDF8] leading-tight tracking-wide">
                  {role}
                </p>

                {/* Divider Line */}
                <div className="my-2 w-full border-t border-slate-200 dark:border-slate-800" />

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
                <p
                  className="text-[11px] font-mono font-bold tracking-widest mt-0.5"
                  style={{ color: accentColor }}
                >
                  {badgeId}
                </p>

                {/* Verified Board Status Pill with Active Green Pulse */}
                <div
                  className="mt-1.5 px-4 py-1.5 rounded-full text-[10px] font-extrabold text-white uppercase tracking-widest shadow-md flex items-center gap-1.5"
                  style={{ background: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/components/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react";

/**
 * ThreeDImagePageflip Component
 * Interactive 3D physical book page flip engine.
 * Supports both full-bleed image leaves and rich custom JSX content leaves.
 */
export const ThreeDImagePageflip = forwardRef(({
  pages = [],
  defaultTurnedIndex = 1,
  turnedIndex: controlledTurnedIndex,
  onPageChange,
  pageWidth = 330,
  pageHeight = 460,
  perspective = 1400,
  peekAngle = 14,
  turnAngle = 180,
  duration = 0.7,
  easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  shadowIntensity = 0.5,
  spineShift = true,
  radius = "16px",
  showPageNumbers = true,
  showSpineBinding = true,
  accentColor = "#10B981",
  autoplay = false,
  autoplayInterval = 4000,
  pauseOnHover = true,
  interactive = true,
  showControls = true,
  className,
  style,
}, ref) => {
  const [internalTurned, setInternalTurned] = useState(defaultTurnedIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [peekingIndex, setPeekingIndex] = useState(null);

  const totalLeaves = pages.length;
  const currentTurned = controlledTurnedIndex !== undefined ? controlledTurnedIndex : internalTurned;
  const isOpen = currentTurned > 0 && currentTurned < totalLeaves;

  const parsedRadius = typeof radius === "number" ? `${radius}px` : radius;

  const setTurned = useCallback((newCount) => {
    const clamped = Math.max(0, Math.min(newCount, totalLeaves));
    if (controlledTurnedIndex === undefined) {
      setInternalTurned(clamped);
    }
    if (onPageChange) {
      onPageChange(clamped, totalLeaves);
    }
  }, [controlledTurnedIndex, totalLeaves, onPageChange]);

  const flipNext = useCallback(() => {
    if (currentTurned < totalLeaves) {
      setTurned(currentTurned + 1);
    }
  }, [currentTurned, totalLeaves, setTurned]);

  const flipPrev = useCallback(() => {
    if (currentTurned > 0) {
      setTurned(currentTurned - 1);
    }
  }, [currentTurned, setTurned]);

  const resetBook = useCallback(() => {
    setTurned(0);
  }, [setTurned]);

  useImperativeHandle(ref, () => ({
    next: flipNext,
    prev: flipPrev,
    reset: resetBook,
    goTo: (idx) => setTurned(idx),
    getTurnedCount: () => currentTurned,
    getTotalLeaves: () => totalLeaves,
  }));

  const currentTurnedRef = useRef(currentTurned);
  useEffect(() => {
    currentTurnedRef.current = currentTurned;
  }, [currentTurned]);

  // Autoplay Timer with seamless looping and synchronized onPageChange
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || totalLeaves <= 1) return;
    const timer = setInterval(() => {
      const cur = currentTurnedRef.current;
      const next = cur >= totalLeaves ? 1 : cur + 1;
      setTurned(next);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, pauseOnHover, isHovered, totalLeaves, setTurned]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipNext, flipPrev]);

  const handleLeafClick = (index) => {
    if (!interactive) return;
    if (index === currentTurned) {
      // Click unturned top page -> flip forward
      flipNext();
    } else if (index === currentTurned - 1) {
      // Click turned top left page -> flip backward
      flipPrev();
    }
  };

  return (
    <div
      className={cn("w-full flex flex-col items-center justify-center select-none py-4", className)}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPeekingIndex(null);
      }}
    >
      {/* 3D Book Viewport Stage */}
      <div
        className="relative flex items-center justify-center transition-all duration-500 max-w-full overflow-visible"
        style={{
          perspective: `${perspective}px`,
          width: `${pageWidth * 2 + 40}px`,
          height: `${pageHeight + 40}px`,
        }}
      >
        {/* 3D Book Container */}
        <div
          className="relative transition-transform"
          style={{
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            transformStyle: "preserve-3d",
            transition: `transform ${duration}s ${easing}`,
            transform: spineShift
              ? (isOpen ? `translateX(${pageWidth / 2}px)` : (currentTurned === totalLeaves ? `translateX(${pageWidth}px)` : "translateX(0)"))
              : "translateX(0)",
          }}
        >
          {/* Outer Leather/Spine Binding Crease */}
          {showSpineBinding && (
            <div
              className="absolute top-0 bottom-0 left-[-6px] w-[12px] rounded-l-md bg-gradient-to-r from-black/90 via-zinc-800 to-black/50 shadow-2xl z-40 pointer-events-none"
              style={{
                opacity: isOpen ? 0.95 : 0.6,
                transition: `opacity ${duration}s ease`,
              }}
            />
          )}

          {/* Dynamic Ground Ambience Drop Shadow */}
          <div
            className="absolute -bottom-8 left-[-15%] w-[130%] h-12 bg-black/45 rounded-full blur-2xl pointer-events-none transition-all duration-500"
            style={{
              opacity: isOpen ? 0.75 : 0.45,
              transform: isOpen ? "scale(1.15)" : "scale(0.85)",
            }}
          />

          {/* Book Leaves Stacking Loop */}
          {pages.map((leaf, index) => {
            const isTurned = index < currentTurned;
            const isCanPeek = index === currentTurned;
            const isPeeking = peekingIndex === index;

            // Calculate Z-Index: turned leaves stack on left, unturned on right
            const zIndex = isTurned ? index + 1 : totalLeaves - index;

            // Rotation Angle
            let leafRotation = isTurned ? -turnAngle : 0;
            if (!isTurned && isPeeking) {
              leafRotation = -peekAngle;
            }

            return (
              <div
                key={leaf.id ?? index}
                onClick={() => handleLeafClick(index)}
                onMouseEnter={() => {
                  if (isCanPeek) setPeekingIndex(index);
                }}
                onMouseLeave={() => {
                  if (peekingIndex === index) setPeekingIndex(null);
                }}
                className={cn(
                  "absolute inset-0 origin-left",
                  interactive ? "cursor-pointer" : "pointer-events-none"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  transition: `transform ${duration}s ${easing}`,
                  transform: `rotateY(${leafRotation}deg)`,
                  zIndex,
                  borderRadius: parsedRadius,
                }}
              >
                {/* ─── FRONT FACE (Visible when page is on the right) ─── */}
                <div
                  className="absolute inset-0 w-full h-full bg-white dark:bg-[#0A1829] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: parsedRadius,
                    boxShadow: `0 14px 32px rgba(0, 0, 0, ${shadowIntensity})`,
                  }}
                >
                  {/* Rich Front Content or Full-Bleed Image */}
                  {leaf.frontContent ? (
                    leaf.frontContent
                  ) : (
                    <>
                      {leaf.frontImage && (
                        <img
                          src={leaf.frontImage}
                          alt={leaf.frontTitle ?? `Page ${index * 2 + 1}`}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}

                      {/* Spine crease shadow overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 14%, transparent 35%)",
                          opacity: isTurned ? 0 : 1,
                        }}
                      />

                      {/* Bottom Vignette & Metadata */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent text-white pointer-events-none">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          {leaf.frontBadge && (
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20"
                              style={{
                                color: accentColor,
                                backgroundColor: `${accentColor}25`,
                              }}
                            >
                              {leaf.frontBadge}
                            </span>
                          )}
                          {showPageNumbers && (
                            <span className="text-[10px] font-mono text-zinc-300/90 font-bold">
                              {index * 2 + 1}
                            </span>
                          )}
                        </div>
                        {leaf.frontTitle && (
                          <h4 className="text-sm font-bold tracking-tight text-white drop-shadow-sm line-clamp-1">
                            {leaf.frontTitle}
                          </h4>
                        )}
                        {leaf.frontSubtitle && (
                          <p className="text-[11px] text-zinc-300/80 font-medium line-clamp-1">
                            {leaf.frontSubtitle}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* ─── BACK FACE (Visible when page is turned to the left) ─── */}
                <div
                  className="absolute inset-0 w-full h-full bg-white dark:bg-[#0A1829] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: parsedRadius,
                    boxShadow: `0 14px 32px rgba(0, 0, 0, ${shadowIntensity})`,
                  }}
                >
                  {/* Rich Back Content or Full-Bleed Image */}
                  {leaf.backContent ? (
                    leaf.backContent
                  ) : (
                    <>
                      {leaf.backImage && (
                        <img
                          src={leaf.backImage}
                          alt={leaf.backTitle ?? `Page ${index * 2 + 2}`}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}

                      {/* Spine crease shadow overlay for turned back-face */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 14%, transparent 35%)",
                          opacity: isTurned ? 1 : 0,
                        }}
                      />

                      {/* Bottom Vignette & Metadata */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent text-white pointer-events-none">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          {leaf.backBadge && (
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20"
                              style={{
                                color: accentColor,
                                backgroundColor: `${accentColor}25`,
                              }}
                            >
                              {leaf.backBadge}
                            </span>
                          )}
                          {showPageNumbers && (
                            <span className="text-[10px] font-mono text-zinc-300/90 font-bold">
                              {index * 2 + 2}
                            </span>
                          )}
                        </div>
                        {leaf.backTitle && (
                          <h4 className="text-sm font-bold tracking-tight text-white drop-shadow-sm line-clamp-1">
                            {leaf.backTitle}
                          </h4>
                        )}
                        {leaf.backSubtitle && (
                          <p className="text-[11px] text-zinc-300/80 font-medium line-clamp-1">
                            {leaf.backSubtitle}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Book Controls & Page Progress Toolbar */}
      {showControls && (
        <div className="flex items-center justify-center gap-3 mt-8 select-none">
          <button
            type="button"
            onClick={flipPrev}
            disabled={currentTurned === 0}
            aria-label="Previous Page"
            className="px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-[#0E223D] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#132A4A] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={resetBook}
            disabled={currentTurned === 0}
            aria-label="Reset Book"
            className="px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-[#0E223D] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#132A4A] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cover</span>
          </button>

          <div className="px-4 py-2 rounded-xl bg-white dark:bg-[#0E223D] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="font-bold text-slate-900 dark:text-white">{currentTurned}</span>
            <span className="opacity-50">/</span>
            <span>{totalLeaves} leaves</span>
          </div>

          <button
            type="button"
            onClick={flipNext}
            disabled={currentTurned === totalLeaves}
            aria-label="Next Page"
            className="px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-[#0E223D] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#132A4A] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
});

ThreeDImagePageflip.displayName = "ThreeDImagePageflip";

export default ThreeDImagePageflip;

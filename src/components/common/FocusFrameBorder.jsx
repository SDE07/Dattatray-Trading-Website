import React from "react";

const corners = [
  {
    position: "top-0 left-0",
    edges: "border-t-2 border-l-2 rounded-tl-[32px]",
    delay: 0,
  },
  {
    position: "top-0 right-0",
    edges: "border-t-2 border-r-2 rounded-tr-[32px]",
    delay: 0.3,
  },
  {
    position: "bottom-0 left-0",
    edges: "border-b-2 border-l-2 rounded-bl-[32px]",
    delay: 0.6,
  },
  {
    position: "bottom-0 right-0",
    edges: "border-b-2 border-r-2 rounded-br-[32px]",
    delay: 0.9,
  },
];

export default function FocusFrameBorder({
  children,
  className = "",
  innerClassName = "",
  duration = 2.4,
  color = "#EF4444",
  borderRadius = "rounded-[32px]",
}) {
  return (
    <>
      <style>{`
        @keyframes focus-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-focus-pulse {
          animation: focus-pulse var(--focus-duration, 2.4s) ease-in-out infinite;
        }
      `}</style>
      <div className={`relative ${borderRadius} ${className}`}>
        {/* Content Layer */}
        <div className={`relative z-10 ${borderRadius} overflow-hidden h-full ${innerClassName}`}>
          {children}
        </div>

        {/* Pulsing Corner Brackets Perfectly Aligned with Card Radius */}
        {corners.map((corner, idx) => (
          <div
            key={idx}
            className={`absolute z-30 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 pointer-events-none animate-focus-pulse ${corner.position} ${corner.edges}`}
            style={{
              borderColor: color,
              filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
              animationDelay: `${corner.delay}s`,
              "--focus-duration": `${duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

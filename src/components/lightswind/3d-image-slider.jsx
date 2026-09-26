import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ImageSlider3D({
  images,
  items,
  renderItem,
  onCardClick,
  duration = 32,
  cardWidth = "20em",
  cardAspectRatio = "4/3.7",
  perspective = "70em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
  pauseOnHover = true,
}) {
  let rawData = items || images || [];
  // Ensure between 8-12 items for optimal cylinder curve and large zoomed-in card display
  let dataList = [...rawData];
  if (dataList.length > 0 && dataList.length < 8) {
    while (dataList.length < 8) {
      dataList = [...dataList, ...rawData];
    }
  }
  const n = dataList.length || 1;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;
  const [isHovered, setIsHovered] = useState(false);

  // rotation angles based on direction
  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 5%, rgba(0,0,0,1) 15%, #000 50%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.8) 95%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 5%, rgba(0,0,0,1) 15%, #000 50%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.8) 95%, transparent 100%)",
      }
    : {};

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      className={`relative grid w-full max-w-full h-full min-h-[380px] sm:min-h-[420px] overflow-hidden place-items-center ${containerClassName}`}
      style={{
        perspective: perspective,
        touchAction: "pan-y",
        ...maskStyles,
      }}
    >
      <motion.div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: rotationValues,
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
          ...(isHovered ? { duration: animationDuration * 4 } : {}),
        }}
      >
        {dataList.map((item, i) => (
          <div
            key={i}
            onClick={(e) => {
              if (onCardClick) onCardClick(item, i);
            }}
            className="col-start-1 row-start-1 select-none pointer-events-auto cursor-pointer"
            style={{
              width: cardWidth,
              aspectRatio: cardAspectRatio,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.4em) / tan(0.5 * (1turn / ${n}))))`,
            }}
          >
            {/* Inner Card Wrapper with Hover Scale and Backface Culling */}
            <div
              className={`w-full h-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 rounded-3xl cursor-pointer ${imageClassName}`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {renderItem ? (
                renderItem(item, i)
              ) : typeof item === "string" ? (
                <img
                  src={item}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              ) : null}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

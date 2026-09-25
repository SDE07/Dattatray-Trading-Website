import React, { useState, memo } from "react";

/**
 * High-performance OptimizedImage component
 * Features:
 * - Native async decoding
 * - Skeleton shimmer loading state
 * - Smooth opacity fade-in
 * - Error fallback handling
 */
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt = "",
  className = "",
  wrapperClassName,
  imgClassName,
  style = {},
  imgStyle = {},
  priority = false,
  loading,
  decoding = "async",
  fetchPriority,
  fallbackSrc,
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const effectiveLoading = loading || (priority ? "eager" : "lazy");
  const effectiveFetchPriority = fetchPriority || (priority ? "high" : "low");
  const currentSrc = isError && fallbackSrc ? fallbackSrc : src;

  const resolvedWrapperClass =
    wrapperClassName !== undefined ? wrapperClassName : className;
  const resolvedImgClass =
    imgClassName !== undefined ? imgClassName : className;

  return (
    <span
      className={`relative overflow-hidden block ${resolvedWrapperClass}`}
      style={style}
    >
      {!isLoaded && !isError && (
        <span
          className="absolute inset-0 bg-[#E8EEF0] animate-pulse pointer-events-none z-10"
          aria-hidden="true"
        />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={effectiveLoading}
        decoding={decoding}
        fetchPriority={effectiveFetchPriority}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={(e) => {
          setIsError(true);
          setIsLoaded(true);
          if (onError) onError(e);
        }}
        className={`transition-opacity duration-300 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${resolvedImgClass}`}
        style={imgStyle}
        {...props}
      />
    </span>
  );
});

export default OptimizedImage;

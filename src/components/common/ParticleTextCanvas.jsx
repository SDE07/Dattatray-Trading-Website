import React, { useRef, useEffect, useCallback } from "react";

/**
 * ParticleTextCanvas
 * Senior-Engineer interactive particle typography canvas.
 * - Extracts text pixel data using offscreen canvas ctx.getImageData().
 * - Dense pixel sampling (step = 2) for 100% solid, sharp, crystal-clear readability.
 * - Particles start at their exact text origins (0 initial jitter) so "DATTATRAY TRADING" is immediately legible.
 * - Exact user lerp & scatter physics:
 *     p.x += (p.originX - p.x) * 0.1;
 *     p.y += (p.originY - p.y) * 0.1;
 * - Palette strictly uses the brand leaf colors (Emerald Green #10B981, Mint #34D399, Pure White #FFFFFF, Leaf Gold #FBBF24).
 *   No blue used!
 */
export default function ParticleTextCanvas({
  title = "DATTATRAY",
  subtitle = "TRADING COMPANY",
  tagline = "FROZEN FOODS • COLD-CHAIN • GLOBAL EXPORT",
  text,
  subText,
  className = "w-full min-h-[190px] sm:min-h-[220px] lg:min-h-[250px]",
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 90 });

  // Resolve props (support title/subtitle or legacy text/subText)
  const line1 = title || text || "DATTATRAY";
  const line2 = subtitle || subText || "TRADING COMPANY";
  const line3 = tagline || "";

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width <= 0 || height <= 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Offscreen canvas for pristine vector text rasterization
    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);
    offCtx.clearRect(0, 0, width, height);

    // Responsive font metrics
    const titleSize = width < 400 ? 34 : width < 640 ? 44 : width < 1024 ? 54 : 62;
    const subtitleSize = width < 400 ? 20 : width < 640 ? 26 : width < 1024 ? 32 : 36;
    const taglineSize = width < 400 ? 9.5 : 11;

    const startX = 2;
    const titleY = titleSize * 0.88;
    const subtitleY = titleY + subtitleSize * 1.15;
    const taglineY = subtitleY + taglineSize * 1.6;

    // 1. Line 1: DATTATRAY (Emerald Leaf Green #10B981)
    offCtx.font = `900 ${titleSize}px "Outfit", "Inter", -apple-system, sans-serif`;
    offCtx.fillStyle = "#10B981";
    offCtx.textBaseline = "alphabetic";
    offCtx.fillText(line1, startX, titleY);

    // 2. Line 2: TRADING COMPANY (Pure Crisp White #FFFFFF)
    offCtx.font = `900 ${subtitleSize}px "Outfit", "Inter", -apple-system, sans-serif`;
    offCtx.fillStyle = "#FFFFFF";
    offCtx.fillText(line2, startX + 1, subtitleY);

    // 3. Line 3: Tagline (Luminous Mint #34D399)
    if (line3) {
      offCtx.font = `800 ${taglineSize}px "Inter", -apple-system, sans-serif`;
      offCtx.fillStyle = "#34D399";
      offCtx.fillText(line3, startX + 2, taglineY);
    }

    // Extract pixel data from offscreen canvas
    const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imgData.data;
    const particles = [];
    const step = width < 640 ? 2 : 2; // Step 2 ensures solid, unbroken letterforms

    for (let y = 0; y < offCanvas.height; y += step * dpr) {
      for (let x = 0; x < offCanvas.width; x += step * dpr) {
        const index = (y * offCanvas.width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 120) {
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const posX = x / dpr;
          const posY = y / dpr;

          // Color classification matching the Dattatray brand leaf
          let color = "#FFFFFF";
          if (g > 130 && r < 90 && b < 160) {
            // Emerald green word "DATTATRAY"
            color = Math.random() > 0.4 ? "#10B981" : "#34D399";
          } else if (posY > subtitleY - 4) {
            // Mint / Gold accents for tagline
            color = Math.random() > 0.3 ? "#6EE7B7" : "#FBBF24";
          } else {
            // Crisp White for "TRADING COMPANY" with subtle mint sparkles
            color = Math.random() > 0.88 ? "#A7F3D0" : "#FFFFFF";
          }

          // Particles start EXACTLY at their origin (0 jitter = 100% solid, sharp text at rest!)
          particles.push({
            x: posX,
            y: posY,
            originX: posX,
            originY: posY,
            size: width < 640 ? 1.5 : 1.75,
            color: color,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, [line1, line2, line3]);

  // Initialize and re-run once web fonts finish loading
  useEffect(() => {
    initParticles();

    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

    window.addEventListener("resize", initParticles);
    return () => window.removeEventListener("resize", initParticles);
  }, [initParticles]);

  // Main canvas animation loop with user lerp physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate distance from cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Scatter nearby particles on mousemove
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= Math.cos(angle) * force * 16;
          p.y -= Math.sin(angle) * force * 16;
        }

        // Exact lerp formula requested by user:
        // p.x += (p.originX - p.x) * 0.1;
        // p.y += (p.originY - p.y) * 0.1;
        p.x += (p.originX - p.x) * 0.1;
        p.y += (p.originY - p.y) * 0.1;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Touch handlers for mobile
    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      isRunning = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className={`relative ${className} select-none`}>
      {/* Interactive Particle Typography Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        title="Move your mouse or finger over the text to scatter interactive particles!"
      />
    </div>
  );
}

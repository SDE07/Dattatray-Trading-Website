import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";
import dattatrayLogo from "../../assets/logo.png";

/**
 * ThreeLogoSphere - Luxury 3D Earth Globe with Visible Orbital Spin,
 * Procedural Topographic Meridians, Dynamic Circular Sun Orbit, and Inertial Tracking.
 */
export default function ThreeLogoSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    // ── 1. Scene & Camera Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // ── 2. WebGL Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // ── 3. Dynamic Orbiting Studio Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Orbiting Sun Light creating realistic day/night terminator sweep across the sphere
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(5, 4, 3);
    scene.add(sunLight);

    const goldAccentLight = new THREE.PointLight(0xd4af37, 2.8, 14);
    goldAccentLight.position.set(3, 2, 3);
    scene.add(goldAccentLight);

    const emeraldAccentLight = new THREE.PointLight(0x10b981, 2.0, 14);
    emeraldAccentLight.position.set(-3, -2, 2);
    scene.add(emeraldAccentLight);

    // ── 4. Procedural High-Def Pearl Earth Texture (Visible Circular Spin) ──
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Pure pearl white background
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle golden & emerald latitude parallels
    ctx.strokeStyle = "rgba(212, 175, 55, 0.22)";
    ctx.lineWidth = 1.5;
    for (let y = 30; y < canvas.height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Latitude Equator bold accent
    ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Longitude meridians (curved globe lines)
    ctx.strokeStyle = "rgba(212, 175, 55, 0.22)";
    ctx.lineWidth = 1.5;
    for (let x = 0; x < canvas.width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Stylized Earth Continent Dots / Constellation Clusters (Emerald & Gold)
    for (let i = 0; i < 480; i++) {
      const cx = Math.random() * canvas.width;
      const cy = (Math.sin(i) * 0.4 + 0.5) * canvas.height;
      const radius = 1 + Math.random() * 2.5;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "rgba(212, 175, 55, 0.35)" : "rgba(16, 185, 129, 0.3)";
      ctx.fill();
    }

    const earthTexture = new THREE.CanvasTexture(canvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    // ── 5. 3D Earth Globe Construction with 23.5° Axial Tilt ──
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.z = -0.409; // 23.44° Earth Axial Tilt
    tiltGroup.rotation.x = 0.12;
    worldGroup.add(tiltGroup);

    // Main 3D Earth Sphere
    const sphereGeo = new THREE.SphereGeometry(1.62, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
      color: 0xffffff,
      emissive: 0xf5f5f7,
      emissiveIntensity: 0.15,
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      transmission: 0.08,
      transparent: true,
      opacity: 0.98,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    tiltGroup.add(sphereMesh);

    // Outer Atmospheric Horizon Glow
    const atmoGeo = new THREE.SphereGeometry(1.68, 48, 48);
    const atmoMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0x10b981,
      emissiveIntensity: 0.3,
      roughness: 0.8,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    tiltGroup.add(atmoMesh);

    // ── 6. Mouse Interaction & Inertia ──
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        targetTiltY = normX * 0.4;
        targetTiltX = -normY * 0.3;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerLeave = () => {
      isDragging = false;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerLeave);

    // ── 7. Circular Planetary Orbit Animation Loop ──
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // 1. Continuous visible Earth spin around its tilted axis
      sphereMesh.rotation.y += delta + 0.008;

      // 2. Circular Planetary Orbit movement (Floating precession in a smooth ellipse)
      worldGroup.position.x = Math.cos(elapsed * 0.6) * 0.08;
      worldGroup.position.y = Math.sin(elapsed * 0.6) * 0.06;
      worldGroup.position.z = Math.sin(elapsed * 0.3) * 0.04;

      // 3. Circular Orbiting Sun Light (Sweeps dynamic specular reflections circularly)
      sunLight.position.x = Math.cos(elapsed * 0.4) * 5;
      sunLight.position.z = Math.sin(elapsed * 0.4) * 4 + 2;

      // 4. Drag inertia damping
      if (isDragging || Math.abs(dragVelocity.x) > 0.0001 || Math.abs(dragVelocity.y) > 0.0001) {
        worldGroup.rotation.y += dragVelocity.x;
        worldGroup.rotation.x += dragVelocity.y;
        dragVelocity.x *= 0.92;
        dragVelocity.y *= 0.92;
      }

      // 5. Smooth mouse hover tilt
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      worldGroup.rotation.x = currentTiltX + (worldGroup.rotation.x * 0.95);
      worldGroup.rotation.y = currentTiltY + (worldGroup.rotation.y * 0.95);

      renderer.render(scene, camera);
    };

    animate();

    // ── 8. Responsive Resize ──
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 440;
      const newH = container.clientHeight || 440;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // ── 9. Cleanup ──
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      earthTexture.dispose();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none py-4 w-full">
      {/* Three.js Canvas Container with Earth Physics Cursor */}
      <div
        ref={mountRef}
        className="relative w-[340px] sm:w-[430px] md:w-[470px] lg:w-[490px] xl:w-[530px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        {/* Central Overlay High-Definition Logo anchored directly on the Sphere */}
        <Link
          to="/"
          title="Dattatray Trading Company - Click to View Home"
          className="absolute inset-0 flex items-center justify-center text-center z-20 group outline-none pointer-events-none"
        >
          <img
            src={dattatrayLogo}
            alt="Dattatray Trading Company Logo"
            className="w-[66%] sm:w-[70%] h-[66%] sm:h-[70%] object-contain filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.85)] group-hover:scale-108 transition-transform duration-500 select-none pointer-events-auto"
          />
        </Link>
      </div>
    </div>
  );
}

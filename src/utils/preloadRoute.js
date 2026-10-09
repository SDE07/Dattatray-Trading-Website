/**
 * Speculative Route Preloader
 * Senior Engineering Technique: Prefetches JS page chunks upon link hover or focus.
 * When the user clicks the link, the chunk is already cached in memory,
 * delivering an instant (0ms delay) page transition without loading spinner flicker.
 */
const routePreloaders = {
  "/": () => import("../pages/HomePage"),
  "/about": () => import("../pages/AboutPage"),
  "/leadership": () => import("../pages/LeadershipPage"),
  "/products": () => import("../pages/ProductsPage"),
  "/trading": () => import("../pages/TradingPage"),
  "/quality": () => import("../pages/QualityPage"),
  "/infrastructure": () => import("../pages/InfrastructurePage"),
  "/logistics": () => import("../pages/LogisticsPage"),
  "/contact": () => import("../pages/ContactPage"),
};

const preloadedSet = new Set();

export function preloadRoute(path) {
  if (!path) return;
  const cleanPath = path.split("?")[0].split("#")[0];
  if (preloadedSet.has(cleanPath)) return;

  const loader = routePreloaders[cleanPath];
  if (loader) {
    preloadedSet.add(cleanPath);
    loader().catch(() => {
      // Silently allow retry on subsequent attempts if network blipped
      preloadedSet.delete(cleanPath);
    });
  }
}

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Contact from "./common/Contact";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import SmoothScroll, { resetLenisScroll } from "./components/common/SmoothScroll";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Spinner } from "./components/ui/spinner-1";
import { useContentProtection } from "./hooks/useContentProtection";

// Senior Design Engineer Toaster with Dynamic Theme Synchronization (Emil Kowalski's Sonner)
function SonnerToaster() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="top-right"
      theme={isDark ? "dark" : "light"}
      richColors
      closeButton
      duration={3200}
      toastOptions={{
        className: "sonner-toast-custom",
        style: {
          borderRadius: "14px",
          fontFamily: "inherit",
          padding: "12px 16px",
        },
      }}
    />
  );
}

// Lazy-loaded page components for fast initial bundle
const HomePage           = lazy(() => import("./pages/HomePage"));
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const LeadershipPage     = lazy(() => import("./pages/LeadershipPage"));
const ProductsPage       = lazy(() => import("./pages/ProductsPage"));
const TradingPage        = lazy(() => import("./pages/TradingPage"));
const QualityPage        = lazy(() => import("./pages/QualityPage"));
const InfrastructurePage = lazy(() => import("./pages/InfrastructurePage"));
const LogisticsPage      = lazy(() => import("./pages/LogisticsPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));
const NotFoundPage       = lazy(() => import("./pages/NotFoundPage"));

// Senior UI Developer Loading Fallback with Custom Multi-Blade Spinner
function PageFallback() {
  return (
    <div className="flex-1 min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFCFA] dark:bg-[#06100B] px-4 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0E1B15]/90 shadow-xl shadow-emerald-950/5 dark:shadow-black/50 border border-emerald-600/10 dark:border-white/10 flex items-center justify-center">
          <Spinner size={46} color="#059669" className="dark:text-[#10B981]" />
        </div>
        <div className="space-y-1">
          <p className="text-[#059669] dark:text-[#34D399] font-extrabold text-xs tracking-[0.2em] uppercase">
            Dattatray Traders
          </p>
          <p className="text-[#6B7280] dark:text-slate-400 text-xs font-medium">
            Loading Trading Module…
          </p>
        </div>
      </div>
    </div>
  );
}

// Automatically scroll window to top upon route change with Lenis synchronization & auto-reset ErrorBoundary
function AppShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    resetLenisScroll();
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFA] dark:bg-[#06100B] text-[#374151] dark:text-[#E2E8F0] transition-colors duration-300">
      {/* Navigation Bar (Navbar: #FFFFFF) */}
      <Navbar />

      {/* Routed Page Content & Shared Sections wrapped in ErrorBoundary + Suspense */}
      <ErrorBoundary key={pathname}>
        <Suspense fallback={<PageFallback />}>
          <main className="flex-1">
            <Routes>
              {/* Core Navigation Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              
              {/* Products & Commodity Categories */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              
              {/* Trading & B2B Divisions */}
              <Route path="/trading" element={<TradingPage />} />
              <Route path="/trading-divisions" element={<TradingPage />} />
              <Route path="/trading/:segment" element={<TradingPage />} />

              {/* Quality & Corporate Standards */}
              <Route path="/quality" element={<QualityPage />} />
              <Route path="/infrastructure" element={<InfrastructurePage />} />
              <Route path="/logistics" element={<LogisticsPage />} />
              
              {/* Contact Us */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contactus" element={<ContactPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Contact & Inquiry Section */}
          <Contact />

          {/* Global Footer (Emerald Forest & Gold) */}
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function App() {
  useContentProtection();

  return (
    <ThemeProvider>
      <SonnerToaster />
      <Router>
        <SmoothScroll>
          <AppShell />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}

export default App;

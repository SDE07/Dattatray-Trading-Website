import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Contact from "./common/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import { SmoothScroll } from "./components/common";

// Lazy-loaded page components for fast initial bundle
const HomePage           = lazy(() => import("./pages/HomePage"));
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const ProductsPage       = lazy(() => import("./pages/ProductsPage"));
const TradingPage        = lazy(() => import("./pages/TradingPage"));
const QualityPage        = lazy(() => import("./pages/QualityPage"));
const InfrastructurePage = lazy(() => import("./pages/InfrastructurePage"));
const LogisticsPage      = lazy(() => import("./pages/LogisticsPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));
const NotFoundPage       = lazy(() => import("./pages/NotFoundPage"));

// Senior UI Developer Loading Fallback
function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F9FBFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-[#E8EEF0] rounded-full" />
          <div className="absolute inset-0 border-4 border-[#3B1F3A] border-t-[#8CC9D9] rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-[#3B1F3A] font-extrabold text-xs tracking-wider uppercase">Dattatray Traders</p>
          <p className="text-[#5D5361] text-[11px] mt-0.5">Loading Trading Module…</p>
        </div>
      </div>
    </div>
  );
}

// Automatically scroll window to top upon route change (only when switching pages, not query parameters)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F9FBFC] dark:bg-[#07111E] text-[#1E1520] dark:text-[#E2E8F0] transition-colors duration-300">
            
            {/* Navigation Bar (Navbar: #FFFFFF) */}
            <Navbar />

            {/* Routed Page Content */}
            <main className="flex-1">
              <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Core Navigation Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/leadership" element={<AboutPage />} />
                
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
            </Suspense>
          </main>

          {/* Global Contact & Inquiry Section (Currymiya Style) */}
          <Contact />

          {/* Global Footer (Footer: #241426) */}
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  </ThemeProvider>
  );
}

export default App;

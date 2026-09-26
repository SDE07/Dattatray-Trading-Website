import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Snowflake,
  Layers,
  ShieldCheck,
  Building,
  Truck,
  PhoneCall,
  Sparkles,
  Sun,
  Moon
} from "lucide-react";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

/* ─── Navigation Items matching user specification ───────────── */
const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Leadership", to: "/about#leadership" },
  { name: "Product", to: "/products" },
  { name: "Quality", to: "/quality" },
  { name: "Trading", to: "/trading" },
  { name: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Dynamic Scroll & Reading Progress calculation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25);
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const prevKeyRef = useRef(null);
  useEffect(() => {
    if (prevKeyRef.current !== location.key) {
      prevKeyRef.current = location.key;
      const t = setTimeout(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [location.key]);

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      return location.pathname === path && location.hash === "#" + hash;
    }
    if (to === "/about") {
      return location.pathname === "/about" && (!location.hash || location.hash !== "#leadership");
    }
    return location.pathname.startsWith(to);
  };

  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (typeof to === "string" && to.includes("#")) {
      const hash = to.split("#")[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-2 sm:top-3.5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      
      {/* ── Floating Pill Container (High-Contrast Luxury Pill & Elevation) ── */}
      <div
        ref={dropdownRef}
        className={`pointer-events-auto relative w-full max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1440px] rounded-full backdrop-blur-2xl px-4 sm:px-7 lg:px-8 py-2 sm:py-2.5 min-h-[58px] sm:min-h-[62px] flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFB] to-[#E5F0F4] dark:from-[#0B1B2F]/95 dark:via-[#0D223D]/95 dark:to-[#07111E]/95 border border-[#3B1F3A]/25 dark:border-white/15 shadow-[0_16px_45px_-6px_rgba(59,31,58,0.22),_0_6px_20px_rgba(0,0,0,0.08),_inset_0_1px_0_#FFFFFF] dark:shadow-[0_16px_45px_-6px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-b from-[#FFFFFF] via-[#F6FAFC] to-[#E3EEF3] dark:from-[#0B1B2F]/90 dark:via-[#0D223D]/90 dark:to-[#07111E]/90 border border-[#BFD2DC] dark:border-white/10 hover:border-[#3B1F3A]/30 dark:hover:border-[#8CC9D9]/40 shadow-[0_12px_36px_-6px_rgba(59,31,58,0.16),_0_4px_16px_rgba(0,0,0,0.06),_inset_0_1px_0_#FFFFFF] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Dynamic Embedded Scroll Reading Loader Bar */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-20">
          <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-transparent">
            <div
              className="h-full origin-left bg-gradient-to-r from-[#3B1F3A] via-[#8CC9D9] to-[#3B1F3A] dark:from-[#38BDF8] dark:via-[#8CC9D9] dark:to-[#38BDF8] transition-[width] duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0 py-0.5 outline-none focus:outline-none select-none"
          aria-label="Dattatray Trading Company Home"
        >
          <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
            <img
              src={logo}
              alt="Dattatray Trading Company - Frozen Foods"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(59,31,58,0.18)] dark:drop-shadow-[0_2px_10px_rgba(140,201,217,0.3)] group-hover:drop-shadow-[0_3px_12px_rgba(59,31,58,0.25)] transition-all duration-300"
              style={{ imageRendering: "auto" }}
            />
          </div>

          <div className="flex flex-col justify-center leading-tight">
            <span className="text-xs sm:text-[13px] font-black tracking-[0.14em] text-[#3B1F3A] dark:text-white group-hover:text-[#2A1429] dark:group-hover:text-[#8CC9D9] transition-colors">
              DATTATRAY
            </span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.2em] font-bold text-[#8CC9D9] mt-0.5">
              FROZEN FOODS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Fits 7 items cleanly on lg and above) */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
          {navItems.map((item) => {
            const active = isActive(item.to);
            const isDropdownOpen = activeDropdown === item.name;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : item.name)}
                    className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors duration-200 py-1 cursor-pointer outline-none focus:outline-none select-none ${
                      active || isDropdownOpen
                        ? "text-[#3B1F3A] dark:text-[#8CC9D9] font-bold"
                        : "text-[#5D5361] dark:text-slate-300 hover:text-[#3B1F3A] dark:hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-[#3B1F3A] dark:text-[#8CC9D9]" : "text-[#5D5361] dark:text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Dropdown Flyout Panel */}
                  {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] -left-4 bg-gradient-to-b from-[#FFFFFF] via-[#F6FAFC] to-[#E3EEF3] dark:from-[#0B1B2F] dark:via-[#0D223D] dark:to-[#07111E] border border-[#BFD2DC] dark:border-white/15 rounded-2xl shadow-[0_16px_40px_rgba(59,31,58,0.18),_inset_0_1px_0_#FFFFFF] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-2.5 w-[280px] z-50 animate-in fade-in duration-150 backdrop-blur-2xl">
                      <div className="space-y-1">
                        {item.subItems.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={() => handleNavClick(sub.to)}
                              className="w-full text-left p-2 rounded-xl hover:bg-[#E8EEF0]/70 dark:hover:bg-slate-800/80 transition-all duration-150 flex items-start gap-2.5 group cursor-pointer outline-none focus:outline-none"
                            >
                              <div className="p-1.5 rounded-lg bg-[#E8EEF0] dark:bg-slate-800 text-[#3B1F3A] dark:text-[#8CC9D9] group-hover:bg-[#3B1F3A] group-hover:text-[#8CC9D9] dark:group-hover:bg-[#1E56C8] dark:group-hover:text-white transition-colors mt-0.5">
                                <Icon size={15} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[#3B1F3A] dark:text-slate-100 group-hover:text-[#3B1F3A] dark:group-hover:text-white">
                                  {sub.name}
                                </p>
                                <p className="text-[10px] text-[#5D5361] dark:text-slate-400 mt-0.5 leading-snug">
                                  {sub.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#8CC9D9] shadow-[0_0_8px_rgba(140,201,217,0.9)] pointer-events-none" />
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => handleNavClick(item.to)}
                className={`text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors duration-200 relative py-1 outline-none focus:outline-none select-none ${
                  active
                    ? "text-[#3B1F3A] dark:text-[#8CC9D9] font-bold"
                    : "text-[#5D5361] dark:text-slate-300 hover:text-[#3B1F3A] dark:hover:text-white"
                }`}
              >
                <span>{item.name}</span>
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#8CC9D9] shadow-[0_0_8px_rgba(140,201,217,0.9)] pointer-events-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Day/Night Toggle + CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Day / Night Theme Toggle Button (Sleek Circular Interactive Toggle) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 dark:bg-[#07111E] border border-slate-300/80 dark:border-white/20 text-slate-700 dark:text-amber-300 shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer outline-none focus:outline-none select-none"
            title={isDark ? "Switch to Day Mode (Light Theme)" : "Switch to Night Mode (Dark Theme)"}
            aria-label="Toggle Day and Night Theme"
          >
            {isDark ? (
              <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#38BDF8] fill-[#38BDF8]/20 transition-transform duration-300 rotate-0 group-hover:-rotate-12 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            ) : (
              <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 fill-amber-500/20 transition-transform duration-300 rotate-0 group-hover:rotate-45 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            )}
          </button>

          {/* CTA Button (Soft Sky Cyan #8CC9D9) */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              onClick={() => handleNavClick("/contact")}
              className="group relative inline-flex items-center gap-1.5 px-4.5 sm:px-5 py-2 rounded-full overflow-hidden text-[10.5px] uppercase tracking-wider font-extrabold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] outline-none focus:outline-none"
            >
              <span>Trade Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#123741]" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-full border border-[#E8EEF0] dark:border-white/10 bg-[#3B1F3A]/5 dark:bg-white/10 text-[#3B1F3A] dark:text-white hover:bg-[#3B1F3A]/10 dark:hover:bg-white/20 transition-colors cursor-pointer outline-none focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer Menu ── */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-full mt-2 inset-x-3 sm:inset-x-6 max-w-7xl mx-auto rounded-3xl backdrop-blur-2xl px-6 pt-4 pb-6 space-y-4 shadow-2xl transition-all duration-300 bg-gradient-to-b from-[#FFFFFF] via-[#F6FAFC] to-[#E3EEF3] dark:from-[#0B1B2F] dark:via-[#0D223D] dark:to-[#07111E] border border-[#BFD2DC] dark:border-white/15 text-[#1E1520] dark:text-slate-100">
          
          {/* Mobile Day/Night Switcher Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8EEF0]/80 dark:border-white/10">
            <span className="text-xs font-bold text-[#5D5361] dark:text-slate-300 uppercase tracking-wider">
              Display Mode ({isDark ? "Night" : "Day"})
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="group relative flex items-center w-[58px] h-[28px] p-0.5 rounded-full bg-slate-200/90 dark:bg-[#07111E] border border-slate-300 dark:border-white/20 shadow-inner cursor-pointer outline-none select-none"
              aria-label="Toggle Day and Night Theme"
            >
              <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                <Sun className={`w-3.5 h-3.5 ${!isDark ? "opacity-0" : "text-amber-400 opacity-60"}`} />
                <Moon className={`w-3.5 h-3.5 ${isDark ? "opacity-0" : "text-slate-400 opacity-60"}`} />
              </div>
              <div
                className={`relative z-10 flex items-center justify-center w-5.5 h-5.5 rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform-gpu ${
                  isDark
                    ? "translate-x-[29px] bg-gradient-to-tr from-[#1E56C8] to-[#38BDF8] text-white shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                    : "translate-x-0 bg-amber-400 text-amber-950 shadow-[0_2px_6px_rgba(251,191,36,0.5)]"
                }`}
              >
                {isDark ? (
                  <Moon className="w-3 h-3 fill-current" />
                ) : (
                  <Sun className="w-3 h-3" />
                )}
              </div>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <div key={item.name} className="border-b border-[#E8EEF0]/80 dark:border-white/10 pb-1">
                  <Link
                    to={item.to}
                    onClick={handleNavClick}
                    className={`block text-xs uppercase tracking-widest font-semibold py-2 transition-colors ${
                      active
                        ? "text-[#3B1F3A] dark:text-[#8CC9D9] font-bold"
                        : "text-[#5D5361] dark:text-slate-300 hover:text-[#3B1F3A] dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Sub-items in mobile drawer */}
                  {item.hasDropdown && (
                    <div className="pl-3 py-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={handleNavClick}
                          className="block text-[11px] text-[#5D5361] dark:text-slate-400 hover:text-[#3B1F3A] dark:hover:text-[#8CC9D9] py-1"
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="w-full py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#123741]" />
              <span>Request Trade Quotation →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

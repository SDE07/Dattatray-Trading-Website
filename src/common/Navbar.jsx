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
  { name: "Leadership", to: "/leadership" },
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
    <header
      ref={dropdownRef}
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-md ${
        isScrolled
          ? "bg-[#FAF4E2]/98 dark:bg-[#0A121A]/98 border-b border-[#D4AF37]/40 shadow-sm dark:shadow-none"
          : "bg-[#FAF7EE]/40 dark:bg-[#07111E]/40 border-b border-[#E6D9B8]/30 dark:border-white/10 shadow-none"
      }`}
    >
      {/* Dynamic Embedded Scroll Reading Loader Bar across entire bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-transparent pointer-events-none z-20 overflow-hidden">
        <div
          className="h-full origin-left bg-gradient-to-r from-[#D4AF37] via-[#15803D] to-[#D4AF37] dark:from-[#F59E0B] dark:via-[#22C55E] dark:to-[#F59E0B] transition-[width] duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Full-width Inner Container */}
      <div className="w-full max-w-[96%] xl:max-w-[1540px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-1.5 min-h-[58px] sm:min-h-[64px] lg:min-h-[68px] flex items-center justify-between">

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
              className="h-12 sm:h-14 md:h-16 lg:h-[66px] xl:h-[70px] w-auto max-w-[240px] sm:max-w-[290px] lg:max-w-[340px] object-contain select-none filter drop-shadow-[0_2px_10px_rgba(200,169,80,0.22)] dark:drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)] group-hover:drop-shadow-[0_3px_16px_rgba(200,169,80,0.32)] transition-all duration-300"
              style={{ imageRendering: "auto" }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </Link>

        {/* Desktop Navigation Links (Fits 7 items cleanly on lg and above) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5.5 2xl:gap-7">
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
                    className={`flex items-center gap-1.5 text-xs xl:text-[13px] uppercase tracking-[0.14em] font-bold transition-colors duration-200 py-1 cursor-pointer outline-none focus:outline-none select-none ${
                      active || isDropdownOpen
                        ? "text-[#15803D] dark:text-[#4ADE80]"
                        : "text-[#3D3328] dark:text-slate-300 hover:text-[#15803D] dark:hover:text-[#4ADE80]"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-[#15803D] dark:text-[#4ADE80]" : "text-[#5C5042] dark:text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Dropdown Flyout Panel */}
                  {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+8px)] -left-4 bg-gradient-to-b from-[#FFFDF7] via-[#FAF5E6] to-[#F5EED8] dark:from-[#0B1522] dark:via-[#0D1C2E] dark:to-[#07111C] border border-[#E6D9B8] dark:border-white/15 rounded-2xl shadow-[0_16px_40px_rgba(212,175,55,0.18),_inset_0_1px_0_#FFFFFF] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-2.5 w-[290px] z-50 animate-in fade-in duration-150 backdrop-blur-2xl">
                      <div className="space-y-1">
                        {item.subItems.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={() => handleNavClick(sub.to)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-[#EFE5CA]/80 dark:hover:bg-slate-800/80 transition-all duration-150 flex items-start gap-2.5 group cursor-pointer outline-none focus:outline-none"
                            >
                              <div className="p-2 rounded-lg bg-[#EFE5CA] dark:bg-slate-800 text-[#15803D] dark:text-[#4ADE80] group-hover:bg-[#15803D] group-hover:text-white dark:group-hover:bg-[#22C55E] dark:group-hover:text-[#07111C] transition-colors mt-0.5">
                                <Icon size={16} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[#2A231C] dark:text-slate-100 group-hover:text-[#15803D] dark:group-hover:text-white">
                                  {sub.name}
                                </p>
                                <p className="text-[11px] text-[#5C5042] dark:text-slate-400 mt-0.5 leading-snug">
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
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#15803D] dark:bg-[#22C55E] pointer-events-none" />
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => handleNavClick(item.to)}
                className={`text-xs xl:text-[13px] uppercase tracking-[0.14em] font-bold transition-colors duration-200 relative py-1 outline-none focus:outline-none select-none ${
                  active
                    ? "text-[#15803D] dark:text-[#4ADE80]"
                    : "text-[#3D3328] dark:text-slate-300 hover:text-[#15803D] dark:hover:text-[#4ADE80]"
                }`}
              >
                <span>{item.name}</span>
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-[#15803D] dark:bg-[#22C55E] pointer-events-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Day/Night Toggle + CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Day / Night Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`group relative flex items-center justify-center w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full border transition-all duration-300 cursor-pointer outline-none focus:outline-none select-none hover:scale-105 active:scale-95 ${
              isScrolled
                ? "bg-[#F2ECE0]/90 dark:bg-[#07111E] border-[#DFD5BF] dark:border-white/20 text-[#3D3328] dark:text-amber-300"
                : "bg-[#F2ECE0]/60 dark:bg-white/10 border-[#DFD5BF]/60 dark:border-white/20 text-[#2C241B] dark:text-amber-300 backdrop-blur-sm"
            }`}
            title={isDark ? "Switch to Day Mode (Light Theme)" : "Switch to Night Mode (Dark Theme)"}
            aria-label="Toggle Day and Night Theme"
          >
            {isDark ? (
              <Moon className="w-4.5 h-4.5 text-[#38BDF8] fill-[#38BDF8]/20 transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-600 fill-amber-500/20 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
            )}
          </button>

          {/* CTA Button: High-End Agro Emerald Green */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              onClick={() => handleNavClick("/contact")}
              className="group relative inline-flex items-center gap-2 px-5 sm:px-5.5 py-1.5 sm:py-2 rounded-full overflow-hidden text-xs sm:text-[13px] uppercase tracking-wider font-extrabold shadow-sm hover:shadow hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] hover:from-[#0F3E22] hover:via-[#14532D] hover:to-[#15803D] text-white border border-[#22C55E]/30 outline-none focus:outline-none"
            >
              <span>Trade Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl border border-[#E6D9B8] dark:border-white/10 bg-[#D4AF37]/10 dark:bg-white/10 text-[#15803D] dark:text-white hover:bg-[#D4AF37]/20 dark:hover:bg-white/20 transition-colors cursor-pointer outline-none focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer Menu (Full-Width Edge-to-Edge) ── */}
      {mobileMenuOpen && (
        <div className="w-full bg-[#FAF7EE]/98 dark:bg-[#0A121A]/98 backdrop-blur-2xl border-t border-[#E6D9B8] dark:border-white/10 shadow-2xl transition-all duration-300 text-[#2A231C] dark:text-slate-100 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 space-y-4">
            {/* Mobile Day/Night Switcher Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6D9B8]/70 dark:border-white/10">
              <span className="text-xs font-bold text-[#5C5042] dark:text-slate-300 uppercase tracking-wider">
                Display Mode ({isDark ? "Night" : "Day"})
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="group relative flex items-center w-[58px] h-[28px] p-0.5 rounded-full bg-[#EFE5CA] dark:bg-[#07111E] border border-[#DFD5BF] dark:border-white/20 shadow-inner cursor-pointer outline-none select-none"
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
                  <div key={item.name} className="border-b border-[#E6D9B8]/70 dark:border-white/10 pb-1">
                    <Link
                      to={item.to}
                      onClick={handleNavClick}
                      className={`block text-xs uppercase tracking-widest font-semibold py-2 transition-colors ${
                        active
                          ? "text-[#15803D] dark:text-[#4ADE80] font-bold"
                          : "text-[#3D3328] dark:text-slate-300 hover:text-[#15803D] dark:hover:text-white"
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
                            className="block text-[11px] text-[#5C5042] dark:text-slate-400 hover:text-[#15803D] dark:hover:text-[#4ADE80] py-1"
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
                className="w-full py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#16A34A] text-white border border-[#22C55E]/30 transition-all hover:opacity-95"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Request Trade Quotation →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

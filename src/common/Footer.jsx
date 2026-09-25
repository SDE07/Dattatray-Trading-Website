import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Send,
  Snowflake
} from "lucide-react";
import logo from "../assets/logo.png";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const topProducts = [
    { label: "Frozen Green Peas", path: "/products?category=frozen-vegetables" },
    { label: "Sweet Corn & Mixed Veg", path: "/products?category=frozen-vegetables" },
    { label: "IQF Alphonso Mango Pulp", path: "/products?category=fruit-pulps" },
    { label: "Guava & Strawberry Pulps", path: "/products?category=fruit-pulps" },
    { label: "Ready-To-Eat Parathas", path: "/products?category=rte-snacks" },
    { label: "Frozen Veg Momos", path: "/products?category=rte-snacks" },
    { label: "Frozen Paneer & Snacks", path: "/products?category=rte-snacks" },
    { label: "HoReCa Institutional Packs", path: "/products?category=commercial" },
  ];

  const quickLinks = [
    { label: "About Dattatray", path: "/about" },
    { label: "Quality & Lab Standards", path: "/quality" },
    { label: "Cold Storage Network", path: "/infrastructure" },
    { label: "Reefer Logistics Network", path: "/logistics" },
    { label: "Merchant Export Division", path: "/trading?segment=export" },
    { label: "Wholesale Trade Terms", path: "/trading?segment=wholesale" },
    { label: "Terms & Conditions", path: "/contact" },
  ];

  const affiliations = [
    "APEDA Registered",
    "FSSAI Certified",
    "Agmark Verified",
    "ISO 9001:2015",
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#241426] via-[#1E1020] to-[#190C1A] text-[#cbd5e1] border-t-[3px] border-[#8CC9D9] font-sans overflow-hidden">
      
      {/* Decorative Subtle Ambient Lighting */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#3B1F3A]/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#8CC9D9]/10 blur-[110px] pointer-events-none" />

      {/* Main Footer Content - ISMR Proportions & Alignment */}
      <div className="relative z-10 w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-5 sm:pt-8 sm:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* 1. Brand & About Column (ISMR lg=4) */}
        <div className="lg:col-span-4 space-y-3">
  <div className="mb-2">
    <Link
      to="/"
      onClick={scrollToTop}
      className="inline-flex items-center gap-3 group"
    >
      {/* Logo */}
      <div className="bg-white p-2 rounded-lg shadow-md group-hover:-translate-y-0.5 transition-transform">
        <img
          src={logo}
          alt="Dattatray Trading Company - Frozen Foods"
          className="h-10 sm:h-11 w-auto object-contain"
        />
      </div>

      {/* Company Name - Right Side */}
      <div className="flex flex-col justify-center">
        <span className="text-white text-base sm:text-lg font-extrabold tracking-wide leading-tight">
          DATTATRAY
        </span>

        <span className="text-[#8CC9D9] text-[10px] sm:text-[11px] font-semibold tracking-[1.8px] leading-tight">
          TRADING COMPANY
        </span>

        <span className="text-[#94a3b8] text-[9px] sm:text-[10px] font-medium tracking-[1px] mt-0.5">
          FROZEN FOODS
        </span>
      </div>
    </Link>

    <p className="text-[12.5px] leading-[1.48] text-[#94a3b8] mt-3 max-w-[360px]">
      Dattatray Trading Company — Premium frozen food supplier and wholesale
      distributor. Supplying quality frozen vegetables, frozen snacks and
      ready-to-cook products for HoReCa, wholesale, retail and export markets.
    </p>
  </div>

  {/* Certifications & Badges */}
  <div className="flex flex-wrap gap-1.5 mb-2.5">
    {affiliations.map((item, i) => (
      <span
        key={i}
        className="bg-[#8CC9D9]/12 text-[#8CC9D9] border border-[#8CC9D9]/35 text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
      >
        {item}
      </span>
    ))}
  </div>

  {/* Connect With Us */}
  <div className="pt-1">
    <span className="block text-[11px] uppercase tracking-[0.8px] text-[#8CC9D9] font-bold mb-2">
      Connect With Us
    </span>

    <div className="flex items-center gap-2.5">
      <a
        href="https://wa.me/919822000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-[34px] h-[34px] rounded-full bg-[#8CC9D9]/15 border-[1.5px] border-[#8CC9D9]/60 text-[#8CC9D9] hover:bg-[#8CC9D9] hover:text-[#123741] hover:-translate-y-0.5 transition-all flex items-center justify-center text-xs shadow-sm"
        title="WhatsApp"
      >
        <Phone size={14} />
      </a>

      <a
        href="mailto:trade@dattatraytraders.com"
        aria-label="Email"
        className="w-[34px] h-[34px] rounded-full bg-[#8CC9D9]/15 border-[1.5px] border-[#8CC9D9]/60 text-[#8CC9D9] hover:bg-[#8CC9D9] hover:text-[#123741] hover:-translate-y-0.5 transition-all flex items-center justify-center text-xs shadow-sm"
        title="Email"
      >
        <Mail size={14} />
      </a>

      <a
        href="/contact"
        onClick={scrollToTop}
        aria-label="Inquiry Desk"
        className="w-[34px] h-[34px] rounded-full bg-[#8CC9D9]/15 border-[1.5px] border-[#8CC9D9]/60 text-[#8CC9D9] hover:bg-[#8CC9D9] hover:text-[#123741] hover:-translate-y-0.5 transition-all flex items-center justify-center text-xs shadow-sm"
        title="Trade Desk"
      >
        <Snowflake size={14} />
      </a>
    </div>
  </div>
</div>

          {/* 2. Top Products Column (ISMR lg=2) */}
          <div className="lg:col-span-2">
            <h5 className="text-[15.5px] font-bold text-white tracking-[0.2px] mb-3 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-[2.5px] after:bg-[#8CC9D9] after:rounded-sm">
              Top Products
            </h5>
            <ul className="space-y-1.5">
              {topProducts.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className="text-[13px] text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all font-medium leading-[1.35]"
                  >
                    <ChevronRight size={10} className="text-[#8CC9D9]/70 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Links Column (ISMR lg=2) */}
          <div className="lg:col-span-2">
            <h5 className="text-[15.5px] font-bold text-white tracking-[0.2px] mb-3 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-[2.5px] after:bg-[#8CC9D9] after:rounded-sm">
              Quick Links
            </h5>
            <ul className="space-y-1.5">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className="text-[13px] text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all font-medium leading-[1.35]"
                  >
                    <ChevronRight size={10} className="text-[#8CC9D9]/70 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick CTA Apply/Inquire Button (Matching ISMR Footer CTA Button) */}
            <div className="mt-3">
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] shadow-[#8CC9D9]/25 hover:shadow-[#8CC9D9]/35 cursor-pointer"
              >
                <Send size={11} />
                <span>Get Quick Quote</span>
              </Link>
            </div>
          </div>

          {/* 4. Facility, Contact & Map Column (ISMR lg=4) */}
          <div className="lg:col-span-4 space-y-2">
            <h5 className="text-[15.5px] font-bold text-white tracking-[0.2px] mb-3 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-7 after:h-[2.5px] after:bg-[#8CC9D9] after:rounded-sm">
              Facility &amp; Contact
            </h5>

            <div className="space-y-2 mb-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 min-w-7 rounded-md bg-[#8CC9D9]/15 border border-[#8CC9D9]/35 text-[#8CC9D9] flex items-center justify-center text-xs mt-0.5">
                  <Phone size={13} />
                </div>
                <div>
                  <span className="block text-[10.5px] uppercase tracking-[0.4px] text-[#94a3b8] font-semibold">Trading Helpline:</span>
                  <a href="tel:+919822000000" className="text-[13px] font-semibold text-white hover:text-[#8CC9D9] transition-colors">
                    +91 98220 00000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 min-w-7 rounded-md bg-[#8CC9D9]/15 border border-[#8CC9D9]/35 text-[#8CC9D9] flex items-center justify-center text-xs mt-0.5">
                  <Mail size={13} />
                </div>
                <div>
                  <span className="block text-[10.5px] uppercase tracking-[0.4px] text-[#94a3b8] font-semibold">Commercial Email:</span>
                  <a href="mailto:trade@dattatraytraders.com" className="text-[13px] font-semibold text-white hover:text-[#8CC9D9] transition-colors">
                    trade@dattatraytraders.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 min-w-7 rounded-md bg-[#8CC9D9]/15 border border-[#8CC9D9]/35 text-[#8CC9D9] flex items-center justify-center text-xs mt-0.5">
                  <MapPin size={13} />
                </div>
                <div>
                  <span className="block text-[10.5px] uppercase tracking-[0.4px] text-[#94a3b8] font-semibold">Cold Storage &amp; Yard:</span>
                  <p className="text-[12px] leading-[1.4] text-[#cbd5e1] mb-0">
                    Dattatray Trading Company, Cold Storage Complex, Main APMC Market Yard, Nashik / Ahilyanagar Highway, Maharashtra 422001, India.
                  </p>
                </div>
              </div>
            </div>

            {/* Styled Embedded Google Map Card (Matching ISMR footer-map-card) */}
            <div className="rounded-lg overflow-hidden border border-[#8CC9D9]/35 shadow-lg mt-2 transition-all hover:border-[#8CC9D9] hover:-translate-y-0.5">
              <iframe
                title="Dattatray Trading Company Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119954.89679161226!2d73.7042079140411!3d19.991105315480747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd96c4b2e8a7ef%3A0xb308a005086d34e6!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="125"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer Bottom Bar (Matching ISMR footer-bottom) */}
      <div className="bg-[#190C1A] border-t border-white/10 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-1 text-[12px] text-[#94a3b8]">
          <span>
            © {new Date().getFullYear()} Dattatray Trading Company (Frozen Foods). All Rights Reserved.
          </span>
          <span className="text-[#64748b]">
            Website Designed &amp; Developed By{" "}
            <a
              href="https://foxaircomm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-bold hover:underline transition-colors"
            >
              Fox Aircomm Pvt Ltd
            </a>
          </span>
        </div>
      </div>

    </footer>
  );
}

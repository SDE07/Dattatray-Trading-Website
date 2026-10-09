import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PhoneCall,
  Clock,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  Send,
  Building2,
  PackageCheck
} from "lucide-react";

/**
 * Senior UI Developer Grade "Under Development" Component
 * Adheres strictly to the color token palette:
 * - Primary: #3B1F3A (Deep Plum)
 * - Secondary: #8CC9D9 (Soft Sky Cyan)
 * - Canvas: #F9FBFC
 * - Surface: #FFFFFF
 * - Muted Surface: #E8EEF0
 */
export default function UnderDevelopment({
  title = "Module Under Active Development",
  subtitle = "Agricultural Trading & Sourcing Platform",
  category = "Trading & Logistics",
  estimatedCompletion = "Q4 2026",
  progress = 85,
  description = "Our engineering and commodity procurement teams are finalizing this module to deliver real-time pricing, certified lab specifications, and seamless wholesale logistics.",
  highlights = [
    {
      icon: TrendingUp,
      title: "Real-time Wholesale Mandi Rates",
      desc: "Live agricultural commodity spot market prices and daily trade indices.",
    },
    {
      icon: ShieldCheck,
      title: "Agmark & APEDA Certifications",
      desc: "Download verified batch quality reports, moisture levels, and grade certificates.",
    },
    {
      icon: PackageCheck,
      title: "Bulk Ordering & Freight Calculator",
      desc: "Instant multi-ton order quotes with integrated pan-India multimodal freight rates.",
    },
    {
      icon: FileSpreadsheet,
      title: "Commodity Specifications",
      desc: "Detailed technical data sheets for pulses, grains, oilseeds, and regional produce.",
    },
  ],
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  return (
    <div className="min-h-[85vh] bg-[#F9FBFC] dark:bg-[#06100B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#5D6B7E] dark:text-slate-400 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#1E56C8] dark:hover:text-[#38BDF8] transition-colors flex items-center gap-1">
            <Building2 size={13} />
            <span>Home</span>
          </Link>
          <span className="text-[#8CC9D9]">/</span>
          <span className="text-[#5D6B7E] dark:text-slate-400">{category}</span>
          <span className="text-[#8CC9D9]">/</span>
          <span className="text-[#0B2546] dark:text-white font-bold">{title}</span>
        </nav>

        {/* Hero Section Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2546] via-[#0F3057] to-[#07172C] dark:from-[#021A13] dark:via-[#042A1E] dark:to-[#01140E] p-8 sm:p-12 lg:p-16 text-white shadow-2xl mb-12 border border-transparent dark:border-emerald-900/30">
          
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8CC9D9]/15 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#1E56C8]/30 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#8CC9D9] text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CC9D9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CC9D9]"></span>
              </span>
              Module In Active Development
            </div>

            {/* Subtitle tag */}
            {subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-[#8CC9D9] uppercase tracking-wider mb-2">
                {subtitle}
              </p>
            )}

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-[#E8EEF0]/90 leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>

            {/* Development Progress Bar */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 mb-8 max-w-xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#E8EEF0] mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#8CC9D9]" />
                  Status: Final Polish &amp; API Integration
                </span>
                <span className="text-[#8CC9D9]">{progress}% Complete</span>
              </div>
              <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8CC9D9] to-[#FFFFFF] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-3 text-[11px] text-white/70">
                <span>Phase: Component &amp; Data Binding</span>
                <span>Target Launch: <strong className="text-white">{estimatedCompletion}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] font-bold text-sm transition-all duration-200 shadow-lg shadow-[#8CC9D9]/25 hover:shadow-[#8CC9D9]/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Contact Trade Desk</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
              >
                <ArrowLeft size={16} />
                <span>Back to Overview</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Preview Cards Grid (Surface: #FFFFFF, Muted: #E8EEF0) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2546] dark:text-white">
                Upcoming Features in this Module
              </h2>
              <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 mt-1">
                A sneak peek into the enterprise capabilities being prepared for {title}.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1E56C8] dark:text-[#38BDF8] bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 px-3 py-1.5 rounded-lg border border-[#1E56C8]/20 dark:border-[#38BDF8]/30">
              <Layers size={14} className="text-[#1E56C8] dark:text-[#38BDF8]" />
              Enterprise Edition
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] dark:bg-[#0E1B15] border border-[#E8EEF0] dark:border-white/10 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8EEF0] dark:bg-slate-800 text-[#0B2546] dark:text-[#8CC9D9] flex items-center justify-center mb-4 group-hover:bg-[#1E56C8] group-hover:text-white transition-colors duration-200">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-black text-[#0B2546] dark:text-white group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] mb-2 leading-snug transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5D6B7E] dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Early Access / Specification Inquiry Card */}
        <div className="bg-[#EBF5FA] dark:bg-[#0E1B15] border border-[#D0E7F2] dark:border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
          <div className="max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1E56C8] dark:text-[#38BDF8]">
              Direct Wholesale Inquiry
            </span>
            <h3 className="text-xl font-black text-[#0B2546] dark:text-white mt-1 mb-2">
              Need immediate commodity specifications or bulk rates?
            </h3>
            <p className="text-sm text-[#5D6B7E] dark:text-slate-300">
              While our online catalogue is being deployed, our trading desk in Maharashtra is actively servicing institutional and bulk trade orders.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#FFFFFF] dark:bg-[#0E1B15] border border-[#8CC9D9] text-[#123741] dark:text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-sm">
                <CheckCircle2 size={18} className="text-[#10B981]" />
                <span>Thank you! Our trading manager will reach out shortly.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  required
                  className="px-4 py-3 bg-[#FFFFFF] dark:bg-[#12221B] border border-[#5D6B7E]/20 dark:border-white/15 rounded-xl text-sm text-[#0B2546] dark:text-white placeholder:text-[#5D6B7E]/60 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#1E56C8] focus:ring-1 focus:ring-[#1E56C8] min-w-[260px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1E56C8] hover:bg-[#1546AA] text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <Send size={15} className="text-[#8CC9D9]" />
                  <span>Notify Me</span>
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

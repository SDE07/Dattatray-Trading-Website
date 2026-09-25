import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FlaskConical,
  Award,
  ThermometerSnowflake,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import CertificationsSection from "../common/CertificationsSection";

export default function QualityPage() {
  const qualityPillars = [
    {
      icon: FlaskConical,
      title: "In-House Rapid Testing Labs",
      desc: "Digital moisture meters, refractometers for fruit pulp brix measurement, microbial plating, and automated foreign matter sorting equipment.",
      badge: "Testing at -18°C",
    },
    {
      icon: Award,
      title: "Agmark & FSSAI Conformance",
      desc: "Rigorous alignment with Food Safety and Standards Authority of India (FSSAI) norms, Agmark grading specifications, and standardized packaging codes.",
      badge: "FSSAI Grade A",
    },
    {
      icon: ShieldCheck,
      title: "Global Export Phytosanitary Clearances",
      desc: "Pesticide residue verification, aflatoxin testing, and international fumigation protocols conforming to European, GCC, and USFDA import mandates.",
      badge: "Export Grade",
    },
    {
      icon: CheckCircle2,
      title: "Full Lot Traceability System",
      desc: "End-to-end digital barcode tracking tracing each individual batch from specific harvest agricultural clusters right to container dispatch.",
      badge: "100% Traceable",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-[#F9FBFC] dark:bg-[#07111E] transition-colors duration-300">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2546] via-[#123766] to-[#1E56C8] px-6 py-18 sm:py-24 text-center">
        {/* Top subtle cyan/gold hairline */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#8CC9D9] to-transparent opacity-80" />

        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#8CC9D9]/30 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#1E56C8]/40 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8CC9D9]/40 bg-[#8CC9D9]/15 px-4.5 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#8CC9D9] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Uncompromising Standards
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Quality Assurance &amp; Food Safety Protocols
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#D0E2EC]">
            From harvest at fertile farm gates to sub-zero individual quick freezing (IQF) and automated packaging, our multi-tier QA system guarantees maximum freshness, zero nutritional loss, and full international compliance.
          </p>
        </div>
      </section>

      {/* ─── Globally Trusted Certifications Section ─── */}
      <CertificationsSection />

      {/* ─── 4 Quality Control Pillars ─── */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E56C8]/10 dark:bg-[#38BDF8]/15 text-[#1E56C8] dark:text-[#38BDF8] text-xs font-black uppercase tracking-[0.18em] mb-3">
            <Layers className="w-3.5 h-3.5" />
            Rigorous Protocols
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2546] dark:text-white tracking-tight">
            Our 4-Stage Quality Verification Process
          </h2>
          <p className="text-sm sm:text-base text-[#5D6B7E] dark:text-slate-300 mt-3">
            Every batch undergoes systematic sensory evaluation, moisture testing, and microbiological analysis before certification for delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0B1B2F] border border-[#E2EBF0] dark:border-white/10 hover:border-[#8CC9D9] dark:hover:border-[#38BDF8] shadow-[0_4px_20px_rgba(11,37,70,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_32px_rgba(30,86,200,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#8CC9D9]/20 text-[#1E56C8] dark:text-[#38BDF8] flex items-center justify-center group-hover:bg-[#8CC9D9] group-hover:text-[#123741] transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black text-[#8CC9D9] bg-[#0B2546] dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#0B2546] dark:text-white mb-2 leading-snug group-hover:text-[#1E56C8] dark:group-hover:text-[#38BDF8] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1E56C8] dark:text-[#38BDF8] bg-[#F0F6FF] dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cold-Chain Guarantee Banner */}
        <div className="mt-14 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#0B2546] via-[#123766] to-[#0B2546] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#8CC9D9]/20 border border-[#8CC9D9]/40 flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-7 h-7 text-[#8CC9D9]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#8CC9D9]">
                -18°C Deep Freeze Assurance
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Continuous Cold-Chain Temperature Data Logging
              </h3>
              <p className="text-xs sm:text-sm text-[#D0E2EC] mt-1 max-w-xl">
                Every reefer container and cold room is equipped with GPS-synced continuous temperature dataloggers ensuring unbroken -18°C preservation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Request QA Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

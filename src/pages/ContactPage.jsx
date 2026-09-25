import React from "react";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Contact Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2546] via-[#123766] to-[#1E56C8] px-6 py-16 sm:py-20 text-center">
        {/* Top subtle cyan/gold hairline */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#8CC9D9] to-transparent opacity-80" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8CC9D9]/40 bg-[#8CC9D9]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#8CC9D9]">
            <Sparkles className="w-3.5 h-3.5" />
            We'd Love to Hear From You
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Contact Dattatray Traders
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#D0E2EC] sm:text-base">
            Questions about our IQF frozen vegetables, wholesale food service supply, cold storage facilities, or export partnerships? Reach our commercial desk and we'll get back to you within one business day.
          </p>

          {/* Quick Contact Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/90">
            <a
              href="tel:+919822000000"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#8CC9D9]" />
              +91 98220 00000
            </a>
            <a
              href="mailto:trade@dattatraytraders.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#8CC9D9]" />
              trade@dattatraytraders.com
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-[#8CC9D9]" />
              APMC Market Yard, Maharashtra
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

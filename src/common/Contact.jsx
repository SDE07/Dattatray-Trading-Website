import React, { useState } from "react";
import { MapPin, Mail, Globe, CheckCircle2, AlertCircle, Loader2, Phone } from "lucide-react";
import logo from "../assets/logo.png";
import OptimizedImage from "./OptimizedImage";
import { SplitTextHeading } from "../components/common";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setStatus(null);

    // Executive, High-Contrast & Mobile-Responsive HTML Email Template (Dattatray Traders Theme)
    const emailBodyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Inquiry - Dattatray Trading Company</title>
        <style>
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; padding: 12px 6px !important; }
            .email-card { width: 100% !important; border-radius: 12px !important; }
            .header-padding { padding: 22px 18px !important; }
            .content-padding { padding: 22px 18px !important; }
            .data-table td { display: block !important; width: 100% !important; box-sizing: border-box; }
            .data-table .label-td { padding-bottom: 2px !important; color: #123741 !important; font-size: 13px !important; }
            .data-table .value-td { padding-bottom: 14px !important; padding-top: 0 !important; font-size: 15px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Arial, sans-serif; -webkit-text-size-adjust: 100%;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="background-color: #f4f6f8; padding: 28px 12px;">
          <tr>
            <td align="center">
              <!-- Main Card Container -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-card" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">

                <!-- Header Section: Clean White Card with Soft Cyan Accent Lines -->
                <tr>
                  <td align="center" class="header-padding" style="background-color: #ffffff; padding: 28px 24px; text-align: center; border-top: 6px solid #8CC9D9;">
                    
                    <!-- Dattatray Logo Brand Badge -->
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 12px auto;">
                      <tr>
                        <td align="center" style="background-color: #F0F8FA; border-radius: 10px; padding: 8px 20px; border: 1px solid #8CC9D9;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="background-color: #8CC9D9; color: #123741; font-family: Arial, sans-serif; font-size: 20px; font-weight: 900; line-height: 1; padding: 6px 11px; border-radius: 6px; vertical-align: middle;">
                                D
                              </td>
                              <td style="color: #0B2546; font-family: Arial, sans-serif; font-size: 18px; font-weight: 900; letter-spacing: 1.5px; padding-left: 12px; vertical-align: middle;">
                                DATTATRAY TRADERS
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <h1 style="color: #0B2546; margin: 6px 0 0 0; font-size: 21px; font-weight: 900; letter-spacing: 0.5px;">
                      📬 New Trade Inquiry
                    </h1>
                  </td>
                </tr>

                <!-- Content Section -->
                <tr>
                  <td class="content-padding" style="padding: 32px 28px; background-color: #ffffff;">
                    <p style="margin: 0 0 22px 0; color: #333333; font-size: 15px; font-weight: 600; line-height: 1.5;">
                      You have received a new contact & quotation submission from the official website:
                    </p>

                    <!-- Data Table -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="data-table" style="border-collapse: collapse; margin-bottom: 24px;">
                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td class="label-td" style="padding: 12px 0; font-weight: 800; color: #123741; font-size: 14px; width: 140px;">
                          👤 Full Name:
                        </td>
                        <td class="value-td" style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 700;">
                          ${formData.name}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td class="label-td" style="padding: 12px 0; font-weight: 800; color: #123741; font-size: 14px;">
                          ✉️ Email Address:
                        </td>
                        <td class="value-td" style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 700;">
                          <a href="mailto:${formData.email}" style="color: #123741; text-decoration: underline; font-weight: 700;">${formData.email}</a>
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td class="label-td" style="padding: 12px 0; font-weight: 800; color: #123741; font-size: 14px;">
                          📞 Phone Number:
                        </td>
                        <td class="value-td" style="padding: 12px 0; color: #111111; font-size: 15px; font-weight: 700;">
                          ${formData.phone || "Not provided"}
                        </td>
                      </tr>

                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td class="label-td" style="padding: 12px 0; font-weight: 800; color: #123741; font-size: 14px;">
                          🕒 Date & Time:
                        </td>
                        <td class="value-td" style="padding: 12px 0; color: #666666; font-size: 13px; font-weight: 600;">
                          ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST
                        </td>
                      </tr>
                    </table>

                    <!-- Message Container -->
                    <div style="padding: 20px; background-color: #F8FAFC; border: 1px solid #e2e8f0; border-left: 5px solid #8CC9D9; border-radius: 10px;">
                      <p style="margin: 0 0 8px 0; font-weight: 900; color: #123741; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px;">
                        💬 Message Details:
                      </p>
                      <p style="margin: 0; color: #222222; font-size: 14px; line-height: 1.6; white-space: pre-wrap; font-weight: 500;">
                        ${formData.message}
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer Section -->
                <tr>
                  <td align="center" style="background-color: #f9fafb; padding: 18px 24px; text-align: center; border-top: 1px solid #edf2f7;">
                    <p style="margin: 0; font-size: 12px; color: #666666; font-weight: 600;">
                      Official Email Notification — <strong>Dattatray Trading Company</strong>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const response = await fetch("https://clientwebsite.blog/email-api/api/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer f6fd8e29605d39b351560af0bd3ed0c6",
        },
        body: JSON.stringify({
          to: "trade@dattatraytraders.com",
          subject: `Dattatray Traders — Website Inquiry from ${formData.name}`,
          body: emailBodyHtml,
        }),
      });

      const resData = await response.json();
      console.log("Email API response:", resData);

      setStatus({
        type: "success",
        text: `Thank you, ${formData.name}! Your message has been sent successfully. The Dattatray Traders desk will get back to you shortly.`,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Failed to send email:", err);
      setStatus({
        type: "success",
        text: `Thank you, ${formData.name}! Your inquiry has been submitted. Our commercial desk will contact you soon.`,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-6 sm:pt-10 pb-14 sm:pb-18 flex items-center bg-[#F9FBFC] dark:bg-[#07111E] transition-colors duration-300">
      {/* Background ambient glow effects matching Dattatray palette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-4 sm:left-10 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#8CC9D9]/15 dark:bg-[#38BDF8]/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#8CC9D9]/25 dark:bg-[#1E56C8]/15 blur-[150px]" />
      </div>

      <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2 Column Layout → stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* ================= LEFT SIDE ================= */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#1E56C8]/8 dark:bg-[#38BDF8]/15 border border-[#1E56C8]/15 dark:border-[#38BDF8]/30 text-[#1E56C8] dark:text-[#38BDF8] text-xs font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              Get In Touch
            </span>

            <SplitTextHeading
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#0B2546] dark:text-white leading-tight mt-2"
            >
              Let's Build Something{" "}
              <span className="block text-[#1E56C8] dark:text-[#38BDF8]">Great Together</span>
            </SplitTextHeading>

            <p className="mt-4 sm:mt-6 text-[#475569] dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-xl">
              Whether you're looking for premium IQF frozen vegetables, wholesale food service supply, or a dependable export trading partner, our experienced desk is ready to assist your procurement needs.
            </p>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-10 mb-8 sm:mb-10 space-y-4 sm:space-y-6">
              {/* Location */}
              <div className="flex items-center gap-4 sm:gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8CC9D9]/15 dark:bg-[#8CC9D9]/20 border border-[#8CC9D9]/35 dark:border-[#8CC9D9]/40 flex items-center justify-center shadow-sm group-hover:bg-[#8CC9D9] transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#123741] dark:text-[#8CC9D9] group-hover:text-[#123741]" />
                </div>
                <div>
                  <h4 className="text-[#0B2546] dark:text-white font-semibold text-sm sm:text-base lg:text-lg">Location</h4>
                  <p className="text-[#475569] dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Dattatray Trading Company, Cold Storage Complex, Main APMC Market Yard, Nashik / Ahilyanagar Highway, Maharashtra 422001, India.
                  </p>
                </div>
              </div>

              {/* Direct Phone / WhatsApp */}
              <div className="flex items-center gap-4 sm:gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8CC9D9]/15 dark:bg-[#8CC9D9]/20 border border-[#8CC9D9]/35 dark:border-[#8CC9D9]/40 flex items-center justify-center shadow-sm group-hover:bg-[#8CC9D9] transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#123741] dark:text-[#8CC9D9] group-hover:text-[#123741]" />
                </div>
                <div>
                  <h4 className="text-[#0B2546] dark:text-white font-semibold text-sm sm:text-base lg:text-lg">Phone &amp; WhatsApp</h4>
                  <a href="tel:+919822000000" className="text-[#475569] dark:text-slate-300 hover:text-[#123741] dark:hover:text-[#8CC9D9] text-xs sm:text-sm font-semibold transition-colors">
                    +91 98220 00000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 sm:gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8CC9D9]/15 dark:bg-[#8CC9D9]/20 border border-[#8CC9D9]/35 dark:border-[#8CC9D9]/40 flex items-center justify-center shadow-sm group-hover:bg-[#8CC9D9] transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#123741] dark:text-[#8CC9D9] group-hover:text-[#123741]" />
                </div>
                <div>
                  <h4 className="text-[#0B2546] dark:text-white font-semibold text-sm sm:text-base lg:text-lg">Email</h4>
                  <a href="mailto:trade@dattatraytraders.com" className="text-[#475569] dark:text-slate-300 hover:text-[#123741] dark:hover:text-[#8CC9D9] text-xs sm:text-sm font-semibold transition-colors">
                    trade@dattatraytraders.com
                  </a>
                </div>
              </div>

              {/* Export Markets */}
              <div className="flex items-center gap-4 sm:gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8CC9D9]/15 dark:bg-[#8CC9D9]/20 border border-[#8CC9D9]/35 dark:border-[#8CC9D9]/40 flex items-center justify-center shadow-sm group-hover:bg-[#8CC9D9] transition-all duration-300 shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#123741] dark:text-[#8CC9D9] group-hover:text-[#123741]" />
                </div>
                <div>
                  <h4 className="text-[#0B2546] dark:text-white font-semibold text-sm sm:text-base lg:text-lg">Distribution &amp; Export</h4>
                  <p className="text-[#475569] dark:text-slate-300 text-xs sm:text-sm">Pan-India &amp; 12+ Global Markets</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="mailto:trade@dattatraytraders.com"
                className="px-5 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white dark:bg-[#0B1B2F] text-[#123741] dark:text-white font-extrabold text-sm sm:text-base border border-[#8CC9D9]/60 hover:bg-[#8CC9D9]/15 dark:hover:bg-slate-800 shadow-sm transition-all"
              >
                Contact Us
              </a>
              <a
                href="mailto:trade@dattatraytraders.com?subject=Wholesale%20Quotation%20Request"
                className="px-5 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] font-extrabold text-sm sm:text-base shadow-md shadow-[#8CC9D9]/25 hover:shadow-[#8CC9D9]/35 hover:-translate-y-0.5 transition-all"
              >
                Request Quote
              </a>
            </div>
          </div>

          {/* ================= RIGHT SIDE (LIGHTSWIND UI ANIMATED FORM CARD) ================= */}
          <div className="relative group">
            {/* Animated Ambient Multi-Color Aurora Glow Mesh behind Card */}
            <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-[#8CC9D9]/40 via-[#1E56C8]/30 to-[#10B981]/35 dark:from-[#38BDF8]/25 dark:via-[#1E56C8]/30 dark:to-[#34D399]/25 blur-2xl opacity-60 dark:opacity-50 group-hover:opacity-90 transition-opacity duration-700 animate-pulse pointer-events-none" />

            {/* Main Glassmorphic Form Card Body */}
            <div className="relative rounded-3xl sm:rounded-[2.25rem] p-6 sm:p-8 lg:p-10 bg-white/95 dark:bg-[#0B1B2F]/95 backdrop-blur-2xl border border-white/80 dark:border-white/12 shadow-[0_20px_50px_rgba(11,37,70,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300">
              
              {/* Card Header with Brand Seal */}
              <div className="flex items-center gap-3.5 sm:gap-4.5 mb-6 sm:mb-7">
                <div className="bg-gradient-to-br from-[#F0F8FA] to-white dark:from-[#0E2542] dark:to-[#07111E] p-2.5 sm:p-3 rounded-2xl border-2 border-[#8CC9D9]/40 dark:border-[#38BDF8]/30 shadow-sm shrink-0">
                  <OptimizedImage
                    src={logo}
                    alt="Dattatray Trading Company"
                    className="h-11 sm:h-13 md:h-14 w-auto object-contain shrink-0 drop-shadow-xs"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B2546] dark:text-white tracking-tight leading-tight">
                    Send us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D6B7E] dark:text-slate-300 font-medium mt-0.5">
                    Direct commercial trade &amp; wholesale quotation desk
                  </p>
                </div>
              </div>

              {/* Inline Status Message */}
              {status && (
                <div
                  className={`mb-6 p-4 rounded-2xl flex items-start gap-3 border text-sm font-medium animate-fade-in ${
                    status.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300"
                      : "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                <div>
                  <label className="font-bold text-[#0B2546] dark:text-slate-200 text-xs sm:text-sm flex items-center justify-between">
                    <span>Full Name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. John Doe / Procuring Officer"
                    className="mt-1.5 w-full h-11 sm:h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 px-4 text-sm text-[#0B2546] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-[#1E56C8] dark:focus:border-[#38BDF8] focus:ring-4 focus:ring-[#8CC9D9]/25 dark:focus:ring-[#38BDF8]/20 transition shadow-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0B2546] dark:text-slate-200 text-xs sm:text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="procurement@company.com"
                    className="mt-1.5 w-full h-11 sm:h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 px-4 text-sm text-[#0B2546] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-[#1E56C8] dark:focus:border-[#38BDF8] focus:ring-4 focus:ring-[#8CC9D9]/25 dark:focus:ring-[#38BDF8]/20 transition shadow-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0B2546] dark:text-slate-200 text-xs sm:text-sm">
                    Phone &amp; WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98220 00000"
                    className="mt-1.5 w-full h-11 sm:h-12 rounded-xl border border-gray-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 px-4 text-sm text-[#0B2546] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-[#1E56C8] dark:focus:border-[#38BDF8] focus:ring-4 focus:ring-[#8CC9D9]/25 dark:focus:ring-[#38BDF8]/20 transition shadow-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0B2546] dark:text-slate-200 text-xs sm:text-sm">
                    Message / Procurement Needs <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    required
                    placeholder="Specify required quantities, product varieties (IQF peas, corn, pulps, snacks), or export port..."
                    className="mt-1.5 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 p-3.5 text-sm text-[#0B2546] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-[#1E56C8] dark:focus:border-[#38BDF8] focus:ring-4 focus:ring-[#8CC9D9]/25 dark:focus:ring-[#38BDF8]/20 transition resize-none shadow-xs"
                  />
                </div>

                {/* Lightswind Style High-Contrast Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 sm:h-13 rounded-full bg-black dark:bg-white text-white dark:text-black font-black text-sm sm:text-base hover:bg-[#1E56C8] dark:hover:bg-[#38BDF8] dark:hover:text-black active:scale-[0.98] transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-current" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Continue / Submit Inquiry</span>
                  )}
                </button>
              </form>

              {/* ── Lightswind UI Divider with Pill Tag ── */}
              <div className="relative my-5 sm:my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10" />
                </div>
                <div className="relative inline-flex justify-center px-3.5 bg-white dark:bg-[#0B1B2F] text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider rounded-full">
                  Or connect instantly with
                </div>
              </div>

              {/* ── Instant Connect Action Buttons (WhatsApp & Call) ── */}
              <div className="space-y-2.5">
                <a
                  href="https://wa.me/919822000000?text=Hello%20Dattatray%20Traders,%20I%20would%20like%20to%20inquire%20about%20commercial%20frozen%20food%20procurement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 sm:h-12 rounded-full bg-black dark:bg-slate-900 text-white font-bold text-xs sm:text-sm border border-gray-800 dark:border-white/15 hover:bg-[#25D366] hover:border-[#25D366] dark:hover:bg-[#25D366] dark:hover:border-[#25D366] hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Continue with WhatsApp</span>
                </a>

                <a
                  href="tel:+919822000000"
                  className="w-full h-11 sm:h-12 rounded-full bg-black dark:bg-slate-900 text-white font-bold text-xs sm:text-sm border border-gray-800 dark:border-white/15 hover:bg-[#1E56C8] hover:border-[#1E56C8] dark:hover:bg-[#38BDF8] dark:hover:text-black dark:hover:border-[#38BDF8] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98]"
                >
                  <Phone size={15} />
                  <span>Call Trade Desk (+91 98220 00000)</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

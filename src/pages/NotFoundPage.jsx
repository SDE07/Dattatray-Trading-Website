import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] bg-[#F9FBFC] flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#E8EEF0] text-[#0B2546] flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
          404
        </div>
        <h1 className="text-3xl font-black text-[#0B2546]">Commodity Page Not Found</h1>
        <p className="text-sm text-[#5D6B7E] leading-relaxed">
          The requested market route or catalog module does not exist or has been relocated to another trading division.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2546] hover:bg-[#1E56C8] text-white font-bold text-xs transition-colors shadow-md"
          >
            <Home size={14} />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8CC9D9] hover:bg-[#78B9C9] text-[#123741] font-bold text-xs transition-colors"
          >
            <span>View Commodities</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

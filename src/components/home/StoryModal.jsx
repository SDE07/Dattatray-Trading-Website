import React from "react";
import { Link } from "react-router-dom";
import { X, Play, ArrowUpRight } from "lucide-react";

/**
 * StoryModal: Accessible video modal dialog for 'From Farm to Freezer'.
 */
export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white dark:bg-[#0E1B15] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-emerald-600/20 dark:border-white/15 shadow-2xl transition-colors duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F9FBFC] dark:bg-white/10 border border-[#E8EEF0] dark:border-white/10 flex items-center justify-center text-[#5D6B7E] dark:text-slate-300 hover:text-emerald-600 dark:hover:text-[#34D399] hover:bg-[#E8EEF0] dark:hover:bg-white/15 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#021A13] dark:bg-[#059669] text-[#D4AF37] dark:text-white flex items-center justify-center">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
              Dattatray Traders Film
            </span>
            <h3 className="text-lg font-black text-[#1F2937] dark:text-white">
              From Farm to Freezer
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#5D6B7E] dark:text-slate-300 leading-relaxed mb-4">
          Discover how Dattatray Traders bridges modern agricultural produce with world-class Individual Quick Freezing (IQF) technology. From harvest in rich fertile belts to sub-zero cold rooms within 4 hours, our integrated cold-chain ensures zero nutritional loss, natural color, and maximum crunch.
        </p>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F9FBFC] dark:bg-[#06100B] border border-[#E8EEF0] dark:border-white/10 mb-6">
          <div className="text-center p-2">
            <div className="text-xl font-black text-[#0B2546] dark:text-white">4 Hours</div>
            <div className="text-[11px] text-[#5D6B7E] dark:text-slate-400">Harvest to IQF Lock-in</div>
          </div>
          <div className="text-center p-2">
            <div className="text-xl font-black text-[#0B2546] dark:text-white">100% Pure</div>
            <div className="text-[11px] text-[#5D6B7E] dark:text-slate-400">Zero Preservatives Added</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#BFD2DC] dark:border-white/20 text-xs font-bold text-[#5D6B7E] dark:text-slate-300 hover:text-[#0B2546] dark:hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <Link
            to="/about"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E56C8] hover:bg-[#1546AA] text-white text-xs font-bold transition-colors"
          >
            Read Full Story
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

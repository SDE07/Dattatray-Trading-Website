import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

/**
 * Senior Production ErrorBoundary
 * Handles:
 * 1. Runtime component crashes with graceful fallback UI instead of a blank white screen
 * 2. Stale Vite deployment chunks ("Failed to fetch dynamically imported module") with automatic single-pass reload recovery
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);

    // Auto-recover from stale dynamic module chunks upon deployments
    const isChunkError =
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("error loading dynamically imported module");

    if (isChunkError && !sessionStorage.getItem("chunk_retry_reload")) {
      sessionStorage.setItem("chunk_retry_reload", "1");
      window.location.reload();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReload = () => {
    sessionStorage.removeItem("chunk_retry_reload");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white dark:bg-[#0E1B15] border border-emerald-500/20 shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-[#34D399]">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white">
              Temporary Render Notice
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We encountered a slight display glitch while loading this module. Click below to reload smoothly.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

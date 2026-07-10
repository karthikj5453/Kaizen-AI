"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)" }}>
          <AlertCircle className="w-8 h-8 text-[#F87171]" />
        </div>

        <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-faint)] mb-3">
          Error
        </div>
        <h1 className="text-[28px] font-bold tracking-tight mb-3">Something went wrong</h1>
        <p className="text-[15px] text-[var(--text-muted)] leading-[1.8] mb-8">
          {error.message || "An unexpected error occurred. Our team has been notified."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="btn btn-primary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <a href="/" className="btn btn-ghost flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}

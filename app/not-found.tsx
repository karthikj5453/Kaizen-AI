"use client";

import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        {/* 404 number */}
        <div
          className="text-[100px] sm:text-[140px] font-black leading-none mb-4 gradient-purple select-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          404
        </div>

        <div className="kanji text-[32px] opacity-10 mb-4 leading-none">改善</div>

        <h1 className="text-[28px] font-bold tracking-tight mb-3">Page Not Found</h1>
        <p className="text-[15px] text-[var(--text-muted)] leading-[1.8] mb-8">
          This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="btn btn-primary flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
          <button
            onClick={() => router.push("/onboarding")}
            className="btn btn-ghost flex items-center gap-2"
          >
            Start Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </main>
  );
}

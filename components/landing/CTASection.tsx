"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="py-[120px] relative overflow-hidden bg-[#09090B]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,92,246,0.05)_100%)]" />
      
      <div className="container-prose relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#18181B] to-[#111114] border border-white/10 rounded-[32px] p-[64px] text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8B5CF6] opacity-[0.15] blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-[40px] font-bold text-[#FAFAFA] mb-[24px] tracking-tight relative z-10">
            Stop guessing your skill gaps.
          </h2>
          <p className="text-[18px] text-[#A1A1AA] mb-[48px] max-w-[480px] mx-auto relative z-10">
            Join thousands of engineers who used Kaizen AI to find their baseline and land their next role.
          </p>
          
          <button
            onClick={() => router.push("/onboarding")}
            className="group relative inline-flex items-center justify-center gap-2 px-[32px] py-[16px] bg-[#FAFAFA] text-[#09090B] rounded-[16px] font-semibold text-[16px] transition-transform hover:scale-105 active:scale-95 z-10 overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1),transparent)] group-hover:animate-[shimmer_1.5s_infinite]" />
            
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export function PlatformFailSection() {
  const comparisons = [
    { name: "LeetCode Premium", fails: "Only gives you problems, not a path.", icon: "L" },
    { name: "HackerRank AI", fails: "Ranks you against others instead of yourself.", icon: "H" },
    { name: "Coursera Skills", fails: "Static curriculum that doesn't adapt to you.", icon: "C" },
  ];

  return (
    <section className="section-spacing relative bg-[#0D0D10]">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            The Industry Standard
          </h2>
          <h3 className="text-section">
            Why current platforms fail you.
          </h3>
        </motion.div>

        <div className="flex flex-col gap-[16px] max-w-[640px] mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-[24px] p-[24px] rounded-[16px] border border-white/5 bg-[#111114]"
            >
              <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#71717A]">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-medium text-[#FAFAFA]">{item.name}</h4>
                <p className="text-[14px] text-[#A1A1AA]">{item.fails}</p>
              </div>
              <X className="w-5 h-5 text-[#EF4444] opacity-50 shrink-0" />
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-[24px] p-[24px] rounded-[16px] border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 relative overflow-hidden mt-[16px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/0 to-[#8B5CF6]/10 pointer-events-none" />
            <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center font-bold text-[#C084FC]">
              K
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="text-[16px] font-medium text-[#FAFAFA]">Kaizen AI</h4>
              <p className="text-[14px] text-[#D4D4D8]">Evaluates, adapts, and builds a personalized roadmap.</p>
            </div>
            <Check className="w-5 h-5 text-[#10B981] shrink-0 relative z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

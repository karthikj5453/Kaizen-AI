"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code2, Rocket } from "lucide-react";

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const phases = [
    {
      title: "Phase 1: Foundation",
      duration: "2 weeks",
      icon: BookOpen,
      desc: "Strengthen your core knowledge in React rendering cycles and closures.",
    },
    {
      title: "Phase 2: Application",
      duration: "3 weeks",
      icon: Code2,
      desc: "Build two micro-projects focusing on custom hooks and context optimization.",
    },
    {
      title: "Phase 3: Mastery",
      duration: "1 week",
      icon: Rocket,
      desc: "Mock interviews and advanced system design patterns for frontend architecture.",
    },
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
            The Roadmap
          </h2>
          <h3 className="text-section">
            Your personalized path <br className="hidden sm:block" />
            to mastery.
          </h3>
        </motion.div>

        <div ref={containerRef} className="relative max-w-[600px] mx-auto pb-[40px]">
          {/* Timeline background */}
          <div className="absolute left-[24px] top-[24px] bottom-0 w-[2px] bg-white/5" />
          
          {/* Animated Timeline */}
          <motion.div
            className="absolute left-[24px] top-[24px] w-[2px] bg-[#8B5CF6] origin-top"
            style={{ 
              scaleY: scrollYProgress,
              boxShadow: "0 0 12px rgba(139,92,246,0.8)"
            }}
          />

          <div className="flex flex-col gap-[48px]">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="relative pl-[64px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-[16px] top-[4px] w-[18px] h-[18px] rounded-full bg-[#18181B] border-2 border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.5)] z-10"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#111114] border border-white/10 rounded-[16px] p-[24px]"
                  >
                    <div className="flex items-center justify-between mb-[12px]">
                      <h4 className="text-[18px] font-bold text-[#FAFAFA] flex items-center gap-2">
                        <Icon className="w-5 h-5 text-[#8B5CF6]" />
                        {phase.title}
                      </h4>
                      <span className="text-[12px] font-mono text-[#A1A1AA] bg-white/5 px-2 py-1 rounded">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-[15px] text-[#A1A1AA]">
                      {phase.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { User, Target, Map } from "lucide-react";
import { useRef } from "react";

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const steps = [
    {
      icon: User,
      title: "Tell us about yourself",
      description: "Define your current experience level, target role, and the skill domains you want to master.",
    },
    {
      icon: Target,
      title: "Take the adaptive assessment",
      description: "Answer AI-generated questions and write code. The difficulty adjusts in real-time based on your responses.",
    },
    {
      icon: Map,
      title: "Get your personalized roadmap",
      description: "Receive a detailed breakdown of your skill gaps and a step-by-step curriculum to reach your goals.",
    },
  ];

  return (
    <section id="how-it-works" className="section-spacing relative bg-[#0D0D10]">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            How It Works
          </h2>
          <h3 className="text-section">
            From gaps to mastery <br className="hidden sm:block" />
            in 3 simple steps.
          </h3>
        </motion.div>

        <div ref={containerRef} className="relative max-w-[600px] mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-[39px] top-[40px] bottom-[40px] w-[2px] bg-white/5" />
          
          {/* Animated active line */}
          <motion.div
            className="absolute left-[39px] top-[40px] w-[2px] bg-[#8B5CF6] origin-top"
            style={{ 
              scaleY: scrollYProgress,
              bottom: "40px",
              boxShadow: "0 0 12px rgba(139,92,246,0.8)"
            }}
          />

          <div className="flex flex-col gap-[64px]">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex gap-[48px] items-start">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5, backgroundColor: "#18181B", borderColor: "rgba(255,255,255,0.1)" }}
                    whileInView={{ scale: 1, opacity: 1, backgroundColor: "#111114", borderColor: "rgba(139,92,246,0.5)" }}
                    viewport={{ once: false, margin: "-200px" }}
                    transition={{ duration: 0.4 }}
                    className="w-[80px] h-[80px] shrink-0 rounded-full border-[2px] flex items-center justify-center relative z-10 shadow-xl"
                  >
                    <Icon className="w-8 h-8 text-[#FAFAFA]" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-200px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="pt-[16px]"
                  >
                    <div className="text-[14px] font-mono text-[#8B5CF6] mb-[8px]">
                      Step {index + 1}
                    </div>
                    <h4 className="text-[24px] font-bold text-[#FAFAFA] mb-[12px]">
                      {step.title}
                    </h4>
                    <p className="text-[16px] text-[#A1A1AA] leading-relaxed">
                      {step.description}
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

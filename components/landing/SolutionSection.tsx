"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Compass, Zap } from "lucide-react";

export function SolutionSection() {
  const differentiators = [
    {
      icon: BrainCircuit,
      title: "Multi-Agent System",
      description: "Instead of a simple script, 8 specialized AI agents analyze your profile, generate questions, evaluate code, and plan your roadmap.",
    },
    {
      icon: Zap,
      title: "Real-Time Adaptation",
      description: "The difficulty adjusts dynamically based on your confidence and performance, ensuring we find your exact skill boundaries.",
    },
    {
      icon: Compass,
      title: "Actionable Roadmap",
      description: "You don't just get a score. You get a personalized, phased learning path with specific resources to close your gaps.",
    },
  ];

  return (
    <section className="section-spacing relative">
      {/* Soft radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6] opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="container-prose relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[14px] text-[#C084FC] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            Our Solution
          </h2>
          <h3 className="text-section mb-[32px]">
            Intelligence that adapts <br className="hidden sm:block" />
            to your exact level.
          </h3>
          <p className="text-subtitle max-w-[600px] mx-auto mb-[80px]">
            Kaizen AI mimics the experience of a senior engineer interviewing you—probing your weaknesses, acknowledging your strengths, and giving you actionable feedback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] text-left">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-[16px]"
              >
                <div className="w-[48px] h-[48px] rounded-[16px] bg-[#18181B] border border-white/10 flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#FAFAFA]">
                  {diff.title}
                </h4>
                <p className="text-[15px] text-[#A1A1AA] leading-relaxed">
                  {diff.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

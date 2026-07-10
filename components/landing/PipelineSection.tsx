"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserCircle2, BrainCircuit, ListChecks, Zap, Target, BarChart3, LineChart, Map } from "lucide-react";

export function PipelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const agents = [
    { name: "Profile", icon: UserCircle2 },
    { name: "Knowledge", icon: BrainCircuit },
    { name: "Planning", icon: ListChecks },
    { name: "Generation", icon: Zap },
    { name: "Adaptive", icon: Target },
    { name: "Evaluation", icon: BarChart3 },
    { name: "Analytics", icon: LineChart },
    { name: "Roadmap", icon: Map },
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container-max text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            Interactive Pipeline
          </h2>
          <h3 className="text-section">
            Watch the agents work <br className="hidden sm:block" />
            in real-time.
          </h3>
        </motion.div>

        <div ref={containerRef} className="relative py-[40px] overflow-hidden">
          {/* Base pipeline track */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2" />
          
          {/* Active pipeline track (driven by scroll) */}
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] bg-[#8B5CF6] -translate-y-1/2 origin-left"
            style={{ 
              scaleX: scrollYProgress,
              boxShadow: "0 0 20px rgba(139,92,246,0.6)"
            }}
          />

          <div className="flex justify-between items-center relative z-10 w-full overflow-x-auto hide-scrollbar px-[20px] md:px-[60px] pb-[40px] pt-[20px]">
            {agents.map((agent, i) => {
              const Icon = agent.icon;
              // Each agent lights up when scroll reaches its relative position
              const startPoint = i / (agents.length - 1) - 0.1;
              const endPoint = i / (agents.length - 1);
              
              const opacity = useTransform(scrollYProgress, [startPoint, endPoint], [0.3, 1]);
              const scale = useTransform(scrollYProgress, [startPoint, endPoint], [0.8, 1]);
              const borderColor = useTransform(scrollYProgress, [startPoint, endPoint], ["rgba(255,255,255,0.1)", "rgba(139,92,246,1)"]);
              const bg = useTransform(scrollYProgress, [startPoint, endPoint], ["#18181B", "#8B5CF6"]);
              const textColor = useTransform(scrollYProgress, [startPoint, endPoint], ["#71717A", "#FAFAFA"]);

              return (
                <div key={i} className="flex flex-col items-center gap-[16px] min-w-[80px]">
                  <motion.div
                    className="w-[48px] h-[48px] rounded-full flex items-center justify-center border-[2px] shadow-lg relative bg-[#18181B]"
                    style={{
                      opacity,
                      scale,
                      borderColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    
                    {/* Inner glowing dot */}
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{ backgroundColor: bg }}
                    />
                  </motion.div>
                  <motion.span
                    className="text-[12px] font-mono tracking-wider font-medium"
                    style={{ color: textColor }}
                  >
                    {agent.name}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

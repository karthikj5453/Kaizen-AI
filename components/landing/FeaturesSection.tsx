"use client";

import { motion } from "framer-motion";
import { Activity, Target, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FeaturesSection() {
  const features = [
    {
      title: "Real-time difficulty scaling",
      description: "Our Adaptive Agent monitors your confidence and accuracy. If you're breezing through, it scales up the complexity to find your true ceiling. If you stumble, it scales down to find your foundation.",
      icon: Activity,
      align: "left",
      mockup: (
        <div className="w-full h-full bg-[#18181B] rounded-[16px] border border-white/5 p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(139,92,246,0.1)_50%,transparent_100%)] translate-x-[-100%] animate-[shimmer_2s_infinite]" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] text-[#A1A1AA] font-mono">Difficulty Level</span>
            <span className="text-[12px] text-[#8B5CF6] font-mono border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2 py-0.5 rounded">Scaling ↑</span>
          </div>
          <div className="space-y-3">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: "30%" }} whileInView={{ width: "75%" }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-[#71717A]">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Context-aware code evaluation",
      description: "Don't just get a pass/fail on your code. The Evaluation Agent reads your logic, identifies edge cases you missed, and explains the time/space complexity of your approach.",
      icon: ShieldCheck,
      align: "right",
      mockup: (
        <div className="w-full h-full bg-[#18181B] rounded-[16px] border border-white/5 p-6 font-mono text-[12px] leading-relaxed">
          <div className="text-[#FAFAFA] mb-2"><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{'}</div>
          <div className="pl-4 text-[#A1A1AA]">
            const map = new Map();<br/>
            for (let i = 0; i {'<'} nums.length; i++) {'{'}...{'}'}
          </div>
          <div className="text-[#FAFAFA] mt-2">{'}'}</div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            ✓ O(n) time complexity achieved. Excellent use of HashMap for single-pass lookup.
          </motion.div>
        </div>
      ),
    },
    {
      title: "Actionable skill gap roadmap",
      description: "Every assessment ends with a customized curriculum. We don't just tell you what you don't know—we tell you exactly what to read, build, and practice to learn it.",
      icon: Target,
      align: "left",
      mockup: (
        <div className="w-full h-full bg-[#18181B] rounded-[16px] border border-white/5 p-6 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[10px] text-[#C084FC]">{i}</div>
              <div className="flex-1 h-2 bg-white/10 rounded-full" />
            </motion.div>
          ))}
        </div>
      ),
    }
  ];

  return (
    <section id="features" className="section-spacing relative bg-[#09090B]">
      <div className="container-max">
        {features.map((feature, index) => {
          const isLeft = feature.align === "left";
          return (
            <div key={index} className={`flex flex-col gap-[48px] md:gap-[80px] items-center mb-[160px] last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex flex-col items-start"
              >
                <div className="w-[48px] h-[48px] rounded-[16px] bg-[#18181B] border border-white/10 flex items-center justify-center mb-[24px]">
                  <feature.icon className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <h3 className="text-[32px] font-bold text-[#FAFAFA] mb-[16px] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[18px] text-[#A1A1AA] leading-relaxed mb-[32px]">
                  {feature.description}
                </p>
                <Button variant="secondary">Learn more</Button>
              </motion.div>

              {/* Image/Mockup Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 w-full aspect-[4/3] max-w-[600px] rounded-[24px] bg-[#111114] border border-white/10 p-[16px] shadow-2xl"
              >
                {feature.mockup}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

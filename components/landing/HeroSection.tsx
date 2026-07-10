"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Activity, Code2, Play } from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-[160px] pb-[120px] overflow-hidden">
      {/* Subtle grid background only in hero */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVMMCAwbDM5LjUgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
      
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start gap-[32px] max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Badge variant="purple" className="mb-[24px]">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Kaizen AI 2.0 is live
              </Badge>
              <h1 className="text-hero mb-[24px]">
                Know your gaps. <br />
                <span className="gradient-text-purple">Close them faster.</span>
              </h1>
              <p className="text-subtitle">
                Eight specialized AI agents collaborate to evaluate your skills, adapt in real-time, and deliver a personalized roadmap to your next role.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-[16px]"
            >
              <Button size="lg" onClick={() => router.push("/onboarding")}>
                Start Free Assessment
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="secondary">
                <Play className="w-4 h-4 mr-1 fill-current" />
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
          >
            {/* The Premium Dashboard Mockup */}
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-[24px] bg-[#111114] border border-white/10 shadow-2xl overflow-hidden animate-float">
              {/* Fake Header */}
              <div className="h-[48px] border-b border-white/5 flex items-center px-[20px] gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              
              {/* Dashboard Content */}
              <div className="p-[24px] flex flex-col gap-[16px] h-full relative">
                <div className="flex justify-between items-end mb-[8px]">
                  <div>
                    <div className="text-[12px] text-[#71717A] uppercase tracking-wider font-mono mb-[4px]">Overall Score</div>
                    <div className="text-[40px] font-bold leading-none tracking-tight">84<span className="text-[24px] text-[#71717A]">/100</span></div>
                  </div>
                  <Badge variant="success">Top 15%</Badge>
                </div>

                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="bg-white/5 rounded-[12px] p-[16px] border border-white/5">
                    <Activity className="w-5 h-5 text-[#8B5CF6] mb-[12px]" />
                    <div className="text-[14px] text-[#D4D4D8] mb-[4px]">System Design</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-[8px]">
                      <div className="bg-[#8B5CF6] h-1.5 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-[12px] p-[16px] border border-white/5">
                    <Code2 className="w-5 h-5 text-[#3B82F6] mb-[12px]" />
                    <div className="text-[14px] text-[#D4D4D8] mb-[4px]">Algorithms</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-[8px]">
                      <div className="bg-[#3B82F6] h-1.5 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>

                {/* Agent Activity Log overlay */}
                <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-[#18181B]/80 backdrop-blur-md border border-white/10 rounded-[16px] p-[16px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#C084FC]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-[#FAFAFA]">Roadmap Agent</div>
                      <div className="text-[12px] text-[#A1A1AA]">Generating personalized learning path...</div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Glow effect behind dashboard */}
              <div className="absolute -inset-[100px] bg-[#8B5CF6] opacity-[0.15] blur-[100px] -z-10 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

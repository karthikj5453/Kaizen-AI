"use client";

import { motion } from "framer-motion";
import { XCircle, Clock, Target } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: XCircle,
      title: "Generic Question Banks",
      description: "Standard coding tests offer the same questions to everyone, leading to memorization rather than actual skill demonstration.",
    },
    {
      icon: Clock,
      title: "Static Difficulty",
      description: "If you fail an early question, traditional platforms don't adapt. You just fail the test without revealing your actual baseline.",
    },
    {
      icon: Target,
      title: "Zero Actionable Feedback",
      description: "A pass/fail grade tells you nothing. You need to know exactly why you failed, where your gaps are, and what to study next.",
    },
  ];

  return (
    <section className="section-spacing relative">
      <div className="container-prose text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            The Problem
          </h2>
          <h3 className="text-section mb-[32px]">
            Static tests don't reveal <br className="hidden sm:block" />
            your true gaps.
          </h3>
          <p className="text-subtitle max-w-[600px] mx-auto mb-[80px]">
            HackerRank gives you a leaderboard. LeetCode gives you problems. But neither tells you <em>why</em> you failed, <em>where exactly</em> you're behind, or <em>what to do next</em>.
          </p>
        </motion.div>

        <div className="flex flex-col gap-[32px] text-left max-w-[500px] mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-[24px]"
              >
                <div className="w-[48px] h-[48px] shrink-0 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#71717A]" />
                </div>
                <div>
                  <h4 className="text-[18px] font-semibold text-[#FAFAFA] mb-[8px]">
                    {problem.title}
                  </h4>
                  <p className="text-[15px] text-[#A1A1AA] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

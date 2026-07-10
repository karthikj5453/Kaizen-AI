"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, ListChecks, Target, LineChart, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const allAgents = [
  { name: "Knowledge Agent", icon: BrainCircuit, desc: "Retrieves context-specific domain knowledge and formulates core question concepts based on your profile." },
  { name: "Planning Agent", icon: ListChecks, desc: "Structures the assessment flow and determines the optimal sequence of topics to test." },
  { name: "Adaptive Agent", icon: Target, desc: "Monitors your real-time performance and adjusts the difficulty of the next question dynamically." },
  { name: "Analytics Agent", icon: LineChart, desc: "Processes all your answers to calculate your overall score and identify specific skill gaps." },
  { name: "Profile Agent", icon: BrainCircuit, desc: "Analyzes your initial input to build a baseline understanding of your experience level." },
  { name: "Generation Agent", icon: ListChecks, desc: "Drafts the actual question text, code snippets, and multiple choice options." },
  { name: "Evaluation Agent", icon: Target, desc: "Grades your answers and provides immediate, actionable feedback on why you were right or wrong." },
  { name: "Roadmap Agent", icon: LineChart, desc: "Synthesizes all data to generate your personalized, multi-phase learning curriculum." },
];

export function AgentsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const displayAgents = allAgents.slice(0, 4);

  return (
    <section id="agents" className="section-spacing relative">
      <div className="container-prose text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            The Architecture
          </h2>
          <h3 className="text-section">
            Meet the 8 AI Agents.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] mb-[48px]">
          {displayAgents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111114] border border-white/10 p-[32px] rounded-[24px] text-left hover:bg-[#141418] hover:border-white/20 transition-colors shadow-lg group"
              >
                <div className="w-[48px] h-[48px] rounded-[12px] bg-[#18181B] border border-white/5 flex items-center justify-center mb-[24px] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors" />
                </div>
                <h4 className="text-[18px] font-bold text-[#FAFAFA] mb-[12px]">
                  {agent.name}
                </h4>
                <p className="text-[14px] text-[#A1A1AA] leading-relaxed">
                  {agent.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            View all 8 agents
          </Button>
        </motion.div>
      </div>

      {/* Agents Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#09090B]/80 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[800px] bg-[#111114] border border-white/10 rounded-[24px] shadow-2xl p-[32px] md:p-[48px] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-[24px] right-[24px] p-2 text-[#71717A] hover:text-[#FAFAFA] transition-colors bg-[#18181B] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-[32px] font-bold mb-[40px]">All 8 AI Agents</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                {allAgents.map((agent, i) => {
                  const Icon = agent.icon;
                  return (
                    <div key={i} className="flex gap-[16px]">
                      <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-[#18181B] border border-white/5 flex items-center justify-center mt-1">
                        <Icon className="w-5 h-5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-semibold text-[#FAFAFA] mb-[4px]">{agent.name}</h4>
                        <p className="text-[14px] text-[#A1A1AA] leading-relaxed">{agent.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the adaptive difficulty work?",
      a: "Our Adaptive Agent constantly evaluates your confidence and accuracy. If you answer a medium question correctly and quickly, the next question will be harder. If you struggle, it scales down to isolate exactly where your knowledge gap begins.",
    },
    {
      q: "Can I use Kaizen AI to prepare for specific company interviews?",
      a: "Yes. During onboarding, you can specify your target role and company type. The Profile Agent will tailor the assessment to match the expected domain knowledge and difficulty of those interviews.",
    },
    {
      q: "How is code evaluated?",
      a: "We don't just run unit tests. The Evaluation Agent analyzes your code's time and space complexity, variable naming, edge case handling, and overall optimal approach, giving you feedback like a Senior Staff Engineer would.",
    },
    {
      q: "What programming languages are supported?",
      a: "Currently, we support JavaScript, TypeScript, Python, Java, C++, and Go for coding questions. System design and conceptual questions are language-agnostic.",
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
            FAQ
          </h2>
          <h3 className="text-section">
            Common questions.
          </h3>
        </motion.div>

        <div className="flex flex-col gap-[16px]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111114] border border-white/10 rounded-[16px] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-[24px] text-left hover:bg-[#141418] transition-colors"
                >
                  <span className="text-[16px] font-semibold text-[#FAFAFA] pr-[24px]">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#71717A] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-[24px] pb-[24px] pt-0 text-[15px] text-[#A1A1AA] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

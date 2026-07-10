"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "It literally felt like I was being interviewed by a Senior Staff Engineer at Google. It found gaps in my system design knowledge I didn't even know I had.",
      name: "David Chen",
      role: "Backend Engineer",
    },
    {
      quote: "The personalized roadmap is what sold me. Instead of just telling me I failed the distributed systems section, it gave me a 3-week plan to master it.",
      name: "Sarah Jenkins",
      role: "Full Stack Developer",
    },
    {
      quote: "I've used LeetCode for years, but Kaizen AI is different. It actually adapts. When I nailed the easy questions, it immediately pushed me to my limit.",
      name: "Marcus Thorne",
      role: "Frontend Architect",
    },
  ];

  return (
    <section className="section-spacing relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            Success Stories
          </h2>
          <h3 className="text-section">
            Engineers love Kaizen AI.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111114] border border-white/10 rounded-[24px] p-[32px] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-[24px]">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[16px] text-[#FAFAFA] leading-relaxed mb-[32px]">
                  "{test.quote}"
                </p>
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#FAFAFA]">{test.name}</div>
                <div className="text-[13px] text-[#A1A1AA]">{test.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

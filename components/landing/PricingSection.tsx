"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      desc: "For developers looking to find their baseline.",
      features: [
        "1 full adaptive assessment per month",
        "Basic skill gap analysis",
        "Community roadmap templates",
        "Standard difficulty scaling",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      desc: "For ambitious engineers actively preparing for interviews.",
      features: [
        "Unlimited adaptive assessments",
        "Deep context-aware code evaluation",
        "Personalized phase-by-phase roadmap",
        "Advanced difficulty scaling",
        "Exportable PDF reports",
      ],
      cta: "Start 7-Day Trial",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$99",
      period: "/seat/mo",
      desc: "For engineering managers building high-performing teams.",
      features: [
        "Everything in Pro",
        "Team skill heatmaps",
        "Aggregate gap analysis",
        "Custom domain assessments",
        "SSO & priority support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="section-spacing relative bg-[#09090B]">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[80px]"
        >
          <h2 className="text-[14px] text-[#71717A] uppercase tracking-[0.15em] font-semibold mb-[16px]">
            Simple Pricing
          </h2>
          <h3 className="text-section">
            Invest in your <br className="hidden sm:block" />
            engineering career.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] max-w-[1100px] mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-[#111114] rounded-[24px] p-[40px] relative ${
                plan.highlighted 
                  ? "border-2 border-[#8B5CF6] shadow-[0_0_40px_rgba(139,92,246,0.15)] md:-mt-[32px] md:-mb-[32px] z-10 bg-[#141418]" 
                  : "border border-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8B5CF6] text-white text-[12px] font-bold uppercase tracking-wider px-[16px] py-[4px] rounded-full">
                  Most Popular
                </div>
              )}
              
              <h4 className="text-[20px] font-semibold text-[#FAFAFA] mb-[8px]">{plan.name}</h4>
              <p className="text-[14px] text-[#A1A1AA] mb-[32px] min-h-[42px]">{plan.desc}</p>
              
              <div className="mb-[32px]">
                <span className="text-[48px] font-bold text-[#FAFAFA] tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-[16px] text-[#71717A] ml-[4px]">{plan.period}</span>}
              </div>
              
              <Button 
                variant={plan.highlighted ? "primary" : "secondary"} 
                className="w-full mb-[32px]"
              >
                {plan.cta}
              </Button>
              
              <div className="flex flex-col gap-[16px]">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-[12px]">
                    <div className="mt-1 w-[16px] h-[16px] shrink-0 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#C084FC]" />
                    </div>
                    <span className="text-[14px] text-[#D4D4D8]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

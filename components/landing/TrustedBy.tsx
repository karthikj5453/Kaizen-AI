"use client";

import { motion } from "framer-motion";

export function TrustedBy() {
  const logos = [
    { name: "AMD", src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg" },
    { name: "Llama", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Meta_AI_logo.svg/1024px-Meta_AI_logo.svg.png" },
    { name: "Next.js", src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
    { name: "Docker", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
    { name: "TypeScript", src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  ];

  return (
    <section className="border-t border-b border-white/5 bg-[#09090B]">
      <div className="container-max py-[48px] flex flex-col items-center">
        <p className="text-[14px] text-[#71717A] mb-[32px] font-medium tracking-wide">
          POWERED BY INDUSTRY-LEADING TECHNOLOGY
        </p>
        <div className="flex flex-wrap justify-center items-center gap-[48px] md:gap-[80px] opacity-60 grayscale">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-[24px] md:h-[32px] w-auto object-contain brightness-0 invert"
              />
            </motion.div>
          ))}
          {/* Fireworks AI (no good svg readily available, so text) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[20px] md:text-[24px] font-bold font-sans tracking-tighter"
          >
            Fireworks AI
          </motion.div>
        </div>
      </div>
    </section>
  );
}

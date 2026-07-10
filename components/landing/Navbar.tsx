"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, Search } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "#" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Agents", href: "#agents" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "h-[64px] glass-nav" : "h-[80px] bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-max h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111114] border border-white/10 flex items-center justify-center text-[18px] font-bold text-[#FAFAFA] group-hover:border-[#8B5CF6]/50 transition-colors">
                K
              </div>
              <span className="font-bold text-[16px] tracking-tight text-[#FAFAFA]">
                Kaizen AI
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[14px] font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors text-[13px] font-medium">
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded ml-2">
                <span className="text-[12px]">⌘</span>K
              </kbd>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/onboarding")}
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-[#A1A1AA] hover:text-[#FAFAFA]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#09090B]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="h-[80px] flex items-center justify-end px-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#A1A1AA] hover:text-[#FAFAFA]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[24px] font-semibold text-[#D4D4D8] hover:text-[#FAFAFA] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="primary"
                size="lg"
                className="mt-8"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/onboarding");
                }}
              >
                Get Started Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, User, Target, BookOpen, Rocket, ChevronRight, Activity, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const DOMAINS = [
  { id: "javascript",    label: "JavaScript / TypeScript", icon: "JS",   color: "#F7DF1E" },
  { id: "python",        label: "Python",                  icon: "Py",   color: "#3776AB" },
  { id: "react",         label: "React / Next.js",         icon: "Re",   color: "#61DAFB" },
  { id: "dsa",           label: "Data Structures & Algo",  icon: "DS",   color: "#A855F7" },
  { id: "system-design", label: "System Design",           icon: "SD",   color: "#3B82F6" },
  { id: "ml-ai",         label: "Machine Learning / AI",   icon: "ML",   color: "#EC4899" },
  { id: "cloud",         label: "Cloud / DevOps",          icon: "☁",    color: "#06B6D4" },
  { id: "database",      label: "Databases / SQL",         icon: "DB",   color: "#F97316" },
  { id: "backend",       label: "Backend / APIs",          icon: "API",  color: "#10B981" },
  { id: "data-science",  label: "Data Science",            icon: "📊",   color: "#6366F1" },
  { id: "mobile",        label: "Mobile (iOS/Android)",    icon: "📱",   color: "#14B8A6" },
  { id: "security",      label: "Cybersecurity",           icon: "🔒",   color: "#EF4444" },
];

const EXPERIENCE_LEVELS = [
  { id: "student", label: "Student / Fresher", desc: "0–1 years" },
  { id: "junior",  label: "Junior Developer",  desc: "1–3 years" },
  { id: "mid",     label: "Mid-Level Engineer", desc: "3–6 years" },
  { id: "senior",  label: "Senior Engineer",    desc: "6+ years" },
];

const MODELS = [
  {
    id: "gemma",
    name: "Gemma 2 9B",
    subtitle: "AMD GPU Accelerated",
    desc: "Fastest inference, optimized for AMD hardware",
    badge: "Recommended",
  },
  {
    id: "default",
    name: "Llama 3.1 70B",
    subtitle: "Max Intelligence",
    desc: "Best for complex system design & reasoning",
    badge: "Most Accurate",
  },
  {
    id: "qwen",
    name: "Qwen 2.5 Coder 32B",
    subtitle: "Code Specialist",
    desc: "Highest accuracy for algorithms & syntax",
    badge: "Best for Code",
  },
];

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface ProfileData {
  name: string;
  background: string;
  targetRole: string;
  experienceLevel: string;
  domains: string[];
  model: string;
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [data, setData] = useState<ProfileData>({
    name: "",
    background: "",
    targetRole: "",
    experienceLevel: "",
    domains: [],
    model: "gemma",
  });

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem("kaizenProfile");
    if (saved) {
      try { setData({ ...data, ...JSON.parse(saved) }); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("kaizenProfile", JSON.stringify(data));
    }
  }, [data, mounted]);

  const nextStep = () => {
    if (step < 4) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      handleLaunch();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    const launchSequence = [
      "Initializing Profile Agent...",
      "Analyzing background context...",
      "Configuring knowledge graphs...",
      "Connecting to Fireworks AI...",
      "Launching assessment environment...",
    ];
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < launchSequence.length) {
        setLaunchStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => router.push("/assessment"), 600);
      }
    }, 800);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const isStepValid = () => {
    if (step === 1) return data.name.trim().length > 0 && data.background.trim().length >= 20;
    if (step === 2) return data.targetRole.trim().length > 0 && data.experienceLevel !== "";
    if (step === 3) return data.domains.length > 0;
    return true;
  };

  /* ── 1. About You ── */
  const Step1 = () => (
    <div className="flex flex-col gap-[32px]">
      <div>
        <label className="block text-[14px] font-medium text-[#D4D4D8] mb-[8px]">Your Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="e.g. Alex"
          className="w-full bg-[#111114] border border-white/10 rounded-[12px] px-[16px] py-[12px] text-[16px] text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
          autoFocus
        />
      </div>
      <div>
        <div className="flex justify-between mb-[8px]">
          <label className="block text-[14px] font-medium text-[#D4D4D8]">Your Background</label>
          <span className={`text-[12px] ${data.background.length >= 20 ? "text-[#10B981]" : "text-[#52525B]"}`}>
            {data.background.length} / 20 chars
          </span>
        </div>
        <textarea
          value={data.background}
          onChange={(e) => setData({ ...data, background: e.target.value })}
          placeholder="e.g. CS student with 2 years of web development experience. Built e-commerce apps..."
          rows={4}
          className="w-full bg-[#111114] border border-white/10 rounded-[12px] px-[16px] py-[12px] text-[16px] text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all resize-none"
        />
      </div>
    </div>
  );

  /* ── 2. Target ── */
  const Step2 = () => (
    <div className="flex flex-col gap-[48px]">
      <div>
        <label className="block text-[14px] font-medium text-[#D4D4D8] mb-[8px]">Target Role</label>
        <input
          type="text"
          value={data.targetRole}
          onChange={(e) => setData({ ...data, targetRole: e.target.value })}
          placeholder="e.g. Senior Frontend Engineer"
          className="w-full bg-[#111114] border border-white/10 rounded-[12px] px-[16px] py-[12px] text-[16px] text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
        />
      </div>
      <div>
        <label className="block text-[14px] font-medium text-[#D4D4D8] mb-[16px]">Experience Level</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          {EXPERIENCE_LEVELS.map((level) => {
            const isSelected = data.experienceLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setData({ ...data, experienceLevel: level.id })}
                className={`p-[20px] rounded-[16px] border text-left transition-all ${
                  isSelected 
                    ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50 shadow-[0_0_24px_rgba(139,92,246,0.1)]" 
                    : "bg-[#111114] border-white/10 hover:border-white/20 hover:bg-[#141418]"
                }`}
              >
                <div className={`font-semibold mb-[4px] ${isSelected ? "text-[#C084FC]" : "text-[#FAFAFA]"}`}>
                  {level.label}
                </div>
                <div className="text-[13px] text-[#A1A1AA]">{level.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  /* ── 3. Domains ── */
  const Step3 = () => (
    <div>
      <p className="text-[14px] text-[#A1A1AA] mb-[24px]">Select 1-3 domains to focus your assessment.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {DOMAINS.map((domain) => {
          const isSelected = data.domains.includes(domain.id);
          return (
            <button
              key={domain.id}
              onClick={() => {
                if (isSelected) {
                  setData({ ...data, domains: data.domains.filter((d) => d !== domain.id) });
                } else if (data.domains.length < 3) {
                  setData({ ...data, domains: [...data.domains, domain.id] });
                }
              }}
              className={`flex items-center gap-[12px] p-[16px] rounded-[12px] border transition-all ${
                isSelected 
                  ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50" 
                  : "bg-[#111114] border-white/10 hover:border-white/20 hover:bg-[#141418]"
              } ${data.domains.length >= 3 && !isSelected ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div 
                className="w-[32px] h-[32px] shrink-0 rounded-[8px] flex items-center justify-center font-bold text-[12px]"
                style={{ backgroundColor: `${domain.color}20`, color: domain.color }}
              >
                {domain.icon}
              </div>
              <span className={`text-[14px] font-medium ${isSelected ? "text-[#FAFAFA]" : "text-[#D4D4D8]"}`}>
                {domain.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── 4. Review ── */
  const Step4 = () => (
    <div className="flex flex-col gap-[48px]">
      <div className="bg-[#111114] border border-white/10 rounded-[16px] p-[24px]">
        <h4 className="text-[16px] font-bold text-[#FAFAFA] mb-[16px]">Profile Summary</h4>
        <div className="grid grid-cols-2 gap-y-[16px] gap-x-[24px] text-[14px]">
          <div>
            <div className="text-[#71717A] mb-[4px]">Name</div>
            <div className="text-[#FAFAFA] font-medium">{data.name}</div>
          </div>
          <div>
            <div className="text-[#71717A] mb-[4px]">Target Role</div>
            <div className="text-[#FAFAFA] font-medium">{data.targetRole}</div>
          </div>
          <div className="col-span-2">
            <div className="text-[#71717A] mb-[4px]">Selected Domains</div>
            <div className="flex flex-wrap gap-[8px]">
              {data.domains.map(d => (
                <span key={d} className="bg-white/5 border border-white/10 px-[8px] py-[2px] rounded-md text-[#D4D4D8] text-[12px]">
                  {DOMAINS.find(x => x.id === d)?.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[14px] font-medium text-[#D4D4D8] mb-[16px]">Select AI Engine</label>
        <div className="flex flex-col gap-[12px]">
          {MODELS.map((model) => {
            const isSelected = data.model === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setData({ ...data, model: model.id })}
                className={`flex items-center justify-between p-[20px] rounded-[16px] border text-left transition-all ${
                  isSelected 
                    ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50 shadow-[0_0_24px_rgba(139,92,246,0.1)]" 
                    : "bg-[#111114] border-white/10 hover:border-white/20 hover:bg-[#141418]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-[12px] mb-[4px]">
                    <div className={`font-semibold ${isSelected ? "text-[#FAFAFA]" : "text-[#D4D4D8]"}`}>
                      {model.name}
                    </div>
                    <span className="text-[10px] px-[8px] py-[2px] rounded-full uppercase tracking-wider font-bold" style={{ backgroundColor: `${isSelected ? '#8B5CF6' : '#52525B'}20`, color: isSelected ? '#C084FC' : '#A1A1AA' }}>
                      {model.badge}
                    </span>
                  </div>
                  <div className="text-[13px] text-[#A1A1AA]">{model.subtitle} • {model.desc}</div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-[#8B5CF6]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const stepTitles = [
    "Tell us about yourself",
    "Set your target",
    "Choose your domains",
    "Review & Launch",
  ];
  
  const stepIcons = [User, Target, BookOpen, Rocket];

  if (!mounted) return null;

  if (isLaunching) {
    const launchMsgs = [
      "Initializing Profile Agent...",
      "Analyzing background context...",
      "Configuring knowledge graphs...",
      "Connecting to Fireworks AI...",
      "Launching assessment environment...",
    ];
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-[24px]">
        <div className="w-[80px] h-[80px] rounded-full border border-white/10 flex items-center justify-center mb-[32px] bg-[#111114] shadow-[0_0_40px_rgba(139,92,246,0.2)]">
          <Brain className="w-8 h-8 text-[#8B5CF6] animate-pulse" />
        </div>
        <h2 className="text-[24px] font-bold text-[#FAFAFA] mb-[32px]">Building your assessment</h2>
        
        <div className="flex flex-col gap-[16px] max-w-[320px] w-full">
          {launchMsgs.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i <= launchStep ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              className="flex items-center gap-[12px]"
            >
              <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center border ${
                i < launchStep ? "bg-[#10B981]/20 border-[#10B981]/50" : i === launchStep ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/50 animate-pulse" : "bg-[#18181B] border-white/10"
              }`}>
                {i < launchStep && <Check className="w-3 h-3 text-[#10B981]" />}
                {i === launchStep && <div className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />}
              </div>
              <span className={`text-[13px] font-mono ${i <= launchStep ? "text-[#D4D4D8]" : "text-[#52525B]"}`}>
                {msg}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center py-[64px] px-[24px] relative overflow-hidden">
      <div className="bg-noise" />
      
      {/* Top Navbar */}
      <div className="w-full max-w-[800px] flex items-center justify-between mb-[64px] relative z-10">
        <button onClick={() => router.push("/")} className="text-[14px] text-[#71717A] hover:text-[#FAFAFA] flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-[14px] font-bold tracking-tight text-[#FAFAFA]">Kaizen AI</span>
      </div>

      {/* Progress Indicators */}
      <div className="w-full max-w-[800px] flex items-center justify-between mb-[48px] relative z-10">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/5 -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#8B5CF6] -z-10 transition-all duration-500 ease-out" 
          style={{ width: `${((step - 1) / 3) * 100}%` }} 
        />
        
        {stepIcons.map((Icon, i) => {
          const isActive = step >= i + 1;
          const isCurrent = step === i + 1;
          return (
            <div key={i} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive ? "bg-[#18181B] border-2 border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.5)]" : "bg-[#09090B] border-2 border-white/10"
            }`}>
              <Icon className={`w-4 h-4 ${isActive ? "text-[#C084FC]" : "text-[#52525B]"}`} />
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[800px] flex-1 relative z-10">
        <div className="text-center mb-[48px]">
          <motion.h1 
            key={`h1-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] font-bold text-[#FAFAFA] mb-[8px]"
          >
            {stepTitles[step - 1]}
          </motion.h1>
          <p className="text-[16px] text-[#A1A1AA]">
            Step {step} of 4
          </p>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {step === 1 && Step1()}
              {step === 2 && Step2()}
              {step === 3 && Step3()}
              {step === 4 && Step4()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-[800px] flex items-center justify-between mt-[48px] pt-[32px] border-t border-white/10 relative z-10">
        <Button 
          variant="ghost" 
          onClick={prevStep}
          disabled={step === 1}
          style={{ opacity: step === 1 ? 0 : 1 }}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!isStepValid()}
          className={!isStepValid() ? "opacity-50 cursor-not-allowed" : ""}
        >
          {step === 4 ? "Launch Assessment" : "Continue"}
          {step === 4 ? <Rocket className="w-4 h-4 ml-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

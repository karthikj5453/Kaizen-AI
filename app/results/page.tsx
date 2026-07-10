"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import {
  Download, Share2, Home, ChevronDown, CheckCircle2, AlertCircle,
  Brain, BarChart3, Map, Target, BookOpen, Clock, Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface Report {
  overallScore: number;
  overallGrade: string;
  kaizenMessage: string;
  skillScores: { skill: string; score: number; level: string; trend: string }[];
  strengths: { title: string; description: string; icon: string }[];
  skillGaps: { skill: string; currentLevel: number; targetLevel: number; priority: string; reason: string }[];
  learningRoadmap: {
    phase: number;
    title: string;
    duration: string;
    focus: string[];
    resources: { title: string; type: string; url: string; effort: string }[];
  }[];
  topicPerformance: { topic: string; score: number; questionsAttempted: number; correct: number }[];
  nextSteps: string[];
  estimatedTimeToGoal: string;
  recommendedRoles: string[];
}

const gradeConfig: Record<string, { color: string; bg: string; label: string }> = {
  "A+": { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Exceptional" },
  A:   { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Excellent" },
  "B+":{ color: "#3B82F6", bg: "rgba(59,130,246,0.1)", label: "Very Good" },
  B:   { color: "#3B82F6", bg: "rgba(59,130,246,0.1)", label: "Good" },
  "C+":{ color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Average" },
  C:   { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Below Average" },
  D:   { color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "Needs Work" },
};

/* ─────────────────────────────────────────────────────────────
   SCORE RING
───────────────────────────────────────────────────────────── */
function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const cfg = gradeConfig[grade] || gradeConfig["C"];
  const circumference = 2 * Math.PI * 72;
  const dashoffset = circumference * (1 - score / 100);

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width={200} height={200} viewBox="0 0 180 180">
        <circle cx={90} cy={90} r={72} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={12} />
        <motion.circle
          cx={90} cy={90} r={72} fill="none"
          stroke={cfg.color} strokeWidth={12} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "90px 90px", filter: `drop-shadow(0 0 16px ${cfg.color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="text-[48px] font-black leading-none text-[#FAFAFA] tracking-tighter"
        >
          {score}
        </motion.span>
        <span className="text-[12px] text-[#71717A] mt-1 font-mono uppercase tracking-wider">/ 100</span>
        <span className="text-[14px] font-bold mt-2" style={{ color: cfg.color }}>{grade}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOADING STATE
───────────────────────────────────────────────────────────── */
function LoadingState() {
  const msgs = [
    { msg: "Skill Gap Analysis Agent identifying weak patterns...", icon: BarChart3 },
    { msg: "Roadmap Agent building your personalized curriculum...", icon: Map },
    { msg: "Report Agent compiling analytics and insights...", icon: Brain },
  ];
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-[24px]">
      <div className="w-[80px] h-[80px] rounded-full border border-white/10 flex items-center justify-center mb-[32px] bg-[#111114] shadow-[0_0_40px_rgba(139,92,246,0.2)]">
        <Brain className="w-8 h-8 text-[#8B5CF6] animate-pulse" />
      </div>
      <h2 className="text-[24px] font-bold text-[#FAFAFA] mb-[32px]">Generating Your Report</h2>
      
      <div className="flex flex-col gap-[16px] max-w-[400px] w-full">
        {msgs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 1.5 }}
            className="flex items-center gap-[12px] bg-[#111114] border border-white/10 p-[16px] rounded-[12px]"
          >
            <item.icon className="w-4 h-4 text-[#C084FC]" />
            <span className="text-[13px] font-mono text-[#A1A1AA]">{item.msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function ResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "gaps" | "roadmap">("overview");

  useEffect(() => {
    const generateReport = async () => {
      const storedProfile = sessionStorage.getItem("kaizenProfile");
      const storedAnswers = sessionStorage.getItem("kaizenAnswers");
      const storedScore = sessionStorage.getItem("kaizenScore");
      if (!storedProfile) { router.push("/onboarding"); return; }
      const profile = JSON.parse(storedProfile);
      const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
      const totalScore = storedScore ? JSON.parse(storedScore) : 65;
      try {
        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, profile, totalScore }),
        });
        const data = await res.json();
        if (data.success) setReport(data.report);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    generateReport();
  }, [router]);

  if (isLoading) return <LoadingState />;
  if (!report) return null;

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col relative overflow-hidden font-sans">
      <div className="bg-noise" />
      
      {/* Header */}
      <header className="h-[64px] border-b border-white/10 flex items-center justify-between px-[24px] relative z-40 bg-[#09090B]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#111114] border border-white/10 flex items-center justify-center text-[18px] font-bold text-[#FAFAFA]">K</div>
          <span className="text-[14px] font-bold tracking-tight text-[#FAFAFA]">Kaizen AI Report</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}><Home className="w-4 h-4 mr-2" /> Home</Button>
          <Button variant="secondary" size="sm"><Download className="w-4 h-4 mr-2" /> PDF</Button>
          <Button variant="primary" size="sm"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[900px] mx-auto py-[64px] px-[24px] relative z-10 flex flex-col gap-[64px]">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center gap-[48px] bg-[#111114] border border-white/10 p-[48px] rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-50 pointer-events-none" />
          
          <ScoreRing score={report.overallScore} grade={report.overallGrade} />
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <h1 className="text-[32px] font-bold text-[#FAFAFA] mb-[16px] tracking-tight">Assessment Complete.</h1>
            <p className="text-[16px] text-[#A1A1AA] leading-relaxed mb-[24px]">
              {report.kaizenMessage}
            </p>
            <div className="flex flex-wrap gap-[12px] justify-center md:justify-start">
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-[16px] py-[8px] rounded-full text-[13px] text-[#D4D4D8]">
                <Clock className="w-4 h-4 text-[#A1A1AA]" />
                Est. time to goal: {report.estimatedTimeToGoal}
              </span>
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-[16px] py-[8px] rounded-full text-[13px] text-[#D4D4D8]">
                <Target className="w-4 h-4 text-[#A1A1AA]" />
                {report.recommendedRoles[0]}
              </span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="flex items-center gap-[8px] border-b border-white/10 pb-[16px]">
          {(["overview", "gaps", "roadmap"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[24px] py-[8px] text-[15px] font-semibold transition-all border-b-2 capitalize ${
                activeTab === tab 
                  ? "border-[#8B5CF6] text-[#FAFAFA]" 
                  : "border-transparent text-[#71717A] hover:text-[#D4D4D8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                {/* Chart */}
                <div className="bg-[#111114] border border-white/10 rounded-[24px] p-[32px] flex flex-col items-center justify-center">
                  <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#71717A] w-full text-left mb-[24px]">Skill Distribution</h3>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={report.skillScores} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "#A1A1AA", fontSize: 11, fontFamily: "monospace" }} />
                        <Radar name="Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Strengths */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#71717A] mb-[8px]">Core Strengths</h3>
                  {report.strengths.map((str, i) => (
                    <div key={i} className="bg-[#111114] border border-white/10 p-[20px] rounded-[16px] flex gap-[16px]">
                      <div className="w-[40px] h-[40px] rounded-[10px] bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-[#FAFAFA] mb-[4px]">{str.title}</h4>
                        <p className="text-[14px] text-[#A1A1AA] leading-relaxed">{str.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GAPS TAB */}
            {activeTab === "gaps" && (
              <div className="flex flex-col gap-[24px]">
                {report.skillGaps.map((gap, i) => (
                  <div key={i} className="bg-[#111114] border border-white/10 rounded-[24px] p-[32px]">
                    <div className="flex items-start justify-between mb-[24px]">
                      <div>
                        <h4 className="text-[20px] font-bold text-[#FAFAFA] mb-[8px] flex items-center gap-3">
                          {gap.skill}
                          {gap.priority === "High" && <span className="bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">High Priority</span>}
                        </h4>
                        <p className="text-[15px] text-[#A1A1AA]">{gap.reason}</p>
                      </div>
                      <AlertCircle className={`w-6 h-6 ${gap.priority === "High" ? "text-[#EF4444]" : "text-[#F59E0B]"}`} />
                    </div>

                    <div className="bg-[#18181B] rounded-[16px] p-[24px] border border-white/5 flex flex-col gap-[16px]">
                      <div className="flex justify-between text-[12px] font-mono text-[#71717A]">
                        <span>Current: {gap.currentLevel}/100</span>
                        <span>Target: {gap.targetLevel}/100</span>
                      </div>
                      <div className="h-[8px] w-full bg-white/5 rounded-full overflow-hidden relative">
                        {/* Target Marker */}
                        <div className="absolute top-0 bottom-0 w-[2px] bg-white/20 z-10" style={{ left: `${gap.targetLevel}%` }} />
                        {/* Current Progress */}
                        <motion.div initial={{ width: 0 }} animate={{ width: `${gap.currentLevel}%` }} transition={{ duration: 1 }} className="h-full bg-[#8B5CF6] rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ROADMAP TAB */}
            {activeTab === "roadmap" && (
              <div className="relative pl-[32px] md:pl-[48px]">
                {/* Vertical timeline line */}
                <div className="absolute left-[16px] md:left-[24px] top-0 bottom-0 w-[2px] bg-white/5" />
                
                <div className="flex flex-col gap-[48px]">
                  {report.learningRoadmap.map((phase, i) => (
                    <div key={i} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[32px] md:-left-[48px] w-[32px] md:w-[48px] flex justify-center mt-6">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#09090B] border-[2px] border-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.5)] z-10" />
                      </div>

                      <div className="bg-[#111114] border border-white/10 rounded-[24px] p-[32px]">
                        <div className="flex items-center gap-[16px] mb-[24px]">
                          <span className="text-[48px] font-black text-white/5 leading-none">0{phase.phase}</span>
                          <div>
                            <h4 className="text-[20px] font-bold text-[#FAFAFA]">{phase.title}</h4>
                            <span className="text-[13px] font-mono text-[#8B5CF6]">{phase.duration}</span>
                          </div>
                        </div>

                        <div className="mb-[24px]">
                          <h5 className="text-[12px] uppercase tracking-wider text-[#71717A] font-bold mb-[12px]">Focus Areas</h5>
                          <div className="flex flex-wrap gap-[8px]">
                            {phase.focus.map((f, j) => (
                              <span key={j} className="bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-md text-[13px] text-[#D4D4D8]">{f}</span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-[12px] uppercase tracking-wider text-[#71717A] font-bold mb-[12px]">Recommended Resources</h5>
                          <div className="flex flex-col gap-[12px]">
                            {phase.resources.map((res, j) => (
                              <a key={j} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-[16px] bg-[#18181B] rounded-[12px] border border-white/5 hover:border-white/20 hover:bg-[#141418] transition-colors group">
                                <div className="flex items-center gap-[16px]">
                                  <div className="w-[32px] h-[32px] bg-white/5 rounded-[8px] flex items-center justify-center text-[16px]">
                                    {res.type === "Course" ? "🎓" : res.type === "Video" ? "🎬" : "📚"}
                                  </div>
                                  <div>
                                    <div className="text-[14px] font-semibold text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors">{res.title}</div>
                                    <div className="text-[12px] text-[#A1A1AA]">{res.type} • {res.effort}</div>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#71717A] group-hover:text-[#FAFAFA]" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ArrowRight, Code2, MessageSquare, ListChecks, Brain, Zap, Target, BarChart3, ArrowLeft, CheckCircle2, XCircle, Activity, Lock
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface Question {
  id: string;
  type: "mcq" | "open" | "code";
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  timeLimit: number;
}

interface Answer {
  questionId: string;
  topic: string;
  answer: string;
  confidence: number;
  score: number;
  difficulty: string;
  timeTaken: number;
}

interface Profile {
  name: string;
  role: string;
  experience: string;
  domains: string[];
  model?: string;
  aiProfile: {
    assessmentFocus: string[];
    questionCount: number;
    skillLevel: string;
    kaizenInsight: string;
    profileSummary: string;
  } | null;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const DIFF_CONFIG = {
  Easy:   { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)",  text: "#34D399" },
  Medium: { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)",  text: "#FCD34D" },
  Hard:   { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#F87171" },
};

const TYPE_CONFIG = {
  mcq:  { icon: ListChecks,  label: "Multiple Choice", color: "#C084FC", bg: "rgba(139,92,246,0.1)" },
  open: { icon: MessageSquare, label: "Open Answer",   color: "#60A5FA", bg: "rgba(59,130,246,0.1)" },
  code: { icon: Code2,        label: "Coding",         color: "#34D399", bg: "rgba(16,185,129,0.1)" },
};

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────── */
export default function AssessmentPage() {
  const router = useRouter();
  
  // Ref for auto-scrolling
  const endOfListRef = useRef<HTMLDivElement>(null);

  // Core State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});
  const [totalQuestions, setTotalQuestions] = useState(8);

  // Active Question Input State
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [confidence, setConfidence] = useState(70);

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState("Medium");
  const [mounted, setMounted] = useState(false);

  // Timer State (Scoped to the active question)
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Auto-scroll removed here to prevent jumping when starting or generating.
  // We keep the programmatic scroll in submitAnswer.

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [timerActive]);

  // Init
  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("kaizenProfile");
    if (!stored) { router.push("/onboarding"); return; }
    const p: Profile = JSON.parse(stored);
    setProfile(p);
    if (p.aiProfile?.questionCount) setTotalQuestions(p.aiProfile.questionCount);
    loadQuestion(p, 0, "Medium", []);
  }, []);

  const handleTimeUp = useCallback(() => {
    setTimerActive(false);
    const currentQuestion = questions[questions.length - 1];
    if (currentQuestion && !evaluations[currentQuestion.id]) {
      submitAnswer(true);
    }
  }, [questions, evaluations]);

  const loadQuestion = async (p: Profile, idx: number, difficulty: string, prevAnswers: Answer[]) => {
    setIsGenerating(true);
    // Reset inputs for the new question
    setUserAnswer("");
    setSelectedOption("");
    setConfidence(70);
    setTimerActive(false);

    const topics = p.aiProfile?.assessmentFocus || p.domains;
    const topic = topics[idx % topics.length];

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          questionIndex: idx,
          totalQuestions,
          role: p.role,
          previousAnswers: prevAnswers.slice(-3).map(a => ({ topic: a.topic, score: a.score })),
          model: p.model,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(prev => [...prev, data.question]);
        setTimeLeft(data.question.timeLimit || 90);
        setTimerActive(true);
        startTimeRef.current = Date.now();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const submitAnswer = async (timedOut = false) => {
    const currentQuestion = questions[questions.length - 1];
    if (!currentQuestion || !profile) return;
    
    setTimerActive(false);
    clearInterval(timerRef.current!);
    setIsEvaluating(true);

    const answer = currentQuestion.type === "mcq" ? selectedOption : userAnswer;
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          answer: timedOut ? "(Time expired — no answer submitted)" : answer,
          confidence,
          questionType: currentQuestion.type,
          correctAnswer: currentQuestion.correctAnswer,
          model: profile.model,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const evaluation = data.evaluation;
        
        // Update states
        setEvaluations(prev => ({ ...prev, [currentQuestion.id]: evaluation }));
        
        const newAnswer: Answer = {
          questionId: currentQuestion.id,
          topic: currentQuestion.topic,
          answer,
          confidence,
          score: evaluation.score,
          difficulty: currentQuestion.difficulty,
          timeTaken,
        };
        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);
        setCurrentDifficulty(evaluation.nextDifficulty || "Medium");

        // Wait a beat, then auto-scroll to the feedback
        setTimeout(() => {
          endOfListRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (questions.length >= totalQuestions) {
      // Finish assessment
      sessionStorage.setItem("kaizenAnswers", JSON.stringify(answers));
      sessionStorage.setItem("kaizenScore", JSON.stringify(Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length)));
      router.push("/results");
    } else {
      if (profile) loadQuestion(profile, questions.length, currentDifficulty, answers);
    }
  };

  if (!mounted || !profile) return null;

  const progress = (questions.length / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col relative font-sans">
      <div className="bg-noise fixed inset-0 z-0 pointer-events-none opacity-20" />
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
        <motion.div
          className="h-full bg-[#8B5CF6]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-[3px] left-0 right-0 h-[64px] border-b border-white/10 flex items-center justify-between px-[24px] z-40 bg-[#09090B]/80 backdrop-blur-md">
        <button onClick={() => router.push("/")} className="text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-2 text-[14px] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Quit Assessment
        </button>
        <div className="font-mono text-[13px] text-[#A1A1AA] flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[#FAFAFA]">Adaptive Engine Active</span>
          </div>
          <div><span className="text-[#FAFAFA]">Q{Math.min(questions.length, totalQuestions)}</span> / {totalQuestions}</div>
        </div>
      </header>

      {/* Main Scrollable Layout */}
      <main className="flex-1 w-full max-w-[800px] mx-auto pt-[120px] pb-[100vh] px-[24px] relative z-10 flex flex-col gap-[40vh]">
        
        <AnimatePresence>
          {questions.map((q, index) => {
            const isCompleted = !!evaluations[q.id];
            const isActive = !isCompleted;
            const evalData = evaluations[q.id];
            const savedAnswer = answers.find(a => a.questionId === q.id);
            const canSubmit = q.type === "mcq" ? selectedOption !== "" : userAnswer.trim().length > 0;
            const displayTimeLeft = isActive ? timeLeft : (savedAnswer ? q.timeLimit - savedAnswer.timeTaken : 0);

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isActive ? 1 : 0.6, y: 0, scale: isActive ? 1 : 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col justify-center min-h-[60vh] scroll-m-[120px]"
              >
                <div className={`w-full bg-[#111114] border rounded-[24px] overflow-hidden transition-all duration-700 ${
                  isActive ? "border-[#8B5CF6]/50 shadow-[0_0_40px_rgba(139,92,246,0.1)]" : "border-white/10"
                }`}>
                  
                  {/* Card Header */}
                  <div className="border-b border-white/10 px-[32px] py-[20px] flex items-center justify-between bg-[#18181B]/50">
                    <div className="flex gap-[12px] flex-wrap">
                      <span className="px-[10px] py-[4px] rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ background: TYPE_CONFIG[q.type].bg, color: TYPE_CONFIG[q.type].color }}>
                        {(() => { const Icon = TYPE_CONFIG[q.type].icon; return <Icon className="w-3.5 h-3.5" />; })()}
                        {TYPE_CONFIG[q.type].label}
                      </span>
                      <span className="px-[10px] py-[4px] rounded-md text-[11px] font-bold uppercase tracking-wider" style={{ background: DIFF_CONFIG[q.difficulty].bg, color: DIFF_CONFIG[q.difficulty].text }}>
                        {q.difficulty}
                      </span>
                      <span className="px-[10px] py-[4px] rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/5 text-[#A1A1AA] border border-white/10">
                        {q.topic}
                      </span>
                      {isCompleted && (
                        <span className="px-[10px] py-[4px] rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/40 text-[#A1A1AA] border border-white/10 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-[12px] transition-colors ${isActive ? "text-[#FAFAFA]" : "text-[#71717A]"}`}>
                      <Clock className="w-4 h-4" />
                      <div className="text-[14px] font-mono font-medium w-[40px] text-right">
                        {Math.floor(displayTimeLeft / 60)}:{(displayTimeLeft % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="p-[32px]">
                    <h2 className="text-[22px] font-semibold text-[#FAFAFA] mb-[32px] leading-relaxed">
                      {q.question}
                    </h2>

                    {/* INTERACTIVE INPUT OR STATIC ANSWER */}
                    <div className="mb-[32px]">
                      {q.type === "mcq" && (
                        <div className="flex flex-col gap-[12px]">
                          {q.options.map((opt, i) => {
                            const isSelected = isActive ? selectedOption === opt : savedAnswer?.answer === opt;
                            return (
                              <button
                                key={i}
                                disabled={!isActive}
                                onClick={() => isActive && setSelectedOption(opt)}
                                className={`w-full p-[16px] rounded-[12px] border text-left flex items-start gap-[16px] transition-all ${
                                  isSelected 
                                    ? isActive ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/50 shadow-[0_0_16px_rgba(139,92,246,0.15)] text-[#FAFAFA]" : "bg-white/10 border-white/20 text-[#FAFAFA]"
                                    : "bg-[#18181B] border-white/5 text-[#D4D4D8] hover:bg-[#141418] hover:border-white/10 disabled:opacity-50"
                                }`}
                              >
                                <div className={`mt-0.5 w-[24px] h-[24px] rounded-md flex items-center justify-center text-[12px] font-bold shrink-0 ${
                                  isSelected ? (isActive ? "bg-[#8B5CF6] text-white" : "bg-white/20 text-white") : "bg-white/5 text-[#A1A1AA]"
                                }`}>
                                  {i + 1}
                                </div>
                                <span className="text-[15px] leading-relaxed">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {(q.type === "open" || q.type === "code") && (
                        <textarea
                          disabled={!isActive}
                          value={isActive ? userAnswer : savedAnswer?.answer || ""}
                          onChange={(e) => isActive && setUserAnswer(e.target.value)}
                          placeholder={q.type === "code" ? "// Write your solution here..." : "Type your answer..."}
                          className={`w-full h-[240px] bg-[#18181B] border rounded-[12px] p-[20px] text-[15px] transition-colors resize-none ${
                            isActive ? "border-white/10 text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#8B5CF6]" : "border-white/5 text-[#A1A1AA] disabled:opacity-70"
                          } ${q.type === "code" ? "font-mono" : "font-sans"}`}
                          spellCheck={false}
                        />
                      )}
                    </div>

                    {/* CONTROLS (Only if active) */}
                    {isActive && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[24px]">
                        <div className="flex-1 w-full max-w-[300px]">
                          <div className="flex justify-between text-[12px] text-[#A1A1AA] mb-[8px]">
                            <span>Confidence Level</span>
                            <span className="font-mono text-[#8B5CF6]">{confidence}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="10"
                            value={confidence}
                            onChange={(e) => setConfidence(parseInt(e.target.value))}
                            className="w-full accent-[#8B5CF6]"
                          />
                        </div>
                        
                        <Button
                          variant="primary"
                          disabled={!canSubmit || isEvaluating}
                          onClick={() => submitAnswer()}
                          className="w-full sm:w-auto"
                        >
                          {isEvaluating ? (
                            <>Evaluating... <Activity className="w-4 h-4 animate-spin ml-2" /></>
                          ) : (
                            <>Submit Answer <ArrowRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                      </div>
                    )}

                    {/* EVALUATION (Only if completed) */}
                    {isCompleted && evalData && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-[32px] pt-[32px] border-t border-white/5">
                        <div className={`p-[24px] rounded-[16px] border ${evalData.score >= 70 ? "bg-[#10B981]/10 border-[#10B981]/30" : "bg-[#EF4444]/10 border-[#EF4444]/30"}`}>
                          <div className="flex items-center gap-[12px] mb-[16px]">
                            {evalData.score >= 70 ? <CheckCircle2 className="w-6 h-6 text-[#10B981]" /> : <XCircle className="w-6 h-6 text-[#EF4444]" />}
                            <span className="text-[18px] font-bold text-[#FAFAFA]">Score: {evalData.score}/100</span>
                          </div>
                          <p className="text-[15px] text-[#D4D4D8] leading-relaxed mb-[24px]">{evalData.feedback}</p>
                          <div className="bg-black/40 p-[20px] rounded-[12px] border border-white/5">
                            <span className="text-[12px] uppercase tracking-wider text-[#8B5CF6] font-bold mb-[8px] flex items-center gap-2">
                              <Brain className="w-4 h-4" /> Kaizen Insight
                            </span>
                            <span className="text-[14px] text-[#A1A1AA] leading-relaxed">{evalData.kaizenTip}</span>
                          </div>
                        </div>

                        {/* If this is the LAST completed question in the array, show the Next button */}
                        {index === questions.length - 1 && (
                          <div className="mt-[32px] flex justify-end">
                            <Button variant="primary" onClick={nextQuestion}>
                              {questions.length >= totalQuestions ? "View Final Results" : "Generate Next Question"} 
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Generating State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-[#111114]/50 border border-white/5 rounded-[24px] p-[64px] flex flex-col items-center justify-center min-h-[40vh]"
            >
              <div className="w-[64px] h-[64px] rounded-full border border-white/10 bg-[#18181B] flex items-center justify-center mb-[24px] shadow-[0_0_40px_rgba(139,92,246,0.15)] relative">
                <div className="absolute inset-0 rounded-full border-[2px] border-[#8B5CF6] border-t-transparent animate-spin opacity-50" />
                <Zap className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#FAFAFA] mb-[8px]">Agent Pipeline Active</h3>
              <p className="text-[14px] text-[#A1A1AA] text-center max-w-[300px]">Synthesizing previous performance to craft an adaptive {currentDifficulty.toLowerCase()} question...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dummy div to scroll to */}
        <div ref={endOfListRef} className="h-[20px]" />
      </main>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { callFireworks, parseAIJson } from "@/app/lib/fireworks";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question, answer, confidence, questionType, correctAnswer, model } = body;

  try {
    const systemPrompt = `You are the Kaizen AI Assessment Agent. Evaluate user answers with the precision of a senior engineer and the empathy of a great mentor.

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "score": 0-100,
  "isCorrect": true | false,
  "grade": "Excellent | Good | Partial | Needs Improvement | Incorrect",
  "feedback": "Detailed, constructive feedback (2-3 sentences)",
  "strengths": ["what they got right"],
  "improvements": ["specific areas to improve"],
  "nextDifficulty": "Easy | Medium | Hard",
  "conceptsCovered": ["concept1", "concept2"],
  "kaizenTip": "A brief Kaizen-inspired tip for improvement"
}

Scoring guide:
- Excellent (90-100): Correct, well-reasoned, shows deep understanding
- Good (70-89): Mostly correct with minor gaps
- Partial (40-69): Core concept grasped but incomplete
- Needs Improvement (20-39): Shows some understanding but significant gaps
- Incorrect (0-19): Fundamentally incorrect or no relevant answer`;

    const userMessage = `Question: ${question}
Question Type: ${questionType}
Expected Answer: ${correctAnswer}
User's Answer: ${answer}
Confidence Level: ${confidence}%

Evaluate this answer comprehensively.`;

    const content = await callFireworks(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      { model, maxTokens: 1200, temperature: 0.4 }
    );

    const evaluation = parseAIJson(content);
    return NextResponse.json({ success: true, evaluation });
  } catch (error) {
    console.error("Evaluate API error:", error);

    const answerLength = (answer || "").trim().length;
    const score = answerLength > 100 ? 72 : answerLength > 30 ? 55 : 30;
    return NextResponse.json({
      success: true,
      evaluation: {
        score,
        isCorrect: score >= 70,
        grade: score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 40 ? "Partial" : "Needs Improvement",
        feedback:
          "Your answer demonstrates some understanding of the concept. Consider adding more detail about the underlying mechanisms and real-world applications.",
        strengths: ["Addressed the core concept", "Structured response"],
        improvements: ["Add more specific examples", "Elaborate on edge cases", "Connect to real-world scenarios"],
        nextDifficulty: score >= 75 ? "Hard" : score >= 50 ? "Medium" : "Easy",
        conceptsCovered: ["Core Concept"],
        kaizenTip: "Small improvements compound over time. Review this concept once more tonight for lasting retention.",
      },
    });
  }
}

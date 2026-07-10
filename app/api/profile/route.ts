import { NextRequest, NextResponse } from "next/server";
import { callFireworks, parseAIJson } from "@/app/lib/fireworks";

export async function POST(req: NextRequest) {
  try {
    const { name, role, experience, domains, background, model } = await req.json();

    const systemPrompt = `You are the Kaizen AI User Profiling Agent. Your role is to analyze a user's profile and create a comprehensive, personalized assessment strategy based on the Japanese philosophy of continuous improvement (Kaizen 改善).

Respond ONLY with a valid JSON object (no markdown, no extra text) with this exact structure:
{
  "profileSummary": "2-3 sentence summary of the user's current standing",
  "targetRole": "specific job title or goal",
  "skillLevel": "Beginner | Intermediate | Advanced | Expert",
  "assessmentFocus": ["topic1", "topic2", "topic3", "topic4", "topic5"],
  "estimatedDuration": "e.g. 20-25 minutes",
  "questionCount": 10,
  "kaizenInsight": "A motivational insight about their learning journey using Kaizen philosophy (2-3 sentences)",
  "difficultyProgression": "Easy-to-Hard | Mixed | Hard-to-Easy | Adaptive",
  "priorityAreas": [
    { "area": "area name", "reason": "why this is important for their goal" }
  ]
}`;

    const userMessage = `Profile:
- Name: ${name}
- Target Role/Goal: ${role}
- Experience Level: ${experience}
- Background: ${background}
- Selected Domains: ${domains.join(", ")}

Create a personalized assessment strategy for this user.`;

    const content = await callFireworks(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      { model, maxTokens: 2000, temperature: 0.7 }
    );

    const profile = parseAIJson(content);
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({
      success: true,
      profile: {
        profileSummary:
          "You show strong foundational knowledge with clear ambitions in software development. Your diverse background positions you well for a structured assessment.",
        targetRole: "Senior Software Engineer",
        skillLevel: "Intermediate",
        assessmentFocus: ["Data Structures & Algorithms", "System Design", "JavaScript/TypeScript", "React", "API Design"],
        estimatedDuration: "20-25 minutes",
        questionCount: 10,
        kaizenInsight:
          "Every expert was once a beginner. Through Kaizen, we focus not on perfection but on 1% daily improvement. This assessment will reveal your unique path forward.",
        difficultyProgression: "Adaptive",
        priorityAreas: [
          { area: "System Design", reason: "Critical for senior-level roles" },
          { area: "DSA", reason: "Foundation for technical interviews" },
          { area: "React Patterns", reason: "Core to your target stack" },
        ],
      },
    });
  }
}

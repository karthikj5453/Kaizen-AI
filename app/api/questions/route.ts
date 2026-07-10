import { NextRequest, NextResponse } from "next/server";
import { callFireworks, parseAIJson } from "@/app/lib/fireworks";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, questionIndex, totalQuestions, role, previousAnswers, model } = await req.json();

    const systemPrompt = `You are the Kaizen AI Question Generation Agent. Generate high-quality, engaging technical assessment questions for software engineers and developers.

Respond ONLY with a valid JSON object (no markdown, no extra text) with this exact structure:
{
  "id": "q${questionIndex + 1}",
  "type": "mcq | open | code",
  "topic": "topic name",
  "difficulty": "Easy | Medium | Hard",
  "question": "The full question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "The correct answer (for mcq: the exact option text; for open/code: model answer)",
  "explanation": "Brief explanation of the correct answer",
  "hint": "A subtle hint without giving away the answer",
  "timeLimit": 90
}

IMPORTANT:
- For "mcq" type: always include exactly 4 options array
- For "open" or "code" type: options array should be empty []
- Make questions realistic, practical, and relevant to real-world engineering
- Vary question types across the assessment`;

    const recentContext =
      previousAnswers && previousAnswers.length > 0
        ? `\nRecent performance: ${previousAnswers
            .slice(-3)
            .map((a: { topic: string; score: number }) => `${a.topic}: ${a.score}%`)
            .join(", ")}`
        : "";

    const userMessage = `Generate question ${questionIndex + 1} of ${totalQuestions} for:
- Target Role: ${role}
- Topic: ${topic}
- Required Difficulty: ${difficulty}
- Question Index: ${questionIndex}${recentContext}

Create a challenging but fair question appropriate for the difficulty level.`;

    const content = await callFireworks(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      { model, maxTokens: 1500, temperature: 0.8 }
    );

    const question = parseAIJson(content);
    return NextResponse.json({ success: true, question });
  } catch (error) {
    console.error("Questions API error:", error);

    const fallbackQuestions = [
      {
        id: `q${Math.random()}`,
        type: "mcq",
        topic: "JavaScript",
        difficulty: "Medium",
        question: "What is the output of `console.log(typeof null)` in JavaScript?",
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctAnswer: '"object"',
        explanation: "In JavaScript, `typeof null` returns 'object'. This is a known quirk/bug in JavaScript kept for backward compatibility.",
        hint: "Think about JavaScript's type system quirks from its early days.",
        timeLimit: 60,
      },
      {
        id: `q${Math.random()}`,
        type: "open",
        topic: "System Design",
        difficulty: "Hard",
        question: "Describe how you would design a URL shortening service like bit.ly. Cover the key components, data model, and how you'd handle scale to 100M requests/day.",
        options: [],
        correctAnswer: "A comprehensive answer includes: Load balancer, App servers, Database (SQL/NoSQL), Cache layer (Redis), Base62 encoding for short URLs, CDN for redirects, and horizontal scaling strategy.",
        explanation: "URL shorteners require: unique ID generation (base62), fast read path (cache), analytics tracking, and careful consideration of collision handling.",
        hint: "Think about the read-heavy vs write-heavy nature of this service.",
        timeLimit: 180,
      },
      {
        id: `q${Math.random()}`,
        type: "code",
        topic: "Data Structures",
        difficulty: "Medium",
        question: "Write a function that finds the two numbers in an array that sum to a target value. Return their indices. Example: `twoSum([2, 7, 11, 15], 9)` → `[0, 1]`",
        options: [],
        correctAnswer: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
        explanation: "Using a hash map achieves O(n) time complexity vs O(n²) for brute force nested loops.",
        hint: "Consider using a hash map to store values you've seen. For each element, check if its complement exists.",
        timeLimit: 120,
      },
      {
        id: `q${Math.random()}`,
        type: "mcq",
        topic: "React",
        difficulty: "Medium",
        question: "Which React hook should you use to memoize an expensive computation?",
        options: ["useCallback", "useMemo", "useEffect", "useReducer"],
        correctAnswer: "useMemo",
        explanation: "useMemo memoizes the result of a computation, while useCallback memoizes a function reference.",
        hint: "Think about what you're caching — a value or a function?",
        timeLimit: 60,
      },
      {
        id: `q${Math.random()}`,
        type: "mcq",
        topic: "System Design",
        difficulty: "Hard",
        question: "In a distributed system, which consistency model allows reading stale data but guarantees eventual consistency?",
        options: ["Strong consistency", "Linearizability", "Eventual consistency", "Sequential consistency"],
        correctAnswer: "Eventual consistency",
        explanation: "Eventual consistency (used in DynamoDB, Cassandra) guarantees all replicas will converge to the same value eventually, but allows temporary stale reads for higher availability.",
        hint: "Think about the CAP theorem and what systems like Cassandra prioritize.",
        timeLimit: 90,
      },
    ];

    const q = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
    return NextResponse.json({ success: true, question: q });
  }
}

/**
 * Shared Fireworks AI API client
 * Single source of truth for all API routes — change model or settings here once.
 */

const FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1";

export const MODELS = {
  /** Primary model — Llama 3.1 70B via Fireworks */
  default: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  /** Faster model for lower-latency tasks */
  fast: "accounts/fireworks/models/llama-v3p1-8b-instruct",
  /** Gemma model for AMD GPU prize track */
  gemma: "accounts/fireworks/models/gemma2-9b-it",
} as const;

export type ModelKey = keyof typeof MODELS;

export interface FireworksMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface FireworksOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

export async function callFireworks(
  messages: FireworksMessage[],
  options: FireworksOptions = {}
): Promise<string> {
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is not configured");
  }

  const {
    model = MODELS.default,
    maxTokens = 2000,
    temperature = 0.7,
    topP = 0.9,
  } = options;

  const response = await fetch(`${FIREWORKS_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Fireworks API error: ${response.status} ${response.statusText} — ${errorText}`
    );
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Unexpected Fireworks API response structure");
  }

  return content;
}

/**
 * Safely parse JSON from AI response, handling markdown code blocks.
 */
export function parseAIJson<T>(content: string): T {
  // Remove markdown code fences if present
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  // Find JSON object/array boundaries
  const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error(`No valid JSON found in AI response: ${cleaned.slice(0, 200)}`);
  }

  return JSON.parse(jsonMatch[0]) as T;
}

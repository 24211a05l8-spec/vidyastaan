// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function callGemini(prompt: string, config: GeminiConfig = {}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable. Advanced matching requires it.");
  }

  // We explicitly use the verified bleeding-edge key the user requires
  const modelName = config.model || "gemini-3-flash-preview";
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Apply our configuration directly to the model
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    generationConfig: {
      temperature: config.temperature ?? 0.2, // Default to slightly deterministic
      maxOutputTokens: config.maxTokens ?? 8192,
    }
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

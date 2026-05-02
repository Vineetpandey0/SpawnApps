// lib/gemini.ts
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function callGemini(input: string): Promise<string> {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash", 
    contents: [
      {
        role: "user",
        parts: [{ text: input }],
      },
    ],
    config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, 
    }
  });

  return res.text; 
}
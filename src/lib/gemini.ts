import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";
import { DATA_GENERATION_SYSTEM_PROMPT } from "./runtimeDataPrompt";

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
  console.log(res.data)

  return res.text; 
}

export async function callGeminiForData(config: any, page: any): Promise<any> {
  const inputPayload = JSON.stringify({ appConfig: config, page: page }, null, 2);
  
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash", 
    contents: [
      {
        role: "user",
        parts: [{ text: inputPayload }],
      },
    ],
    config: {
        systemInstruction: DATA_GENERATION_SYSTEM_PROMPT,
        temperature: 0.7, 
        responseMimeType: "application/json",
    }
  });

  try {
    const rawText = res.text || "{}";
    const parsed = JSON.parse(rawText);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini data output:", err);
    return page.type === 'table' ? [] : {};
  }
}
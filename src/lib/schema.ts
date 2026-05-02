// lib/schema.ts
import { z } from "zod";

export const LLMResponseSchema = z.object({
  reply: z.string(),
  confidence: z.number().min(0).max(1),
});
"use server";

import { analyzeNewsContent, AnalyzeNewsContentOutput } from "@/ai/flows/analyze-news-content";
import { detectBias, DetectBiasOutput } from "@/ai/flows/detect-bias-in-content";

export type AnalysisResult = {
  analysis: AnalyzeNewsContentOutput;
  bias: DetectBiasOutput;
};

export async function runAnalysis(
  content: string
): Promise<{ success: true; data: AnalysisResult } | { success: false; error: string }> {
  if (!content || content.trim().length === 0) {
    return { success: false, error: "Please provide some content to analyze." };
  }
  if (content.trim().length > 5000) {
    return { success: false, error: "Content is too long. Please provide at most 5000 characters." };
  }

  try {
    const [analysisResult, biasResult] = await Promise.all([
      analyzeNewsContent({ content }),
      detectBias({ content }),
    ]);

    return {
      success: true,
      data: {
        analysis: analysisResult,
        bias: biasResult,
      },
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during analysis.";
    return { success: false, error: `Analysis failed. ${errorMessage}` };
  }
}

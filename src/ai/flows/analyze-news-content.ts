'use server';

/**
 * @fileOverview Analyzes news content credibility, flags potential misinformation, and provides insights using generative AI.
 *
 * - analyzeNewsContent - A function that handles the news content analysis process.
 * - AnalyzeNewsContentInput - The input type for the analyzeNewsContent function.
 * - AnalyzeNewsContentOutput - The return type for the analyzeNewsContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeNewsContentInputSchema = z.object({
  content: z.string().describe('The news article text or link to analyze.'),
});
export type AnalyzeNewsContentInput = z.infer<typeof AnalyzeNewsContentInputSchema>;

const AnalyzeNewsContentOutputSchema = z.object({
  credibilityScore: z.number().describe('A score from 0 to 1 indicating the credibility of the content.'),
  potentialMisinformation: z.string().describe('Any potential misinformation flagged in the content.'),
  insights: z.string().describe('Evidence-based insights about the content.'),
  sources: z.array(z.string().url()).describe('A list of URLs for the sources used for verification.'),
});
export type AnalyzeNewsContentOutput = z.infer<typeof AnalyzeNewsContentOutputSchema>;

export async function analyzeNewsContent(input: AnalyzeNewsContentInput): Promise<AnalyzeNewsContentOutput> {
  return analyzeNewsContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNewsContentPrompt',
  input: {schema: AnalyzeNewsContentInputSchema},
  output: {schema: AnalyzeNewsContentOutputSchema},
  prompt: `You are an AI expert in identifying misinformation and assessing the credibility of news articles.

  Analyze the following news content and provide:
  1.  A credibility score (0-1) based on source reliability, factual accuracy, and potential bias.
  2.  Any potential misinformation flagged in the content.
  3.  Evidence-based insights that support your analysis.
  4.  A list of URLs for the sources you used to verify the information.

  News Content: {{{content}}}`,
});

const analyzeNewsContentFlow = ai.defineFlow(
  {
    name: 'analyzeNewsContentFlow',
    inputSchema: AnalyzeNewsContentInputSchema,
    outputSchema: AnalyzeNewsContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

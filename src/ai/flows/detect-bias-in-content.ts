'use server';
/**
 * @fileOverview This flow detects potential biases in news articles and online content.
 *
 * - detectBias - A function that takes content as input and returns a bias assessment.
 * - DetectBiasInput - The input type for the detectBias function.
 * - DetectBiasOutput - The return type for the detectBias function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectBiasInputSchema = z.object({
  content: z.string().describe('The content to analyze for bias.'),
});
export type DetectBiasInput = z.infer<typeof DetectBiasInputSchema>;

const DetectBiasOutputSchema = z.object({
  biasAssessment: z.string().describe('An assessment of potential biases in the content.'),
});
export type DetectBiasOutput = z.infer<typeof DetectBiasOutputSchema>;

export async function detectBias(input: DetectBiasInput): Promise<DetectBiasOutput> {
  return detectBiasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectBiasPrompt',
  input: {schema: DetectBiasInputSchema},
  output: {schema: DetectBiasOutputSchema},
  prompt: `You are an expert in identifying biases in news articles and online content.

  Analyze the following content for potential biases and provide a detailed assessment.

  Content: {{{content}}}
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
        threshold: 'BLOCK_NONE',
      },
    ],
  }
});

const detectBiasFlow = ai.defineFlow(
  {
    name: 'detectBiasFlow',
    inputSchema: DetectBiasInputSchema,
    outputSchema: DetectBiasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

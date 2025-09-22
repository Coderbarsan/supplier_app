'use server';

/**
 * @fileOverview Assigns a credibility score to news articles and online content using Genkit.
 *
 * - assignCredibilityScore - A function that assigns a credibility score based on content analysis.
 * - AssignCredibilityScoreInput - The input type for the assignCredibilityScore function.
 * - AssignCredibilityScoreOutput - The return type for the assignCredibilityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssignCredibilityScoreInputSchema = z.object({
  content: z
    .string()
    .describe('The news article or online content to analyze.'),
});
export type AssignCredibilityScoreInput = z.infer<
  typeof AssignCredibilityScoreInputSchema
>;

const AssignCredibilityScoreOutputSchema = z.object({
  credibilityScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the credibility of the content, where 0 is not credible and 1 is highly credible.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the content was given the assigned credibility score.'
    ),
});
export type AssignCredibilityScoreOutput = z.infer<
  typeof AssignCredibilityScoreOutputSchema
>;

export async function assignCredibilityScore(
  input: AssignCredibilityScoreInput
): Promise<AssignCredibilityScoreOutput> {
  return assignCredibilityScoreFlow(input);
}

const assignCredibilityScorePrompt = ai.definePrompt({
  name: 'assignCredibilityScorePrompt',
  input: {schema: AssignCredibilityScoreInputSchema},
  output: {schema: AssignCredibilityScoreOutputSchema},
  prompt: `You are an AI assistant designed to assess the credibility of news articles and online content.

  Analyze the following content and assign a credibility score between 0 and 1, where 0 is not credible and 1 is highly credible.  Also, explain your reasoning for the assigned score.

  Content: {{{content}}}
  `,
});

const assignCredibilityScoreFlow = ai.defineFlow(
  {
    name: 'assignCredibilityScoreFlow',
    inputSchema: AssignCredibilityScoreInputSchema,
    outputSchema: AssignCredibilityScoreOutputSchema,
  },
  async input => {
    const {output} = await assignCredibilityScorePrompt(input);
    return output!;
  }
);

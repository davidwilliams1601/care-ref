
'use server';

/**
 * @fileOverview AI-powered reference summarization flow.
 *
 * - summarizeReference - A function that summarizes a reference using GenAI.
 * - SummarizeReferenceInput - The input type for the summarizeReference function.
 * - SummarizeReferenceOutput - The return type for the summarizeReference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReferenceInputSchema = z.object({
  referenceText: z
    .string()
    .describe('The text content of the job reference to be summarized.'),
});
export type SummarizeReferenceInput = z.infer<typeof SummarizeReferenceInputSchema>;

const SummarizeReferenceOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, professional summary of the reference, highlighting key skills, qualities, and responsibilities.'
    ),
});
export type SummarizeReferenceOutput = z.infer<typeof SummarizeReferenceOutputSchema>;

export async function summarizeReference(input: SummarizeReferenceInput): Promise<SummarizeReferenceOutput> {
  return summarizeReferenceFlow(input);
}

const summarizeReferencePrompt = ai.definePrompt({
  name: 'summarizeReferencePrompt',
  input: {schema: SummarizeReferenceInputSchema},
  output: {schema: SummarizeReferenceOutputSchema},
  prompt: `You are an AI assistant helping a manager write a reference for a care worker. Your task is to summarize the detailed reference text they provide.

  Please create a concise, professional summary of the following reference, emphasizing the care worker's key skills, qualities, and responsibilities. The summary will be viewed by future potential employers.

  Reference Text: {{{referenceText}}}
  `,
});

const summarizeReferenceFlow = ai.defineFlow(
  {
    name: 'summarizeReferenceFlow',
    inputSchema: SummarizeReferenceInputSchema,
    outputSchema: SummarizeReferenceOutputSchema,
  },
  async input => {
    const {output} = await summarizeReferencePrompt(input);
    return output!;
  }
);

// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that generates a recovery email for an inactive student.
 *
 * - generateRecoveryEmail - A function that handles the email generation process.
 * - GenerateRecoveryEmailInput - The input type for the generateRecoveryEmail function.
 * - GenerateRecoveryEmailOutput - The return type for the generateRecoveryEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecoveryEmailInputSchema = z.object({
  studentName: z.string().describe('The name of the student to address.'),
  lastClass: z.string().describe('The name of the last class the student attended.'),
});
export type GenerateRecoveryEmailInput = z.infer<
  typeof GenerateRecoveryEmailInputSchema
>;

const GenerateRecoveryEmailOutputSchema = z.object({
  subject: z.string().describe('The suggested subject line for the email.'),
  body: z
    .string()
    .describe('The generated body of the recovery email.'),
});
export type GenerateRecoveryEmailOutput = z.infer<
  typeof GenerateRecoveryEmailOutputSchema
>;

export async function generateRecoveryEmail(
  input: GenerateRecoveryEmailInput
): Promise<GenerateRecoveryEmailOutput> {
  return generateRecoveryEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecoveryEmailPrompt',
  input: {schema: GenerateRecoveryEmailInputSchema},
  output: {schema: GenerateRecoveryEmailOutputSchema},
  prompt: `You are an expert marketing assistant for a dance instructor. Your task is to write a friendly, personal, and inviting email to encourage an inactive student to return.

The student's name is {{{studentName}}}.
Their last class was {{{lastClass}}}.

The tone should be warm and personal, not corporate. Make them feel missed.
Offer a 15% discount on their next class or class pack as an incentive to come back.
Keep the email concise and to the point.

Generate a subject line and a body for the email.`,
});

const generateRecoveryEmailFlow = ai.defineFlow(
  {
    name: 'generateRecoveryEmailFlow',
    inputSchema: GenerateRecoveryEmailInputSchema,
    outputSchema: GenerateRecoveryEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

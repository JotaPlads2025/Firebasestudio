// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that generates a recovery email for an inactive student.
 *
 * - generateRecoveryEmail - A function that handles the email generation process.
 * - GenerateRecoveryEmailInput - The input type for the generateRecoveryEmail function.
 * - GenerateRecoveryEmailOutput - The return type for the generateRecoveryEmail function.
 */

// Genkit functionality is temporarily disabled.
export async function generateRecoveryEmail(input: any) {
    console.warn('generateRecoveryEmail is disabled. Install Genkit dependencies to re-enable.');
    return {
      subject: 'Error de IA',
      body: 'La generación de correo con IA está temporalmente deshabilitada. Por favor, escriba el correo manualmente o intente más tarde.'
    };
  }

export type GenerateRecoveryEmailInput = { studentName: string, lastClass: string };
export type GenerateRecoveryEmailOutput = { subject: string, body: string };


/*
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
  prompt: `Eres un asistente de marketing experto para un instructor de baile. Tu tarea es escribir un correo electrónico amigable, personal y atractivo para animar a un estudiante inactivo a que regrese.

El nombre del estudiante es {{{studentName}}}.
Su última clase fue {{{lastClass}}}.

El tono debe ser cálido y personal, no corporativo. Haz que se sienta extrañado.
Ofrece un 15% de descuento en su próxima clase o pack de clases como incentivo para que vuelva.
Mantén el correo conciso y directo.

Genera una línea de asunto y el cuerpo del correo.`,
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
*/

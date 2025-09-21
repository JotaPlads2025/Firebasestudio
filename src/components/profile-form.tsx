"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { generateInstructorProfile } from '@/ai/flows/generate-instructor-profile';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  prompt: z.string().min(20, {
    message: 'Please describe your expertise in at least 20 characters.',
  }),
});

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedProfile(null);
    try {
      const result = await generateInstructorProfile(values);
      setGeneratedProfile(result.profileDraft);
    } catch (error) {
      console.error('Error generating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem generating your profile. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I am a certified yoga instructor with 5 years of experience specializing in Vinyasa and Restorative yoga. I focus on mindfulness and breathwork."
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Profile
          </Button>
        </form>
      </Form>

      {isLoading && (
         <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </div>
      )}

      {generatedProfile && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Generated Draft
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{generatedProfile}</div>
            <div className="flex gap-2 pt-4">
                <Button>Use this profile</Button>
                <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    Regenerate
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                You can edit this draft after accepting it. The AI may produce inaccurate information.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

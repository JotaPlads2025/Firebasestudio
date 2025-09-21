
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
import { Input } from '@/components/ui/input';
import { queryInstructorData } from '@/ai/flows/query-instructor-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  query: z.string().min(10, {
    message: 'Please ask a question with at least 10 characters.',
  }),
});

export default function AiAssistantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedAnswer(null);
    try {
      const result = await queryInstructorData(values);
      setGeneratedAnswer(result.answer);
    } catch (error) {
      console.error('Error querying data:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem querying your data. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Ej: ¿Cuál es la clase con mayor revenue?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Preguntar
          </Button>
        </form>
      </Form>

      {isLoading && (
         <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </div>
      )}

      {generatedAnswer && (
        <Card className="bg-secondary/50">
          <CardContent className="p-4">
             <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{generatedAnswer}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

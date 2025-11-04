'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { InstructorProfile } from '@/lib/types';
import { TikTokIcon, FacebookIcon, LinkedinIcon } from '@/components/ui/icons';
import { Instagram, Globe } from 'lucide-react';


const socialsFormSchema = z.object({
  instagramUrl: z.string().url('URL de Instagram no válida.').or(z.literal('')).optional(),
  tiktokUrl: z.string().url('URL de TikTok no válida.').or(z.literal('')).optional(),
  facebookUrl: z.string().url('URL de Facebook no válida.').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('URL de LinkedIn no válida.').or(z.literal('')).optional(),
  websiteUrl: z.string().url('URL de sitio web no válida.').or(z.literal('')).optional(),
});

type SocialsFormValues = z.infer<typeof socialsFormSchema>;

interface EditSocialsFormProps {
    currentProfile: InstructorProfile | null;
    onSave: () => void;
}

export default function EditSocialsForm({ currentProfile, onSave }: EditSocialsFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<SocialsFormValues>({
    resolver: zodResolver(socialsFormSchema),
    defaultValues: {
      instagramUrl: '',
      tiktokUrl: '',
      facebookUrl: '',
      linkedinUrl: '',
      websiteUrl: '',
    },
  });

  useEffect(() => {
    if (currentProfile) {
        form.reset({
            instagramUrl: currentProfile.instagramUrl || '',
            tiktokUrl: currentProfile.tiktokUrl || '',
            facebookUrl: currentProfile.facebookUrl || '',
            linkedinUrl: currentProfile.linkedinUrl || '',
            websiteUrl: currentProfile.websiteUrl || '',
        });
    }
  }, [currentProfile, form]);

  async function onSubmit(data: SocialsFormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para editar tus redes.' });
      return;
    }
    setIsSubmitting(true);
    
    const profileRef = doc(firestore, 'users', user.uid, 'instructorProfile', 'profile');
    
    try {
        setDocumentNonBlocking(firestore, profileRef, data, { merge: true });
        toast({
            title: "¡Redes Sociales Actualizadas!",
            description: "Tus enlaces han sido guardados.",
        });
        onSave(); // Close dialog on successful save
    } catch (error) {
      console.error("Error updating social links: ", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "No se pudieron guardar tus enlaces. Intenta de nuevo.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="instagramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com/tu_usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktokUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><TikTokIcon className="h-4 w-4" /> TikTok</FormLabel>
              <FormControl>
                <Input placeholder="https://tiktok.com/@tu_usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><FacebookIcon className="h-4 w-4" /> Facebook</FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com/tu_pagina" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><LinkedinIcon className="h-4 w-4" /> LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/tu_perfil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Globe className="h-4 w-4" /> Sitio Web</FormLabel>
              <FormControl>
                <Input placeholder="https://tu-sitio-web.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Enlaces
            </Button>
        </div>
      </form>
    </Form>
  );
}

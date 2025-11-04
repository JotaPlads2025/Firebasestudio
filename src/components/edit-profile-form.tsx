'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { InstructorProfile } from '@/lib/types';

const profileFormSchema = z.object({
  bio: z.string().min(20, 'Tu biografía debe tener al menos 20 caracteres.').max(500, 'La biografía no puede exceder los 500 caracteres.'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface EditProfileFormProps {
    currentProfile: InstructorProfile | null;
    onSave: () => void;
}

export default function EditProfileForm({ currentProfile, onSave }: EditProfileFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: '',
    },
  });

  useEffect(() => {
    if (currentProfile) {
        form.reset({
            bio: currentProfile.bio || ''
        });
    }
  }, [currentProfile, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para editar tu perfil.' });
      return;
    }
    setIsSubmitting(true);
    
    const profileRef = doc(firestore, 'users', user.uid, 'instructorProfile', 'profile');

    const profileData: Partial<InstructorProfile> = {
        bio: data.bio,
        userId: user.uid,
        name: user.displayName || 'Sin nombre',
        contactEmail: user.email || 'Sin email',
    };
    
    try {
        setDocumentNonBlocking(firestore, profileRef, profileData, { merge: true });
        toast({
            title: "¡Perfil Actualizado!",
            description: "Tu biografía ha sido guardada.",
        });
        onSave(); // Close dialog on successful save
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "No se pudo guardar tu perfil. Intenta de nuevo.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobre Mí (Biografía)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntale a tus futuros estudiantes sobre tu pasión, tu experiencia y tu estilo de enseñanza..."
                  className="resize-y"
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
            </Button>
        </div>
      </form>
    </Form>
  );
}

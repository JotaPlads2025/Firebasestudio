'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { InstructorProfile } from '@/lib/types';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories, subCategories, audienceTypes } from '@/lib/categories';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';

const profileFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  bio: z.string().min(20, 'Tu biografía debe tener al menos 20 caracteres.').max(500, 'La biografía no puede exceder los 500 caracteres.').optional(),
  category: z.string().min(1, 'Debes seleccionar una categoría.'),
  styles: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'Tienes que seleccionar al menos un estilo.',
  }),
  audiences: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'Tienes que seleccionar al menos un tipo de público.',
  }),
  isCoaching: z.boolean().default(false),
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
      name: '',
      bio: '',
      category: '',
      styles: [],
      audiences: [],
      isCoaching: false,
    },
  });
  
  const selectedCategory = form.watch('category');

  useEffect(() => {
    if (currentProfile) {
        form.reset({
            name: currentProfile.name || user?.displayName || '',
            bio: currentProfile.bio || '',
            category: currentProfile.category || '',
            styles: currentProfile.styles || [],
            audiences: currentProfile.audiences || [],
            isCoaching: currentProfile.isCoaching || false,
        });
    } else if (user) {
        form.reset({
            name: user.displayName || '',
        })
    }
  }, [currentProfile, user, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para editar tu perfil.' });
      return;
    }
    setIsSubmitting(true);
    
    const profileRef = doc(firestore, 'users', user.uid, 'instructorProfile', 'profile');

    const profileData: Partial<InstructorProfile> = {
        ...data,
        userId: user.uid,
        contactEmail: user.email || undefined,
    };
    
    try {
        await setDocumentNonBlocking(firestore, profileRef, profileData, { merge: true });
        toast({
            title: "¡Perfil Actualizado!",
            description: "Tu perfil profesional ha sido guardado.",
        });
        onSave();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4 max-h-[70vh] overflow-y-auto pr-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Profesional</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre artístico o profesional" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Categoría Principal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu área de expertiz" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />

        {selectedCategory && subCategories[selectedCategory] && (
            <FormField
                control={form.control}
                name="styles"
                render={() => (
                    <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">Estilos de {selectedCategory}</FormLabel>
                        <FormDescription>
                        Selecciona todos los estilos que enseñas.
                        </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subCategories[selectedCategory].map((item) => (
                        <FormField
                        key={item.value}
                        control={form.control}
                        name="styles"
                        render={({ field }) => {
                            return (
                            <FormItem
                                key={item.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(item.value)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), item.value])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== item.value
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">
                                {item.label}
                                </FormLabel>
                            </FormItem>
                            )
                        }}
                        />
                    ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
            />
        )}
        
        <FormField
          control={form.control}
          name="audiences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Público</FormLabel>
                <FormDescription>
                  Define a quién están dirigidas principalmente tus clases.
                </FormDescription>
              </div>
              <div className="flex items-center space-x-6">
                {audienceTypes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="audiences"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.label)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item.label])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.label
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="isCoaching"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Ofreces Coaching Privado?</FormLabel>
                    <FormDescription>
                        Marca esta opción si ofreces clases o sesiones personalizadas 1 a 1.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                </FormItem>
            )}
        />

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
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end sticky bottom-0 bg-background py-4">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
            </Button>
        </div>
      </form>
    </Form>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Users, PartyPopper, Loader2 } from 'lucide-react';
import type { Academy } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useFirebase, useUser } from '@/firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

const academySchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  description: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres.' }),
});

type AcademyFormValues = z.infer<typeof academySchema>;

const AcademyDashboard = ({ academy }: { academy: Academy }) => {
    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <PartyPopper className="h-6 w-6 text-primary" />
                        ¡Felicitaciones, tu academia "{academy.name}" está activa!
                    </CardTitle>
                    <CardDescription>
                        Ahora puedes empezar a invitar a tus instructores y a gestionar tu academia.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Mis Instructores
                    </CardTitle>
                    <CardDescription>
                        Invita y gestiona a los instructores que forman parte de tu academia.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg m-6">
                    <Users className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">Aún no tienes instructores</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Usa el botón de abajo para enviar tu primera invitación.
                    </p>
                    <Button className="mt-6">Invitar Instructor</Button>
                </CardContent>
            </Card>
        </div>
    )
}

const CreateAcademyForm = ({ onAcademyCreated }: { onAcademyCreated: (academy: Academy) => void }) => {
  const { toast } = useToast();
  const { firestore, auth } = useFirebase();
  const { user } = useUser();

  const form = useForm<AcademyFormValues>({
    resolver: zodResolver(academySchema),
    defaultValues: { name: '', description: '' },
  });

  const onSubmit = async (data: AcademyFormValues) => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'Debes iniciar sesión para crear una academia.' });
        return;
    }
    
    try {
        const academyId = `acad-${Date.now()}`;
        const newAcademy: Academy = {
          id: academyId,
          ownerId: user.uid,
          instructorIds: [user.uid],
          ...data,
        };
        
        await setDoc(doc(firestore, 'academies', academyId), newAcademy);
        
        onAcademyCreated(newAcademy);

        toast({
            title: '¡Academia Creada!',
            description: `Tu academia "${data.name}" ha sido creada exitosamente.`,
        });
    } catch (error) {
        console.error("Error creating academy: ", error);
        toast({
            variant: 'destructive',
            title: 'Error al crear la academia',
            description: 'Hubo un problema al guardar los datos. Inténtalo de nuevo.',
        });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Crea tu Academia</CardTitle>
        <CardDescription>
          Centraliza la gestión de tus clases, instructores y alumnos en un solo lugar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Academia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Academia de Baile Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción Corta</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe la misión o el enfoque principal de tu academia..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Esto será visible para los instructores que invites.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Academia
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default function AcademyPage() {
  const [academy, setAcademy] = useState<Academy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  
  useEffect(() => {
    // If no user is logged in after loading, sign in anonymously for demo purposes
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  useEffect(() => {
    if (user) {
      const fetchAcademy = async () => {
        setIsLoading(true);
        const q = query(collection(firestore, "academies"), where("ownerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            // Assuming one user owns one academy for now
            const academyDoc = querySnapshot.docs[0];
            setAcademy({ id: academyDoc.id, ...academyDoc.data() } as Academy);
        } else {
            setAcademy(null);
        }
        setIsLoading(false);
      };

      fetchAcademy();
    } else if (!isUserLoading) {
        setIsLoading(false); // No user, so stop loading
    }
  }, [user, isUserLoading, firestore]);

  const handleAcademyCreation = (newAcademy: Academy) => {
    setAcademy(newAcademy);
  }
  
  if (isLoading || isUserLoading) {
    return (
        <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Building className="h-8 w-8" />
        <h1 className="font-headline text-3xl font-semibold">Mi Academia</h1>
      </div>

      {academy ? (
        <AcademyDashboard academy={academy} />
      ) : (
        <CreateAcademyForm onAcademyCreated={handleAcademyCreation} />
      )}
    </div>
  );
}

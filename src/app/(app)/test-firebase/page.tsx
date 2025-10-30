
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Beaker } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase/provider';
import { collection, addDoc } from 'firebase/firestore';

export default function TestFirebasePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleCreateCollection = async () => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error de Firebase',
        description: 'No se pudo conectar con Firestore. Revisa la configuración.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const testCollectionRef = collection(firestore, 'testCollection');
      const newDocument = {
        message: '¡Hola, Firestore!',
        createdAt: new Date().toISOString(),
        randomNumber: Math.random(),
      };

      const docRef = await addDoc(testCollectionRef, newDocument);

      toast({
        title: '¡Colección creada exitosamente!',
        description: `Documento creado con ID: ${docRef.id}. ¡Revisa tu consola de Firebase!`,
      });
    } catch (error: any) {
        console.error("Error creating test document:", error);
        // Specific check for permission errors
        if (error.code === 'permission-denied') {
             toast({
                variant: 'destructive',
                title: 'Error de Permisos en Firestore',
                description: 'No tienes permisos para escribir en esta colección. Revisa tus Reglas de Seguridad en la consola de Firebase.',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error al crear la colección',
                description: error.message || 'Hubo un problema al intentar escribir en Firestore.',
            });
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Página de Prueba de Firebase</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-6 w-6 text-primary" />
            Crear una Colección en Firestore
          </CardTitle>
          <CardDescription>
            Haz clic en el botón de abajo para crear un nuevo documento en una colección llamada `testCollection`.
            Si la colección no existe, Firestore la creará por ti automáticamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm text-muted-foreground">
              Después de hacer clic, ve a tu <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Consola de Firebase</a>,
              navega a Firestore Database y verás la nueva colección.
            </p>
            <Button onClick={handleCreateCollection} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Beaker className="mr-2 h-4 w-4" />
              )}
              Crear Colección de Prueba
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

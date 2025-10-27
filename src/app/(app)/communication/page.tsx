

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, MessageCircle, Users } from 'lucide-react';

const activeClasses = [
    { id: 'cls-001', name: 'Bachata Básico', members: 60 },
    { id: 'cls-002', name: 'Bachata Open Lady', members: 30 },
    { id: 'cls-003', name: 'Bachata Intermedio', members: 25 },
    { id: 'cls-005', name: 'Bachata Alumnas', members: 20 },
    { id: 'coach-001', name: 'Coaching Personalizado', members: 5 },
    { id: 'bootcamp-001', name: 'Bootcamp Intensivo de Verano', members: 40 },
];

export default function CommunicationPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Comunicación</h1>
      
      <Tabs defaultValue="inbox">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="inbox">
            <MessageCircle className="mr-2 h-4 w-4" />
            Bandeja de Entrada
          </TabsTrigger>
          <TabsTrigger value="forums">
            <Users className="mr-2 h-4 w-4" />
            Foros de Clases
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bandeja de Entrada</CardTitle>
              <CardDescription>
                Conversaciones privadas uno a uno con tus estudiantes. Ideal para cancelaciones, consultas personales y feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg m-6">
              <MessageCircle className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 font-semibold">No hay mensajes aún</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cuando un estudiante te envíe un mensaje directo, aparecerá aquí.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forums" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Foros de Clases</CardTitle>
              <CardDescription>
                Canales de comunicación grupales para cada una de tus clases. Perfectos para anuncios, preguntas generales y fomentar la comunidad.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {activeClasses.map((c) => (
                    <Card key={c.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{c.name}</h3>
                                <p className="text-sm text-muted-foreground">{c.members} miembros</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

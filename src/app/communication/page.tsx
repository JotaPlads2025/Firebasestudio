
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Users } from 'lucide-react';

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
                Conversaciones privadas uno a uno con tus alumnos. Ideal para cancelaciones, consultas personales y feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg m-6">
              <MessageCircle className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 font-semibold">No hay mensajes aún</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cuando un alumno te envíe un mensaje directo, aparecerá aquí.
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
            <CardContent className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg m-6">
                <Users className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-semibold">Aún no hay foros</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Los foros para tus clases activas se mostrarán aquí.
                </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

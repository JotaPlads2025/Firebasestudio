
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Send, Users, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function CommunicationPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Comunicación</h1>

      <Tabs defaultValue="direct-message">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct-message">
             <MessageCircle className="mr-2 h-4 w-4" /> Mensajes Directos
          </TabsTrigger>
          <TabsTrigger value="campaign">
            <Mail className="mr-2 h-4 w-4" /> Campañas de Email
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="direct-message">
            <Card>
                <CardHeader>
                    <CardTitle>Mensajes Directos</CardTitle>
                    <CardDescription>Comunícate directamente con tus estudiantes.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center text-muted-foreground">
                        <MessageCircle className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">
                            Funcionalidad de chat próximamente
                        </p>
                        <p className="mt-1 text-sm">
                            Estamos trabajando en una herramienta de chat para facilitar la comunicación.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="campaign">
          <Card>
            <CardHeader>
              <CardTitle>Campañas de Email</CardTitle>
              <CardDescription>
                Envía anuncios, promociones o noticias a todos tus estudiantes con un solo clic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="audience" className="font-medium text-sm">Destinatarios</label>
                    <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">Todos los estudiantes (342)</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="font-medium text-sm">Asunto</label>
                    <Input id="subject" placeholder="Ej: ¡Nuevas clases de verano!" />
                </div>
                
                 <div className="space-y-2">
                    <label htmlFor="body" className="font-medium text-sm">Contenido del Correo</label>
                    <Textarea id="body" placeholder="Escribe tu mensaje aquí..." rows={8} className="resize-y" />
                </div>
                
                <div className="flex justify-between items-center">
                    <Button variant="outline">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generar con IA
                    </Button>
                    <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Campaña
                    </Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

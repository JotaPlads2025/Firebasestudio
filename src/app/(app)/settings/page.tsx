

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Rocket, PlusCircle, MapPin, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { regions, communesByRegion } from '@/lib/locations';
import { useState } from 'react';
import { venues as initialVenues } from '@/lib/venues-data';
import type { Venue } from '@/lib/types';


const venueSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres.'),
  region: z.string().min(1, 'Debes seleccionar una región.'),
  commune: z.string().min(1, 'Debes seleccionar una comuna.'),
});

const settingsSchema = z.object({
  venues: z.array(venueSchema),
});


export default function SettingsPage() {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [isAddingVenue, setIsAddingVenue] = useState(false);

  // States for notification settings
  const [newBookingsEnabled, setNewBookingsEnabled] = useState(true);
  const [classRemindersEnabled, setClassRemindersEnabled] = useState(true);
  const [cancellationsEnabled, setCancellationsEnabled] = useState(false);
  const [weeklySummaryEnabled, setWeeklySummaryEnabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: '',
      address: '',
      region: '',
      commune: '',
    },
  });

  const selectedRegion = form.watch('region');

  const onSubmit = (data: z.infer<typeof venueSchema>) => {
    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      ...data,
    };
    setVenues(prev => [...prev, newVenue]);
    setIsAddingVenue(false);
    form.reset();
  };

  const removeVenue = (id: string) => {
    setVenues(venues.filter(v => v.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Configuraciones</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Plan Actual</CardTitle>
          <CardDescription>
            Actualmente estás en el plan Gratuito. Mejora a Pro para desbloquear más funciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/pro-plan">
            <Button>
              <Rocket className="mr-2 h-4 w-4" />
              Mejorar a Pro
            </Button>
          </Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Mis Sedes</CardTitle>
          <CardDescription>
            Administra las ubicaciones donde impartes clases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {venues.map((venue, index) => (
              <div key={venue.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div className="space-y-0.5">
                    <p className="font-semibold">{venue.name}</p>
                    <p className="text-sm text-muted-foreground">{venue.address}, {venue.commune}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeVenue(venue.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Eliminar Sede</span>
                </Button>
              </div>
            ))}
          </div>

          {isAddingVenue ? (
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 border border-dashed rounded-lg space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de la Sede</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: Gimnasio FitPro" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: Av. Principal 123" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Región</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una región" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {regions.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="commune"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comuna</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRegion}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una comuna" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {selectedRegion && communesByRegion[selectedRegion]?.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                         <Button variant="ghost" onClick={() => setIsAddingVenue(false)}>Cancelar</Button>
                         <Button type="submit">Guardar Sede</Button>
                    </div>
                </form>
            </Form>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setIsAddingVenue(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir nueva sede
            </Button>
          )}

        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Administra tus notificaciones de Plads Pro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="new-bookings-email" className="text-base">
                Nuevo agendamiento
              </Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones sobre nuevos cupos agendados.
              </p>
            </div>
            <div className='flex items-center gap-4'>
                <Select defaultValue="immediate" disabled={!newBookingsEnabled}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="immediate">Inmediatamente</SelectItem>
                        <SelectItem value="hourly">Resumen cada hora</SelectItem>
                        <SelectItem value="daily">Resumen diario</SelectItem>
                    </SelectContent>
                </Select>
                <Switch 
                    id="new-bookings-email" 
                    checked={newBookingsEnabled}
                    onCheckedChange={setNewBookingsEnabled}
                />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="class-reminders-push" className="text-base">
                Recordatorios de Clases
              </Label>
              <p className="text-sm text-muted-foreground">
                Define cuándo recibir recordatorios de tus próximas clases.
              </p>
            </div>
            <div className='flex items-center gap-4'>
                <Select defaultValue="24" disabled={!classRemindersEnabled}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="24">24 horas antes</SelectItem>
                        <SelectItem value="12">12 horas antes</SelectItem>
                        <SelectItem value="6">6 horas antes</SelectItem>
                        <SelectItem value="1">1 hora antes</SelectItem>
                    </SelectContent>
                </Select>
                <Switch 
                    id="class-reminders-push" 
                    checked={classRemindersEnabled}
                    onCheckedChange={setClassRemindersEnabled}
                />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="cancellations-email" className="text-base">
                Cancelaciones
              </Label>
              <p className="text-sm text-muted-foreground">
                Notifícame cuando se cancele un cupo agendado.
              </p>
            </div>
             <div className='flex items-center gap-4'>
                <Select defaultValue="immediate" disabled={!cancellationsEnabled}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="immediate">Inmediatamente</SelectItem>
                        <SelectItem value="hourly">Resumen cada hora</SelectItem>
                    </SelectContent>
                </Select>
                <Switch 
                    id="cancellations-email"
                    checked={cancellationsEnabled}
                    onCheckedChange={setCancellationsEnabled}
                />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-summary" className="text-base">
                Análisis Semanal
              </Label>
              <p className="text-sm text-muted-foreground">
              Envía un correo semanal con tus métricas clave de rendimiento.
              </p>
            </div>
            <Switch 
                id="weekly-summary" 
                checked={weeklySummaryEnabled}
                onCheckedChange={setWeeklySummaryEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Cuenta</CardTitle>
          <CardDescription>Gestión de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Eliminar cuenta</Button>
          <p className="text-sm text-muted-foreground mt-2">
            Elimina permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

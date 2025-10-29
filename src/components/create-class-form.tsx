
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categories, subCategories } from '@/lib/categories';
import { venues } from '@/lib/venues-data';
import { PlusCircle, Trash2, Clock, CalendarDays, Loader2, Users } from 'lucide-react';
import { Switch } from './ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useAuth, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

const scheduleSchema = z.object({
  day: z.string().min(1, 'Debes seleccionar un día.'),
  startTime: z.string().min(1, 'La hora de inicio es requerida.'),
  endTime: z.string().min(1, 'La hora de fin es requerida.'),
});

const pricePlanSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
    price: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive('El precio debe ser un número positivo.')
    ),
  });

const classFormSchema = z.object({
  name: z.string().min(5, 'El nombre de la clase debe tener al menos 5 caracteres.'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres.'),
  category: z.string().min(1, 'Debes seleccionar una categoría.'),
  subCategory: z.string().optional(),
  level: z.string().min(1, 'Debes seleccionar un nivel.'),
  venueId: z.string().min(1, 'Debes seleccionar una sede.'),
  availability: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive('La capacidad debe ser al menos 1.')
  ),
  schedules: z.array(scheduleSchema).min(1, 'Debes agregar al menos un horario.'),
  pricePlans: z.array(pricePlanSchema).min(1, 'Debes agregar al menos un plan de precios.'),
  isRecurring: z.boolean(),
  status: z.enum(['Active', 'Inactive']),
  bookings: z.number().default(0),
  revenue: z.number().default(0),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const levels = ['Básico', 'Intermedio', 'Avanzado', 'Todos los niveles'];


export default function CreateClassForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const auth = USE_FIREBASE ? useAuth() : null;
  const firestore = USE_FIREBASE ? useFirestore() : null;

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      level: '',
      venueId: '',
      availability: 20,
      schedules: [{ day: '', startTime: '', endTime: '' }],
      pricePlans: [{ name: 'Clase suelta', price: 8000 }],
      isRecurring: true,
      status: 'Active',
      bookings: 0,
      revenue: 0,
    },
  });

  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({
    control: form.control,
    name: "schedules",
  });

  const { fields: pricePlanFields, append: appendPricePlan, remove: removePricePlan } = useFieldArray({
    control: form.control,
    name: "pricePlans",
  });

  const selectedCategory = form.watch('category');

  async function onSubmit(data: ClassFormValues) {
    setIsSubmitting(true);
    
    if (USE_FIREBASE) {
      if (!auth?.currentUser || !firestore) {
        toast({
            variant: 'destructive',
            title: 'Error de autenticación',
            description: 'Debes iniciar sesión para crear una clase.',
        });
        setIsSubmitting(false);
        return;
      }

      const instructorId = auth.currentUser.uid;
      const classesCollectionRef = collection(firestore, `instructors/${instructorId}/classes`);
      
      const newClassData = {
        ...data,
        instructorId: instructorId,
        schedule: data.schedules.map(s => `${s.day} ${s.startTime}`).join(', '), // Simplified schedule string
        scheduleDays: data.schedules.map(s => s.day)
      };

      try {
        await addDocumentNonBlocking(firestore, classesCollectionRef, newClassData);
        toast({
            title: "¡Clase Creada!",
            description: `La clase "${data.name}" ha sido guardada en la base de datos.`,
        });
        router.push('/classes');
      } catch (error) {
        // Error is handled by the global error emitter in addDocumentNonBlocking
        console.error("Error creating class:", error); // console.error for visibility during dev
        toast({
            variant: 'destructive',
            title: 'Error al crear la clase',
            description: 'Hubo un problema al guardar la clase.',
        });
        setIsSubmitting(false);
      }

    } else {
        // --- MODO DEMO ---
        console.log(data);
        toast({
            title: "Clase Creada (Simulación)",
            description: "Los datos de la clase han sido registrados en la consola.",
        });
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/classes');
        }, 1000);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Clase</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Bachata Fusión Nivel Intermedio" {...field} />
              </FormControl>
              <FormDescription>El nombre que verán los estudiantes al buscar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Descripción de la Clase</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Describe los objetivos, el estilo y qué pueden esperar los estudiantes..."
                    className="resize-y"
                    rows={4}
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
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
            <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Estilo / Subcategoría</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCategory || !subCategories[selectedCategory]}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estilo" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {selectedCategory && subCategories[selectedCategory]?.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <FormDescription>Opcional. Especifica un estilo dentro de la categoría.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nivel</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel de la clase" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {levels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="venueId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Sede</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona la ubicación de la clase" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {venues.map(v => <SelectItem key={v.id} value={v.id}>{v.name} - {v.commune}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Capacidad (Cupos)
                    </FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="20" {...field} />
                    </FormControl>
                    <FormDescription>
                        Define el número máximo de estudiantes. Para clases ilimitadas (ej. al aire libre), usa un número alto como 999.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />


        <div>
            <FormLabel className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5" /> Horarios
            </FormLabel>
            <div className="space-y-4">
            {scheduleFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                    <FormField
                        control={form.control}
                        name={`schedules.${index}.day`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Día</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Día" /></SelectTrigger></FormControl>
                                    <SelectContent>{daysOfWeek.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`schedules.${index}.startTime`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora Inicio</FormLabel>
                                <FormControl><Input type="time" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name={`schedules.${index}.endTime`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora Fin</FormLabel>
                                <FormControl><Input type="time" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)} className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            ))}
             <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSchedule({ day: '', startTime: '', endTime: '' })}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir otro horario
            </Button>
            </div>
             <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">Clase Recurrente</FormLabel>
                        <FormDescription>
                            ¿Esta clase se repite todas las semanas con este horario?
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
        </div>
        
        <div>
            <FormLabel className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5" /> Planes de Precios
            </FormLabel>
            <div className="space-y-4">
            {pricePlanFields.map((field, index) => (
                 <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 border rounded-lg">
                     <FormField
                        control={form.control}
                        name={`pricePlans.${index}.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Plan</FormLabel>
                                <FormControl><Input placeholder="Ej: Clase suelta" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`pricePlans.${index}.price`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio (CLP)</FormLabel>
                                <FormControl><Input type="number" placeholder="Ej: 8000" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePricePlan(index)} className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            ))}
             <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendPricePlan({ name: '', price: 0 })}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir otro plan
            </Button>
            </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
             ) : 'Crear Clase'}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Class } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Dumbbell,
  HeartPulse,
  MoreHorizontal,
  Palette,
  PlusCircle,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ClassCalendar from '@/components/class-calendar';
import { useEffect, useState } from 'react';


const initialClassesData: Omit<Class, 'date'>[] = [
  {
    id: 'cls-001',
    name: 'Bachata Básico',
    category: 'Dance',
    schedule: 'Lun, Mie, Vie at 9:00 AM',
    price: 15,
    status: 'Active',
    bookings: 120,
    revenue: 1800,
    daysOffset: 2,
  },
  {
    id: 'cls-002',
    name: 'Bachata Open Lady',
    category: 'Dance',
    schedule: 'Jue, Jue de 6:00 PM',
    price: 40,
    status: 'Active',
    bookings: 30,
    revenue: 3200,
    daysOffset: 3,
  },
  {
    id: 'cls-003',
    name: 'Bachata Intermedio',
    category: 'Dance',
    schedule: 'Sab at 10:00 AM',
    price: 20,
    status: 'Active',
    bookings: 25,
    revenue: 3000,
    daysOffset: 5,
  },
  {
    id: 'cls-004',
    name: 'Bachata Amateur',
    category: 'Dance',
    schedule: 'Dom at 2:00 PM',
    price: 35,
    status: 'Inactive',
    bookings: 0,
    revenue: 0,
    daysOffset: -1, // No date
  },
  {
    id: 'cls-005',
    name: 'Bachata Alumnas',
    category: 'Dance',
    schedule: 'Lun at 7:00 PM',
    price: 10,
    status: 'Active',
    bookings: 20,
    revenue: 950,
    daysOffset: 8,
  },
  {
    id: 'coach-001',
    name: 'Coaching Personalizado de Bachata',
    category: 'Coaching',
    schedule: 'A convenir',
    price: 50,
    status: 'Active',
    bookings: 5,
    revenue: 250,
    daysOffset: 4,
  },
  {
    id: 'bootcamp-001',
    name: 'Bootcamp Intensivo de Verano',
    category: 'Bootcamp',
    schedule: '15-17 de Julio',
    price: 150,
    status: 'Active',
    bookings: 40,
    revenue: 3750,
    daysOffset: 10,
  },
];


const categoryIcons: Record<string, React.ReactNode> = {
  Dance: <Palette className="h-4 w-4" />,
  Sports: <Dumbbell className="h-4 w-4" />,
  Health: <HeartPulse className="h-4 w-4" />,
  Coaching: <Briefcase className="h-4 w-4" />,
  Bootcamp: <Users className="h-4 w-4" />,
};

function ClassesTable({ classes }: { classes: Class[] }) {
  if (classes.length === 0) {
    return <p className="p-4 text-center text-muted-foreground">No hay clases para mostrar en esta categoría.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="hidden md:table-cell">Schedule</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {categoryIcons[c.category]}
                <span>{c.category}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{c.schedule}</TableCell>
            <TableCell className="hidden md:table-cell">
              ${c.price.toFixed(2)}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge variant={c.status === 'Active' ? 'default' : 'secondary'}>
                {c.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [calendarStartDate, setCalendarStartDate] = useState<Date>();

  useEffect(() => {
    const today = new Date();
    const processedClasses = initialClassesData.map(item => {
      if (item.daysOffset !== -1 && item.daysOffset !== undefined) {
        const classDate = new Date();
        classDate.setHours(0, 0, 0, 0); // Normalize time part
        classDate.setDate(today.getDate() + item.daysOffset);
        return { ...item, date: classDate };
      }
      return item;
    }) as Class[];

    const firstClassWithDate = processedClasses.find(c => c.date);
    if(firstClassWithDate) {
      setCalendarStartDate(firstClassWithDate.date);
    }
    setClasses(processedClasses);
  }, []);
  
  if (classes.length === 0) {
    return <div>Cargando clases...</div>;
  }

  const regularClasses = classes.filter((c) => c.category === 'Dance' || c.category === 'Sports' || c.category === 'Health');
  const coachingClasses = classes.filter((c) => c.category === 'Coaching');
  const bootcampClasses = classes.filter((c) => c.category === 'Bootcamp');
  
  const activeClasses = regularClasses.filter((c) => c.status === 'Active');
  const inactiveClasses = regularClasses.filter((c) => c.status === 'Inactive');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Mis Clases</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Crear
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Crear Clase</DropdownMenuItem>
            <DropdownMenuItem>Crear Clase Personalizada</DropdownMenuItem>
            <DropdownMenuItem>Crear Bootcamp</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendario de Clases</CardTitle>
          <CardDescription>
            Visualiza tu programación y los cupos de tus clases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClassCalendar classes={classes} startDate={calendarStartDate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Mis Clases</CardTitle>
            <CardDescription>Clases grupales regulares que impartes.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="active">
            <div className="border-b p-4">
              <TabsList>
                <TabsTrigger value="active">Activa</TabsTrigger>
                <TabsTrigger value="inactive">Inactiva</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="m-0">
              <ClassesTable classes={activeClasses} />
            </TabsContent>
            <TabsContent value="inactive" className="m-0">
              <ClassesTable classes={inactiveClasses} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Clases Personalizadas / Coaches</CardTitle>
            <CardDescription>Sesiones uno a uno o para grupos pequeños.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
              <ClassesTable classes={coachingClasses} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Bootcamps</CardTitle>
            <CardDescription>Eventos intensivos de corta duración.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
              <ClassesTable classes={bootcampClasses} />
        </CardContent>
      </Card>
    </div>
  );
}

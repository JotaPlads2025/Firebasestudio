
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
import type { Class, ScheduleDay } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  ChevronDown,
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


const initialClassesData: Omit<Class, 'date' | 'scheduleDays'> & { scheduleDays?: ScheduleDay[], daysOffset?: number }[] = [
  {
    id: 'cls-001',
    name: 'Bachata Básico',
    category: 'Dance',
    schedule: '9:00 AM',
    scheduleDays: ['Lun', 'Mie', 'Vie'],
    pricePlans: [
      { name: 'Clase suelta', price: 6000 },
      { name: '4 Clases', price: 22000 },
      { name: '8 Clases', price: 45000 },
    ],
    status: 'Active',
    bookings: 60,
    revenue: 1800000,
    venueId: 'venue-001',
  },
  {
    id: 'cls-002',
    name: 'Bachata Open Lady',
    category: 'Dance',
    schedule: '6:00 PM',
    scheduleDays: ['Mar', 'Jue'],
    pricePlans: [
      { name: 'Clase suelta', price: 8000 },
      { name: '4 Clases', price: 30000 },
    ],
    status: 'Active',
    bookings: 30,
    revenue: 3200000,
    venueId: 'venue-001',
  },
  {
    id: 'cls-003',
    name: 'Bachata Intermedio',
    category: 'Dance',
    schedule: '10:00 AM',
    scheduleDays: ['Sab'],
    pricePlans: [
      { name: 'Clase suelta', price: 8000 },
      { name: '4 Clases', price: 30000 },
      { name: '8 Clases', price: 50000 },
    ],
    status: 'Active',
    bookings: 25,
    revenue: 3000000,
    venueId: 'venue-002',
  },
  {
    id: 'cls-004',
    name: 'Bachata Amateur',
    category: 'Dance',
    schedule: '2:00 PM',
    scheduleDays: ['Dom'],
    pricePlans: [{ name: 'Clase suelta', price: 6000 }],
    status: 'Inactive',
    bookings: 0,
    revenue: 0,
    venueId: 'venue-002',
  },
  {
    id: 'cls-005',
    name: 'Bachata Alumnas',
    category: 'Dance',
    schedule: '7:00 PM',
    scheduleDays: ['Lun'],
    pricePlans: [{ name: 'Mensual', price: 6000 }],
    status: 'Active',
    bookings: 20,
    revenue: 950000,
    venueId: 'venue-003',
  },
  {
    id: 'coach-001',
    name: 'Coaching Personalizado de Bachata',
    category: 'Coaching',
    schedule: 'A convenir',
    pricePlans: [{ name: 'Sesión única', price: 50000 }],
    status: 'Active',
    bookings: 5,
    revenue: 250000,
    daysOffset: 4,
    venueId: 'venue-001',
  },
  {
    id: 'bootcamp-001',
    name: 'Bootcamp Intensivo de Verano',
    category: 'Bootcamp',
    schedule: '02-04 de Octubre',
    pricePlans: [{ name: 'Acceso total', price: 150000 }],
    status: 'Active',
    bookings: 40,
    revenue: 3750000,
    daysOffset: 6,
    venueId: 'venue-002',
  },
];


const categoryIcons: Record<string, React.ReactNode> = {
  Dance: <Palette className="h-4 w-4" />,
  Sports: <Dumbbell className="h-4 w-4" />,
  Health: <HeartPulse className="h-4 w-4" />,
  Coaching: <Briefcase className="h-4 w-4" />,
  Bootcamp: <Users className="h-4 w-4" />,
};

const dayNameToIndex: { [key in ScheduleDay]: number } = {
  Dom: 0,
  Lun: 1,
  Mar: 2,
  Mie: 3,
  Jue: 4,
  Vie: 5,
  Sab: 6,
};


function ClassesTable({ classes }: { classes: Class[] }) {
  if (classes.length === 0) {
    return <p className="p-4 text-center text-muted-foreground">No hay clases para mostrar en esta categoría.</p>;
  }

  const uniqueClasses = classes.filter((c, index, self) => self.findIndex(s => s.id === c.id) === index);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="hidden md:table-cell">Schedule</TableHead>
          <TableHead className="hidden md:table-cell">Planes</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uniqueClasses.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {categoryIcons[c.category]}
                <span>{c.category}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {c.scheduleDays ? `${c.scheduleDays.join(', ')} a las ${c.schedule}` : c.schedule}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {c.pricePlans.length === 1 ? (
                `$${c.pricePlans[0].price.toLocaleString('es-CL')}`
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      Ver Planes
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Planes de Precios</DropdownMenuLabel>
                    {c.pricePlans.map((plan) => (
                      <DropdownMenuItem key={plan.name} className="flex justify-between">
                        <span>{plan.name}</span>
                        <span className="font-semibold">${plan.price.toLocaleString('es-CL')}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
    const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - currentDay);
    firstDayOfWeek.setHours(0,0,0,0);


    const processedClasses: Class[] = [];

    initialClassesData.forEach(item => {
      // Handle recurring classes based on scheduleDays
      if (item.scheduleDays && item.scheduleDays.length > 0) {
        item.scheduleDays.forEach(dayName => {
          const targetDayIndex = dayNameToIndex[dayName];
          const date = new Date(firstDayOfWeek);
          date.setDate(firstDayOfWeek.getDate() + targetDayIndex);
          
          processedClasses.push({
            ...item,
            id: `${item.id}-${dayName}`,
            scheduleDays: [dayName],
            date: date,
          } as Class);
        });
      } 
      // Handle non-recurring classes with daysOffset
      else if (item.daysOffset !== undefined && item.daysOffset !== -1) {
        const classDate = new Date();
        classDate.setHours(0, 0, 0, 0); // Normalize time part
        classDate.setDate(today.getDate() + item.daysOffset);
        processedClasses.push({ ...item, date: classDate } as Class);
      } 
      // Handle classes without a specific date
      else {
        processedClasses.push(item as Class);
      }
    });

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
        <ClassesTable classes={coachingClasses} />
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Bootcamps</CardTitle>
            <CardDescription>Eventos intensivos de corta duración.</CardDescription>
        </CardHeader>
        <ClassesTable classes={bootcampClasses} />
      </Card>
    </div>
  );
}

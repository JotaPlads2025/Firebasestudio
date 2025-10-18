
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
  Calendar,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ClassCalendar from '@/components/class-calendar';
import { useEffect, useState, useMemo } from 'react';
import { venues } from '@/lib/venues-data';
import Link from 'next/link';
import { studentData } from '@/lib/student-data';
import AttendeesDialog from '@/components/attendees-dialog';
import { useAuth, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';


const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

const initialClassesData: (Omit<Class, 'date' | 'availability'> & { daysOffset?: number, availability: number })[] = [
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
    availability: 20,
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
    availability: 20,
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
    availability: 20,
    revenue: 3000000,
    venueId: 'venue-002',
  },
  {
    id: 'cls-004',
    name: 'Bachata Amateur',
    category: 'Dance',
    schedule: '2:00 PM',
    scheduleDays: [],
    pricePlans: [{ name: 'Clase suelta', price: 6000 }],
    status: 'Inactive',
    bookings: 0,
    availability: 20,
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
    availability: 20,
    revenue: 950000,
    venueId: 'venue-003',
  },
  {
    id: 'coach-001',
    name: 'Coaching Personalizado de Bachata',
    category: 'Coaching',
    schedule: 'A convenir',
    scheduleDays: [],
    pricePlans: [{ name: 'Sesión única', price: 50000 }],
    status: 'Active',
    bookings: 5,
    availability: 1,
    revenue: 250000,
    daysOffset: 2, // Will appear 2 days from today
    venueId: 'venue-001',
  },
  {
    id: 'bootcamp-001',
    name: 'Bootcamp Intensivo de Verano',
    category: 'Bootcamp',
    schedule: '02-04 de Octubre',
    scheduleDays: [],
    pricePlans: [{ name: 'Acceso total', price: 150000 }],
    status: 'Active',
    bookings: 40,
    availability: 50,
    revenue: 3750000,
    daysOffset: -1, // Does not appear on calendar
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

  // To show recurring classes only once in the list view
  const uniqueClassesMap = new Map<string, Class>();
  classes.forEach(c => {
    // If using firebase data, the id is already unique
    const uniqueId = USE_FIREBASE ? c.id : c.id.split('-').slice(0, 2).join('-');
    if (!uniqueClassesMap.has(uniqueId)) {
        uniqueClassesMap.set(uniqueId, c);
    }
  });
  const uniqueClasses = Array.from(uniqueClassesMap.values());


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
              {c.scheduleDays && c.scheduleDays.length > 0 ? `${c.scheduleDays.join(', ')} a las ${c.schedule}` : c.schedule}
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

function processClassesForCalendar(classes: Class[]): Class[] {
    const processedClasses: Class[] = [];
    const today = new Date();
    // Inconsistent timezone between server and client can cause issues with getDay()
    // Using UTC methods for consistency
    const currentDayOfWeek = today.getUTCDay(); // 0 (Sun) - 6 (Sat)
    
    // Normalize our dayNameToIndex to match getUTCDay() if needed, but our index is already fine.
    // dayNameToIndex: { Dom: 0, Lun: 1, ... }
    
    classes.forEach(item => {
        if (item.scheduleDays && item.scheduleDays.length > 0) {
            item.scheduleDays.forEach(dayName => {
                const targetDayIndex = dayNameToIndex[dayName as ScheduleDay];
                if (targetDayIndex !== undefined) {
                    const date = new Date(today);
                    // Calculate the difference in days to get to the target day of the current week
                    const dayDifference = (targetDayIndex - currentDayOfWeek + 7) % 7;
                    date.setUTCDate(today.getUTCDate() + dayDifference);
                    
                    processedClasses.push({
                        ...item,
                        id: `${item.id}-${dayName}`,
                        date: date,
                    });
                }
            });
        } else if (item.daysOffset !== undefined && item.daysOffset !== -1) {
            const classDate = new Date();
            classDate.setHours(0, 0, 0, 0); 
            classDate.setDate(classDate.getDate() + item.daysOffset);
            processedClasses.push({ ...item, date: classDate });
        } else if (USE_FIREBASE && item.scheduleDays) {
             // Handle classes from Firestore that might not have date/daysOffset but have scheduleDays
             // This is the fallback if the above logic has issues
            processedClasses.push(item);
        }
    });
    return processedClasses;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [calendarStartDate, setCalendarStartDate] = useState<Date>();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Firebase Data ---
  const auth = USE_FIREBASE ? useAuth() : null;
  const firestore = USE_FIREBASE ? useFirestore() : null;
  const classesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !auth?.currentUser) return null;
    return collection(firestore, `instructors/${auth.currentUser.uid}/classes`);
  }, [firestore, auth?.currentUser]);
  const { data: firebaseClasses, isLoading: firebaseLoading } = useCollection<Class>(classesCollectionRef);
  // --- End Firebase Data ---


  useEffect(() => {
    let rawClasses: Class[];

    const calculateNextClassDate = (dayName: ScheduleDay): Date => {
      const today = new Date();
      const currentDayOfWeek = today.getUTCDay(); // 0 (Sun) - 6 (Sat)
      const targetDayIndex = dayNameToIndex[dayName as ScheduleDay];
      const dayDifference = (targetDayIndex - currentDayOfWeek + 7) % 7;
      const nextDate = new Date(today);
      nextDate.setUTCDate(today.getUTCDate() + dayDifference);
      return nextDate;
    };

    if (USE_FIREBASE) {
      if (firebaseLoading) {
        setIsLoading(true);
        return;
      }
      // Use Firebase data if available, otherwise fall back to initial data for demo mode
      rawClasses = (firebaseClasses || []).map(c => ({
          ...c,
          // Process Firebase classes to have date objects
          date: c.scheduleDays && c.scheduleDays.length > 0 ? calculateNextClassDate(c.scheduleDays[0]) : undefined
      }));
    } else {
      rawClasses = initialClassesData as Class[];
    }
    
    const processed = processClassesForCalendar(rawClasses);
    setClasses(processed);
    
    // Set calendar start date based on the first recurring class of the week
    const firstRecurringClass = processed.find(c => c.date && c.scheduleDays && c.scheduleDays.length > 0);
    if(firstRecurringClass && firstRecurringClass.date) {
        const firstDayOfWeekForClass = new Date(firstRecurringClass.date);
        const dayIndex = dayNameToIndex[firstRecurringClass.scheduleDays![0] as ScheduleDay];
        if (dayIndex !== undefined) {
          // Adjust to start of the week (Monday)
          firstDayOfWeekForClass.setDate(firstDayOfWeekForClass.getDate() - dayIndex + 1);
        }
        setCalendarStartDate(firstDayOfWeekForClass);
    } else {
        // Fallback if no recurring classes
        const firstClassWithDate = processed.find(c => c.date);
        if (firstClassWithDate) {
            setCalendarStartDate(firstClassWithDate.date);
        }
    }
    setIsLoading(false);
  }, [firebaseClasses, firebaseLoading]);
  
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  const regularClasses = classes.filter((c) => c.category === 'Dance' || c.category === 'Sports' || c.category === 'Health');
  const coachingClasses = classes.filter((c) => c.category === 'Coaching');
  const bootcampClasses = classes.filter((c) => c.category === 'Bootcamp');
  
  const activeClasses = regularClasses.filter((c) => c.status === 'Active');
  const inactiveClasses = regularClasses.filter((c) => c.status === 'Inactive');

  const handleClassSelect = (cls: Class) => {
    setSelectedClass(cls);
  };

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
            <DropdownMenuItem asChild>
              <Link href="/classes/new">Crear Clase</Link>
            </DropdownMenuItem>
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
          <ClassCalendar 
            classes={classes} 
            startDate={calendarStartDate} 
            venues={venues}
            onClassSelect={handleClassSelect}
            />
        </CardContent>
      </Card>

      <Tabs defaultValue="regular">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regular"><Calendar className="mr-2 h-4 w-4" />Clases Regulares</TabsTrigger>
          <TabsTrigger value="coaching"><Briefcase className="mr-2 h-4 w-4" />Coaching</TabsTrigger>
          <TabsTrigger value="bootcamps"><Dumbbell className="mr-2 h-4 w-4" />Bootcamps y Eventos</TabsTrigger>
        </TabsList>
        <TabsContent value="regular" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Mis Clases Regulares</CardTitle>
                <CardDescription>Clases grupales que impartes con un horario fijo.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="active">
                <div className="border-b p-4">
                  <TabsList>
                    <TabsTrigger value="active">Activas</TabsTrigger>
                    <TabsTrigger value="inactive">Inactivas</TabsTrigger>
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
        </TabsContent>
        <TabsContent value="coaching" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Clases Personalizadas / Coaching</CardTitle>
                <CardDescription>Sesiones uno a uno o para grupos pequeños con horarios flexibles.</CardDescription>
            </Header>
            <CardContent className="p-0">
                <ClassesTable classes={coachingClasses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bootcamps" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Bootcamps y Eventos Especiales</CardTitle>
                <CardDescription>Eventos intensivos o de corta duración sin un horario recurrente.</CardDescription>
            </Header>
            <CardContent className="p-0">
                <ClassesTable classes={bootcampClasses} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedClass && (
        <AttendeesDialog
          open={!!selectedClass}
          onOpenChange={(isOpen) => !isOpen && setSelectedClass(null)}
          classData={selectedClass}
          students={studentData}
          venues={venues}
        />
      )}
    </div>
  );
}

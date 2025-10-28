
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  List,
  Calendar,
  Briefcase,
  Dumbbell,
  BookOpenCheck,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { add, format, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import ClassCalendar from '@/components/class-calendar';
import type { Class, Venue } from '@/lib/types';
import { studentData } from '@/lib/student-data';
import { venues as initialVenues } from '@/lib/venues-data';
import AttendeesDialog from '@/components/attendees-dialog';
import { useAuth, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';


const dayNameToIndex: Record<string, number> = {
  Lun: 1, Mar: 2, Mie: 3, Jue: 4, Vie: 5, Sab: 6, Dom: 0,
};

const getDayAbbreviation = (day: string) => {
    switch (day) {
        case 'Lunes': return 'Lun';
        case 'Martes': return 'Mar';
        case 'Miércoles': return 'Mie';
        case 'Jueves': return 'Jue';
        case 'Viernes': return 'Vie';
        case 'Sábado': return 'Sab';
        case 'Domingo': return 'Dom';
        default: return day.slice(0, 3);
    }
}

// Generate calendar events from recurring classes
const generateCalendarEvents = (classes: Class[], month: Date): Class[] => {
    if (!classes) return [];
    const events: Class[] = [];
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const interval = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });
  
    interval.forEach(day => {
      classes.forEach(cls => {
        const scheduleDays = cls.schedules?.map(s => getDayAbbreviation(s.day));
        const dayOfWeek = day.getDay(); // Sunday is 0, Monday is 1, etc.
  
        if (cls.status === 'Active' && scheduleDays && scheduleDays.some(scheduleDay => dayNameToIndex[scheduleDay] === dayOfWeek)) {
          events.push({
            ...cls,
            id: `${cls.id}-${format(day, 'yyyy-MM-dd')}`,
            date: day,
          });
        }
      });
    });
    return events;
  };


export default function ClassesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('calendar'); // 'list' or 'calendar'
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAttendeesDialogOpen, setIsAttendeesDialogOpen] = useState(false);
  
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const classesRef = useMemoFirebase(() => {
    if (!auth?.currentUser || !firestore) return null;
    return collection(firestore, 'instructors', auth.currentUser.uid, 'classes');
  }, [auth?.currentUser, firestore]);
  
  const { data: classesData, isLoading: isLoadingClasses } = useCollection<Class>(classesRef);
  const [localClasses, setLocalClasses] = useState<Class[] | null>(classesData);

  useEffect(() => {
    setLocalClasses(classesData);
  }, [classesData]);

  const calendarEvents = useMemo(() => {
    return generateCalendarEvents(localClasses || [], currentMonth);
  }, [localClasses, currentMonth]);

  const { regularClasses, coachingClasses, bootcampClasses } = useMemo(() => {
    const regular: Class[] = [];
    const coaching: Class[] = [];
    const bootcamp: Class[] = [];

    (localClasses || []).forEach(cls => {
        switch (cls.category) {
            case 'Coaching':
                coaching.push(cls);
                break;
            case 'Bootcamp':
                bootcamp.push(cls);
                break;
            default: // Dance, Sports, Health
                regular.push(cls);
                break;
        }
    });

    return { regularClasses: regular, coachingClasses: coaching, bootcampClasses: bootcamp };
  }, [localClasses]);


  const handleClassSelect = (cls: Class) => {
    setSelectedClass(cls);
    setIsAttendeesDialogOpen(true);
  };
  
  const handleAttendeesDialogClose = () => {
    setIsAttendeesDialogOpen(false);
    setSelectedClass(null);
  }

  const handleStatusChange = async (classId: string, newStatus: boolean) => {
    if (!firestore || !auth?.currentUser) return;

    const status = newStatus ? 'Active' : 'Inactive';
    const classRef = doc(firestore, 'instructors', auth.currentUser.uid, 'classes', classId);

    try {
        await updateDoc(classRef, { status });

        // Optimistically update local state
        setLocalClasses(prev => 
            prev!.map(cls => cls.id === classId ? { ...cls, status } : cls)
        );

        toast({
            title: "¡Estado actualizado!",
            description: `La clase ha sido marcada como ${status.toLowerCase()}.`
        });
    } catch (error) {
        console.error("Error updating class status:", error);
        toast({
            variant: "destructive",
            title: "Error al actualizar",
            description: "No se pudo cambiar el estado de la clase."
        });
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(add(currentMonth, { months: -1 }));
  };

  const goToNextMonth = () => {
    setCurrentMonth(add(currentMonth, { months: 1 }));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
  };


 const renderClassTable = (classes: Class[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Clase</TableHead>
          <TableHead className="text-center">Cupos</TableHead>
          <TableHead className="text-right">Estado (Activo/Inactivo)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.length > 0 ? (
          classes.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell className="font-medium">{cls.name}</TableCell>
              <TableCell className="text-center">{cls.availability}</TableCell>
              <TableCell className="text-right">
                <Switch
                  checked={cls.status === 'Active'}
                  onCheckedChange={(checked) => handleStatusChange(cls.id, checked)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center h-24">
              No tienes clases en esta categoría.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Mis Clases</h1>
        <Link href="/classes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Clase
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="sm" onClick={goToToday}>
                  Hoy
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
             <div className="hidden items-center gap-2 rounded-md bg-muted p-1 sm:flex">
                <Button variant={view === 'calendar' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('calendar')} className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendario
                </Button>
                <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="gap-2">
                    <List className="h-4 w-4" />
                    Lista
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === 'calendar' ? (
              <ClassCalendar 
                classes={calendarEvents} 
                startDate={currentMonth} 
                venues={initialVenues}
                onClassSelect={handleClassSelect}
             />
          ) : (
             <div>
                <p className="text-muted-foreground text-center">La vista de lista estará disponible próximamente.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clases</CardTitle>
          <CardDescription>
            Activa o desactiva tus clases, coachings y bootcamps desde aquí.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="regular">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="regular">
                <BookOpenCheck className="mr-2 h-4 w-4" />
                Clases Regulares
              </TabsTrigger>
              <TabsTrigger value="coaching">
                <Dumbbell className="mr-2 h-4 w-4" />
                Coaching
              </TabsTrigger>
              <TabsTrigger value="bootcamp">
                <Briefcase className="mr-2 h-4 w-4" />
                Bootcamps
              </TabsTrigger>
            </TabsList>
            <TabsContent value="regular" className="mt-4">
              {renderClassTable(regularClasses)}
            </TabsContent>
            <TabsContent value="coaching" className="mt-4">
              {renderClassTable(coachingClasses)}
            </TabsContent>
            <TabsContent value="bootcamp" className="mt-4">
              {renderClassTable(bootcampClasses)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>


      {selectedClass && (
        <AttendeesDialog
          open={isAttendeesDialogOpen}
          onOpenChange={handleAttendeesDialogClose}
          classData={selectedClass}
          students={studentData}
          venues={initialVenues}
        />
      )}
    </div>
  );
}

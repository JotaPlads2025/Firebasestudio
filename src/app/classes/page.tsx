
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
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  List,
  Calendar,
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
import { collection, query } from 'firebase/firestore';


const dayNameToIndex: Record<string, number> = {
  Lun: 1, Mar: 2, Mie: 3, Jue: 4, Vie: 5, Sab: 6, Dom: 0,
};

// Generate calendar events from recurring classes
const generateCalendarEvents = (classes: Class[], month: Date): Class[] => {
  if (!classes) return [];
  const events: Class[] = [];
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const interval = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });

  interval.forEach(day => {
    classes.forEach(cls => {
      const scheduleDays = cls.scheduleDays?.map(d => d.slice(0, 3));
      const dayOfWeek = day.getDay(); // Sunday is 0

      if (scheduleDays && scheduleDays.some(scheduleDay => dayNameToIndex[scheduleDay] === dayOfWeek)) {
        events.push({
          ...cls,
          id: `${cls.id}-${format(day, 'yyyy-MM-dd')}`,
          date: day,
          // Bookings and revenue would be fetched for this specific instance in a real app
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

  const classesRef = useMemoFirebase(() => {
    if (!auth?.currentUser || !firestore) return null;
    return collection(firestore, 'instructors', auth.currentUser.uid, 'classes');
  }, [auth?.currentUser, firestore]);
  
  const { data: classesData, isLoading: isLoadingClasses } = useCollection<Class>(classesRef);
  
  const calendarEvents = useMemo(() => {
    return generateCalendarEvents(classesData || [], currentMonth);
  }, [classesData, currentMonth]);


  const handleClassSelect = (cls: Class) => {
    setSelectedClass(cls);
    setIsAttendeesDialogOpen(true);
  };
  
  const handleAttendeesDialogClose = () => {
    setIsAttendeesDialogOpen(false);
    setSelectedClass(null);
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(add(currentMonth, { months: -1 }));
  };

  const goToNextMonth = () => {
    setCurrentMonth(add(currentMonth, { months: 1 }));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
  };


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

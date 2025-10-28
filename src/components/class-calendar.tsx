
'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import type { Class, Venue } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';

interface ClassCalendarProps {
  classes: Class[];
  startDate?: Date;
  venues: Venue[];
  onClassSelect: (cls: Class) => void;
}

export default function ClassCalendar({ classes, startDate, venues, onClassSelect }: ClassCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(startDate);
  
  useEffect(() => {
    if (startDate) {
      setDate(startDate);
    }
  }, [startDate]);


  const classesByDate = classes.reduce((acc, cls) => {
    if (cls.date) {
      const dateKey = cls.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(cls);
    }
    return acc;
  }, {} as Record<string, Class[]>);

  const getDaysForCategory = (categories: string[]) => {
    const dates = new Set<string>();
    classes
      .filter(c => c.date && categories.includes(c.category))
      .forEach(c => dates.add(c.date!.toISOString().split('T')[0]));
    return Array.from(dates).map(d => new Date(d));
  };
  
  const regularClassDays = getDaysForCategory(['Dance', 'Sports', 'Health']);
  const coachingDays = getDaysForCategory(['Coaching']);
  const bootcampDays = getDaysForCategory(['Bootcamp']);
  
  const selectedDayClasses = date
    ? classes.filter((cls) => cls.date && isSameDay(cls.date, date))
    : [];
    
  const getVenueName = (venueId: string) => {
    return venues.find(v => v.id === venueId)?.name || 'Sede no especificada';
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        locale={es}
        modifiers={{
          regularClass: regularClassDays,
          coaching: coachingDays,
          bootcamp: bootcampDays,
        }}
        modifiersClassNames={{
          regularClass: 'day-regular-class',
          coaching: 'day-coaching',
          bootcamp: 'day-bootcamp',
        }}
        // The key forces a re-render when the startDate changes, ensuring the calendar shows the correct month.
        key={startDate?.toISOString()}
        defaultMonth={startDate}
      />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              Clases para{' '}
              {date ? date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : '...'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDayClasses.length > 0 ? (
              selectedDayClasses.map((cls) => (
                <Card 
                    key={cls.id}
                    className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onClassSelect(cls)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                       <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {getVenueName(cls.venueId)}
                      </p>
                    </div>
                    <div className='text-right'>
                        <Badge variant="secondary" className="mb-2">
                        {cls.bookings} Cupos
                        </Badge>
                         <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                            <Users className="h-3 w-3 mr-1"/>
                            Ver Asistentes
                        </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No hay clases programadas para este día.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

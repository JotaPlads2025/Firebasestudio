
'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import type { Class } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { isSameDay } from 'date-fns';

interface ClassCalendarProps {
  classes: Class[];
}

export default function ClassCalendar({ classes }: ClassCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

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

  const eventDays = Object.keys(classesByDate).map((dateKey) => new Date(dateKey));

  const selectedDayClasses = date
    ? classes.filter((cls) => cls.date && isSameDay(cls.date, date))
    : [];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          events: eventDays,
        }}
        modifiersClassNames={{
          events: 'bg-primary/20 rounded-full',
        }}
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
                <div key={cls.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-semibold">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                  </div>
                  <Badge variant="secondary">
                    {cls.bookings} Cupos
                  </Badge>
                </div>
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

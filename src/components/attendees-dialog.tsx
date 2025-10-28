
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Class, Student, Venue } from '@/lib/types';
import { isSameDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import type { Booking } from '@/lib/student-data';

interface Attendee extends Student {
  booking: Booking;
}

interface AttendeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class;
  students: Student[];
  venues: Venue[];
}

export default function AttendeesDialog({
  open,
  onOpenChange,
  classData,
  students,
  venues
}: AttendeesDialogProps) {
  
  // Use a state for attendees to manage their attendance status locally
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useState(() => {
    if (classData) {
      const classIdWithoutDay = classData.id.split('-').slice(0, -1).join('-');
      const filteredAttendees = students
        .map(student => {
          const relevantBooking = student.bookings.find(booking =>
            booking.classId === classIdWithoutDay &&
            classData.date &&
            isSameDay(new Date(booking.date), classData.date)
          );
          return relevantBooking ? { ...student, booking: relevantBooking } : null;
        })
        .filter((item): item is Attendee => item !== null);
        
      setAttendees(filteredAttendees);
    }
  }, [classData, students]);


  if (!classData) return null;

  const handleAttendanceChange = (studentId: string, checked: boolean) => {
    setAttendees(prev =>
      prev.map(attendee =>
        attendee.studentId === studentId
          ? {
              ...attendee,
              booking: { ...attendee.booking, attendance: checked ? 'Presente' : 'Ausente' },
            }
          : attendee
      )
    );
    // Here you would typically also trigger a mutation to update the backend
  };

  const venueName = venues.find(v => v.id === classData.venueId)?.name || 'Sede no especificada';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Asistentes: {classData.name}</DialogTitle>
          <DialogDescription>
            {classData.date?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}, {classData.schedule} en {venueName}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
            <div className="mb-4 text-center text-sm font-semibold text-muted-foreground">
                {attendees.length} de {classData.bookings} cupos ocupados
            </div>
            {attendees.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Estudiante</TableHead>
                            <TableHead>Estado del Pago</TableHead>
                            <TableHead className="text-right">Asistencia</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendees.map(attendee => (
                            <TableRow key={attendee.studentId}>
                                <TableCell className='flex items-center gap-3'>
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${attendee.studentId}/100/100`} />
                                        <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{attendee.name}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={attendee.booking.paymentStatus === 'Pagado' ? 'default' : 'destructive'}
                                       className={attendee.booking.paymentStatus === 'Pagado' ? 'bg-green-600/80 text-white' : ''}>
                                        {attendee.booking.paymentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Switch
                                        checked={attendee.booking.attendance === 'Presente'}
                                        onCheckedChange={(checked) => handleAttendanceChange(attendee.studentId, checked)}
                                        aria-label={`Marcar asistencia para ${attendee.name}`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <Users className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">No hay asistentes</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Aún no se ha agendado ningún estudiante para esta clase.
                    </p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

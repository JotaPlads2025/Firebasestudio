
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Class, Student, Venue } from '@/lib/types';
import { isSameDay } from 'date-fns';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

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
  if (!classData) return null;

  const classIdWithoutDay = classData.id.split('-').slice(0, -1).join('-');

  const attendees = students.filter(student =>
    student.bookings.some(booking =>
      booking.classId === classIdWithoutDay &&
      classData.date &&
      isSameDay(new Date(booking.date), classData.date)
    )
  );
  
  const venueName = venues.find(v => v.id === classData.venueId)?.name || 'Sede no especificada';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendees.map(student => (
                            <TableRow key={student.studentId}>
                                <TableCell className='flex items-center gap-3'>
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${student.studentId}/100/100`} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{student.name}</span>
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

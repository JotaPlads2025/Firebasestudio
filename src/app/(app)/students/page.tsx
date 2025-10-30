
'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { studentData } from '@/lib/student-data';
import { differenceInDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, Loader2 } from 'lucide-react';
import StudentProfileDialog from '@/components/student-profile-dialog';
import type { StudentWithDetails } from '@/lib/types';

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<StudentWithDetails | null>(null);
  const [processedStudents, setProcessedStudents] = useState<StudentWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform calculations on the client-side to avoid hydration mismatch
    const now = new Date();
    const studentsWithDetails = studentData.map(student => {
      const totalBookings = student.bookings.length;
      
      const lastBooking = student.bookings.reduce((latest, booking) => {
        const latestDate = latest ? parseISO(latest.date) : new Date(0);
        const bookingDate = parseISO(booking.date);
        return bookingDate > latestDate ? booking : latest;
      }, null as typeof student.bookings[0] | null);

      let lastAttendance = 'Nunca';
      let status: 'Activo' | 'Inactivo' | 'Nuevo' = 'Nuevo';

      if (lastBooking) {
        const lastDate = parseISO(lastBooking.date);
        const daysSinceLastBooking = differenceInDays(now, lastDate);
        lastAttendance = lastDate.toLocaleDateString('es-CL');

        if (daysSinceLastBooking <= 30) {
          status = 'Activo';
        } else {
          status = 'Inactivo';
        }
      }

      const attendedCount = student.bookings.filter(b => b.attendance === 'Presente').length;
      const attendanceRate = totalBookings > 0 ? Math.round((attendedCount / totalBookings) * 100) : 0;

      return {
        ...student,
        totalBookings,
        lastAttendance,
        status,
        attendanceRate,
      };
    });
    setProcessedStudents(studentsWithDetails);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
        <div className="flex h-full w-full items-center justify-center p-16">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Mis Estudiantes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Estudiantes</CardTitle>
          <CardDescription>
            Aquí puedes ver y administrar a todos tus estudiantes en un solo lugar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Clases Totales</TableHead>
                <TableHead>Última Asistencia</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedStudents.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                       <Avatar>
                          <AvatarImage src={`https://picsum.photos/seed/${student.studentId}/100/100`} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === 'Activo' ? 'default' : 
                        student.status === 'Inactivo' ? 'destructive' : 'secondary'
                      }
                      className={cn(student.status === 'Activo' && 'bg-green-600/80')}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{student.totalBookings}</TableCell>
                  <TableCell className="text-muted-foreground">{student.lastAttendance}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(student)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {selectedStudent && (
        <StudentProfileDialog
          student={selectedStudent}
          open={!!selectedStudent}
          onOpenChange={(isOpen) => !isOpen && setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

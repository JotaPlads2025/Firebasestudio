
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { StudentWithDetails } from '@/lib/types';
import { demoClasses } from '@/lib/demo-data';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Percent, Calendar, Hash } from 'lucide-react';
import { parseISO } from 'date-fns';

interface StudentProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentWithDetails;
}

const StatCard = ({ title, value, icon: Icon, change }: { title: string, value: string | number, icon: React.ElementType, change?: number }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-2">
        <CardTitle className="text-xs font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-xl font-bold">{value}</div>
        {change !== undefined && (
             <p className={cn(
                "text-xs text-muted-foreground",
                change >= 0 ? "text-green-600" : "text-destructive"
             )}>
            {change >= 0 ? '+' : ''}{change}% desde el último mes
          </p>
        )}
      </CardContent>
    </Card>
);

export default function StudentProfileDialog({
  open,
  onOpenChange,
  student,
}: StudentProfileDialogProps) {
  if (!student) return null;

  const getClassName = (classId: string) => {
    // In a real app, this might involve a more complex lookup
    const cls = demoClasses.find(c => c.id === classId);
    return cls ? cls.name : 'Clase Desconocida';
  };
  
  const sortedBookings = [...student.bookings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://picsum.photos/seed/${student.studentId}/100/100`} />
            <AvatarFallback className="text-xl">{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-2xl mb-1">{student.name}</DialogTitle>
            <DialogDescription>
              Se unió el {new Date(student.joinDate).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogDescription>
             <Badge
                variant={
                    student.status === 'Activo' ? 'default' : 
                    student.status === 'Inactivo' ? 'destructive' : 'secondary'
                }
                className={cn('mt-2', student.status === 'Activo' && 'bg-green-600/80')}
            >
                {student.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="my-4 grid grid-cols-2 gap-4">
            <StatCard title="Clases Totales" value={student.totalBookings} icon={Hash} />
            <StatCard title="Tasa de Asistencia" value={`${student.attendanceRate}%`} icon={Percent} change={student.attendanceRate > 80 ? 5 : -5} />
            <StatCard title="Última Clase" value={student.lastAttendance} icon={Calendar} />
            <StatCard title="Racha" value="3 clases" icon={TrendingUp} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Clases</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clase</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead className="text-right">Asistencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBookings.map((booking, index) => (
                    <TableRow key={`${booking.classId}-${booking.date}-${index}`}>
                      <TableCell className="font-medium">{getClassName(booking.classId)}</TableCell>
                      <TableCell>{parseISO(booking.date).toLocaleDateString('es-CL')}</TableCell>
                      <TableCell>
                         <Badge variant={booking.paymentStatus === 'Pagado' ? 'secondary' : 'outline'}
                            className={cn(booking.paymentStatus === 'Pagado' ? 'border-green-600/50' : 'border-amber-500/50')}
                         >
                            {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Badge variant={booking.attendance === 'Presente' ? 'default' : booking.attendance === 'Ausente' ? 'destructive' : 'secondary'}
                             className={cn(booking.attendance === 'Presente' && 'bg-green-600/80')}
                         >
                            {booking.attendance}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

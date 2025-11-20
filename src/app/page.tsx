
'use client';

import { useState, useMemo } from 'react';
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
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Mail, Users, DollarSign, Target, Activity, Dumbbell, Briefcase, Download, Loader2 } from 'lucide-react';
import AiAssistantForm from '@/components/ai-assistant-form';
import { cn } from '@/lib/utils';
import { MultiSelectFilter, type Option } from '@/components/ui/multi-select-filter';
import { venues as initialVenues } from '@/lib/venues-data';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Class } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import RecoveryEmailDialog from '@/components/recovery-email-dialog';

const monthOptions: Option[] = [
    { value: 'all', label: 'Todos los Meses' },
    { value: 'Ene', label: 'Enero' }, { value: 'Feb', label: 'Febrero' },
    { value: 'Mar', label: 'Marzo' }, { value: 'Abr', label: 'Abril' },
    { value: 'May', label: 'Mayo' }, { value: 'Jun', label: 'Junio' },
    { value: 'Jul', label: 'Julio' }, { value: 'Ago', label: 'Agosto' },
    { value: 'Sep', label: 'Septiembre' }, { value: 'Oct', label: 'Octubre' },
    { value: 'Nov', label: 'Noviembre' }, { value: 'Dic', label: 'Diciembre' },
];

const dayOptions: Option[] = [
    { value: 'all', label: 'Todos los Días' },
    { value: 'Lun', label: 'Lunes' }, { value: 'Mar', label: 'Martes' },
    { value: 'Mie', label: 'Miércoles' }, { value: 'Jue', label: 'Jueves' },
    { value: 'Vie', label: 'Viernes' }, { value: 'Sab', label: 'Sábado' },
    { value: 'Dom', label: 'Domingo' },
];

const classTypeOptions: Option[] = [
    { value: 'all', label: 'Todas las Clases' },
    { value: 'Dance', label: 'Clases Regulares' },
    { value: 'Coaching', label: 'Coaching' },
    { value: 'Bootcamp', label: 'Bootcamps' },
];

const venueOptions: Option[] = [
    { value: 'all', label: 'Todas las Sedes' },
    ...initialVenues.map(v => ({ value: v.id, label: v.name })),
  ];

export default function Dashboard() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>(['all']);
  const [selectedDays, setSelectedDays] = useState<string[]>(['all']);
  const [selectedClassTypes, setSelectedClassTypes] = useState<string[]>(['all']);
  const [selectedVenues, setSelectedVenues] = useState<string[]>(['all']);
  const [inactiveStudents, setInactiveStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const { user } = useUser();
  const firestore = useFirestore();

  const classesRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'instructors', user.uid, 'classes');
  }, [user, firestore]);
  
  const { data: classes, isLoading: isLoadingClasses } = useCollection<Class>(classesRef);


  const filteredData = useMemo(() => {
    if (!classes) return [];
    // This is a placeholder. Real filtering would be more complex.
    return classes;
  }, [classes, selectedMonths, selectedDays, selectedClassTypes, selectedVenues]);

  const aggregatedKpis = useMemo(() => {
    if (!classes) {
        return { revenue: 0, newStudents: 0, retention: 0, activeClasses: 0, coaching: 0, bootcamps: 0 };
    }
    
    const activeClasses = classes.filter(c => c.status === 'Active');
    const coaching = activeClasses.filter(c => c.category === 'Coaching').length;
    const bootcamps = activeClasses.filter(c => c.category === 'Bootcamp').length;

    return {
      revenue: classes.reduce((acc, cls) => acc + (cls.revenue || 0), 0),
      newStudents: 0, // Placeholder
      retention: 0, // Placeholder
      activeClasses: activeClasses.length,
      coaching: coaching,
      bootcamps: bootcamps,
    };
  }, [classes]);

  const kpiData = [
    {
      title: 'Ingresos Totales',
      value: `$${aggregatedKpis.revenue.toLocaleString('es-CL')}`,
      change: 'N/A',
      icon: DollarSign,
    },
    {
      title: 'Nuevos Alumnos',
      value: aggregatedKpis.newStudents.toString(),
      change: 'N/A',
      icon: Users,
    },
    {
      title: 'Tasa de Retención',
      value: `${aggregatedKpis.retention}%`,
      change: 'N/A',
      icon: Target,
    },
     {
      title: 'Clases Activas',
      value: aggregatedKpis.activeClasses.toString(),
      change: '', 
      icon: Activity,
    },
    {
      title: 'Coaching Activos',
      value: aggregatedKpis.coaching.toString(),
      change: '',
      icon: Dumbbell,
    },
    {
      title: 'Bootcamps Activos',
      value: aggregatedKpis.bootcamps.toString(),
      change: '',
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-semibold">
            ¡Hola de nuevo, {user?.displayName?.split(' ')[0] || 'Artista'}!
        </h1>
        <p className="text-muted-foreground mt-1">
            Qué bueno verte. Sigamos inspirando al mundo a través del movimiento.
        </p>
      </div>

        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>
                            Selecciona uno o más filtros para visualizar tus datos (funcionalidad en desarrollo).
                        </CardDescription>
                    </div>
                     <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar Excel
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MultiSelectFilter
                    title="Mes"
                    options={monthOptions}
                    selectedValues={selectedMonths}
                    onSelectionChange={setSelectedMonths}
                />
                <MultiSelectFilter
                    title="Día de la semana"
                    options={dayOptions}
                    selectedValues={selectedDays}
                    onSelectionChange={setSelectedDays}
                />
                <MultiSelectFilter
                    title="Tipo de Clase"
                    options={classTypeOptions}
                    selectedValues={selectedClassTypes}
                    onSelectionChange={setSelectedClassTypes}
                />
                <MultiSelectFilter
                    title="Sede"
                    options={venueOptions}
                    selectedValues={selectedVenues}
                    onSelectionChange={setSelectedVenues}
                />
            </CardContent>
        </Card>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {isLoadingClasses ? (
            Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-6 w-1/2 rounded-md bg-muted animate-pulse" />
                    </CardContent>
                </Card>
            ))
        ) : (
            kpiData.map((kpi) => (
            <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-bold text-primary">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                {kpi.change !== '' && (
                    <p className={cn(
                        "text-xs font-bold",
                        kpi.change.startsWith('+') ? 'text-green-600' : 
                        kpi.change === 'N/A' ? 'text-muted-foreground' : 'text-destructive'
                    )}>
                        {kpi.change !== 'N/A' ? `${kpi.change} desde el mes pasado` : 'Datos no disponibles'}
                    </p>
                )}
                </CardContent>
            </Card>
            ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asistente de IA</CardTitle>
          <CardDescription>
            Haz preguntas en lenguaje natural sobre tus datos de rendimiento (Datos de demo).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiAssistantForm />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Rendimiento General</CardTitle>
            <CardDescription>
              Una vista general de tus ingresos y crecimiento de alumnos (Gráfico en desarrollo).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${new Intl.NumberFormat('es-CL').format(value)}`}
                />
                <Tooltip
                    contentStyle={{ 
                        backgroundColor: "hsl(var(--background))", 
                        border: "1px solid hsl(var(--border))"
                    }}
                 />
                <Legend />
                <Line
                  type="natural"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                  name="Ingresos"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Detalle de Rendimiento por Clase</CardTitle>
          <CardDescription>
            Un resumen del rendimiento de cada clase que impartes.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isLoadingClasses ? (
                <div className="flex h-48 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Clase</TableHead>
                        <TableHead className="text-right">Ingresos</TableHead>
                        <TableHead className="text-right">Cupos</TableHead>
                        <TableHead className="text-right">% Retención</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredData.length > 0 ? (
                        filteredData.map((cls) => (
                            <TableRow key={cls.id}>
                            <TableCell className="font-medium">{cls.name}</TableCell>
                            <TableCell className="text-right">${(cls.revenue || 0).toLocaleString('es-CL')}</TableCell>
                            <TableCell className="text-right">{cls.availability}</TableCell>
                            <TableCell className="text-right">N/A</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                No tienes clases creadas.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recupera Alumnos Inactivos</CardTitle>
          <CardDescription>
            Contacta a alumnos que no han vuelto a agendar clases recientemente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Última Clase</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inactiveStudents.length > 0 ? (
                inactiveStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{student.lastClass}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contactar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No hay alumnos inactivos por contactar en este momento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedStudent && (
        <RecoveryEmailDialog
            open={!!selectedStudent}
            onOpenChange={() => setSelectedStudent(null)}
            studentName={selectedStudent.name}
            lastClass={selectedStudent.lastClass}
        />
      )}
    </div>
  );
}

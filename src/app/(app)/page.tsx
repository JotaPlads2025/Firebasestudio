

'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  BookCopy,
  CalendarCheck,
  Download,
  DollarSign,
  MessageCircle,
  Users,
  Video,
  ArrowDown,
  ArrowUp,
  TrendingUp,
  UserCheck,
  Mail,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import AiAssistantForm from '@/components/ai-assistant-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { studentData, type Student } from '@/lib/student-data';
import { differenceInDays, parseISO } from 'date-fns';
import RecoveryEmailDialog from '@/components/recovery-email-dialog';
import { revenueData, classPerformanceData } from '@/lib/class-data';
import { venues } from '@/lib/venues-data';
import { MultiSelectFilter, type Option } from '@/components/ui/multi-select-filter';


const chartConfig = {
  revenue: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-1))',
  },
  retention: {
    label: 'Retención',
    color: 'hsl(var(--chart-2))',
  },
  bookings: {
    label: 'Cupos Agendados',
    color: 'hsl(var(--chart-2))',
  },
  'Bachata Básico': {
    label: 'Bachata Básico',
    color: 'hsl(var(--chart-1))',
  },
  'Bachata Open Lady': {
    label: 'Bachata Open Lady',
    color: 'hsl(var(--chart-2))',
  },
  'Bachata Amateur': {
    label: 'Bachata Amateur',
    color: 'hsl(var(--chart-3))',
  },
  'Bachata Alumna': {
    label: 'Bachata Alumna',
    color: 'hsl(var(--chart-4))',
  },
  'Bachata Intermedio': {
    label: 'Bachata Intermedio',
    color: 'hsl(var(--chart-5))',
  },
};

const monthOrder = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const monthOptions: Option[] = [
    { value: 'all', label: 'Todos los meses' },
    ...monthOrder.map(m => ({ value: m, label: m }))
];

const venueOptions: Option[] = [
    { value: 'all', label: 'Todas las Sedes' },
    ...venues.map(v => ({ value: v.id, label: v.name }))
];

const dayOptions: Option[] = [
    { value: 'all', label: 'Todos los días' },
    { value: 'Lun', label: 'Lunes' },
    { value: 'Mar', label: 'Martes' },
    { value: 'Mie', label: 'Miércoles' },
    { value: 'Jue', label: 'Jueves' },
    { value: 'Vie', label: 'Viernes' },
    { value: 'Sab', label: 'Sábado' },
    { value: 'Dom', label: 'Domingo' },
];

const classTypeOptions: Option[] = [
    { value: 'all', label: 'Todas las clases' },
    { value: 'Dance', label: 'Baile' },
    { value: 'Coaching', label: 'Coaching' },
    { value: 'Bootcamp', label: 'Bootcamp' },
    { value: 'Sports', label: 'Deporte' },
    { value: 'Health', label: 'Salud' },
];

const monthMap: { [key: string]: number } = { Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5, Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11 };


const MetricComparison = ({ value, previousValue, unit = '' }: { value: number; previousValue: number | undefined, unit?: string }) => {
  if (previousValue === undefined) {
    return <p className="text-xs font-bold text-muted-foreground text-[15px]">Según selección</p>;
  }
   if (previousValue === 0) {
     return <p className="text-xs font-bold text-[#008000] text-[15px]">Crecimiento infinito</p>;
   }

  const percentageChange = ((value - previousValue) / previousValue) * 100;

  if (isNaN(percentageChange)) {
    return <p className="text-xs font-bold text-muted-foreground text-[15px]">Datos insuficientes</p>;
  }
  
  const isPositive = percentageChange >= 0;
  const colorClass = isPositive ? 'text-[#008000]' : 'text-destructive';
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <p className={cn("text-xs font-bold text-[15px] flex items-center gap-1", colorClass)}>
       <Icon className="h-3 w-3" />
      {`${Math.abs(percentageChange).toFixed(1)}% vs mes anterior`}
    </p>
  );
};


const calculateRetentionMetrics = (students: Student[], currentMonths: string[]) => {
    if (currentMonths.length !== 1 || currentMonths[0] === 'all') {
      return { overallRetention: 0, previousMonthOverallRetention: 0 };
    }
    
    const currentMonth = currentMonths[0];
    const currentMonthIndex = monthMap[currentMonth];
    
    if (currentMonthIndex === undefined || currentMonthIndex === 0) {
      return {
        overallRetention: 0,
        previousMonthOverallRetention: 0,
      };
    }
    const previousMonthIndex = currentMonthIndex - 1;
  
    const getStudentsInMonth = (monthIndex: number) => {
      const studentSet = new Set<string>();
      students.forEach(student => {
        const hasBooking = student.bookings.some(booking => new Date(booking.date).getMonth() === monthIndex);
        if (hasBooking) {
          studentSet.add(student.studentId);
        }
      });
      return studentSet;
    };
  
    const getNewStudentsInMonth = (monthIndex: number) => {
        const studentSet = new Set<string>();
        students.forEach(student => {
            if (new Date(student.joinDate).getMonth() === monthIndex && new Date(student.joinDate).getFullYear() === 2024) {
                studentSet.add(student.studentId);
            }
        });
        return studentSet;
    };

    const getRetention = (currentMonthIdx: number, prevMonthIdx: number) => {
      if (prevMonthIdx < 0) return 0;
      const prevMonthStudents = getStudentsInMonth(prevMonthIdx);
      if (prevMonthStudents.size === 0) return 0;
  
      const currentMonthStudents = getStudentsInMonth(currentMonthIdx);
      const newCurrentMonthStudents = getNewStudentsInMonth(currentMonthIdx);
  
      const retainedStudents = new Set([...currentMonthStudents].filter(id => !newCurrentMonthStudents.has(id) && prevMonthStudents.has(id)));
  
      return (retainedStudents.size / prevMonthStudents.size) * 100;
    }
  
    const overallRetention = getRetention(currentMonthIndex, previousMonthIndex);
    const previousMonthOverallRetention = getRetention(previousMonthIndex, previousMonthIndex - 1);
  
    return {
      overallRetention,
      previousMonthOverallRetention,
    };
};

type AtRiskStudent = {
    student: Student;
    lastBookingDate: Date;
    lastClassId: string;
};

const getAtRiskStudents = (students: Student[]): AtRiskStudent[] => {
    const today = new Date();
    const atRisk: AtRiskStudent[] = [];

    students.forEach(student => {
        if (student.bookings.length === 0) {
            return;
        }

        const lastBooking = student.bookings.reduce((latest, booking) => {
            const latestDate = new Date(latest.date);
            const bookingDate = new Date(booking.date);
            return bookingDate > latestDate ? booking : latest;
        });

        const lastBookingDate = parseISO(lastBooking.date);
        const daysSinceLastBooking = differenceInDays(today, lastBookingDate);

        if (daysSinceLastBooking > 30) {
            atRisk.push({
                student,
                lastBookingDate,
                lastClassId: lastBooking.classId,
            });
        }
    });

    return atRisk;
};


export default function DashboardPage() {
  const [selectedMonths, setSelectedMonths] = useState(['all']);
  const [selectedVenues, setSelectedVenues] = useState(['all']);
  const [selectedDays, setSelectedDays] = useState(['all']);
  const [selectedClassTypes, setSelectedClassTypes] = useState(['all']);
  
  const [isClient, setIsClient] = useState(false);
  const [atRiskStudents, setAtRiskStudents] = useState<AtRiskStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<AtRiskStudent | null>(null);

  useEffect(() => {
    setIsClient(true);
    setAtRiskStudents(getAtRiskStudents(studentData));
  }, []);

  const handleDownloadExcel = () => {
    // Placeholder function for Excel download logic
    alert('La funcionalidad para descargar el archivo Excel será implementada.');
  };
  
  const getFilteredData = (months: string[], days: string[], types: string[], venues: string[]) => {
    return revenueData.filter(d => {
        const monthMatch = months.includes('all') || months.includes(d.month);
        const dayMatch = days.includes('all') || days.includes(d.dayOfWeek);
        const typeMatch = types.includes('all') || types.includes(d.classType);
        const venueMatch = venues.includes('all') || venues.includes(d.venueId);

        const isOverallData = d.dayOfWeek === 'all' && d.classType === 'all' && d.venueId === 'all';
        
        if (months.includes('all') && days.includes('all') && types.includes('all') && venues.includes('all')) {
            return isOverallData;
        }

        return monthMatch && dayMatch && typeMatch && venueMatch;
    })
  }
  
  const currentData = getFilteredData(selectedMonths, selectedDays, selectedClassTypes, selectedVenues);
  const totalRevenue = currentData.reduce((acc, c) => acc + c.revenue, 0);
  const totalBookings = currentData.reduce((acc, c) => acc + c.bookings, 0);
  const totalNewStudents = currentData.reduce((acc, c) => acc + c.newStudents, 0);
  
  const singleMonthSelected = selectedMonths.length === 1 && selectedMonths[0] !== 'all';
  const noFiltersSelected = selectedMonths.includes('all') && selectedDays.includes('all') && selectedClassTypes.includes('all') && selectedVenues.includes('all');

  const averageActiveClasses = currentData.length > 0 && noFiltersSelected
    ? Math.round(currentData.reduce((acc, c) => acc + c.activeClasses, 0) / currentData.length)
    : (singleMonthSelected ? revenueData.find(d => d.month === selectedMonths[0])?.activeClasses || 0 : currentData.reduce((acc, c) => acc + c.activeClasses, 0));

  let previousMonthData;
  if(singleMonthSelected) {
    const currentMonthIndex = monthOrder.indexOf(selectedMonths[0]);
    if(currentMonthIndex > 0) {
        const previousMonth = monthOrder[currentMonthIndex-1];
        previousMonthData = getFilteredData([previousMonth], selectedDays, selectedClassTypes, selectedVenues);
    }
  }

  const prevTotalRevenue = previousMonthData?.reduce((acc, c) => acc + c.revenue, 0);
  const prevTotalBookings = previousMonthData?.reduce((acc, c) => acc + c.bookings, 0);
  const prevTotalNewStudents = previousMonthData?.reduce((acc, c) => acc + c.newStudents, 0);
  
  const retentionMetrics = calculateRetentionMetrics(studentData, selectedMonths);
    
  const overallRetention = noFiltersSelected
    ? revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all' && d.venueId === 'all').reduce((acc, c) => acc + c.retention, 0) / revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all').length
    : retentionMetrics.overallRetention;

  const prevOverallRetention = singleMonthSelected ? retentionMetrics.previousMonthOverallRetention : undefined;


  const totalRevenueAllClasses = classPerformanceData.reduce((acc, c) => acc + c.revenue, 0);
    
  const retentionChartData = revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all' && d.venueId === 'all');

  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-[50px] font-semibold">Dashboard</h1>
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2">
                <MultiSelectFilter
                    title="Mes"
                    options={monthOptions}
                    selectedValues={selectedMonths}
                    onSelectionChange={setSelectedMonths}
                />
                <MultiSelectFilter
                    title="Sede"
                    options={venueOptions}
                    selectedValues={selectedVenues}
                    onSelectionChange={setSelectedVenues}
                />
                 <MultiSelectFilter
                    title="Día"
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
                <Button onClick={handleDownloadExcel} className="w-full col-span-2">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Excel
                </Button>
            </div>
        </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-primary text-[25px]">Total Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${isClient ? totalRevenue.toLocaleString('es-CL') : '...'}</div>
             {isClient && singleMonthSelected && <MetricComparison value={totalRevenue} previousValue={prevTotalRevenue} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Total Cupos agendados</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? totalBookings.toLocaleString('es-CL') : '...'}</div>
             {isClient && singleMonthSelected && <MetricComparison value={totalBookings} previousValue={prevTotalBookings} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Nuevos Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{isClient ? totalNewStudents.toLocaleString('es-CL') : '...'}</div>
            {isClient && singleMonthSelected && <MetricComparison value={totalNewStudents} previousValue={prevTotalNewStudents} />}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Tasa de Retención</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? `${overallRetention.toFixed(1)}%` : '...'}</div>
            {isClient && singleMonthSelected && <MetricComparison value={overallRetention} previousValue={prevOverallRetention} unit="%" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Clases Activas</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? averageActiveClasses : '...'}</div>
            <p className="text-xs font-bold text-muted-foreground text-[15px]">Según selección</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-primary text-[25px]">Bootcamps Activos</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs font-bold text-[#008000] text-[15px]">1 próximo</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-primary text-[25px]">Coachings en Curso</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs font-bold text-[#008000] text-[15px]">3 completados</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Asistente de IA
          </CardTitle>
          <CardDescription>
            Haz una pregunta sobre tus datos y la IA te responderá.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiAssistantForm />
        </CardContent>
      </Card>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="font-headline">Vistas de Ingresos y Retención</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={retentionChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontWeight: 'bold' }} />
                    <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(0)}M`}
                        tick={{ fontWeight: 'bold' }}
                        />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fontWeight: 'bold' }}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        indicator="line" 
                        formatter={(value, name) => 
                            name === 'revenue' 
                            ? `Ingresos: $${Number(value).toLocaleString('es-CL')}` 
                            : `Retención: ${Number(value).toFixed(1)}%`
                        }
                        />}
                    />
                    <Line
                    yAxisId="left"
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={false}
                    name="revenue"
                    />
                    <Line
                    yAxisId="right"
                    dataKey="retention"
                    type="monotone"
                    stroke="var(--color-retention)"
                    strokeWidth={2}
                    dot={false}
                    name="retention"
                    />
                </LineChart>
                </ChartContainer>
            </CardContent>
            </Card>
            
            <Card  className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="font-headline">Ingresos por Clase</CardTitle>
                <CardDescription>
                    Distribución de ingresos en las clases activas.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent formatter={(value, name) => <div><span className="font-medium">{chartConfig[name as keyof typeof chartConfig]?.label || name}</span>: ${Number(value).toLocaleString('es-CL')}</div>} />}
                    />
                    <Pie
                    data={classPerformanceData}
                    dataKey="revenue"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                    >
                    {classPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                    ))}
                    </Pie>
                </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm pt-4">
                <div className="flex items-center justify-between w-full">
                    <span>Total Ingresos:</span>
                    <span className="font-bold">${isClient ? totalRevenueAllClasses.toLocaleString('es-CL') : '...'}</span>
                </div>
            </CardFooter>
            </Card>
        </div>

      <Card>
            <CardHeader>
                <CardTitle className="font-headline">Desempeño de la Clase</CardTitle>
                <CardDescription>Analiza los cupos, ingresos y retención de cada clase.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Clase</TableHead>
                            <TableHead className="text-right">Cupos Agendados</TableHead>
                            <TableHead className="text-right">Ingresos</TableHead>
                            <TableHead className="text-right">Tasa de Retención</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classPerformanceData.map((c) => (
                            <TableRow key={c.name}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell className="text-right">{c.bookings.toLocaleString('es-CL')}</TableCell>
                                <TableCell className="text-right">${c.revenue.toLocaleString('es-CL')}</TableCell>
                                <TableCell className="text-right font-semibold">{c.retention}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Oportunidades de Retención
                </CardTitle>
                <CardDescription>Estudiantes que no han agendado clases en los últimos 30 días.</CardDescription>
            </CardHeader>
            <CardContent>
                {isClient && (
                    <>
                        {atRiskStudents.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Estudiante</TableHead>
                                        <TableHead>Última Clase</TableHead>
                                        <TableHead className="text-right">Última Visita</TableHead>
                                        <TableHead><span className="sr-only">Acciones</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {atRiskStudents.map((item) => {
                                        const lastClassName = classPerformanceData.find(c => c.id === item.lastClassId)?.name || 'N/A';
                                        return (
                                            <TableRow key={item.student.studentId}>
                                                <TableCell className="font-medium">{item.student.name}</TableCell>
                                                <TableCell>{lastClassName}</TableCell>
                                                <TableCell className="text-right">{item.lastBookingDate.toLocaleDateString('es-CL')}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(item)}>
                                                        <Mail className="mr-2 h-4 w-4"/>
                                                        Contactar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                                <UserCheck className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 font-semibold">¡Excelente trabajo!</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    No tienes estudiantes en riesgo de abandono. ¡Sigue así!
                                </p>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>

        {selectedStudent && (
             <RecoveryEmailDialog
                open={!!selectedStudent}
                onOpenChange={(isOpen) => !isOpen && setSelectedStudent(null)}
                studentName={selectedStudent.student.name}
                lastClass={classPerformanceData.find(c => c.id === selectedStudent.lastClassId)?.name || 'una de tus clases'}
            />
        )}
    </div>
  );
}

    

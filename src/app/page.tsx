
"use client";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { studentData, type Student } from '@/lib/student-data';


const revenueData = [
  { month: 'Ene', revenue: 400000, newStudents: 10, activeClasses: 5, bookings: 120, dayOfWeek: 'all', classType: 'all', retention: 70 },
  { month: 'Feb', revenue: 420000, newStudents: 12, activeClasses: 5, bookings: 125, dayOfWeek: 'all', classType: 'all', retention: 72 },
  { month: 'Mar', revenue: 510000, newStudents: 15, activeClasses: 6, bookings: 150, dayOfWeek: 'all', classType: 'all', retention: 75 },
  { month: 'Abr', revenue: 550000, newStudents: 16, activeClasses: 6, bookings: 155, dayOfWeek: 'all', classType: 'all', retention: 78 },
  { month: 'May', revenue: 620000, newStudents: 18, activeClasses: 7, bookings: 160, dayOfWeek: 'all', classType: 'all', retention: 80 },
  { month: 'Jun', revenue: 680000, newStudents: 20, activeClasses: 7, bookings: 170, dayOfWeek: 'all', classType: 'all', retention: 82 },
  { month: 'Jul', revenue: 750000, newStudents: 22, activeClasses: 8, bookings: 180, dayOfWeek: 'all', classType: 'all', retention: 85 },
  { month: 'Ago', revenue: 820000, newStudents: 25, activeClasses: 8, bookings: 190, dayOfWeek: 'all', classType: 'all', retention: 86 },
  { month: 'Sep', revenue: 900000, newStudents: 28, activeClasses: 9, bookings: 200, dayOfWeek: 'all', classType: 'all', retention: 88 },
  // Sample data for specific days/types
  { month: 'Jul', revenue: 150000, newStudents: 5, activeClasses: 1, bookings: 20, dayOfWeek: 'Lun', classType: 'Dance', retention: 80 },
  { month: 'Jul', revenue: 200000, newStudents: 8, activeClasses: 1, bookings: 30, dayOfWeek: 'Mar', classType: 'Dance', retention: 82 },
  { month: 'Jul', revenue: 250000, newStudents: 9, activeClasses: 1, bookings: 50, dayOfWeek: 'Vie', classType: 'Dance', retention: 88 },
  { month: 'Ago', revenue: 300000, newStudents: 10, activeClasses: 1, bookings: 25, dayOfWeek: 'Jue', classType: 'Coaching', retention: 90 },
];

const classPerformanceData = [
  { name: 'Bachata Básico', bookings: 120, revenue: 2400000, retention: 75 },
  { name: 'Bachata Open Lady', bookings: 80, revenue: 3200000, retention: 85 },
  { name: 'Bachata Amateur', bookings: 150, revenue: 2250000, retention: 80 },
  { name: 'Bachata Alumna', bookings: 95, revenue: 1425000, retention: 78 },
  { name: 'Bachata Intermedio', bookings: 60, revenue: 3000000, retention: 90 },
];

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

const daysOfWeek = [
    { value: 'all', label: 'Todos los días' },
    { value: 'Lun', label: 'Lunes' },
    { value: 'Mar', label: 'Martes' },
    { value: 'Mie', label: 'Miércoles' },
    { value: 'Jue', label: 'Jueves' },
    { value: 'Vie', label: 'Viernes' },
    { value: 'Sab', label: 'Sábado' },
    { value: 'Dom', label: 'Domingo' },
];

const classTypes = [
    { value: 'all', label: 'Todas las clases' },
    { value: 'Dance', label: 'Baile' },
    { value: 'Coaching', label: 'Coaching' },
    { value: 'Bootcamp', label: 'Bootcamp' },
    { value: 'Sports', label: 'Deporte' },
    { value: 'Health', label: 'Salud' },
];

const monthOrder = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
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


const calculateRetentionMetrics = (students: Student[], currentMonth: string) => {
    const currentMonthIndex = monthMap[currentMonth];
    if (currentMonthIndex === undefined || currentMonthIndex === 0) {
      return {
        overallRetention: 0,
        previousMonthOverallRetention: 0,
        singleClassRetention: 0,
        packRetention: 0,
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


export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedClassType, setSelectedClassType] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadExcel = () => {
    // Placeholder function for Excel download logic
    alert('La funcionalidad para descargar el archivo Excel será implementada.');
  };
  
  const getFilteredData = (month: string, day: string, type: string) => {
    return revenueData.filter(d => {
        const monthMatch = month === 'all' || d.month === month;
        
        let dayMatch = day === 'all';
        if (day !== 'all' && d.dayOfWeek !== 'all') {
          dayMatch = d.dayOfWeek === day;
        } else if (day !== 'all' && d.dayOfWeek === 'all') {
          dayMatch = false; // Don't include 'all' day data when a specific day is selected
        }
        
        let classTypeMatch = type === 'all';
        if (type !== 'all' && d.classType !== 'all') {
          classTypeMatch = d.classType === type;
        } else if (type !== 'all' && d.classType === 'all') {
          classTypeMatch = false; // Don't include 'all' type data when a specific type is selected
        }

        const isOverallData = d.dayOfWeek === 'all' && d.classType === 'all';

        if (month !== 'all' && (day !=='all' || type !== 'all')) {
            return monthMatch && dayMatch && classTypeMatch;
        }
        
        if (month === 'all' && (day !== 'all' || type !== 'all')) {
            return dayMatch && classTypeMatch;
        }

        return monthMatch && isOverallData;
    })
  }
  
  const currentData = getFilteredData(selectedMonth, selectedDay, selectedClassType);
  const totalRevenue = currentData.reduce((acc, c) => acc + c.revenue, 0);
  const totalBookings = currentData.reduce((acc, c) => acc + c.bookings, 0);
  const totalNewStudents = currentData.reduce((acc, c) => acc + c.newStudents, 0);
  const averageActiveClasses = currentData.length > 0 && selectedMonth ==='all' && selectedDay === 'all' && selectedClassType === 'all'
    ? Math.round(currentData.reduce((acc, c) => acc + c.activeClasses, 0) / currentData.length)
    : revenueData.find(d => d.month === selectedMonth)?.activeClasses || 0;
  
  let previousMonthData;
  if(selectedMonth !== 'all') {
    const currentMonthIndex = monthOrder.indexOf(selectedMonth);
    if(currentMonthIndex > 0) {
        const previousMonth = monthOrder[currentMonthIndex-1];
        previousMonthData = getFilteredData(previousMonth, selectedDay, selectedClassType);
    }
  }

  const prevTotalRevenue = previousMonthData?.reduce((acc, c) => acc + c.revenue, 0);
  const prevTotalBookings = previousMonthData?.reduce((acc, c) => acc + c.bookings, 0);
  const prevTotalNewStudents = previousMonthData?.reduce((acc, c) => acc + c.newStudents, 0);
  
  const retentionMetrics = selectedMonth !== 'all' 
    ? calculateRetentionMetrics(studentData, selectedMonth)
    : { overallRetention: 0, previousMonthOverallRetention: 0 };
    
  const overallRetention = selectedMonth === 'all'
    ? revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all').reduce((acc, c) => acc + c.retention, 0) / revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all').length
    : retentionMetrics.overallRetention;

  const prevOverallRetention = selectedMonth === 'all' ? undefined : retentionMetrics.previousMonthOverallRetention;


  const totalRevenueAllClasses = classPerformanceData.reduce((acc, c) => acc + c.revenue, 0);

  const chartData = (selectedMonth === 'all' && selectedDay === 'all' && selectedClassType === 'all')
    ? revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all') 
    : currentData;
    
  const retentionChartData = revenueData.filter(d => d.dayOfWeek === 'all' && d.classType === 'all');

  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-[50px] font-semibold">Dashboard</h1>
            <div className="flex flex-wrap items-center gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Seleccionar mes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los meses</SelectItem>
                        {[...new Set(revenueData.map(d => d.month))].filter(m => monthOrder.includes(m) && m !== 'all').sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)).map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Seleccionar día" />
                    </SelectTrigger>
                    <SelectContent>
                        {daysOfWeek.map(d => (
                            <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedClassType} onValueChange={setSelectedClassType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Tipo de clase" />
                    </SelectTrigger>
                    <SelectContent>
                         {classTypes.map(c => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleDownloadExcel} className="w-full sm:w-auto">
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
             {isClient && <MetricComparison value={totalRevenue} previousValue={prevTotalRevenue} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Total Cupos agendados</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? totalBookings.toLocaleString('es-CL') : '...'}</div>
             {isClient && <MetricComparison value={totalBookings} previousValue={prevTotalBookings} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Nuevos alumn@s</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{isClient ? totalNewStudents.toLocaleString('es-CL') : '...'}</div>
            {isClient && <MetricComparison value={totalNewStudents} previousValue={prevTotalNewStudents} />}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Tasa de Retención</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? `${overallRetention.toFixed(1)}%` : '...'}</div>
            {isClient && <MetricComparison value={overallRetention} previousValue={prevOverallRetention} unit="%" />}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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
        
        <Card>
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

        <Card className="lg:col-span-3">
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
      </div>
    </div>
  );
}
    

    
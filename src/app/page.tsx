
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
} from 'lucide-react';
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
  BarChart as RechartsBarChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import AiAssistantForm from '@/components/ai-assistant-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const revenueData = [
  { month: 'Ene', revenue: 400000, newStudents: 10, activeClasses: 5, bookings: 120, dayOfWeek: 'all', classType: 'all' },
  { month: 'Feb', revenue: 300000, newStudents: 8, activeClasses: 5, bookings: 110, dayOfWeek: 'all', classType: 'all' },
  { month: 'Mar', revenue: 500000, newStudents: 15, activeClasses: 6, bookings: 150, dayOfWeek: 'all', classType: 'all' },
  { month: 'Abr', revenue: 450000, newStudents: 12, activeClasses: 6, bookings: 140, dayOfWeek: 'all', classType: 'all' },
  { month: 'May', revenue: 600000, newStudents: 18, activeClasses: 7, bookings: 160, dayOfWeek: 'all', classType: 'all' },
  { month: 'Jun', revenue: 550000, newStudents: 16, activeClasses: 7, bookings: 155, dayOfWeek: 'all', classType: 'all' },
  { month: 'Jul', revenue: 700000, newStudents: 20, activeClasses: 8, bookings: 180, dayOfWeek: 'all', classType: 'all' },
  { month: 'Ago', revenue: 750000, newStudents: 22, activeClasses: 8, bookings: 190, dayOfWeek: 'all', classType: 'all' },
  { month: 'Sep', revenue: 800000, newStudents: 25, activeClasses: 9, bookings: 200, dayOfWeek: 'all', classType: 'all' },
  // Sample data for specific days/types
  { month: 'Jul', revenue: 820000, newStudents: 5, activeClasses: 1, bookings: 20, dayOfWeek: 'Lun', classType: 'Dance' },
  { month: 'Jul', revenue: 830000, newStudents: 3, activeClasses: 1, bookings: 30, dayOfWeek: 'Mar', classType: 'Dance' },
  { month: 'Jul', revenue: 800000, newStudents: 8, activeClasses: 1, bookings: 50, dayOfWeek: 'Vie', classType: 'Dance' },
  { month: 'Ago', revenue: 850000, newStudents: 6, activeClasses: 1, bookings: 25, dayOfWeek: 'Jue', classType: 'Coaching' },
];

const classPerformanceData = [
  { name: 'Bachata Básico', bookings: 120, revenue: 2400000 },
  { name: 'Bachata Open Lady', bookings: 80, revenue: 3200000 },
  { name: 'Bachata Amateur', bookings: 150, revenue: 2250000 },
  { name: 'Bachata Alumna', bookings: 95, revenue: 1425000 },
  { name: 'Bachata Intermedio', bookings: 60, revenue: 3000000 },
];

const chartConfig = {
  revenue: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-1))',
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

  const filteredRevenueData = revenueData.filter(d => {
    const monthMatch = selectedMonth === 'all' || d.month === selectedMonth;
    const dayMatch = selectedDay === 'all' || d.dayOfWeek === selectedDay || (selectedDay !== 'all' && d.dayOfWeek === 'all'); // Show totals if a specific day is selected but data is aggregated
    const classTypeMatch = selectedClassType === 'all' || d.classType === selectedClassType || (selectedClassType !== 'all' && d.classType === 'all');
    return monthMatch && dayMatch && classTypeMatch;
  });

  const getFilteredData = () => {
    return revenueData.filter(d => {
        const monthMatch = selectedMonth === 'all' || d.month === selectedMonth;
        const dayMatch = selectedDay === 'all' || d.dayOfWeek === selectedDay;
        const classTypeMatch = selectedClassType === 'all' || d.classType === selectedClassType;

        if(selectedMonth !== 'all' && selectedDay !== 'all' && selectedClassType !== 'all') {
            return d.month === selectedMonth && d.dayOfWeek === selectedDay && d.classType === selectedClassType;
        }
        if(selectedMonth !== 'all' && selectedDay !== 'all') {
            return d.month === selectedMonth && d.dayOfWeek === selectedDay && d.classType === 'all';
        }
        if(selectedMonth !== 'all' && selectedClassType !== 'all') {
            return d.month === selectedMonth && d.classType === selectedClassType && d.dayOfWeek === 'all';
        }
        if(selectedDay !== 'all' && selectedClassType !== 'all') {
             return d.dayOfWeek === selectedDay && d.classType === selectedClassType && d.month === 'all';
        }
        if(selectedMonth !== 'all') {
            return d.month === selectedMonth && d.dayOfWeek === 'all' && d.classType === 'all';
        }
        if(selectedDay !== 'all') {
            return d.dayOfWeek === selectedDay && d.month === 'all' && d.classType === 'all';
        }
        if(selectedClassType !== 'all') {
            return d.classType === selectedClassType && d.month === 'all' && d.dayOfWeek === 'all';
        }

        return true; // all filters are 'all'
    })
  }

  const finalData = getFilteredData();
  const totalRevenue = finalData.reduce((acc, c) => acc + c.revenue, 0);
  const totalBookings = finalData.reduce((acc, c) => acc + c.bookings, 0);
  const totalNewStudents = finalData.reduce((acc, c) => acc + c.newStudents, 0);
  const averageActiveClasses = finalData.length > 0
    ? Math.round(finalData.reduce((acc, c) => acc + c.activeClasses, 0) / finalData.length)
    : 0;
  
  const totalRevenueAllClasses = classPerformanceData.reduce((acc, c) => acc + c.revenue, 0);

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
                        {/* Get unique months from data */}
                        {[...new Set(revenueData.map(d => d.month))].map(month => (
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
            <p className="text-xs font-bold text-[#008000] text-[15px]">Según selección</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Total Cupos agendados</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isClient ? totalBookings.toLocaleString('es-CL') : '...'}</div>
             <p className="text-xs font-bold text-[#008000] text-[15px]">Según selección</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Nuevos alumn@s</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{isClient ? totalNewStudents.toLocaleString('es-CL') : '...'}</div>
            <p className="text-xs font-bold text-[#008000] text-[15px]">Según selección</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Clases Activas</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageActiveClasses}</div>
            <p className="text-xs font-bold text-[#008000] text-[15px]">Según selección</p>
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
            <CardTitle className="font-headline">Vistas de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={finalData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontWeight: 'bold' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(0)}M`}
                  tick={{ fontWeight: 'bold' }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" formatter={(value) => `$${Number(value).toLocaleString('es-CL')}`}/>}
                />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
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
                  content={<ChartTooltipContent formatter={(value, name) => <div><span className="font-medium">{name}</span>: ${Number(value).toLocaleString('es-CL')}</div>} />}
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
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <RechartsBarChart data={classPerformanceData} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={110}
                    className="text-xs"
                  />
                  <XAxis type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="bookings" fill="var(--color-bookings)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    

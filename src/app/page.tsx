

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
  { month: 'Ene', revenue: 4000, newStudents: 10, activeClasses: 5, bookings: 120 },
  { month: 'Feb', revenue: 3000, newStudents: 8, activeClasses: 5, bookings: 110 },
  { month: 'Mar', revenue: 5000, newStudents: 15, activeClasses: 6, bookings: 150 },
  { month: 'Abr', revenue: 4500, newStudents: 12, activeClasses: 6, bookings: 140 },
  { month: 'May', revenue: 6000, newStudents: 18, activeClasses: 7, bookings: 160 },
  { month: 'Jun', revenue: 5500, newStudents: 16, activeClasses: 7, bookings: 155 },
  { month: 'Jul', revenue: 7000, newStudents: 20, activeClasses: 8, bookings: 180 },
  { month: 'Ago', revenue: 7500, newStudents: 22, activeClasses: 8, bookings: 190 },
  { month: 'Sep', revenue: 8000, newStudents: 25, activeClasses: 9, bookings: 200 },
];

const classPerformanceData = [
  { name: 'Bachata Básico', bookings: 120, revenue: 2400 },
  { name: 'Bachata Open Lady', bookings: 80, revenue: 3200 },
  { name: 'Bachata Amateur', bookings: 150, revenue: 2250 },
  { name: 'Bachata Alumna', bookings: 95, revenue: 1425 },
  { name: 'Bachata Intermedio', bookings: 60, revenue: 3000 },
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

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('all');

  const handleDownloadExcel = () => {
    // Placeholder function for Excel download logic
    alert('La funcionalidad para descargar el archivo Excel será implementada.');
  };

  const filteredRevenueData = selectedMonth === 'all'
    ? revenueData
    : revenueData.filter(d => d.month === selectedMonth);

  const totalRevenue = filteredRevenueData.reduce((acc, c) => acc + c.revenue, 0);
  const totalBookings = filteredRevenueData.reduce((acc, c) => acc + c.bookings, 0);
  const totalNewStudents = filteredRevenueData.reduce((acc, c) => acc + c.newStudents, 0);
  const averageActiveClasses = filteredRevenueData.length > 0
    ? Math.round(filteredRevenueData.reduce((acc, c) => acc + c.activeClasses, 0) / filteredRevenueData.length)
    : 0;
  
  const totalRevenueAllClasses = classPerformanceData.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-headline text-[50px] font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar mes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los meses</SelectItem>
                        {revenueData.map(d => (
                            <SelectItem key={d.month} value={d.month}>{d.month}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleDownloadExcel}>
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
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs font-bold text-[#008000] text-[15px]">{selectedMonth === 'all' ? 'Acumulado' : `En ${selectedMonth}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Total Cupos agendados</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings.toLocaleString()}</div>
             <p className="text-xs font-bold text-[#008000] text-[15px]">{selectedMonth === 'all' ? 'Acumulado' : `En ${selectedMonth}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Nuevos alumn@s</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalNewStudents.toLocaleString()}</div>
            <p className="text-xs font-bold text-[#008000] text-[15px]">{selectedMonth === 'all' ? 'Acumulado' : `En ${selectedMonth}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary text-[25px]">Clases Activas</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageActiveClasses}</div>
            <p className="text-xs font-bold text-[#008000] text-[15px]">{selectedMonth === 'all' ? 'Promedio' : `En ${selectedMonth}`}</p>
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
              <LineChart data={filteredRevenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontWeight: 'bold' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${"$" + (value / 1000).toFixed(0)}k`}
                  tick={{ fontWeight: 'bold' }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
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
                  content={<ChartTooltipContent hideLabel />}
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
                  <span className="font-bold">${totalRevenueAllClasses.toLocaleString()}</span>
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

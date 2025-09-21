"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  BookCopy,
  DollarSign,
  MessageCircle,
  Users,
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

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 },
];

const classPerformanceData = [
  { name: 'Bachata Básico', bookings: 120, revenue: 2400 },
  { name: 'Bachata Open Lady', bookings: 80, revenue: 3200 },
  { name: 'Bachata Amateur', bookings: 150, revenue: 2250 },
  { name: 'Bachata Alumna', bookings: 95, revenue: 1425 },
  { name: 'Bachata Intermedio', bookings: 60, revenue: 3000 },
];

const totalRevenue = classPerformanceData.reduce((acc, c) => acc + c.revenue, 0);

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
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary">Total Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17,575</div>
            <p className="text-xs text-accent-foreground">+12.5% Último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary">Total Cupos agendados</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">445</div>
            <p className="text-xs text-accent-foreground">+8.2% Último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary">Nuevos alumn@s</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+72</div>
            <p className="text-xs text-accent-foreground">+20% Último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary">Clases Activas</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-accent-foreground">2 inactivas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Vistas de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={revenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value / 1000}k`}
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
                  <span className="font-bold">${totalRevenue.toLocaleString()}</span>
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

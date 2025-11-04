
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
  BarChart,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Mail, TrendingUp, Users, DollarSign, Target, Activity, Dumbbell, Briefcase, Download, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { revenueData, classPerformanceData } from '@/lib/class-data';
import AiAssistantForm from '@/components/ai-assistant-form';
import { cn } from '@/lib/utils';
import { MultiSelectFilter, type Option } from '@/components/ui/multi-select-filter';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { venues as initialVenues } from '@/lib/venues-data';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Class } from '@/lib/types';

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

const chartConfig = {
  revenue: {
    label: "Ingresos",
  },
  'Bachata Básico': {
    label: 'Bachata Básico',
    color: "hsl(var(--chart-1))",
  },
  'Bachata Open Lady': {
    label: 'Bachata Open Lady',
    color: "hsl(var(--chart-2))",
  },
  'Bachata Amateur': {
    label: 'Bachata Amateur',
    color: "hsl(var(--chart-3))",
  },
  'Bachata Alumna': {
    label: 'Bachata Alumna',
    color: "hsl(var(--chart-4))",
  },
  'Bachata Intermedio': {
    label: 'Bachata Intermedio',
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Dashboard() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>(['all']);
  const [selectedDays, setSelectedDays] = useState<string[]>(['all']);
  const [selectedClassTypes, setSelectedClassTypes] = useState<string[]>(['all']);
  const [selectedVenues, setSelectedVenues] = useState<string[]>(['all']);

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
      <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>

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
              <LineChart data={revenueData}>
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
          <CardTitle>Asistente de IA</CardTitle>
          <CardDescription>
            Haz preguntas en lenguaje natural sobre tus datos de rendimiento (Datos de demo).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiAssistantForm />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
         <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Clase</CardTitle>
            <CardDescription>Ingresos generados por cada clase (Datos de demo).</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                  width={110}
                />
                <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{ 
                        backgroundColor: "hsl(var(--background))", 
                        border: "1px solid hsl(var(--border))"
                    }}
                />
                <Bar dataKey="revenue" name="Ingresos">
                    {classPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
              <CardTitle>% Ingreso por Clase</CardTitle>
              <CardDescription>Distribución porcentual de los ingresos por cada clase (Datos de demo).</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                        data={classPerformanceData}
                        dataKey="revenue"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        {classPerformanceData.map((entry) => (
                        <Cell
                            key={`cell-${entry.name}`}
                            fill={chartConfig[entry.name as keyof typeof chartConfig]?.color}
                        />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
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

    </div>
  );
}

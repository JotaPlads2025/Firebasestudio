
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
import { Mail, TrendingUp, Users, DollarSign, Target, Activity, Dumbbell, Briefcase, Download } from 'lucide-react';
import { revenueData, classPerformanceData } from '@/lib/class-data';
import AiAssistantForm from '@/components/ai-assistant-form';
import RecoveryEmailDialog from '@/components/recovery-email-dialog';
import { cn } from '@/lib/utils';
import { MultiSelectFilter, type Option } from '@/components/ui/multi-select-filter';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const inactiveStudents = [
    { name: 'Benjamín Soto', lastClass: 'Bachata Básico', lastSeen: 'hace 2 meses' },
    { name: 'Elena Castillo', lastClass: 'Bachata Básico', lastSeen: 'hace 3 meses' },
    { name: 'Joaquín Núñez', lastClass: 'Bachata Básico', lastSeen: 'hace 1 mes' },
];

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
  const [selectedStudent, setSelectedStudent] = useState<{name: string, lastClass: string} | null>(null);

  const [selectedMonths, setSelectedMonths] = useState<string[]>(['all']);
  const [selectedDays, setSelectedDays] = useState<string[]>(['all']);
  const [selectedClassTypes, setSelectedClassTypes] = useState<string[]>(['all']);

  const filteredData = useMemo(() => {
    return revenueData.filter(d => {
      const monthMatch = selectedMonths.includes('all') || selectedMonths.includes(d.month);
      const dayMatch = selectedDays.includes('all') || selectedDays.includes(d.dayOfWeek);
      const typeMatch = selectedClassTypes.includes('all') || selectedClassTypes.includes(d.classType);
      return monthMatch && dayMatch && typeMatch;
    });
  }, [selectedMonths, selectedDays, selectedClassTypes]);

  const aggregatedKpis = useMemo(() => {
    const dataToAggregate = filteredData.length > 0 ? filteredData : revenueData;

    const totals = dataToAggregate.reduce((acc, item) => {
        acc.revenue += item.revenue;
        acc.newStudents += item.newStudents;
        acc.activeClasses += item.activeClasses;
        // Mock data for coaching and bootcamps as it is not in revenueData
        acc.coaching = Math.round(item.activeClasses / 2);
        acc.bootcamps = Math.round(item.activeClasses / 8);
        return acc;
    }, { revenue: 0, newStudents: 0, activeClasses: 0, coaching: 0, bootcamps: 0 });

    const totalMonths = dataToAggregate.length > 0 ? new Set(dataToAggregate.map(d => d.month)).size : 1;

    return {
      revenue: totals.revenue,
      newStudents: totals.newStudents,
      retention: dataToAggregate.length > 0 ? Math.round(dataToAggregate.reduce((acc, item) => acc + item.retention, 0) / dataToAggregate.length) : 86, // Average retention
      activeClasses: Math.round(totals.activeClasses / totalMonths),
      coaching: Math.round(totals.coaching / totalMonths),
      bootcamps: Math.round(totals.bootcamps / totalMonths),
    };
  }, [filteredData]);


  const kpiData = [
    {
      title: 'Ingresos Totales',
      value: `$${aggregatedKpis.revenue.toLocaleString('es-CL')}`,
      change: '+12.5%', // Static change for demo
      icon: DollarSign,
    },
    {
      title: 'Nuevos Alumnos',
      value: aggregatedKpis.newStudents.toString(),
      change: '+8.7%', // Static change for demo
      icon: Users,
    },
    {
      title: 'Tasa de Retención',
      value: `${aggregatedKpis.retention}%`,
      change: '-1.5%', // Static change for demo
      icon: Target,
    },
     {
      title: 'Clases Activas',
      value: aggregatedKpis.activeClasses.toString(),
      change: '+1', // Static change for demo
      icon: Activity,
    },
    {
      title: 'Coaching Activos',
      value: aggregatedKpis.coaching.toString(),
      change: '+2', // Static change for demo
      icon: Dumbbell,
    },
    {
      title: 'Bootcamps Activos',
      value: aggregatedKpis.bootcamps.toString(),
      change: '0', // Static change for demo
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
                            Selecciona uno o más filtros para visualizar tus datos.
                        </CardDescription>
                    </div>
                     <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar Excel
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </CardContent>
        </Card>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-bold text-primary">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={cn(
                  "text-xs font-bold",
                  kpi.change.startsWith('+') ? 'text-green-600' : 'text-destructive'
              )}>
                {kpi.change !== '0' ? `${kpi.change} desde el mes pasado` : 'sin cambios'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Rendimiento General</CardTitle>
            <CardDescription>
              Una vista general de tus ingresos y crecimiento de alumnos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData.length > 0 ? filteredData : revenueData}>
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
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                  name="Ingresos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
         <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Clase</CardTitle>
            <CardDescription>Ingresos generados por cada clase.</CardDescription>
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
              <CardDescription>Distribución porcentual de los ingresos por cada clase.</CardDescription>
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
              {classPerformanceData.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell className="text-right">${cls.revenue.toLocaleString('es-CL')}</TableCell>
                  <TableCell className="text-right">{cls.bookings}</TableCell>
                  <TableCell className="text-right">{cls.retention}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp /> Recupera Alumnos Inactivos</CardTitle>
          <CardDescription>
            Contacta a estudiantes que no han vuelto a agendar para motivarlos a regresar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Última Clase</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inactiveStudents.map((student) => (
                <TableRow key={student.name}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.lastClass}</TableCell>
                  <TableCell className="text-muted-foreground">{student.lastSeen}</TableCell>
                  <TableCell className="text-right">
                     <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contactar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Asistente de IA</CardTitle>
          <CardDescription>
            Haz preguntas en lenguaje natural sobre tus datos de rendimiento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiAssistantForm />
        </CardContent>
      </Card>

      {selectedStudent && (
        <RecoveryEmailDialog
          open={!!selectedStudent}
          onOpenChange={(isOpen) => !isOpen && setSelectedStudent(null)}
          studentName={selectedStudent.name}
          lastClass={selectedStudent.lastClass}
        />
      )}

    </div>
  );
}

    
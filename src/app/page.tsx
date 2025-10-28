
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
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Mail, TrendingUp, Users, DollarSign, Target, Activity, Dumbbell, Briefcase } from 'lucide-react';
import { revenueData, classPerformanceData } from '@/lib/class-data';
import AiAssistantForm from '@/components/ai-assistant-form';
import RecoveryEmailDialog from '@/components/recovery-email-dialog';
import { cn } from '@/lib/utils';
import { MultiSelectFilter, type Option } from '@/components/ui/multi-select-filter';

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
                <CardTitle>Filtros</CardTitle>
                 <CardDescription>
                    Selecciona uno o más filtros para visualizar tus datos.
                </CardDescription>
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
              <CardTitle className="text-base font-bold">{kpi.title}</CardTitle>
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
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

        <Card className="lg:col-span-2">
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
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Ingresos"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp /> Recupera Alumnos Inactivos</CardTitle>
          <CardDescription>
            La IA te puede ayudar a contactar a estudiantes que no han vuelto a agendar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {inactiveStudents.map((student) => (
                <Card key={student.name} className="p-4 flex items-center justify-between">
                    <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.lastClass}</p>
                        <p className="text-xs text-muted-foreground">{student.lastSeen}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contactar
                    </Button>
                </Card>
            ))}
            </div>
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

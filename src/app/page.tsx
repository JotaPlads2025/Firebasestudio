
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Mail, TrendingUp, Users, DollarSign, Target, Activity, Dumbbell, Briefcase } from 'lucide-react';
import { revenueData, classPerformanceData } from '@/lib/class-data';
import AiAssistantForm from '@/components/ai-assistant-form';
import RecoveryEmailDialog from '@/components/recovery-email-dialog';
import { cn } from '@/lib/utils';

const inactiveStudents = [
    { name: 'Benjamín Soto', lastClass: 'Bachata Básico', lastSeen: 'hace 2 meses' },
    { name: 'Elena Castillo', lastClass: 'Bachata Básico', lastSeen: 'hace 3 meses' },
    { name: 'Joaquín Núñez', lastClass: 'Bachata Básico', lastSeen: 'hace 1 mes' },
];

export default function Dashboard() {
  const [selectedStudent, setSelectedStudent] = useState<{name: string, lastClass: string} | null>(null);

  const kpiData = [
    {
      title: 'Ingresos Totales (Últ. Mes)',
      value: '$820.000',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Nuevos Alumnos (Últ. Mes)',
      value: '25',
      change: '+8.7%',
      icon: Users,
    },
    {
      title: 'Tasa de Retención',
      value: '86%',
      change: '-1.5%',
      icon: Target,
    },
     {
      title: 'Clases Activas',
      value: '8',
      change: '+1',
      icon: Activity,
    },
    {
      title: 'Coaching Activos',
      value: '4',
      change: '+2',
      icon: Dumbbell,
    },
    {
      title: 'Bootcamps Activos',
      value: '1',
      change: '0',
      icon: Briefcase,
    },
  ];

  const chartConfig = {
    revenue: {
      label: 'Ingresos',
      color: 'hsl(var(--chart-1))',
    },
    newStudents: {
      label: 'Nuevos Alumnos',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={cn(
                  "text-xs",
                  kpi.change.startsWith('+') ? 'text-green-600' : kpi.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {kpi.change !== '0' && `${kpi.change} desde el mes pasado`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle>Rendimiento General</CardTitle>
                 <div className="flex flex-wrap items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Mes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Este Mes</SelectItem>
                            <SelectItem value="last">Mes Pasado</SelectItem>
                            <SelectItem value="last3">Últimos 3 Meses</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Día" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los días</SelectItem>
                            <SelectItem value="lunes">Lunes</SelectItem>
                            <SelectItem value="martes">Martes</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Clases" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las clases</SelectItem>
                            <SelectItem value="regular">Clases Regulares</SelectItem>
                            <SelectItem value="coaching">Coaching</SelectItem>
                            <SelectItem value="bootcamp">Bootcamps</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </div>
            <CardDescription>
              Una vista general de tus ingresos y crecimiento de alumnos.
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


'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface Plan {
  name: 'Comisión' | 'Básico' | 'Pro';
  fee: number;
  commission: number;
}

const plans: Plan[] = [
  { name: 'Comisión', fee: 0, commission: 0.10 },
  { name: 'Básico', fee: 14990, commission: 0.05 },
  { name: 'Pro', fee: 29990, commission: 0.029 },
];

interface ClassPerformance {
  name: string;
  bookings: number;
  revenue: number;
  retention: number;
  id: string;
}

interface PlanCalculatorProps {
  classPerformanceData: ClassPerformance[];
}

export default function PlanCalculator({ classPerformanceData }: PlanCalculatorProps) {
  const initialMonthlyBookings = useMemo(() => classPerformanceData.reduce((acc, cls) => acc + cls.bookings, 0), [classPerformanceData]);
  const initialMonthlyRevenue = useMemo(() => classPerformanceData.reduce((acc, cls) => acc + cls.revenue, 0), [classPerformanceData]);
  const initialAvgPrice = useMemo(() => initialMonthlyRevenue / (initialMonthlyBookings || 1), [initialMonthlyRevenue, initialMonthlyBookings]);

  const [avgPrice, setAvgPrice] = useState(Math.round(initialAvgPrice));
  const [monthlyBookings, setMonthlyBookings] = useState(initialMonthlyBookings);
  
  useEffect(() => {
    setAvgPrice(Math.round(initialAvgPrice));
    setMonthlyBookings(initialMonthlyBookings);
  }, [initialAvgPrice, initialMonthlyBookings]);


  const estimatedRevenue = avgPrice * monthlyBookings;

  const calculatePlanCost = (plan: Plan, revenue: number) => {
    return plan.fee + revenue * plan.commission;
  };

  const results = useMemo(() => {
    const calculatedResults = plans.map(plan => {
      const totalCost = calculatePlanCost(plan, estimatedRevenue);
      const netEarning = estimatedRevenue - totalCost;
      return {
        ...plan,
        totalCost,
        netEarning,
      };
    });

    const bestPlan = calculatedResults.reduce((best, current) => current.netEarning > best.netEarning ? current : best);
    
    return calculatedResults.map(res => ({...res, isRecommended: res.name === bestPlan.name}));

  }, [estimatedRevenue]);


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <Label htmlFor="avg-price">Precio Promedio por Clase</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="avg-price"
              min={1000}
              max={50000}
              step={1000}
              value={[avgPrice]}
              onValueChange={(value) => setAvgPrice(value[0])}
            />
             <Input
              type="number"
              className="w-28 font-bold"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              step={1000}
            />
          </div>
        </div>
        <div className="space-y-4">
          <Label htmlFor="monthly-bookings">Cupos Agendados al Mes</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="monthly-bookings"
              min={10}
              max={500}
              step={5}
              value={[monthlyBookings]}
              onValueChange={(value) => setMonthlyBookings(value[0])}
            />
            <Input
              type="number"
              className="w-28 font-bold"
              value={monthlyBookings}
              onChange={(e) => setMonthlyBookings(Number(e.target.value))}
              step={5}
            />
          </div>
        </div>
      </div>
      
      <Card className="bg-muted/30">
        <CardHeader>
            <CardTitle className="text-center text-lg">Ingresos Mensuales Estimados</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary">${estimatedRevenue.toLocaleString('es-CL')}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col", plan.isRecommended && "border-primary ring-2 ring-primary shadow-lg")}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center justify-between">
                {plan.name}
                {plan.isRecommended && <Badge>Recomendado</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
                <div className="space-y-1 text-center bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Pagas a Plads</p>
                    <p className="text-2xl font-bold text-destructive">${plan.totalCost.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</p>
                </div>
                 <div className="space-y-1 text-center bg-green-100/80 dark:bg-green-900/50 p-3 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200 font-medium">Tus Ganancias</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-300">${plan.netEarning.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

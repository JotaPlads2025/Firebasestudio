

'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Percent, Rocket } from 'lucide-react';
import PlanCalculator from '@/components/plan-calculator';
import { classPerformanceData } from '@/lib/class-data';

const commissionFeatures = [
    'Agendamiento de cupos ilimitado',
    'Herramientas de gestión de clases',
    'Perfil de instructor público',
    'Soporte estándar',
];

const basicFeatures = [
    'Todo lo del plan Comisión',
    'Verificación de perfil',
    'Soporte prioritario',
    'Estadísticas básicas',
];

const proFeatures = [
  'Todo lo del plan Básico',
  'Métricas avanzadas y análisis',
  'Asistente de IA para perfíl',
  'Marketing por correo electrónico',
];


export default function ProPlanPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold">
          Un Plan Justo para Tu Crecimiento
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Nuestros planes se adaptan a ti. Empieza sin costos fijos y, a medida que vendas más, suscríbete para reducir comisiones y maximizar tus ganancias.
        </p>
      </div>

       <Card className="max-w-4xl mx-auto w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">Calcula tus Ganancias: ¿Qué plan te conviene más?</CardTitle>
          <CardDescription className="text-center">
            Usa la calculadora para simular tus ingresos y ver cuánto podrías ahorrar con cada plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlanCalculator classPerformanceData={classPerformanceData} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Comisión</CardTitle>
            <CardDescription>Ideal para empezar sin costos fijos.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-bold">10%</span>
              <span className="text-muted-foreground">/transacción</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <p className="font-semibold text-sm">Funcionalidades clave:</p>
            <ul className="space-y-2">
              {commissionFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Percent className="mr-2 h-4 w-4" />
              Comenzar con Comisión
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Básico</CardTitle>
            <CardDescription>Reduce tu comisión a la mitad.</CardDescription>
            <div className="flex flex-col pt-4">
              <div className='flex items-baseline gap-2'>
                <span className="text-4xl font-bold">$14.990</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <span className="text-lg font-semibold text-primary/80 mt-1">+ 5% de comisión</span>
            </div>
             <p className="text-sm font-semibold text-accent pt-2">
              ¡Tu primer mes es gratis!
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <ul className="space-y-2">
              {basicFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Comienza tu prueba gratuita
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg shadow-primary/20 flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center justify-between">
              <span>Pro</span>
              <Badge>Recomendado</Badge>
            </CardTitle>
            <CardDescription>La comisión más baja para maximizar tus ganancias.</CardDescription>
            <div className="flex flex-col pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">$29.990</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
               <span className="text-lg font-semibold text-primary mt-1">+ 2.9% de comisión</span>
            </div>
             <p className="text-sm font-semibold text-accent pt-2">
              ¡Tu primer mes es gratis!
            </p>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <ul className="space-y-2">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Rocket className="mr-2 h-4 w-4" />
              Comienza tu prueba gratuita
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
}

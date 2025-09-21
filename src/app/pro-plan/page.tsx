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

const freeFeatures = [
  'Métricas básicas',
  'Hasta 5 clases activas',
  'Asistente de IA (limitado)',
  'Soporte estándar',
];

const commissionFeatures = [
    'Agendamiento de cupos ilimitado',
    'Herramientas de gestión de clases',
    'Perfil de instructor público',
    'Soporte estándar',
];

const basicFeatures = [
    'Agendamiento de cupos ilimitado',
    'Herramientas de gestión de clases',
    'Verificación de perfil',
    'Soporte prioritario',
];

const proFeatures = [
  'Todo lo del plan Básico',
  'Métricas avanzadas y análisis',
  'Asistente de IA para perfíl',
  'Marketing por correo electrónico',
  'Acceso a API',
];


export default function ProPlanPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold">
          Desbloquea tu Potencial con Plads
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Elige el plan que mejor se adapte a tus necesidades y lleva tu carrera como instructor al siguiente nivel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Gratis</CardTitle>
            <CardDescription>Para empezar y probar la plataforma.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/mes</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <ul className="space-y-2">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Plan Actual
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Comisión</CardTitle>
            <CardDescription>Ideal si no quieres un pago fijo mensual.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-bold">5%</span>
              <span className="text-muted-foreground">/transacción</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
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
              Elegir Comisión
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Básico</CardTitle>
            <CardDescription>Para instructores que buscan consolidarse.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-bold">$14.990</span>
              <span className="text-muted-foreground">/mes</span>
            </div>
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
              Elegir Básico
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg shadow-primary/20 flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center justify-between">
              <span>Pro</span>
              <Badge>Recomendado</Badge>
            </CardTitle>
            <CardDescription>Para instructores que quieren crecer.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-bold text-primary">$29.990</span>
              <span className="text-muted-foreground">/mes</span>
            </div>
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
              Mejorar a Pro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

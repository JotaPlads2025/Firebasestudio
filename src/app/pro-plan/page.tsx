import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Rocket } from 'lucide-react';

const proFeatures = [
  'Métricas avanzadas',
  'Creación ilimitada de clases',
  'Asistente de IA para perfíl',
  'Soporte prioritario',
  'Verificación de perfil',
  'Marketing por correo electrónico',
  'Acceso a API',
];

const freeFeatures = [
    'Métricas básicas',
    'Hasta 5 clases activas',
    'Asistente de IA (limitado)',
    'Soporte estándar',
];

export default function ProPlanPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-semibold">
            Desbloquea tu Potencial con Plads Pro
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
            Elige el plan que mejor se adapte a tus necesidades y lleva tu carrera como instructor al siguiente nivel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Gratis</CardTitle>
            <CardDescription>Para empezar y probar la plataforma.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/mes</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <ul className="space-y-2">
                {freeFeatures.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
             </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Plan Actual</Button>
          </CardFooter>
        </Card>
        <Card className="border-primary shadow-lg shadow-primary/20">
          <CardHeader>
            <CardTitle className="font-headline flex items-center justify-between">
                <span>Pro</span>
                <Badge>Recomendado</Badge>
            </CardTitle>
            <CardDescription>Para instructores que quieren crecer.</CardDescription>
            <div className="flex items-baseline gap-2 pt-4">
                <span className="text-4xl font-bold text-primary">$19</span>
                <span className="text-muted-foreground">/mes</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <ul className="space-y-2">
                {proFeatures.map(feature => (
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

// Add a Badge component since it's not globally available
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

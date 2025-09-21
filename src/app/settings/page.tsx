import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Configuraciones</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Plan Actual</CardTitle>
          <CardDescription>
            Actualmente estás en el plan Gratuito. Mejora a Pro para desbloquear más funciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/pro-plan">
            <Button>
              <Rocket className="mr-2 h-4 w-4" />
              Mejorar a Pro
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Administra tus notificaciones de Plads Pro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="new-bookings-email" className="text-base">
                Nuevo agendamiento
              </Label>
              <p className="text-sm text-muted-foreground">
                Envíame una notificación por correo electrónico cuando un nuevo
                agendamiento es creado.
              </p>
            </div>
            <Switch id="new-bookings-email" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="class-reminders-push" className="text-base">
                Recordatorios de Clases
              </Label>
              <p className="text-sm text-muted-foreground">
                Envíame una notificación 24 horas antes.
              </p>
            </div>
            <Switch id="class-reminders-push" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="cancellations-email" className="text-base">
                Cancelaciones
              </Label>
              <p className="text-sm text-muted-foreground">
                Notifícame por correo cuando se cancele un cupo agendado.
              </p>
            </div>
            <Switch id="cancellations-email" />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-summary" className="text-base">
                Analisis Semanal
              </Label>
              <p className="text-sm text-muted-foreground">
              Envía un correo semanal con tus métricas clave de rendimiento.
              </p>
            </div>
            <Switch id="weekly-summary" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Cuenta</CardTitle>
          <CardDescription>Gestión de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Eliminar cuenta</Button>
          <p className="text-sm text-muted-foreground mt-2">
            Elimina permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

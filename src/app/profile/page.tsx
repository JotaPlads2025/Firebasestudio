import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Rocket } from 'lucide-react';
import ProfileForm from '@/components/profile-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { StarRating } from '@/components/ui/star-rating';

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const instructorRating = 4.8;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Mi Perfíl</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                 {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback className="text-3xl">SG</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">Susana González</CardTitle>
              <CardDescription>SG Ladies</CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <StarRating rating={instructorRating} />
                <span className="text-sm text-muted-foreground">({instructorRating})</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge>Bachata Básico</Badge>
                <Badge>Bachata Intermedio</Badge>
                <Badge>Bachata Amateur</Badge>
                <Badge>Bachata Open Lady</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Editar Perfíl
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Plan Actual</CardTitle>
              <CardDescription>Actualmente estás en el plan Gratuito.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pro-plan" className="w-full">
                <Button className="w-full">
                  <Rocket className="mr-2 h-4 w-4" />
                  Mejorar a Pro
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Sobre Susana </CardTitle>
              <CardDescription>
                Profesora profesional de Bachata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
              Con más de 6 años de experiencia en la enseñanza de bachata, ha formado a decenas de estudiantes en diferentes niveles, desde principiantes hasta bailarines avanzados. Su trayectoria incluye múltiples campeonatos ganados tanto en categoría solista como en equipo, lo que respalda su nivel técnico, disciplina y pasión por el baile.
              </p>
              <p>
              Su estilo de enseñanza se caracteriza por la cercanía, la claridad en la explicación y el énfasis en la musicalidad y la conexión, haciendo que cada clase sea una experiencia única y motivadora. Ofrece clases en distintos formatos y niveles: básico, intermedio, amateur, open, escuela y un espacio exclusivo para ladies, donde se potencia la confianza, el estilo y la expresión individual.

Más allá de la técnica, su misión es transmitir el amor por la bachata y ayudar a cada alumno a superar sus propios límites, disfrutando del proceso de aprendizaje en un ambiente dinámico y acogedor.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Asistente de IA</CardTitle>
              <CardDescription>
                Deja a nuestra IA ayudarte a crear un perfíl de usuario llamativo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
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
import { Edit, Instagram, Rocket } from 'lucide-react';
import ProfileForm from '@/components/profile-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import VideoGallery from '@/components/video-gallery';
import { TikTokIcon } from '@/components/ui/icons';
import { StarRating } from '@/components/ui/star-rating';
import { reviewsData, type Review } from '@/lib/reviews-data';
import { Separator } from '@/components/ui/separator';
import type { Academy } from '@/lib/types';


const ReviewItem = ({ review }: { review: Review }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // Ensure date formatting happens only on the client
        setFormattedDate(new Date(review.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, [review.date]);

    return (
        <div>
            <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={review.studentAvatarUrl} alt={review.studentName} />
                    <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{review.studentName}</p>
                            <p className="text-xs text-muted-foreground">{formattedDate}</p>
                        </div>
                        <StarRating rating={review.rating} />
                    </div>
                    {review.className && <Badge variant="secondary" className="mt-2">{review.className}</Badge>}
                    <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
                </div>
            </div>
        </div>
    );
};


export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const [academy, setAcademy] = useState<Academy | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const storedAcademy = localStorage.getItem('plads-pro-academy');
    if (storedAcademy) {
      setAcademy(JSON.parse(storedAcademy));
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Perfil</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                 {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback className="text-3xl">SG</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">Susana González</CardTitle>
              <CardDescription>
                {academy ? `Director(a) de ${academy.name}` : 'SG Ladies'}
              </CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <StarRating rating={4.8} />
                <span className="text-sm font-semibold text-muted-foreground">(4.8)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge>Bachata Básico</Badge>
                <Badge>Bachata Intermedio</Badge>
                <Badge>Bachata Amateur</Badge>
                <Badge>Bachata Open Lady</Badge>
                <Badge>Coaching</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Redes Sociales</CardTitle>
              <CardDescription>Conecta con tus estudiantes.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Link href="#" aria-label="Instagram">
                <Button variant="outline" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="TikTok">
                 <Button variant="outline" size="icon">
                  <TikTokIcon className="h-5 w-5" />
                </Button>
              </Link>
               <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
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
                Instructora profesional de Bachata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
              Con más de 6 años de experiencia en la enseñanza de bachata, ha formado a decenas de estudiantes en diferentes niveles, desde principiantes hasta bailarines avanzados. Su trayectoria incluye múltiples campeonatos ganados tanto en categoría solista como en equipo, lo que respalda su nivel técnico, disciplina y pasión por el baile.
              </p>
              <p>
              Su estilo de enseñanza se caracteriza por la cercanía, la claridad en la explicación y el énfasis en la musicalidad y la conexión, haciendo que cada clase sea una experiencia única y motivadora. Ofrece clases en distintos formatos y niveles: básico, intermedio, amateur, open, escuela y un espacio exclusivo para ladies, donde se potencia la confianza, el estilo y la expresión individual.

Más allá de la técnica, su misión es transmitir el amor por la bachata y ayudar a cada estudiante a superar sus propios límites, disfrutando del proceso de aprendizaje en un ambiente dinámico y acogedor.
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Reseñas de Estudiantes</CardTitle>
              <CardDescription>
                Opiniones de estudiantes que han tomado clases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {reviewsData.map((review, index) => (
                    <>
                        <ReviewItem review={review} />
                        {index < reviewsData.length - 1 && <Separator className="mt-6" />}
                    </>
                ))}
                 <Button variant="outline" className="w-full mt-4">Ver todas las reseñas</Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Galería de Videos</CardTitle>
              <CardDescription>
                Sube hasta 5 videos para mostrar tu talento a potenciales estudiantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <VideoGallery />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Asistente de IA</CardTitle>
              <CardDescription>
                Deja a nuestra IA ayudarte a crear un perfil de usuario llamativo.
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

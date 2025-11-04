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
import { Button } from '@/components/ui/button';
import { Edit, Instagram, Rocket } from 'lucide-react';
import ProfileForm from '@/components/profile-form';
import Link from 'next/link';
import VideoGallery from '@/components/video-gallery';
import { TikTokIcon } from '@/components/ui/icons';
import { StarRating } from '@/components/ui/star-rating';
import type { Academy, InstructorProfile } from '@/lib/types';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EditProfileForm from '@/components/edit-profile-form';

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [academy, setAcademy] = useState<Academy | null>(null);

  const profileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore!, 'users', user.uid, 'instructorProfile', 'profile');
  }, [user, firestore]);

  const { data: profile, isLoading: isLoadingProfile } = useDoc<InstructorProfile>(profileRef);

  useEffect(() => {
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
                 {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />}
                <AvatarFallback className="text-3xl">{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{user?.displayName || 'Nombre de Usuario'}</CardTitle>
              <CardDescription>
                {academy ? `Director(a) de ${academy.name}` : 'Instructor/a'}
              </CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <StarRating rating={0} />
                <span className="text-sm font-semibold text-muted-foreground">(Sin reseñas)</span>
              </div>
            </CardHeader>
            <CardContent>
               <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Perfil
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Editar Perfil Profesional</DialogTitle>
                    <DialogDescription>
                        Esta es la información que verán los estudiantes sobre ti.
                    </DialogDescription>
                    </DialogHeader>
                    <EditProfileForm 
                        currentProfile={profile} 
                        onSave={() => setIsEditDialogOpen(false)} 
                    />
                </DialogContent>
               </Dialog>
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
              <CardTitle className="font-headline">Sobre Mí</CardTitle>
              <CardDescription>
                Tu biografía profesional.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {isLoadingProfile ? (
                 <p>Cargando perfil...</p>
              ) : profile?.bio ? (
                <p className="whitespace-pre-wrap">{profile.bio}</p>
              ) : (
                <p>
                  Aún no has añadido una biografía. Edita tu perfil para contarle a los estudiantes sobre ti, tu experiencia y tu estilo de enseñanza.
                </p>
              )}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Reseñas de Estudiantes</CardTitle>
              <CardDescription>
                Opiniones de estudiantes que han tomado clases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center text-muted-foreground py-10">
                <p>Aún no tienes reseñas.</p>
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
}

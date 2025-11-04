
'use client';

import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { reviewsData } from '@/lib/reviews-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Bell, Loader2 } from 'lucide-react';
import { venues as initialVenues } from '@/lib/venues-data';
import { regions } from '@/lib/locations';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import type { Class, Venue } from '@/lib/types';
import { doc, getDoc, collectionGroup, query, where, getDocs } from 'firebase/firestore';


export default function ClassDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !params.id) return;

    const findClass = async () => {
      setLoading(true);
      try {
        const q = query(collectionGroup(firestore, 'classes'), where('__name__', '==', `instructors/placeholder/classes/${params.id}`));
        
        const instructorsQuery = await getDocs(collection(firestore, 'instructors'));
        let foundDoc = null;

        for (const instructorDoc of instructorsQuery.docs) {
            const classDocRef = doc(firestore, 'instructors', instructorDoc.id, 'classes', params.id);
            const classDoc = await getDoc(classDocRef);
            if (classDoc.exists()) {
                foundDoc = classDoc;
                break;
            }
        }
        
        if (foundDoc) {
          const data = foundDoc.data() as Class;
          // Placeholder data for instructor details
          setClassData({
            ...data,
            id: foundDoc.id,
            instructorName: 'Instructor Name',
            instructorAvatar: 'https://picsum.photos/seed/instructor/100/100',
            rating: 4.8,
            reviewCount: 30,
          });
        } else {
          setClassData(null);
        }
      } catch (e) {
        console.error("Error fetching class details:", e);
        setClassData(null);
      } finally {
        setLoading(false);
      }
    };

    findClass();
  }, [firestore, params.id]);


  if (loading) {
      return (
          <div className="flex h-96 w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      );
  }

  if (!classData) {
    notFound();
  }

  const venue = initialVenues.find(v => v.id === classData.venueId);
  const regionLabel = regions.find(r => r.value === venue?.region)?.label || venue?.region;

  const isFull = classData.availability === 0;
  const hasPacks = classData.pricePlans && classData.pricePlans.length > 1;

  // For demonstration, we'll filter reviews that might match this class or instructor.
  // In a real app, reviews would be linked directly to the class or instructor.
  const classReviews = reviewsData.slice(0, 3); 

  const handleSubscription = () => {
    setIsSubscribed(true);
    toast({
      title: "¡Suscripción exitosa!",
      description: `Ahora sigues a ${classData.instructorName} y recibirás sus novedades.`,
    });
  };
  
  const getFirstSchedule = (schedules: Class['schedules']) => {
    if (!schedules || schedules.length === 0) return { day: 'No definido', time: '' };
    const first = schedules[0];
    return {
        day: first.day,
        time: `${first.startTime} - ${first.endTime}`
    };
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <Button variant="outline" onClick={() => router.back()} className="self-start">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la búsqueda
        </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-0">
              <Image
                src={`https://picsum.photos/seed/${classData.id}/800/600`}
                alt={classData.name}
                width={800}
                height={600}
                className="w-full object-cover aspect-[4/3] rounded-t-lg"
              />
              <div className="p-6">
                 <h1 className="font-headline text-3xl font-bold">{classData.name}</h1>
                 <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={classData.rating || 0} />
                    <span className="text-sm text-muted-foreground">({classData.reviewCount} opiniones)</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sobre la clase</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                {classData.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reseñas de Estudiantes</CardTitle>
            </CardHeader>
             <CardContent className="space-y-6">
                {classReviews.map((review, index) => (
                    <div key={review.id}>
                        <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src={review.studentAvatarUrl} alt={review.studentName} />
                                <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{review.studentName}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                        </div>
                        {index < classReviews.length - 1 && <Separator className="mt-6" />}
                    </div>
                ))}
                 <Button variant="outline" className="w-full mt-4">Ver todas las reseñas</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className='flex items-center gap-4'>
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={classData.instructorAvatar} alt={classData.instructorName} />
                        <AvatarFallback>{classData.instructorName ? classData.instructorName.charAt(0) : 'I'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{classData.instructorName}</h3>
                        <Link href="/profile" className="text-sm text-primary hover:underline">
                            Ver perfil
                        </Link>
                    </div>
                </div>
                <Button 
                    onClick={handleSubscription} 
                    disabled={isSubscribed}
                    variant={isSubscribed ? "secondary" : "default"}
                    className="w-full"
                >
                    <Bell className={`mr-2 h-4 w-4 ${isSubscribed ? 'fill-current' : ''}`} />
                    {isSubscribed ? 'Suscrito' : 'Suscribirse'}
                </Button>
            </CardContent>
          </Card>

          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-primary">
                ${classData.pricePlans[0].price.toLocaleString('es-CL')}
                <span className="text-sm font-normal text-muted-foreground"> /clase</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button size="lg" className="w-full" disabled={isFull}>
                    {isFull ? 'Clase Completa' : 'Agendar Cupo'}
                </Button>
                {hasPacks && (
                    <div className="space-y-2 pt-2">
                        <h4 className="font-semibold text-sm">O compra un pack:</h4>
                        <div className="grid gap-2 text-sm">
                            {classData.pricePlans.filter(p => p.price !== classData.pricePlans[0].price).map(plan => (
                                <div key={plan.name} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                    <span>{plan.name}</span>
                                    <span className="font-bold">${plan.price.toLocaleString('es-CL')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <Separator className="my-4" />
                <div className="space-y-3 text-sm">
                    {venue && (
                      <>
                        <div className="flex items-center gap-2 font-semibold">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{venue.name}</span>
                        </div>
                        <div className="pl-6 text-muted-foreground">
                          <p>{venue.address}</p>
                          <p>{venue.commune}, {regionLabel}</p>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2 pt-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{getFirstSchedule(classData.schedules).day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getFirstSchedule(classData.schedules).time}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span>Nivel {classData.level}</span>
                    </div>
                </div>
                {isFull && <p className="text-center text-sm font-semibold text-destructive">No quedan cupos disponibles para esta clase.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    
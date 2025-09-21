"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Search as SearchIcon } from 'lucide-react';

const availableClasses = [
  {
    id: 'cls-101',
    name: 'Salsa On 1 Avanzado',
    instructor: 'Carlos Ramirez',
    description: 'Perfecciona tu estilo y aprende figuras complejas de salsa en pareja.',
    image: PlaceHolderImages.find((img) => img.id === 'class-salsa'),
  },
  {
    id: 'cls-102',
    name: 'Yoga Vinyasa Multinivel',
    instructor: 'Ana María Rojas',
    description: 'Fluye con tu respiración en esta clase dinámica que conecta posturas y movimiento.',
    image: PlaceHolderImages.find((img) => img.id === 'class-yoga'),
  },
  {
    id: 'cls-103',
    name: 'Taller de Cerámica',
    instructor: 'Lucía Fernández',
    description: 'Aprende las técnicas básicas del modelado en arcilla y crea tus propias piezas.',
    image: PlaceHolderImages.find((img) => img.id === 'class-ceramics'),
  },
  {
    id: 'cls-104',
    name: 'Entrenamiento Funcional',
    instructor: 'Javier Torres',
    description: 'Mejora tu fuerza, resistencia y agilidad con este entrenamiento de alta intensidad.',
    image: PlaceHolderImages.find((img) => img.id === 'class-fitness'),
  },
  {
    id: 'cls-105',
    name: 'Curso de Acuarela',
    instructor: 'Sofia Loren',
    description: 'Explora el mundo del color y la transparencia en este curso para principiantes.',
    image: PlaceHolderImages.find((img) => img.id === 'class-art'),
  },
  {
    id: 'cls-106',
    name: 'Kizomba Fusión',
    instructor: 'Miguel Ángel',
    description: 'Fusiona la sensualidad de la kizomba con otros ritmos urbanos.',
    image: PlaceHolderImages.find((img) => img.id === 'class-kizomba'),
  },
];

export default function SearchClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = availableClasses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Buscar Clases</h1>

      <div className="flex w-full max-w-lg items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar por clase o instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <SearchIcon className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((c) => (
          <Card key={c.id}>
            {c.image && (
              <Image
                src={c.image.imageUrl}
                alt={`Imagen de la clase ${c.name}`}
                width={600}
                height={400}
                className="rounded-t-lg object-cover aspect-[3/2]"
                data-ai-hint={c.image.imageHint}
              />
            )}
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
              <CardDescription>Por {c.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {c.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar Cupo</Button>
            </CardFooter>
          </Card>
        ))}
        {filteredClasses.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            No se encontraron clases que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}

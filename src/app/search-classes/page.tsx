
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
import { Search as SearchIcon, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const availableClasses = [
  {
    id: 'cls-101',
    name: 'Salsa On 1 Avanzado',
    instructor: 'Carlos Ramirez',
    description: 'Perfecciona tu estilo y aprende figuras complejas de salsa en pareja.',
    image: PlaceHolderImages.find((img) => img.id === 'class-salsa'),
    price: 25,
    category: 'Baile',
    level: 'Avanzado',
  },
  {
    id: 'cls-102',
    name: 'Yoga Vinyasa Multinivel',
    instructor: 'Ana María Rojas',
    description: 'Fluye con tu respiración en esta clase dinámica que conecta posturas y movimiento.',
    image: PlaceHolderImages.find((img) => img.id === 'class-yoga'),
    price: 20,
    category: 'Salud',
    level: 'Todos',
  },
  {
    id: 'cls-103',
    name: 'Taller de Cerámica',
    instructor: 'Lucía Fernández',
    description: 'Aprende las técnicas básicas del modelado en arcilla y crea tus propias piezas.',
    image: PlaceHolderImages.find((img) => img.id === 'class-ceramics'),
    price: 30,
    category: 'Arte',
    level: 'Principiante',
  },
  {
    id: 'cls-104',
    name: 'Entrenamiento Funcional',
    instructor: 'Javier Torres',
    description: 'Mejora tu fuerza, resistencia y agilidad con este entrenamiento de alta intensidad.',
    image: PlaceHolderImages.find((img) => img.id === 'class-fitness'),
    price: 15,
    category: 'Deporte',
    level: 'Intermedio',
  },
  {
    id: 'cls-105',
    name: 'Curso de Acuarela',
    instructor: 'Sofia Loren',
    description: 'Explora el mundo del color y la transparencia en este curso para principiantes.',
    image: PlaceHolderImages.find((img) => img.id === 'class-art'),
    price: 28,
    category: 'Arte',
    level: 'Principiante',
  },
  {
    id: 'cls-106',
    name: 'Kizomba Fusión',
    instructor: 'Miguel Ángel',
    description: 'Fusiona la sensualidad de la kizomba con otros ritmos urbanos.',
    image: PlaceHolderImages.find((img) => img.id === 'class-kizomba'),
    price: 22,
    category: 'Baile',
    level: 'Intermedio',
  },
];

export default function SearchClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  const filteredClasses = availableClasses.filter((c) => {
    const searchMatch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = c.price >= priceRange[0] && c.price <= priceRange[1];
    const categoryMatch = category === 'all' || c.category === category;
    const levelMatch = level === 'all' || c.level === level;

    return searchMatch && priceMatch && categoryMatch && levelMatch;
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Buscar Clases</h1>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Buscar por clase o instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="w-full sm:w-auto">
                <SearchIcon className="mr-2 h-4 w-4" /> Buscar
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <MapPin className="mr-2 h-4 w-4" /> Cerca de mí
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rm">Región Metropolitana</SelectItem>
                <SelectItem value="valpo">Valparaíso</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Comuna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stgo">Santiago</SelectItem>
                <SelectItem value="prov">Providencia</SelectItem>
                <SelectItem value="vit">Vitacura</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Deporte">Deporte</SelectItem>
                <SelectItem value="Baile">Baile</SelectItem>
                <SelectItem value="Arte">Arte</SelectItem>
                <SelectItem value="Salud">Salud</SelectItem>
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="Principiante">Principiante</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzado">Avanzado</SelectItem>
                <SelectItem value="Todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="price-range">Rango de Precio:</Label>
              <span className="text-sm font-medium text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              id="price-range"
              min={0}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
            />
          </div>
        </CardContent>
      </Card>

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

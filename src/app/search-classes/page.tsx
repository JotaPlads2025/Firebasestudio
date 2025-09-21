
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
import { regions, communesByRegion } from '@/lib/locations';
import { categories, subCategories } from '@/lib/categories';

const availableClasses = [
  {
    id: 'cls-101',
    name: 'Salsa On 1 Avanzado',
    instructor: 'Carlos Ramirez',
    description: 'Perfecciona tu estilo y aprende figuras complejas de salsa en pareja.',
    image: PlaceHolderImages.find((img) => img.id === 'class-salsa'),
    price: 25,
    category: 'Baile',
    style: 'Salsa',
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
    style: 'Yoga',
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
    style: 'Cerámica',
    level: 'Principiante',
  },
  {
    id: 'cls-104',
    name: 'Entrenamiento Crossfit',
    instructor: 'Javier Torres',
    description: 'Mejora tu fuerza, resistencia y agilidad con este entrenamiento de alta intensidad.',
    image: PlaceHolderImages.find((img) => img.id === 'class-fitness'),
    price: 15,
    category: 'Deporte',
    style: 'Crossfit',
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
    style: 'Pintura',
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
    style: 'Kizomba',
    level: 'Intermedio',
  },
  {
    id: 'cls-107',
    name: 'Bachata Sensual',
    instructor: 'Susana González',
    description: 'Aprende los movimientos más sensuales y fluidos de la bachata.',
    image: PlaceHolderImages.find((img) => img.id === 'class-bachata'),
    price: 20,
    category: 'Baile',
    style: 'Bachata',
    level: 'Intermedio',
  },
   {
    id: 'cls-108',
    name: 'Bootcamp de Verano',
    instructor: 'Equipo Plads',
    description: 'Bootcamp intensivo de 3 días para mejorar tu condición física general.',
    image: PlaceHolderImages.find((img) => img.id === 'class-bootcamp'),
    price: 150,
    category: 'Bootcamp',
    style: 'General',
    level: 'Todos',
  },
  {
    id: 'cls-109',
    name: 'Coaching Personalizado de Baile',
    instructor: 'Susana González',
    description: 'Sesiones uno a uno para perfeccionar tu técnica y estilo en bachata.',
    image: PlaceHolderImages.find((img) => img.id === 'class-coaching'),
    price: 50,
    category: 'Coaching',
    style: 'Baile',
    level: 'Todos',
  },
];

export default function SearchClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [category, setCategory] = useState('all');
  const [style, setStyle] = useState('all');
  const [level, setLevel] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCommune, setSelectedCommune] = useState('all');

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setStyle('all'); // Reset style when category changes
  };
  
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedCommune('all'); // Reset commune when region changes
  };

  const filteredClasses = availableClasses.filter((c) => {
    const searchMatch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = c.price >= priceRange[0] && c.price <= priceRange[1];
    const categoryMatch = category === 'all' || c.category === category;
    const styleMatch = style === 'all' || !c.style || c.style === style;
    const levelMatch = level === 'all' || c.level === level;

    // Lógica de filtrado por ubicación (a futuro se puede conectar a datos reales)
    const locationMatch = selectedRegion === 'all' || selectedCommune === 'all' || true;

    return searchMatch && priceMatch && categoryMatch && styleMatch && levelMatch && locationMatch;
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
                placeholder="Buscar por clase, bootcamp, instructor..."
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <Select value={selectedRegion} onValueChange={handleRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las regiones</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCommune} onValueChange={setSelectedCommune} disabled={selectedRegion === 'all'}>
              <SelectTrigger>
                <SelectValue placeholder="Comuna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las comunas</SelectItem>
                {communesByRegion[selectedRegion]?.map((commune) => (
                  <SelectItem key={commune.value} value={commune.value}>
                    {commune.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {subCategories[category] && (
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estilos</SelectItem>
                  {subCategories[category]?.map((subCat) => (
                    <SelectItem key={subCat.value} value={subCat.value}>
                      {subCat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
              max={150}
              step={5}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
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

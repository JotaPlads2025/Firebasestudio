import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import type { ClassPricePlan } from './types';


export type SearchableClass = {
  id: string;
  name: string;
  instructorName: string;
  instructorAvatar: ImagePlaceholder;
  rating: number;
  reviewCount: number;
  image: ImagePlaceholder;
  availableSlots: number;
  price: number;
  pricePlans: ClassPricePlan[];
  region: string;
  commune: string;
  category: string;
  subCategory: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Todos';
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
};

const findImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) throw new Error(`Placeholder image with id '${id}' not found.`);
    return img;
};

export const searchableClasses: SearchableClass[] = [
  {
    id: 'search-cls-001',
    name: 'Salsa On1 Intermedio',
    instructorName: 'Carlos Ruiz',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.9,
    reviewCount: 82,
    image: findImage('class-salsa'),
    availableSlots: 5,
    price: 8000,
    pricePlans: [
        { name: 'Clase suelta', price: 8000 },
        { name: '4 Clases', price: 30000 },
        { name: '8 Clases', price: 56000 },
    ],
    region: 'rm',
    commune: 'prov',
    category: 'Baile',
    subCategory: 'Salsa',
    level: 'Intermedio',
    dayOfWeek: 'Martes',
  },
  {
    id: 'search-cls-002',
    name: 'Yoga Vinyasa para Todos',
    instructorName: 'Ana Jaramillo',
    instructorAvatar: findImage('user-avatar'),
    rating: 5.0,
    reviewCount: 120,
    image: findImage('class-yoga'),
    availableSlots: 10,
    price: 7500,
    pricePlans: [
        { name: 'Clase suelta', price: 7500 },
        { name: '4 Clases', price: 28000 },
    ],
    region: 'rm',
    commune: 'nunoa',
    category: 'Deporte',
    subCategory: 'Yoga',
    level: 'Todos',
    dayOfWeek: 'Miércoles',
  },
  {
    id: 'search-cls-003',
    name: 'Bachata Fusión Avanzado',
    instructorName: 'Susana González',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.8,
    reviewCount: 95,
    image: findImage('class-bachata'),
    availableSlots: 0,
    price: 8500,
    pricePlans: [
        { name: 'Clase suelta', price: 8500 },
        { name: '4 Clases', price: 32000 },
    ],
    region: 'rm',
    commune: 'stgo',
    category: 'Baile',
    subCategory: 'Bachata',
    level: 'Avanzado',
    dayOfWeek: 'Jueves',
  },
  {
    id: 'search-cls-004',
    name: 'Taller de Cerámica Inicial',
    instructorName: 'Felipe Castro',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.7,
    reviewCount: 45,
    image: findImage('class-ceramics'),
    availableSlots: 3,
    price: 15000,
    pricePlans: [
        { name: 'Clase única', price: 15000 },
    ],
    region: 'valpo',
    commune: 'valparaiso',
    category: 'Arte',
    subCategory: 'Cerámica',
    level: 'Básico',
    dayOfWeek: 'Sábado',
  },
  {
    id: 'search-cls-005',
    name: 'Kizomba para Principiantes',
    instructorName: 'Valentina Rossi',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.9,
    reviewCount: 68,
    image: findImage('class-kizomba'),
    availableSlots: 8,
    price: 7000,
    pricePlans: [
        { name: 'Clase suelta', price: 7000 },
        { name: '4 Clases', price: 26000 },
    ],
    region: 'rm',
    commune: 'las-condes',
    category: 'Baile',
    subCategory: 'Kizomba',
    level: 'Básico',
    dayOfWeek: 'Viernes',
  },
  {
    id: 'search-cls-006',
    name: 'Crossfit Grupal',
    instructorName: 'David Toro',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.6,
    reviewCount: 150,
    image: findImage('class-fitness'),
    availableSlots: 2,
    price: 10000,
    pricePlans: [
        { name: 'Clase suelta', price: 10000 },
        { name: '8 Clases', price: 70000 },
        { name: '12 Clases', price: 95000 },
    ],
    region: 'biobio',
    commune: 'concepcion',
    category: 'Deporte',
    subCategory: 'Crossfit',
    level: 'Intermedio',
    dayOfWeek: 'Lunes',
  },
   {
    id: 'search-cls-007',
    name: 'Taller de Acuarela Libre',
    instructorName: 'Sofia Loren',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.8,
    reviewCount: 30,
    image: findImage('class-art'),
    availableSlots: 0,
    price: 12000,
    pricePlans: [
        { name: 'Taller único', price: 12000 },
    ],
    region: 'rm',
    commune: 'prov',
    category: 'Arte',
    subCategory: 'Pintura',
    level: 'Todos',
    dayOfWeek: 'Domingo',
  },
];

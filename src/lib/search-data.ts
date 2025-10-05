
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
  venueId: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Todos';
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  schedule: string; // HH:MM format
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
    venueId: 'venue-001',
    level: 'Intermedio',
    dayOfWeek: 'Martes',
    schedule: '19:00',
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
    venueId: 'venue-002',
    level: 'Todos',
    dayOfWeek: 'Miércoles',
    schedule: '10:00',
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
    venueId: 'venue-003',
    level: 'Avanzado',
    dayOfWeek: 'Jueves',
    schedule: '20:00',
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
    venueId: 'venue-004',
    level: 'Básico',
    dayOfWeek: 'Sábado',
    schedule: '11:00',
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
    venueId: 'venue-001',
    level: 'Básico',
    dayOfWeek: 'Viernes',
    schedule: '21:00',
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
    venueId: 'venue-005',
    level: 'Intermedio',
    dayOfWeek: 'Lunes',
    schedule: '18:00',
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
    venueId: 'venue-001',
    level: 'Todos',
    dayOfWeek: 'Domingo',
    schedule: '16:00',
  },
  {
    id: 'search-cls-008',
    name: 'Reggaeton Old School',
    instructorName: 'Javier Reyes',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.7,
    reviewCount: 99,
    image: findImage('class-reggaeton'),
    availableSlots: 10,
    price: 7000,
    pricePlans: [
      { name: 'Clase suelta', price: 7000 },
      { name: '4 Clases', price: 25000 },
    ],
    venueId: 'venue-003',
    level: 'Todos',
    dayOfWeek: 'Miércoles',
    schedule: '20:30',
  },
  {
    id: 'search-cls-009',
    name: 'Calistenia para Principiantes',
    instructorName: 'Marco Diaz',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.9,
    reviewCount: 55,
    image: findImage('class-calistenia'),
    availableSlots: 12,
    price: 6000,
    pricePlans: [
      { name: 'Clase suelta', price: 6000 },
      { name: 'Mes completo', price: 45000 },
    ],
    venueId: 'venue-001',
    level: 'Básico',
    dayOfWeek: 'Sábado',
    schedule: '09:00',
  },
  {
    id: 'search-cls-010',
    name: 'Ballet Clásico Adulto',
    instructorName: 'Isabella Cortez',
    instructorAvatar: findImage('user-avatar'),
    rating: 5.0,
    reviewCount: 40,
    image: findImage('class-ballet'),
    availableSlots: 6,
    price: 9000,
    pricePlans: [
      { name: 'Clase suelta', price: 9000 },
      { name: '4 Clases', price: 34000 },
    ],
    venueId: 'venue-001',
    level: 'Básico',
    dayOfWeek: 'Jueves',
    schedule: '18:30',
  },
  {
    id: 'search-cls-011',
    name: 'Pilates Reformer',
    instructorName: 'Laura Fernández',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.8,
    reviewCount: 75,
    image: findImage('class-pilates'),
    availableSlots: 1,
    price: 12000,
    pricePlans: [
      { name: 'Clase suelta', price: 12000 },
      { name: '8 Clases', price: 88000 },
    ],
    venueId: 'venue-004',
    level: 'Intermedio',
    dayOfWeek: 'Martes',
    schedule: '08:00',
  },
  {
    id: 'search-cls-012',
    name: 'Tango de Salón',
    instructorName: 'Ricardo Milán',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.9,
    reviewCount: 60,
    image: findImage('class-salsa'), // Reusing for now
    availableSlots: 4,
    price: 8500,
    pricePlans: [
      { name: 'Clase suelta', price: 8500 },
      { name: '4 Clases', price: 32000 },
    ],
    venueId: 'venue-002',
    level: 'Intermedio',
    dayOfWeek: 'Viernes',
    schedule: '20:00',
  },
  {
    id: 'search-cls-013',
    name: 'Dancehall Femenino',
    instructorName: 'Tamara Flores',
    instructorAvatar: findImage('user-avatar'),
    rating: 4.7,
    reviewCount: 88,
    image: findImage('class-dancehall'),
    availableSlots: 0,
    price: 7500,
    pricePlans: [
      { name: 'Clase suelta', price: 7500 },
      { name: '4 Clases', price: 28000 },
    ],
    venueId: 'venue-001',
    level: 'Todos',
    dayOfWeek: 'Sábado',
    schedule: '18:00',
  },
  {
    id: 'search-cls-014',
    name: 'Flamenco y Técnica',
    instructorName: 'Esperanza Reyes',
    instructorAvatar: findImage('user-avatar'),
    rating: 5.0,
    reviewCount: 35,
    image: findImage('class-salsa'), // Reusing for now
    availableSlots: 7,
    price: 9500,
    pricePlans: [
      { name: 'Clase suelta', price: 9500 },
      { name: 'Mensual', price: 68000 },
    ],
    venueId: 'venue-003',
    level: 'Intermedio',
    dayOfWeek: 'Lunes',
    schedule: '19:30',
  }
];

    

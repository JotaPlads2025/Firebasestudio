
import type { Class } from './types';

export const demoClasses: Class[] = [
  {
    id: 'demo-cls-001',
    name: 'Bachata Básico (Demo)',
    category: 'Dance',
    status: 'Active',
    availability: 20,
    bookings: 15,
    revenue: 120000,
    venueId: 'venue-001',
    schedules: [
      { day: 'Lunes', startTime: '19:00', endTime: '20:00' },
      { day: 'Miércoles', startTime: '19:00', endTime: '20:00' },
    ],
    pricePlans: [{ name: 'Clase suelta', price: 8000 }],
    schedule: 'Lun, Mie 19:00',
  },
  {
    id: 'demo-cls-002',
    name: 'Bachata Lady (Demo)',
    category: 'Dance',
    status: 'Active',
    availability: 15,
    bookings: 15,
    revenue: 240000,
    venueId: 'venue-001',
    schedules: [
        { day: 'Martes', startTime: '20:00', endTime: '21:00' },
        { day: 'Jueves', startTime: '20:00', endTime: '21:00' },
    ],
    pricePlans: [{ name: 'Clase suelta', price: 10000 }],
    schedule: 'Mar, Jue 20:00',
  },
  {
    id: 'demo-cls-003',
    name: 'Coaching Privado (Demo)',
    category: 'Coaching',
    status: 'Active',
    availability: 1,
    bookings: 1,
    revenue: 40000,
    venueId: 'venue-002',
    schedules: [
        { day: 'Miércoles', startTime: '12:00', endTime: '13:00' },
    ],
    pricePlans: [{ name: 'Sesión única', price: 40000 }],
    schedule: 'Mie 12:00',
  },
  {
    id: 'demo-cls-004',
    name: 'Bachata Intermedio (Demo)',
    category: 'Dance',
    status: 'Inactive',
    availability: 20,
    bookings: 0,
    revenue: 0,
    venueId: 'venue-002',
    schedules: [
        { day: 'Viernes', startTime: '19:00', endTime: '20:00' },
    ],
    pricePlans: [{ name: 'Clase suelta', price: 8000 }],
    schedule: 'Vie 19:00',
  },
  {
    id: 'demo-cls-005',
    name: 'Bootcamp Fusión (Demo)',
    category: 'Bootcamp',
    status: 'Active',
    availability: 30,
    bookings: 25,
    revenue: 500000,
    venueId: 'venue-003',
    schedules: [
        { day: 'Sábado', startTime: '10:00', endTime: '14:00' },
    ],
    pricePlans: [{ name: 'Entrada General', price: 20000 }],
    schedule: 'Sab 10:00',
  }
];

    
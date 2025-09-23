export type ClassPricePlan = {
  name: string;
  price: number;
};

export type ScheduleDay = 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab' | 'Dom';

export type Class = {
  id: string;
  name: string;
  category: 'Dance' | 'Sports' | 'Health' | 'Coaching' | 'Bootcamp';
  schedule: string;
  scheduleDays?: ScheduleDay[];
  pricePlans: ClassPricePlan[];
  status: 'Active' | 'Inactive';
  bookings: number;
  revenue: number;
  date?: Date;
  daysOffset?: number;
};

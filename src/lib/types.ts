
export type ClassPricePlan = {
  name: string;
  price: number;
};

export type ScheduleDay = 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab' | 'Dom';

export type Venue = {
  id: string;
  name: string;
  address: string;
  region: string;
  commune: string;
};

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
  availability: number;
  // --- Optional fields for calendar processing ---
  date?: Date;
  daysOffset?: number; // Only for demo data
  // --- Fields from Firestore ---
  instructorId?: string; 
};

export type Review = {
  id: string;
  studentName: string;
  studentAvatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  className?: string;
};

export type Academy = {
    id: string;
    name: string;
    description: string;
    ownerId: string; // Corresponds to the instructor's ID
    instructorIds: string[];
};

    
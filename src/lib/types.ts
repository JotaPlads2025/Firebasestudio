

export type ClassPricePlan = {
  name: string;
  price: number;
};

export type Schedule = {
    day: string;
    startTime: string;
    endTime: string;
};
  

export type ScheduleDay = 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab' | 'Dom';

export type Venue = {
  id: string;
  name: string;
  address: string;
  region: string;
  commune: string;
  ownerId?: string;
};

export type Class = {
  id: string;
  name: string;
  category: 'Dance' | 'Sports' | 'Health' | 'Coaching' | 'Bootcamp';
  schedule: string;
  schedules?: Schedule[];
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
  venueId: string;
  level?: string;
  subCategory?: string;
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


// From student-data.ts
export type Booking = {
    classId: string;
    planType: 'suelta' | 'pack';
    date: string; // YYYY-MM-DD
    paymentStatus: 'Pagado' | 'Pendiente';
    attendance: 'Presente' | 'Ausente' | 'No registrado';
    paymentMethod?: 'Plads' | 'Efectivo' | 'Transferencia';
};
  
export type Student = {
    studentId: string;
    name: string;
    joinDate: string; // YYYY-MM-DD
    bookings: Booking[];
};

// For processed student data
export interface StudentWithDetails extends Student {
  totalBookings: number;
  lastAttendance: string;
  status: 'Activo' | 'Inactivo' | 'Nuevo';
  attendanceRate: number;
}

export type InstructorProfile = {
    id: string;
    userId: string;
    name: string;
    bio: string;
    expertise?: string;
    contactEmail?: string;
};

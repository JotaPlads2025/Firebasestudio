
// This file is now deprecated and will be removed in a future step.
// Student data will be derived from Firestore bookings.
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
  
export const studentData: Student[] = [];

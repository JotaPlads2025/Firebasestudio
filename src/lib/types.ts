export type Class = {
  id: string;
  name: string;
  category: 'Dance' | 'Sports' | 'Health';
  schedule: string;
  price: number;
  status: 'Active' | 'Inactive';
  bookings: number;
  revenue: number;
};

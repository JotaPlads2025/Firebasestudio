export type Class = {
  id: string;
  name: string;
  category: 'Art' | 'Sports' | 'Health';
  schedule: string;
  price: number;
  status: 'Active' | 'Inactive';
  bookings: number;
  revenue: number;
};

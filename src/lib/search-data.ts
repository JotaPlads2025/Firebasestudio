
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import type { ClassPricePlan } from './types';
import type { ReactNode } from 'react';


export type SearchableClass = {
  category: string;
  subCategory?: ReactNode; // Made optional
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
  level: string;
  dayOfWeek: string;
  schedule: string; 
};

// This file is now deprecated for holding data, as we fetch from firestore.
// It can be removed or repurposed later.
export const searchableClasses: SearchableClass[] = [];

    
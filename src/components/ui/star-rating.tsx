import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({
  rating,
  totalStars = 5,
  className,
  starClassName,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStarFill = Math.round((rating % 1) * 100);
  const emptyStars = totalStars - Math.ceil(rating);

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn('h-4 w-4 fill-yellow-400 text-yellow-400', starClassName)}
        />
      ))}
      {partialStarFill > 0 && (
        <div className="relative">
          <Star
            key="partial"
            className={cn('h-4 w-4 text-yellow-400', starClassName)}
          />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${partialStarFill}%` }}
          >
            <Star
              className={cn(
                'h-4 w-4 fill-yellow-400 text-yellow-400',
                starClassName
              )}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn('h-4 w-4 text-gray-300', starClassName)}
        />
      ))}
    </div>
  );
}

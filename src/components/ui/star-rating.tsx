"use client";

import React from 'react';

const StarIcon = ({ fillPercentage, fillColor, emptyColor, ...props }: { fillPercentage: number, fillColor: string, emptyColor: string } & React.SVGProps<SVGSVGElement>) => {
  const starId = `star-gradient-${React.useId()}`;
  const fill = `url(#${starId})`;

  return (
    <svg {...props} fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={starId} x1="0" x2="100%" y1="0" y2="0">
          <stop offset={`${fillPercentage}%`} stopColor={fillColor} />
          <stop offset={`${fillPercentage}%`} stopColor={emptyColor} />
        </linearGradient>
      </defs>
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  );
};


interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  fillColor?: string;
  emptyColor?: string;
}

export const StarRating = ({ 
  rating, 
  totalStars = 5, 
  className,
  fillColor = "#FFC700", 
  emptyColor = "#E0E0E0" 
}: StarRatingProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        let fillPercentage = 0;
        if (rating >= starNumber) {
          fillPercentage = 100;
        } else if (rating > index) {
          fillPercentage = (rating - index) * 100;
        }

        return (
          <StarIcon
            key={index}
            className="h-5 w-5"
            fillPercentage={fillPercentage}
            fillColor={fillColor}
            emptyColor={emptyColor}
          />
        );
      })}
    </div>
  );
};


'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectFilterProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onSelectionChange: (selected: string[]) => void;
  className?: string;
}

export function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  className,
}: MultiSelectFilterProps) {
  const handleSelect = (value: string) => {
    if (value === 'all') {
      onSelectionChange(['all']);
    } else {
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues.filter((v) => v !== 'all'), value];
      
      if (newSelection.length === 0) {
        onSelectionChange(['all']);
      } else {
        onSelectionChange(newSelection);
      }
    }
  };

  const getLabel = (value: string) => options.find(o => o.value === value)?.label || value;

  const handleClear = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = selectedValues.filter(v => v !== value);
    if (newSelection.length === 0) {
        onSelectionChange(['all']);
    } else {
        onSelectionChange(newSelection);
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full flex justify-between items-center h-auto min-h-10', className)}
        >
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">{title}</span>
            <div className="flex flex-wrap gap-1 items-center">
              {selectedValues.map(value => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {getLabel(value)}
                  {value !== 'all' && (
                     <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleClear(value, e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleClear(value, e as any);
                            }
                        }}
                        className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                     >
                        <X className="h-3 w-3" />
                     </span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onSelect={(e) => e.preventDefault()} // Prevent closing
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

    

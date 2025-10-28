
'use client';

import * as React from 'react';
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

  const getLabel = (value: string) => {
      const option = options.find(o => o.value === value);
      if (option) return option.label;
      return value;
  };

  const handleClear = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newSelection = selectedValues.filter(v => v !== value);
    if (newSelection.length === 0) {
        onSelectionChange(['all']);
    } else {
        onSelectionChange(newSelection);
    }
  };

  const isAllSelected = selectedValues.length === 1 && selectedValues[0] === 'all';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full flex justify-between items-center h-auto min-h-10 text-left', className)}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-muted-foreground font-normal">{title}</span>
            <div className="flex flex-wrap gap-1 items-center">
              {isAllSelected ? (
                 <span className="font-medium text-sm">{getLabel('all')}</span>
              ) : (
                selectedValues.map(value => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1 font-normal"
                  >
                    {getLabel(value)}
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
                  </Badge>
                ))
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
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

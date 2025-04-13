'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';
import { ColorMap } from '@/constants/color';

type ToggleButtonProps<T> = {
  items: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  renderItem?: (item: T, isSelected: boolean) => ReactNode;
  className?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
};

export function ToggleButton<T extends string>({
  items,
  selected = [],
  onChange,
  renderItem = (item) => item,
  className = '',
  selectedClassName = '',
  unselectedClassName = '',
}: ToggleButtonProps<T>) {
  const toggle = (item: T) => {
    const isSelected = selected.includes(item);
    const newSelected = isSelected ? selected.filter((i) => i !== item) : [...selected, item];
    onChange(newSelected);
  };

  return (
    <>
      {items.map((item, idx) => {
        const isSelected = selected.includes(item);
        const bgColorClass = isSelected ? ColorMap[item] ?? 'bg-gray-300' : '';
        return (
          <button
            key={idx}
            type="button"
            onClick={() => toggle(item)}
            className={clsx(
              className,
              bgColorClass,
              isSelected ? selectedClassName : unselectedClassName
            )}
          >
            {renderItem(item, isSelected)}
          </button>
        );
      })}
    </>
  );
}

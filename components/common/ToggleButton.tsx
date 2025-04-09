'use client';

import { useState, useCallback, ReactNode } from 'react';
import clsx from 'clsx';
import { ColorMap } from '@/constants/color';

type ToggleButtonProps<T> = {
  items: T[];
  renderItem?: (item: T, isSelected: boolean) => ReactNode;
  onChange?: (selected: T[]) => void;
  initialSelected?: T[];
  className?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
};

export function ToggleButton<T extends string>({
  items,
  renderItem = (item) => item,
  onChange,
  initialSelected = [],
  className = '',
  selectedClassName = '',
  unselectedClassName = '',
}: ToggleButtonProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelected);

  const toggle = useCallback(
    (item: T) => {
      const next = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
      setSelectedItems(next);
      onChange?.(next);
    },
    [selectedItems, onChange]
  );

  return (
    <>
      {items.map((item, idx) => {
        const isSelected = selectedItems.includes(item);
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

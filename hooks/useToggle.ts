import { useState, useCallback } from 'react';

type UseToggleReturn<T> = {
  selectedItems: T[];
  toggle: (item: T) => void;
  isSelected: (item: T) => boolean;
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
};

export const useToggle = <T>(initialItems: T[] = []): UseToggleReturn<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialItems);

  const toggle = useCallback((item: T) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item) ? prevItems.filter((i) => i !== item) : [...prevItems, item]
    );
  }, []);

  const isSelected = useCallback((item: T) => selectedItems.includes(item), [selectedItems]);

  return {
    selectedItems,
    toggle,
    isSelected,
    setSelectedItems,
  };
};

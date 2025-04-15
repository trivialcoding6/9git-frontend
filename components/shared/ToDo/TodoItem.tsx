'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import CustomBadge from './CutstomBadge';
import { ColorMap } from '@/constants/color';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';

type Props = {
  id: number;
  category: string;
  text: string;
  startDate: string;
  endDate: string;
  isRepeat?: boolean;
  repeatDays?: string[];
  onClick?: () => void;
};

export default function TodoItem({
  id,
  category,
  text,
  startDate,
  endDate,
  isRepeat,
  repeatDays,
  onClick,
}: Props) {
  const [checked, setChecked] = useState(false);
  const categoryColor = ColorMap[category] ?? 'bg-gray-300';
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();

  // 예시: TodoItem 컴포넌트에서 handleClick 수정
  const handleClick = () => {
    setEditingTodo({
      id,
      category,
      text,
      startDate,
      endDate,
      isRepeat: isRepeat ?? false,
      repeatDays: repeatDays ?? [],
    });
    openModal({
      title: 'To Do 수정',
      component: <TodoPopup />,
    });
  };

  return (
    <div className="flex items-center gap-3 w-full mb-4">
      <CustomBadge label={category} color={categoryColor} />

      <button
        onClick={onClick}
        title={text}
        className={`flex-1 text-left text-sm font-semibold text-secondary cursor-pointer truncate ${
          checked ? 'line-through opacity-50' : ''
        }`}
      >
        {text}
      </button>

      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked === 'indeterminate' ? false : checked)}
      />
    </div>
  );
}

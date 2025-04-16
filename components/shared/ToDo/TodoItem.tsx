'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import CustomBadge from './CutstomBadge';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import { Category, Week } from '@/types/todo';

type Props = {
  id: string;
  userId?: string;
  categoryId: string;
  content: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  isRepeat?: boolean;
  weeks?: Week[];
  category?: Category;
  onClick?: () => void;
};

export default function TodoItem({
  id,
  userId,
  categoryId,
  content,
  startDate,
  endDate,
  isCompleted,
  isRepeat,
  weeks,
  category,
  onClick,
}: Props) {
  const [checked, setChecked] = useState(isCompleted);
  const categoryColor = category?.categoryColor ?? 'bg-gray-300';
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();

  // 예시: TodoItem 컴포넌트에서 handleClick 수정
  const handleClick = () => {
    setEditingTodo({
      id,
      userId: userId ?? '',
      categoryId,
      content,
      startDate,
      endDate,
      isCompleted,
      isRepeat: isRepeat ?? false,
      weeks,
      category,
    });
    openModal({
      title: 'To Do 수정',
      component: <TodoPopup />,
    });
  };

  return (
    <div className="flex items-center gap-3 w-full mb-4">
      {category && <CustomBadge label={category.categoryName} color={categoryColor} />}

      <button
        onClick={onClick}
        title={content}
        className={`flex-1 text-left text-sm font-semibold text-secondary cursor-pointer truncate ${
          checked ? 'line-through opacity-50' : ''
        }`}
      >
        {content}
      </button>

      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked === 'indeterminate' ? false : checked)}
      />
    </div>
  );
}

// TodoPopup.tsx
'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import CustomBadge from './CutstomBadge';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import { Category, Todo, Week } from '@/types/todo';

type Props = {
  todo: Todo;
  onClick?: () => void;
};

export default function TodoItem({ todo, onClick }: Props) {
  const [checked, setChecked] = useState(todo.isCompleted);
  const categoryColor = todo.category?.categoryColor ?? 'bg-gray-300';
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const {
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
  } = todo;

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
        className={`flex-1 text-left text-lg font-semibold text-secondary cursor-pointer truncate ${
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


import { useEffect, useState } from 'react';
import { DatePickerSection } from '@/components/shared/DatePickerSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SectionContent } from '@/components/common/SectionContent';
import { ToggleButton } from '@/components/common/ToggleButton';
import { ActionButton } from '@/components/common/ActionButton';
import { Goal, Calendar, Repeat, ListTodo, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { DeleteCompleteButtons } from '@/components/common/DeleteCompleteButton';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
<<<<<<< HEAD
import { useTodos } from '@/hooks/todo';
import { useUserStore } from '@/stores/user';
import { CategoryItem } from '@/types/category';
import { toast } from 'sonner';

=======
import { getCategoryItems } from '@/apis/category';

// const GOALS = ['영어', '코딩', '운동'];
>>>>>>> b1501fa (progress api 연동 임시 저장)
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const userId = 1;

export default function TodoPopup() {
<<<<<<< HEAD
  const { user } = useUserStore();
  const userId = parseInt(user.id as string, 10);
  const { addTodo, editTodo, removeTodo } = useTodos(userId);
  const { addTodo, updateTodoById: updateTodo, removeTodoById: deleteTodo } = useTodoListStore();
  const { closeModal } = useModalStore();
  const { editingTodo, setEditingTodo } = useTodoEditStore();
  const [todoInputs, setTodoInputs] = useState<TodoInput[]>([{ text: '' }]);
=======
  const { addTodo, updateTodoById, removeTodoById } = useTodoListStore();
  const { closeModal } = useModalStore();
  const { editingTodo, setEditingTodo } = useTodoEditStore();
  const [dateError, setDateError] = useState('');

  const [todoInputs, setTodoInputs] = useState([{ text: '' }]);
>>>>>>> b1501fa (progress api 연동 임시 저장)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatAvailable, setIsRepeatAvailable] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
<<<<<<< HEAD
  const [categoryError, setCategoryError] = useState('');
  const [todoError, setTodoError] = useState('');
  const [dateError, setDateError] = useState('');
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
=======
  const [goals, setGoals] = useState<string[]>([]);
>>>>>>> b1501fa (progress api 연동 임시 저장)

  useEffect(() => {
    const fetchGoals = async () => {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10);

<<<<<<< HEAD
  const handleInputChange = (index: number, value: string) => {
    const updated = [...todoInputs];
    updated[index].text = value;
    setTodoInputs(updated);
  };

  const handleComplete = async () => {
    let hasError = false;

    if (!selectedCategory || selectedCategory.trim() === '') {
      setCategoryError('카테고리를 선택해주세요.');
      hasError = true;
    } else {
      setCategoryError('');
    }

    const hasValidTodo = todoInputs.some((input) => input.text.trim() !== '');
    if (!hasValidTodo) {
      setTodoError('할 일을 작성해주세요.');
      hasError = true;
    } else {
      setTodoError('');
    }

    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      setDateError('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    } else {
      setDateError('');
    }

    if (hasError) return;
=======
      const goals = await getCategoryItems({
        startDate: formattedDate,
        endDate: formattedDate,
      });
      setGoals(goals);
    };
<<<<<<< HEAD
>>>>>>> b1501fa (progress api 연동 임시 저장)

    if (editingTodo) {
      await editTodo(editingTodo.id, {
        categoryId: selectedCategory,
        content: todoInputs[0].text,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        isRepeat,
        weeks: selectedDays.map((d) => ({ id: d, weekName: d })),
        isCompleted: false,
      });
      setEditingTodo(null);
    } else {
      for (const { text } of todoInputs) {
        if (text.trim()) {
          await addTodo(
            {
              userId: user.id!,
              categoryId: selectedCategory,
              content: text,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              isRepeat,
              weeks: selectedDays.map((d) => ({ id: d, weekName: d })),
              isCompleted: false,
            },
            userId
          );
        }
<<<<<<< HEAD
      }
    }
=======
      });
    }

    resetForm();
    closeModal();
    toast.success('할 일이 저장되었어요!');
>>>>>>> 373ec5c (작업 임시 수정)
  };

  const handleDelete = async () => {
    try {
      if (editingTodo) {
        await deleteTodo(editingTodo.id);
        toast.success('할 일이 삭제되었어요!');
      }

      setEditingTodo(null);
      resetForm();
      closeModal();
    } catch (e) {
      console.error('삭제 실패:', e);
    }
  };

  const resetForm = () => {
    setTodoInputs([{ text: '' }]);
    setSelectedCategory('');
    const now = new Date();
    setStartDate(now);
    setEndDate(now);
    setIsRepeat(false);
    setSelectedDays([]);
  };
=======
    fetchGoals();
  }, []);
>>>>>>> bf90c57 (progress api 연동 임시 저장)

  useEffect(() => {
    if (editingTodo) {
      setTodoInputs([{ text: editingTodo.content }]);
      setSelectedCategory(editingTodo.category?.categoryName || '');

      const parsedStart = new Date(editingTodo.startDate);
      const parsedEnd = new Date(editingTodo.endDate);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setIsRepeat(editingTodo.isRepeat ?? false);
      setSelectedDays(editingTodo.weeks?.map((w) => w.weekName) ?? []);
    }
  }, [editingTodo]);

  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      setIsRepeatAvailable(diffDays >= 6.9);
    }
  }, [startDate, endDate]);

  const handleAddField = () => {
    setTodoInputs([...todoInputs, { text: '' }]);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...todoInputs];
    updated[index].text = value;
    setTodoInputs(updated);
  };

  const handleComplete = () => {
    if (!startDate || !endDate) return;

    if (startDate > endDate) {
      setDateError('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    }
    setDateError('');

    const payload = {
      category: selectedCategory,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isRepeat,
      repeatDays: selectedDays,
    };

    if (editingTodo) {
      updateTodoById(
        editingTodo.id,
        {
          ...payload,
          text: todoInputs[0].text,
        },
        userId
      );
      setEditingTodo(null);
    } else {
      todoInputs.forEach(({ text }) => {
        if (text && selectedCategory) {
          const categoryId = goals.indexOf(selectedCategory) + 1;
          addTodo({ text, ...payload }, userId, categoryId);
        }
      });
    }

    resetForm();
    closeModal();
  };

  const handleDelete = () => {
    if (editingTodo) {
      removeTodoById(editingTodo.id, userId);
      setEditingTodo(null);
    }
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setTodoInputs([{ text: '' }]);
    setSelectedCategory('');
    const now = new Date();
    setStartDate(now);
    setEndDate(now);
    setIsRepeat(false);
    setSelectedDays([]);
  };

  return (
    <>
      <section className="mb-5 px-4">
        <SectionTitle icon={<Goal size={16} className="text-primary" />} text="목표 설정" />
        <SectionContent className="flex items-center gap-8 mt-2">
          <ToggleButton
<<<<<<< HEAD
            items={categoryItems.map((item) => item.categoryName)}
=======
            items={goals}
>>>>>>> b1501fa (progress api 연동 임시 저장)
            selected={selectedCategory ? [selectedCategory] : []}
            onChange={(selected) => setSelectedCategory(selected[0] || '')}
            className="px-4 py-1 text-sm font-semibold border-2 rounded-md transition-colors"
            selectedClassName="text-white border-transparent"
            unselectedClassName="bg-beige-light text-secondary border-primary"
          />
        </SectionContent>
      </section>

      <section className="mb-5 px-4">
        <SectionTitle icon={<Calendar size={16} className="text-primary" />} text="기간 설정" />
        <div className="flex items-center justify-center gap-3 mt-2">
          <DatePickerSection date={startDate} setDate={setStartDate} />
          <span className="text-secondary text-lg">~</span>
          <DatePickerSection date={endDate} setDate={setEndDate} />
        </div>
        {dateError && <p className="text-sm text-primary mt-1 text-center">{dateError}</p>}
      </section>

      <section className="mb-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <SectionTitle icon={<Repeat size={16} className="text-primary" />} text="반복 여부" />
          <Switch
            checked={isRepeat}
            onCheckedChange={(value) => {
              setIsRepeat(value);
              if (!value) setSelectedDays([]);
            }}
            disabled={!isRepeatAvailable}
          />
        </div>
        {isRepeat && (
          <SectionContent gap={3}>
            <ToggleButton
              items={DAYS}
              selected={selectedDays}
              onChange={setSelectedDays}
              className="w-8 h-8 rounded-md text-sm font-bold flex items-center justify-center"
              selectedClassName="bg-secondary text-white"
              unselectedClassName="bg-beige-deco text-secondary"
            />
          </SectionContent>
        )}
      </section>

      <section className="mb-5 px-4">
        <SectionTitle icon={<ListTodo size={16} className="text-primary" />} text="오늘 할 일" />
        {todoInputs.map((todo, index) => (
          <SectionContent key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="오늘 할 일을 작성해주세요"
              className="flex-1 text-sm px-1 py-1 bg-transparent text-secondary placeholder-beige-deco focus:outline-none border-b bg-beige-deco"
            />
            {index === 0 ? (
              <ActionButton onClick={handleAddField} icon={<Plus size={16} />} />
            ) : (
              <ActionButton
                onClick={() => setTodoInputs(todoInputs.filter((_, i) => i !== index))}
                icon={<span className="text-xl leading-none">−</span>}
              />
            )}
          </SectionContent>
        ))}
      </section>

      <DeleteCompleteButtons onDelete={handleDelete} onComplete={handleComplete} />
    </>
  );
}

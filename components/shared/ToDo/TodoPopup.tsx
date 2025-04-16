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
import { useTodos } from '@/hooks/todo';
import { useUserStore } from '@/stores/user';
import { CategoryItem } from '@/types/category';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

type TodoInput = { text: string };

export default function TodoPopup() {
  const { user } = useUserStore();
  const userId = parseInt(user.id as string, 10);
  const { addTodo, editTodo, removeTodo } = useTodos(userId);
  const { closeModal } = useModalStore();
  const { editingTodo, setEditingTodo } = useTodoEditStore();
  const [todoInputs, setTodoInputs] = useState<TodoInput[]>([{ text: '' }]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatAvailable, setIsRepeatAvailable] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState('');
  const [todoError, setTodoError] = useState('');
  const [dateError, setDateError] = useState('');
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);

  const handleAddField = () => {
    if (todoInputs.length >= 10) {
      setTodoError('할 일은 최대 10개까지만 작성할 수 있어요.');
      return;
    }
    setTodoInputs([...todoInputs, { text: '' }]);
    setTodoError('');
  };

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
      }
    }

    resetForm();
    closeModal();
  };

  const handleDelete = async () => {
    if (editingTodo) {
      await removeTodo(editingTodo.id);
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

  return (
    <>
      {/* 목표 설정 */}
      <section className="mb-5 px-4 text-xl">
        <SectionTitle icon={<Goal size={16} className="text-primary" />} text="목표 설정" />
        <SectionContent className="flex items-center gap-8 mt-2">
          <ToggleButton
            items={categoryItems.map((item) => item.categoryName)}
            selected={selectedCategory ? [selectedCategory] : []}
            onChange={(selected) => {
              setSelectedCategory(selected[0] || '');
              setCategoryError('');
            }}
            className="px-4 py-0.3 text-lg  border-2 rounded-md transition-colors"
            selectedClassName="text-white border-transparent"
            unselectedClassName="bg-beige-light text-secondary border-primary"
          />
        </SectionContent>
        {categoryError && <p className="text-sm text-primary mt-1 text-center">{categoryError}</p>}
      </section>

      {/* 기간 설정 */}
      <section className="mb-5 px-4">
        <SectionTitle icon={<Calendar size={16} className="text-primary" />} text="기간 설정" />
        <div className="flex items-center justify-between gap-2 w-full">
          <DatePickerSection date={startDate} setDate={setStartDate} />
          <span className="text-primary">~</span>
          <DatePickerSection date={endDate} setDate={setEndDate} />
        </div>

        {dateError && <p className="text-sm text-primary mt-1 text-center">{dateError}</p>}
      </section>

      {/* 반복 여부 */}
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
        {!isRepeatAvailable && (
          <p className="text-sm text-secondary mb-2">
            반복 설정은 <span className="text-primary font-medium">8일 이상 기간</span>에서만
            가능해요!
          </p>
        )}
        {isRepeat && (
          <SectionContent gap={3}>
            <ToggleButton
              items={DAYS}
              selected={selectedDays}
              onChange={setSelectedDays}
              className="w-8 h-8 rounded-md text-lg flex items-center justify-center"
              selectedClassName="bg-secondary text-white"
              unselectedClassName="bg-beige-deco text-secondary"
            />
          </SectionContent>
        )}
      </section>

      {/* 오늘 할 일 */}
      <section className="mb-5 px-4">
        <SectionTitle icon={<ListTodo size={16} className="text-primary" />} text="오늘 할 일" />
        {todoInputs.map((todo, index) => {
          const isLast = index === todoInputs.length - 1;

          return (
            <SectionContent key={index} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="오늘 할 일을 작성해주세요"
                title={todo.text}
                className="flex-1 text-lg px-1 py-1 bg-transparent text-secondary placeholder-beige-deco 
            focus:outline-none border-b bg-beige-deco overflow-hidden text-ellipsis whitespace-nowrap"
              />
              {isLast ? (
                <ActionButton
                  onClick={handleAddField}
                  icon={<Plus size={16} />}
                  disabled={todoInputs.length >= 10}
                />
              ) : (
                <ActionButton
                  onClick={() => setTodoInputs(todoInputs.filter((_, i) => i !== index))}
                  icon={<span className="text-xl leading-none">−</span>}
                />
              )}
            </SectionContent>
          );
        })}
      </section>

      {todoError && <p className="text-sm text-primary mt-1 text-center">{todoError}</p>}

      {/* 삭제 / 완료 버튼 */}
      <DeleteCompleteButtons
        onDelete={handleDelete}
        onComplete={handleComplete}
        disableCompleteButton={
          !selectedCategory.trim() || !todoInputs.some((todo) => todo.text.trim() !== '')
        }
      />
    </>
  );
}

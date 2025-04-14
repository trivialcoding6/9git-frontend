'use client';

import { useEffect, useState } from 'react';
import { DatePickerSection } from '@/components/shared/DatePickerSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SectionContent } from '@/components/common/SectionContent';
import { ToggleButton } from '@/components/common/ToggleButton';
import { ActionButton } from '@/components/common/ActionButton';
import { Goal, Calendar, Repeat, ListTodo, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { DeleteCompleteButtons } from '@/components/common/DeleteCompleteButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';

const GOALS = ['영어', '코딩', '운동'];
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

type TodoInput = { text: string };

export default function TodoPopup() {
  const { addTodo, updateTodo, removeTodo } = useTodoListStore();
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

  // ✅ 할 일 추가 함수 (10개 제한 포함)
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

  const handleComplete = () => {
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

    const payload = {
      category: selectedCategory,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isRepeat,
      repeatDays: selectedDays,
    };

    if (editingTodo) {
      updateTodo(editingTodo.id, {
        ...payload,
        text: todoInputs[0].text,
      });
      setEditingTodo(null);
    } else {
      todoInputs.forEach(({ text }) => {
        if (text.trim()) {
          addTodo({ text, ...payload });
        }
      });
    }

    resetForm();
    closeModal();
  };

  const handleDelete = () => {
    if (editingTodo) {
      removeTodo(editingTodo.id);
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
      setTodoInputs([{ text: editingTodo.text }]);
      setSelectedCategory(editingTodo.category);

      try {
        const parsedStart = new Date(editingTodo.startDate);
        const parsedEnd = new Date(editingTodo.endDate);
        if (!isNaN(parsedStart.getTime())) setStartDate(parsedStart);
        if (!isNaN(parsedEnd.getTime())) setEndDate(parsedEnd);
      } catch (e) {
        console.warn('Invalid date format in editingTodo:', e);
      }

      setIsRepeat(editingTodo.isRepeat ?? false);
      setSelectedDays(editingTodo.repeatDays ?? []);
    }
  }, [editingTodo]);

  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const available = diffDays >= 6.9;
      setIsRepeatAvailable(available);
    }
  }, [startDate, endDate]);

  return (
    <>
      {/* 목표 설정 */}
      <section className="mb-5 px-4 text-xl">
        <SectionTitle icon={<Goal size={16} className="text-primary" />} text="목표 설정" />
        <SectionContent className="flex items-center gap-8 mt-2">
          <ToggleButton
            items={GOALS}
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

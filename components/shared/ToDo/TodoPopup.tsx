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
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
import { useTodoPopup } from '@/hooks/useTodoPopup';
import { useUserStore } from '@/stores/user';
import { CategoryItem } from '@/types/category';
import { toast } from 'sonner';
import { fetchAllCategories } from '@/apis/category';
import { formatDateToYYYYMMDD } from '@/utils/date';
import { Week } from '@/constants/enum';
import { useRouter } from 'next/navigation';
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

type TodoInput = { text: string };

export default function TodoPopup() {
  const { user } = useUserStore();
  const router = useRouter();
  const { addTodo, editTodo, removeTodo } = useTodoPopup();
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
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTodoInputs([{ text: editingTodo.content }]);
      setSelectedCategory(editingTodo.category?.categoryName || '');
      setStartDate(new Date(editingTodo.startDate));
      setEndDate(new Date(editingTodo.endDate));
      setIsRepeat(editingTodo.isRepeat ?? false);
      setSelectedDays(editingTodo.weeks?.map((w) => w.weekName) ?? []);
    }
  }, [editingTodo]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetchAllCategories();
        if (response.status_code === 200) {
          setCategoryItems(response.data);
        } else {
          console.error('카테고리 로딩 중 오류가 발생했습니다:', response.error);
          toast.error('카테고리를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('카테고리 로딩 중 오류가 발생했습니다:', error);
        toast.error('카테고리를 불러오는데 실패했습니다.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      setIsRepeatAvailable(diffDays >= 6.9);

      // 8일 이상일 경우 자동으로 반복 설정 활성화
      if (diffDays >= 7.9 && !isRepeat) {
        setIsRepeat(true);
      }
    }
  }, [startDate, endDate, isRepeat]);

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
    if (!selectedCategory.trim()) {
      setCategoryError('카테고리를 선택해주세요.');
      return;
    }

    const hasValidTodo = todoInputs.some((input) => input.text.trim() !== '');
    if (!hasValidTodo) {
      setTodoError('할 일을 작성해주세요.');
      return;
    }

    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      setDateError('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    } else {
      setDateError('');
    }

    try {
      setIsSubmitLoading(true);
      let successCount = 0;
      let failCount = 0;
      let updatedTodo = null;

      if (editingTodo) {
        updatedTodo = await editTodo(editingTodo.id, user?.id || '', {
          categoryId: selectedCategory,
          content: todoInputs[0].text,
          startDate: formatDateToYYYYMMDD(startDate),
          endDate: formatDateToYYYYMMDD(endDate),
          isRepeat,
          weeks: selectedDays.map((d) => ({ id: d, weekName: d })),
          isCompleted: false,
        });
        setEditingTodo(null);
        toast.success('할 일이 수정되었어요!');
        successCount++;
      } else {
        for (const { text } of todoInputs) {
          if (text.trim()) {
            const selectedItem = categoryItems.find(
              (item) => item.categoryName === selectedCategory
            );

            if (!selectedItem) {
              toast.error('선택한 카테고리를 찾을 수 없습니다.');
              failCount++;
              continue;
            }

            const categoryId = selectedItem.id;
            const formattedStartDate = formatDateToYYYYMMDD(startDate);
            const formattedEndDate = formatDateToYYYYMMDD(endDate);

            console.log('할 일 추가 시도:', {
              content: text,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
              isRepeat,
              weeks: selectedDays.map((d) => ({
                id: d,
                weekName: Week[d as keyof typeof Week],
              })),
              isCompleted: false,
            });

            try {
              const newTodo = await addTodo(
                {
                  userId: user?.id || '',
                  categoryId,
                  content: text,
                  startDate: formattedStartDate,
                  endDate: formattedEndDate,
                  isRepeat,
                  weeks: selectedDays.map((d) => ({
                    id: d,
                    weekName: Week[d as keyof typeof Week],
                  })),
                  isCompleted: false,
                },
                user?.id || '',
                categoryId
              );

              if (newTodo) {
                successCount++;
              } else {
                failCount++;
                toast.error('할 일 추가에 실패했습니다.');
              }
            } catch (error) {
              failCount++;
              console.error('할 일 추가 중 오류:', error);
              toast.error(error instanceof Error ? error.message : '할 일 추가에 실패했습니다.');
            }
          }
        }

        if (successCount > 0) {
          toast.success(`${successCount}개의 할 일이 추가되었어요!`);
        }

        if (failCount > 0) {
          toast.error(`${failCount}개의 할 일 추가에 실패했어요.`);
        }
      }

      if (successCount > 0 || (editingTodo && updatedTodo)) {
        router.push('/');
        resetForm();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving todo:', error);
      toast.error(error instanceof Error ? error.message : '할 일 저장에 실패했어요.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (editingTodo) {
        await removeTodo(editingTodo.id, user?.id || '');
        toast.success('할 일이 삭제되었어요!');
      }

      setEditingTodo(null);
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('할 일 삭제에 실패했어요.');
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

  return (
    <>
      {/* 목표 설정 */}
      <section className="mb-5 px-4 text-xl">
        <SectionTitle icon={<Goal size={16} className="text-primary" />} text="목표 설정" />
        <SectionContent className="flex items-center gap-8 mt-2">
          {isLoadingCategories ? (
            <p className="text-secondary">카테고리 로딩 중...</p>
          ) : categoryItems.length > 0 ? (
            <ToggleButton
              items={categoryItems.map((item: CategoryItem) => item.categoryName)}
              selected={selectedCategory ? [selectedCategory] : []}
              onChange={(selected) => {
                setSelectedCategory(selected[0] || '');
                setCategoryError('');
              }}
              className="px-4 py-0.3 text-lg border-2 rounded-md transition-colors"
              selectedClassName="text-white border-transparent"
              unselectedClassName="bg-beige-light text-secondary border-primary"
            />
          ) : (
            <p className="text-secondary">카테고리를 불러올 수 없습니다.</p>
          )}
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
          !selectedCategory.trim() ||
          !todoInputs.some((todo) => todo.text.trim() !== '') ||
          isSubmitLoading
        }
      />
    </>
  );
}

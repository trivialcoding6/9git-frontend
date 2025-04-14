/**
 * components/service/schedule/Calendar/Calendar.tsx
 *
 * 캘린더 컴포넌트의 메인 엔트리 포인트
 *
 * 이 컴포넌트는 캘린더 전체 UI를 관리하고 하위 컴포넌트들을 조합합니다.
 * useCalendar 훅을 사용하여 캘린더 상태와 기능을 가져옵니다.
 *
 * 주요 기능:
 * 1. 월별 캘린더 표시 (CalendarMonth 사용)
 * 2. 날짜별 일정 표시 (CalendarDay 사용)
 */
'use client';

import { CalendarMonth } from './CalendarMonth';
import { CalendarDay } from './CalendarDay';
import { useCalendar } from '@/hooks/useCalendar';
import { CategoryItem } from '@/types/category';
import { MultiSelect } from '@/components/shared/MultiSelect/MultiSelect';
import { MultiSelectTrigger } from '@/components/shared/MultiSelect/MultiSelectTrigger';
import { MultiSelectContent } from '@/components/shared/MultiSelect/MultiSelectContent';
import { MultiSelectInput } from '@/components/shared/MultiSelect/MultiSelectInput';
import { MultiSelectItem } from '@/components/shared/MultiSelect/MultiSelectItem';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';
import { useSelectStore } from '@/stores/select';

type Props = {
  categoryItems: CategoryItem[];
  todos: Todo[];
  memos: Memo[];
};

export const Calendar = ({ categoryItems, todos, memos }: Props) => {
  const {
    selectedYear,
    selectedMonth,
    calendarDays,
    goToPrevMonth,
    goToNextMonth,
    getCategoryMarkersForDate,
  } = useCalendar(todos, memos);
  const searchText = useSelectStore((state) => state.searchText);
  const selectedItems = useSelectStore((state) => state.selectedItems);
  // 카테고리 데이터
  const categories = [
    { name: 'All', color: '#CCCCCC' },
    ...categoryItems.map((category) => ({
      name: category.categoryName,
      color: category.categoryColor,
    })),
    { name: '메모', color: '#744D2C' },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
      <CalendarMonth
        year={selectedYear}
        month={selectedMonth}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />

      {/* 라벨 표시 */}
      <div className="w-full flex justify-end">
        <MultiSelect>
          <MultiSelectTrigger />
          <MultiSelectContent>
            <MultiSelectInput placeholder="카테고리 검색..." />
            {filteredCategories.map((category) => (
              <MultiSelectItem key={category.name} value={category.name} color={category.color}>
                {category.name}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <CalendarDay
        calendarDays={calendarDays}
        categoryItems={categoryItems}
        selectedCategories={selectedItems}
        getCategoryMarkersForDate={getCategoryMarkersForDate}
        todos={todos}
        memos={memos}
      />
    </div>
  );
};

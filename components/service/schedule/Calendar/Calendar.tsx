/**
 * components/service/schedule/Calendar/Calendar.tsx
 *
 * 캘린더 컴포넌트의 메인 엔트리 포인트
 *
 * 이 컴포넌트는 캘린더 전체 UI를 관리하고 하위 컴포넌트들을 조합합니다.
 * useCalendar 훅을 사용하여 캘린더 상태와 기능을 가져오고,
 * useSelectStore를 통해 카테고리 선택 관련 상태를 관리합니다.
 *
 * 주요 기능:
 * 1. 월별 캘린더 표시 (CalendarMonth 사용)
 * 2. 카테고리 필터링을 위한 멀티셀렉트 드롭다운 제공
 * 3. 날짜별 일정 표시 (CalendarDay 사용)
 *
 * 구조:
 * - 상단: 연/월 표시 및 이전/다음 달 이동 버튼
 * - 중앙: 카테고리 필터 드롭다운
 * - 하단: 날짜 그리드와 카테고리 마커
 */
'use client';

import { CalendarMonth } from './CalendarMonth';
import { CalendarDay } from './CalendarDay';
import { useCalendar } from '@/hooks/useCalendar';
import { MultiSelect } from '@/components/shared/MultiSelect/MultiSelect';
import { MultiSelectTrigger } from '@/components/shared/MultiSelect/MultiSelectTrigger';
import { MultiSelectContent } from '@/components/shared/MultiSelect/MultiSelectContent';
import { MultiSelectInput } from '@/components/shared/MultiSelect/MultiSelectInput';
import { MultiSelectItem } from '@/components/shared/MultiSelect/MultiSelectItem';
import { useSelectStore } from '@/stores/select';
import { categoryItems } from '@/mocks/categories';
import { useEffect } from 'react';

export const Calendar = () => {
  const {
    selectedYear,
    selectedMonth,
    calendarDays,
    goToPrevMonth,
    goToNextMonth,
    getCategoryMarkersForDate,
  } = useCalendar();

  // 검색어와 검색된 카테고리 처리를 위한 스토어 상태 사용
  const searchText = useSelectStore((state) => state.searchText);
  const selectedItems = useSelectStore((state) => state.selectedItems);
  const setItems = useSelectStore((state) => state.setItems);
  // 카테고리 데이터
  const categories = [
    { name: 'All', color: '#CCCCCC' },
    { name: '코딩', color: '#FDA63A' },
    { name: '영어', color: '#6C88C4' },
    { name: '운동', color: '#556B2F' },
  ];

  // Mock 카테고리 아이템 데이터

  // 검색어에 따른 필터링된 카테고리
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setItems(categories.map((category) => category.name));
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
      <CalendarMonth
        year={selectedYear}
        month={selectedMonth}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />

      {/* 카테고리 선택 컴포넌트 */}
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
        year={selectedYear}
        month={selectedMonth}
        getCategoryMarkersForDate={getCategoryMarkersForDate}
      />
    </div>
  );
};

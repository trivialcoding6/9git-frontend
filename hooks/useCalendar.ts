/**
 * hooks/useCalendar.ts
 *
 * 캘린더 기능을 위한 커스텀 훅
 *
 * 주요 기능:
 * 1. 캘린더 상태 관리 (선택된 연도, 월)
 * 2. 이전/다음 달 이동 기능
 * 3. 달력 날짜 배열 생성 (현재 월의 날짜, 오늘 날짜 표시)
 * 4. 특정 날짜에 있는 Todo와 Memo 마커 계산
 */
import { CategoryItem } from '@/types/category';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/date';
import { useMemo, useState } from 'react';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';

/**
 * 캘린더 날짜 타입
 * @property date - 날짜 (1~31)
 * @property currentMonth - 현재 월에 속하는지 여부
 * @property isToday - 오늘 날짜인지 여부
 */
type Day = {
  date: number;
  currentMonth: boolean;
  isToday: boolean;
};

// 마커 타입에 isUnderline 속성 추가
type MarkerItem = {
  name: string;
  color: string;
  isUnderline?: boolean; // Memo 여부를 표시하기 위한 속성
};

export const useCalendar = (
  todos: Todo[] = [],
  memos: Memo[] = [],
  onMonthChange?: (year: number, month: number) => void,
  initialYear?: number,
  initialMonth?: number
) => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(initialYear || today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || today.getMonth() + 1);

  /**
   * 이전 달로 이동하는 함수
   */
  const goToPrevMonth = () => {
    let newYear = selectedYear;
    let newMonth = selectedMonth - 1;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setSelectedYear(newYear);
    setSelectedMonth(newMonth);

    // 월 변경 이벤트 상위 컴포넌트로 전달
    if (onMonthChange) {
      onMonthChange(newYear, newMonth);
    }
  };

  /**
   * 다음 달로 이동하는 함수
   */
  const goToNextMonth = () => {
    let newYear = selectedYear;
    let newMonth = selectedMonth + 1;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setSelectedYear(newYear);
    setSelectedMonth(newMonth);

    // 월 변경 이벤트 상위 컴포넌트로 전달
    if (onMonthChange) {
      onMonthChange(newYear, newMonth);
    }
  };

  /**
   * 달력 날짜 배열 생성 함수
   * 현재 월의 날짜들과 시작 요일에 맞게 빈 칸 추가
   * @returns 날짜 객체 또는 null 배열 (Day | null)[]
   */
  const generateCalendarDays = (): (Day | null)[] => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days: (Day | null)[] = [];

    // 이전 달의 빈칸 채우기 (null로 처리)
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // 현재 달의 날짜들
    const todayDate = today.getDate();
    const isCurrentMonth =
      today.getFullYear() === selectedYear && today.getMonth() + 1 === selectedMonth;

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
        isToday: isCurrentMonth && todayDate === i,
      });
    }

    return days;
  };

  // 달력 날짜 배열을 useMemo로 최적화하여 저장
  const calendarDays = useMemo(() => generateCalendarDays(), [selectedYear, selectedMonth]);

  /**
   * 새로운 마커 계산 함수
   */
  const getCategoryMarkersForDate = (date: number, selectedCategories: string[]): MarkerItem[] => {
    const targetDate = new Date(selectedYear, selectedMonth - 1, date);
    targetDate.setHours(0, 0, 0, 0);

    const markers: MarkerItem[] = [];
    const includeAll = selectedCategories.includes('All');
    const includeMemo = selectedCategories.includes('메모');

    // 1. Todo 마커 처리
    if (includeAll || selectedCategories.some((cat) => cat !== '메모')) {
      // Todo 필터링: 날짜 범위에 있고 선택된 카테고리에 포함된 Todo
      const filteredTodos = todos.filter((todo) => {
        // 날짜 확인
        const startDate = new Date(todo.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(todo.endDate);
        endDate.setHours(23, 59, 59, 999);

        const isInDateRange = targetDate >= startDate && targetDate <= endDate;

        // 카테고리 확인
        const isSelectedCategory =
          includeAll || selectedCategories.includes(todo.category?.categoryName || '');

        return isInDateRange && isSelectedCategory;
      });

      // 중복 제거하여 고유한 카테고리 마커만 추가
      const uniqueCategories = new Map<string, MarkerItem>();

      filteredTodos.forEach((todo) => {
        if (todo.category) {
          uniqueCategories.set(todo.category.categoryName, {
            name: todo.category.categoryName,
            color: todo.category.categoryColor,
            isUnderline: false,
          });
        }
      });

      markers.push(...uniqueCategories.values());
    }

    // 2. Memo 마커 처리 (Memo 카테고리가 선택되었을 때만)
    if (includeAll || includeMemo) {
      // 메모 필터링: 날짜 범위에 있는 메모
      const hasMemo = memos.some((memo) => {
        const startDate = new Date(memo.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(memo.endDate);
        endDate.setHours(23, 59, 59, 999);

        return targetDate >= startDate && targetDate <= endDate;
      });

      // 메모가 있으면 밑줄 마커 추가
      if (hasMemo) {
        markers.push({
          name: '메모',
          color: '#744D2C',
          isUnderline: true,
        });
      }
    }

    return markers;
  };

  return {
    selectedYear,
    selectedMonth,
    calendarDays,
    goToPrevMonth,
    goToNextMonth,
    getCategoryMarkersForDate,
  };
};

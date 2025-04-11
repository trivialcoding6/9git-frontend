/**
 * hooks/useCalendar.ts
 *
 * 캘린더 기능을 위한 커스텀 훅
 *
 * 주요 기능:
 * 1. 캘린더 상태 관리 (선택된 연도, 월)
 * 2. 이전/다음 달 이동 기능
 * 3. 달력 날짜 배열 생성 (현재 월의 날짜, 오늘 날짜 표시)
 * 4. 특정 날짜의 카테고리 마커 계산
 */
import { CategoryItem } from '@/types/category';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/date';
import { useMemo, useState } from 'react';

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

export const useCalendar = () => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  /**
   * 이전 달로 이동하는 함수
   * 1월에서 이전 달로 이동 시 연도가 줄어들고 12월로 설정
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
  };

  /**
   * 다음 달로 이동하는 함수
   * 12월에서 다음 달로 이동 시 연도가 증가하고 1월로 설정
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

  const getCategoryMarkersForDate = (
    date: number,
    categoryItems: CategoryItem[],
    selectedCategories: string[]
  ) => {
    const targetDate = new Date(selectedYear, selectedMonth - 1, date);
    targetDate.setHours(0, 0, 0, 0);

    // 해당 날짜가 startDate와 endDate 사이에 있는 카테고리 아이템 필터링
    let filteredItems = categoryItems.filter((item) => {
      const startDate = new Date(item.startDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(item.endDate);
      endDate.setHours(23, 59, 59, 999);

      return targetDate >= startDate && targetDate <= endDate;
    });

    // 선택된 카테고리로 필터링
    if (!selectedCategories.includes('All')) {
      filteredItems = filteredItems.filter((item) =>
        selectedCategories.includes(item.categoryName)
      );
    }

    // 중복 제거하여 고유한 카테고리만 반환
    const uniqueCategories = Array.from(
      new Map(
        filteredItems.map((item) => [
          item.categoryName,
          { name: item.categoryName, color: item.categoryColor },
        ])
      ).values()
    );

    return uniqueCategories;
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

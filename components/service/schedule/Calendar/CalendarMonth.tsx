/**
 * components/service/schedule/Calendar/CalendarMonth.tsx
 *
 * 캘린더의 상단부 - 연/월 표시 및 월 이동 컨트롤을 제공하는 컴포넌트
 *
 * 이 컴포넌트는 현재 선택된 연도와 월을 표시하고,
 * 이전 달과 다음 달로 이동할 수 있는 화살표 버튼을 제공합니다.
 *
 * 주요 기능:
 * 1. 현재 선택된 연/월 표시
 * 2. 이전 달로 이동 버튼
 * 3. 다음 달로 이동 버튼
 *
 * 스타일링:
 * - 9git 테마 색상의 원형 화살표 아이콘 사용
 * - 중앙 정렬된 연/월 텍스트 표시
 *
 * 이 컴포넌트는 연/월을 직접 관리하지 않고 props로 받아
 * 부모 컴포넌트(Calendar)에서 상태 관리 로직을 처리합니다.
 */
'use client';

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

type CalendarMonthProps = {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export const CalendarMonth = ({ year, month, onPrevMonth, onNextMonth }: CalendarMonthProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <CircleChevronLeft
        width={18}
        height={18}
        fill="#F5B44B"
        color="#fff"
        onClick={onPrevMonth}
        className="cursor-pointer"
      />
      <span className="text-md font-medium">
        {year}년 {month}월
      </span>

      <CircleChevronRight
        width={18}
        height={18}
        fill="#F5B44B"
        color="#fff"
        onClick={onNextMonth}
        className="cursor-pointer"
      />
    </div>
  );
};

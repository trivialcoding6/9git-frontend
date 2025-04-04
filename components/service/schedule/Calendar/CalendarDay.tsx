/**
 * components/service/schedule/Calendar/CalendarDay.tsx
 *
 * 캘린더의 날짜 그리드와 카테고리 마커를 표시하는 컴포넌트
 *
 * 이 컴포넌트는 캘린더의 메인 그리드 영역을 담당하며,
 * 요일 헤더, 날짜 셀, 각 날짜에 해당하는 카테고리 마커를 표시합니다.
 *
 * 주요 기능:
 * 1. 요일 헤더 (일-토) 표시
 * 2. 날짜 그리드 렌더링 (빈 셀 포함)
 * 3. 오늘 날짜 강조 표시
 * 4. 각 날짜에 해당하는 카테고리 마커 표시
 * 5. 카테고리 마커 최대 3개 표시 (초과 시 +n 형식으로 표시)
 *
 * 동작 방식:
 * 1. 전달받은 calendarDays 배열을 순회하며 날짜 그리드 생성
 * 2. 각 날짜에 대해 getCategoryMarkersForDate 함수로 표시할 카테고리 계산
 * 3. 선택된 카테고리에 따라 필터링된 카테고리 마커만 표시
 */
'use client';

import { CategoryItem } from '@/types/category';

type Day = {
  date: number;
  currentMonth: boolean;
  isToday: boolean;
};

type CalendarDayProps = {
  calendarDays: (Day | null)[];
  categoryItems: CategoryItem[];
  selectedCategories: string[];
  year: number;
  month: number;
  getCategoryMarkersForDate: (
    date: number,
    categoryItems: CategoryItem[],
    selectedCategories: string[]
  ) => Array<{ name: string; color: string }>;
};

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const CalendarDay = ({
  calendarDays,
  categoryItems,
  selectedCategories,
  year,
  month,
  getCategoryMarkersForDate,
}: CalendarDayProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((day, index) => (
          <div key={index} className={`text-center text-sm font-medium py-1`}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          // 날짜가 있는 경우에만 카테고리 마커 계산
          const categoryMarkers = day
            ? getCategoryMarkersForDate(day.date, categoryItems, selectedCategories)
            : [];

          return (
            <div key={index} className="flex flex-col items-center gap-1 aspect-square">
              {/* 날짜 */}
              {day ? (
                <>
                  <div
                    className={`
                      flex items-center justify-center text-sm rounded-xl w-8 h-6
                      ${
                        day.isToday
                          ? 'bg-[#F5B44B] text-white'
                          : 'hover:bg-orange-100 cursor-pointer'
                      }
                    `}
                  >
                    {day.date}
                  </div>

                  {/* 카테고리 마커 */}
                  {categoryMarkers.length > 0 && (
                    <div className="flex flex-row gap-[2px] mt-[2px] items-center">
                      {categoryMarkers.slice(0, 3).map((category, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      ))}
                      {categoryMarkers.length > 3 && (
                        <span className="text-xs text-gray-500 ml-[2px]">
                          +{categoryMarkers.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-8 h-8" /> // 빈 공간
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

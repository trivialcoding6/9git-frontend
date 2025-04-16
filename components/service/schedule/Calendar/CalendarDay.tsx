'use client';

import { CategoryItem } from '@/types/category';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';

type Day = {
  date: number;
  currentMonth: boolean;
  isToday: boolean;
};

// MarkerItem 타입 업데이트
type MarkerItem = {
  name: string;
  color: string;
  isUnderline?: boolean;
};

type CalendarDayProps = {
  calendarDays: (Day | null)[];
  categoryItems: CategoryItem[];
  todos: Todo[];
  memos: Memo[];
  selectedCategories: string[];
  getCategoryMarkersForDate: (date: number, selectedCategories: string[]) => MarkerItem[];
};

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const CalendarDay = ({
  calendarDays,
  selectedCategories,
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
          const markers = day ? getCategoryMarkersForDate(day.date, selectedCategories) : [];

          // 마커 분리 (일반 마커와 밑줄 마커)
          const dotMarkers = markers.filter((m) => !m.isUnderline);
          const hasMemoUnderline = markers.some((m) => m.isUnderline);

          return (
            <div key={index} className="flex flex-col items-center gap-1 aspect-square">
              {/* 날짜 */}
              {day ? (
                <>
                  <div
                    className={`
                      flex items-center justify-center text-lg rounded-xl w-8 h-6
                      ${
                        day.isToday ? 'bg-primary text-white' : 'hover:bg-orange-100 cursor-pointer'
                      }
                      
                    `}
                  >
                    {day.date}
                  </div>

                  {hasMemoUnderline && <div className="w-[30%] h-1 rounded-full bg-secondary" />}

                  {/* 카테고리 마커 (Todo용 점 마커만 여기 표시) */}
                  {dotMarkers.length > 0 && (
                    <div className="flex flex-row gap-[2px] mt-[2px] items-center">
                      {dotMarkers.slice(0, 3).map((marker, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full`}
                          style={{ backgroundColor: marker.color }}
                        />
                      ))}
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

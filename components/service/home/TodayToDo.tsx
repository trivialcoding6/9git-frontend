'use client';
import { useState } from 'react';
import { DatePickerSection } from '@/components/shared/DatePickerSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SectionContent } from '@/components/common/SectionContent';
import { ToggleButton } from '@/components/common/ToggleButton';
import { ActionButton } from '@/components/common/ActionButton';
import { Goal, Calendar, Repeat, ListTodo, Plus } from 'lucide-react';
import { ColorMap } from '@/constants/color';

export default function TodayTodo() {
  const [todoInput, setTodoInput] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const goals = ['영어', '코딩', '운동'];
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <>
      {/* 🎯 목표 설정 */}
      <section className="mb-5">
        <SectionTitle icon={<Goal size={16} color="#FDA63A" />} text="목표 설정" />
        <SectionContent className="flex flex-wrap justify-center gap-15">
          {goals.map((goal) => {
            const colorClass = ColorMap[goal] ?? 'bg-gray-200';
            return (
              <ToggleButton
                key={goal}
                item={goal}
                isSelected={selectedGoals.includes(goal)}
                onToggle={() => toggleItem(goal, selectedGoals, setSelectedGoals)}
                className="px-3 py-1 rounded-md text-sm font-semibold border-2"
                selectedClassName={`${colorClass} text-white border-transparent`}
                unselectedClassName="bg-[#FDF2E6] text-secondary border-primary"
              >
                {goal}
              </ToggleButton>
            );
          })}
        </SectionContent>
      </section>

      {/* 🗓️ 기간 설정 */}
      <section className="mb-5">
        <SectionTitle icon={<Calendar size={16} color="#FDA63A" />} text="기간 설정" />
        <div className="flex items-center justify-center gap-3">
          <DatePickerSection date={startDate} setDate={setStartDate} />
          <span className="text-secondary text-lg">~</span>
          <DatePickerSection date={endDate} setDate={setEndDate} />
        </div>
      </section>

      {/* 🔁 반복 여부 */}
      <section className="mb-5">
        <SectionTitle icon={<Repeat size={16} color="#FDA63A" />} text="반복 여부" />
        <SectionContent gap={4}>
          {days.map((day) => (
            <ToggleButton
              key={day}
              item={day}
              isSelected={selectedDays.includes(day)}
              onToggle={() => toggleItem(day, selectedDays, setSelectedDays)}
              className="w-8 h-8 rounded-md text-sm font-bold flex items-center justify-center"
              selectedClassName="bg-[#6C542C] text-white"
              unselectedClassName="bg-[#FDF2E6] text-secondary"
            >
              {day}
            </ToggleButton>
          ))}
        </SectionContent>
      </section>

      {/* ✅ 오늘 할 일 */}
      <section className="mb-1">
        <SectionTitle icon={<ListTodo size={16} color="#FDA63A" />} text="오늘 할 일" />
        <SectionContent>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="오늘 할 일을 작성해주세요"
            className="flex-1 text-sm px-1 py-1 bg-transparent text-secondary placeholder-[#C7A98E] focus:outline-none border-b border-[#F6C98E]"
          />
          <ActionButton onClick={() => console.log('추가')} icon={<Plus size={16} />}>
            추가
          </ActionButton>
        </SectionContent>
      </section>

      {/* 하단 버튼 */}
      <div className="flex justify-between mt-6 bg-transparent">
        <ActionButton onClick={() => console.log('삭제')}>삭제</ActionButton>
        <ActionButton onClick={() => console.log('완료')}>완료</ActionButton>
      </div>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { DatePickerSection } from '@/components/shared/DatePickerSection';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SectionContent } from '@/components/common/SectionContent';
import { ToggleButton } from '@/components/common/ToggleButton';
import { ActionButton } from '@/components/common/ActionButton';
import { Goal, Calendar, Repeat, ListTodo, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function TodoPopup() {
  const [todoInput, setTodoInput] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatAvailable, setIsRepeatAvailable] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const goals = ['영어', '코딩', '운동'];
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const available = diffDays >= 6.9;

      setIsRepeatAvailable(available);

      if (available) {
        setIsRepeat(true);
      } else {
        setIsRepeat(false);
        setSelectedDays([]);
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      {/* 목표 설정 */}
      <section className="mb-5 px-4">
        <SectionTitle icon={<Goal size={16} className="text-primary" />} text="목표 설정" />
        <SectionContent className="flex flex-wrap gap-10 mt-2">
          <ToggleButton
            items={goals}
            className="inline-flex items-center justify-center px-4 py-1 text-sm font-semibold border-2 rounded-md transition-colors"
            selectedClassName="text-white border-transparent"
            unselectedClassName="bg-beige-light text-secondary border-primary"
          />
        </SectionContent>
      </section>

      {/* 기간 설정 */}
      <section className="mb-5 px-4">
        <SectionTitle icon={<Calendar size={16} className="text-primary" />} text="기간 설정" />
        <div className="flex items-center justify-center gap-3 mt-2">
          <DatePickerSection date={startDate} setDate={setStartDate} />
          <span className="text-secondary text-lg">~</span>
          <DatePickerSection date={endDate} setDate={setEndDate} />
        </div>
      </section>

      {/* 반복 여부 */}
      <section className="mb-5 px-4">
        <div className="flex items-center justify-between mb-2">
          <SectionTitle icon={<Repeat size={16} className="text-primary" />} text="반복 여부" />
          <Switch checked={isRepeat} onCheckedChange={setIsRepeat} disabled={!isRepeatAvailable} />
        </div>

        {isRepeat && (
          <SectionContent gap={3}>
            <ToggleButton
              items={days}
              initialSelected={selectedDays}
              onChange={setSelectedDays}
              className="w-8 h-8 rounded-md text-sm font-bold flex items-center justify-center"
              selectedClassName="bg-secondary text-white"
              unselectedClassName="bg-beige-deco text-secondary"
            />
          </SectionContent>
        )}
      </section>

      {/* 오늘 할 일 */}
      <section className="mb-1 px-4">
        <SectionTitle icon={<ListTodo size={16} className="text-primary" />} text="오늘 할 일" />
        <SectionContent>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="오늘 할 일을 작성해주세요"
            className="flex-1 text-sm px-1 py-1 bg-transparent text-secondary placeholder-beige-deco focus:outline-none border-b bg-beige-deco"
          />
          <ActionButton onClick={() => console.log('추가')} icon={<Plus size={16} />}>
            추가
          </ActionButton>
        </SectionContent>
      </section>

      {/* 하단 버튼 */}
      <div className="flex justify-between mt-6 bg-transparent px-4">
        <ActionButton onClick={() => console.log('삭제')}>삭제</ActionButton>
        <ActionButton onClick={() => console.log('완료')}>완료</ActionButton>
      </div>
    </>
  );
}

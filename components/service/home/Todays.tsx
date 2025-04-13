'use client';

import { useState } from 'react';
import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import TodoItem from '@/components/shared/ToDo/TodoItem';
import MemoList from '@/components/shared/Memo/MemoList';
import { PenLine, Plus } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';
import { useModalStore } from '@/stores/modal';
import TodoPopup from './TodoPopup';
import ChatbotHelperBox from '@/components/shared/ToDo/ChatbotHelperBox';

export default function Todays() {
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();
  const categoryProgresses = [
    { title: '영어', value: 40 },
    { title: '코딩', value: 50 },
    { title: '운동', value: 65 },
  ];

  const handleOpenTodoModal = () => {
    openModal({
      title: '오늘의 ToDo',
      component: <TodoPopup />,
    });
  };

  const handleAddMemo = () => {
    console.log('추가');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 카드 리스트 + 하단 영역 */}
      <div className="relative bg-beige-base flex-1 shadow pt-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide rounded-none">
        <div
          className="absolute top-0 left-4 w-8 h-10 bg-primary z-5"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
          }}
        />
        {/* 오늘의 목표 진행률 */}
        <Card
          title="오늘의 목표 진행률"
          isMore
          onMoreClick={() => setShowCategoryProgress((prev) => !prev)}
        >
          <ProgressBar value={75} emoji="🐾" title="응원 문구" titleColor="text-secondary" />
        </Card>
        {/* 목표별 현황 */}
        {showCategoryProgress && (
          <Card title="목표별 현황">
            <div className="flex flex-col space-y-4">
              {categoryProgresses.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  value={item.value}
                  title={item.title}
                  titleColor="text-secondary"
                />
              ))}
            </div>
          </Card>
        )}
        {/* 오늘의 To Do */}
        <Card title="오늘의 To Do">
          <TodoItem category="영어" text="영어 단어 20개 외우기" />
          <ChatbotHelperBox />
          <div className="flex justify-center mt-4">
            <ActionButton onClick={handleOpenTodoModal} icon={<Plus size={16} />}>
              추가
            </ActionButton>
          </div>
        </Card>
        {/* 오늘의 메모 */}
        <Card
          title={
            <div className="flex items-center gap-2 font-semibold text-base">
              <PenLine className="w-4 h-4 text-secondary" />
              오늘의 메모
            </div>
          }
          isMore={false}
        >
          <MemoList />
          <div className="flex justify-center mt-4">
            <ActionButton onClick={handleAddMemo} icon={<Plus size={16} />}>
              추가
            </ActionButton>
          </div>
        </Card>
        <div className="h-3" />
      </div>
    </div>
  );
}

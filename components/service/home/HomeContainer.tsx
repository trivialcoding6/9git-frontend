'use client';

import { useState } from 'react';
import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import TodoItem from '@/components/shared/ToDo/TodoItem';
import MemoList from '@/components/shared/Memo/MemoList';
import { PenLine, Plus } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useModalStore } from '@/stores/modal';
import TodoPopup from './TodoPopup';
import ChatbotHelperBox from '@/components/shared/ToDo/ChatbotHelperBox';

export default function HomeContainer() {
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 프로필 + 경험치바 전체 영역 */}
      <div className="py-6 px-3 space-y-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          {/* Avatar 컴포넌트 사용 */}
          <Avatar className="w-20 h-20 border-2 border-[#FBAA24]">
            <AvatarImage src="unlocked/IMG1.webp" alt="코딩냥 프로필" />
            <AvatarFallback>냥</AvatarFallback>
          </Avatar>

          {/* 경험치 바 */}
          <div className="flex-1 max-w-[calc(100%-5rem)] border-[2px] border-[#FBAA24] rounded-full px-4 py-3 flex flex-col justify-center">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#5B3E1D] text-sm">코딩냥</span>
              <span className="text-sm">🐾</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-[#FBAA24] h-2 rounded-full transition-all duration-300"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">경험치 75%</p>
          </div>
        </div>
      </div>

      {/* 카드 리스트 + 하단 영역 */}
      <div className="bg-[#FDE8CE] flex-1 rounded-t-4xl shadow pt-6 pb-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide">
        {/* 오늘의 목표 진행률 */}
        <Card
          title="오늘의 목표 진행률"
          isMore
          onMoreClick={() => setShowCategoryProgress((prev) => !prev)}
        >
          <ProgressBar value={75} title="응원 문구" />
        </Card>

        {/* 목표별 현황: 토글 상태일 때만 표시 */}
        {showCategoryProgress && (
          <Card title="목표별 현황">
            <div className="flex flex-col space-y-4">
              <ProgressBar value={75} title="영어" />
              <ProgressBar value={50} title="코딩" />
              <ProgressBar value={65} title="운동" />
            </div>
          </Card>
        )}

        {/* 오늘의 투두 초기 화면 */}
        <Card title="오늘의 To Do">
          <TodoItem category="영어" text="영어 단어 20개 외우기" />
          <ChatbotHelperBox />
          <div className="flex justify-center mt-4">
            <ActionButton
              onClick={() =>
                openModal({
                  title: '오늘의 ToDo',
                  component: <TodoPopup />,
                })
              }
              icon={<Plus size={16} />}
            >
              추가
            </ActionButton>
          </div>
        </Card>

        {/* 오늘의 투두 */}
        <Card title="오늘의 To Do">
          <TodoItem category="영어" text="영어 단어 20개 외우기" />
          <TodoItem category="코딩" text="파이썬 공부 교재 보기" />
          <TodoItem category="운동" text="저녁 조깅하기" />
          <div className="flex justify-center mt-4">
            <ActionButton
              onClick={() =>
                openModal({
                  title: '오늘의 ToDo',
                  component: <TodoPopup />,
                })
              }
              icon={<Plus size={16} />}
            >
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
            <ActionButton onClick={() => console.log('추가')} icon={<Plus size={16} />}>
              추가
            </ActionButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

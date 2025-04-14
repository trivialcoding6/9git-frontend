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
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useTodoEditStore } from '@/stores/todoEditStore';

export default function Todays() {
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const { todoList } = useTodoListStore();

  const categoryProgresses = [
    { title: '영어', value: 40 },
    { title: '코딩', value: 50 },
    { title: '운동', value: 65 },
  ];

  const handleAddMemo = () => {
    console.log('추가');
  };

  const handleOpenTodoModal = () => {
    setEditingTodo(null); // ✨ 수정모드 초기화
    openModal({
      title: '오늘의 ToDo',
      component: <TodoPopup />,
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative bg-beige-base flex-1 shadow pt-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide rounded-none">
        <Card
          title="오늘의 목표 진행률"
          isMore
          onMoreClick={() => setShowCategoryProgress((prev) => !prev)}
        >
          <ProgressBar value={75} emoji="🐾" title="응원 문구" titleColor="text-secondary" />
        </Card>

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

        <Card title="오늘의 To Do">
          <div className="space-y-2">
            {todoList.length > 0 ? (
              todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  category={todo.category}
                  text={todo.text}
                  startDate={todo.startDate}
                  endDate={todo.endDate}
                  isRepeat={todo.isRepeat}
                  repeatDays={todo.repeatDays}
                  onClick={() => {
                    setEditingTodo(todo);
                    openModal({
                      title: '할 일 수정',
                      component: <TodoPopup />,
                    });
                  }}
                />
              ))
            ) : (
              <p className="text-sm text-center text-secondary">오늘의 할 일이 아직 없어요!</p>
            )}
          </div>

          {todoList.length === 0 && <ChatbotHelperBox />}

          <div className="flex justify-center mt-4">
            <ActionButton onClick={handleOpenTodoModal} icon={<Plus size={16} />}>
              추가
            </ActionButton>
          </div>
        </Card>

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

'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import TodoItem from '@/components/shared/ToDo/TodoItem';
import MemoList from '@/components/shared/Memo/MemoList';
import { Plus } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';
import { useModalStore } from '@/stores/modal';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import ChatbotHelperBox from '@/components/shared/ToDo/ChatbotHelperBox';
import { useTodoEditStore } from '@/stores/todoEditStore';
import MemoPopup from '@/components/shared/Memo/MemoPopup';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useMemoStore } from '@/stores/useMemoStore';
import { useProgressStore } from '@/stores/progressStore';
import { useUserStore } from '@/stores/user';

export default function Todays() {
  console.log('hello');
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const { totalProgressRate, cheerUpMessage, categoryProgresses, loadProgress } =
    useProgressStore();
  const { todoList } = useTodoListStore();
  const { memoList } = useMemoStore();
  const { user } = useUserStore();
  const userId = user.id;

  const handleOpenTodoModal = () => {
    setEditingTodo(null);
    openModal({
      title: '오늘의 ToDo',
      component: <TodoPopup />,
    });
  };
  const handleAddMemo = () => {
    openModal({
      title: '메모 작성',
      component: <MemoPopup />,
    });
  };

  useEffect(() => {
    if (userId) {
      loadProgress(userId);
    }
  }, [userId]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative bg-beige-base flex-1 shadow pt-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide rounded-t-3xl">
        {/* 오늘의 목표 진행률 */}
        <Card
          title="오늘의 목표 진행률"
          isMore
          onMoreClick={() => setShowCategoryProgress((prev) => !prev)}
        >
          <ProgressBar
            value={parseInt(totalProgressRate, 10) || 0}
            title={cheerUpMessage}
            titleColor="text-secondary"
          />
        </Card>

        {showCategoryProgress && (
          <Card title="목표별 현황">
            <div className="flex flex-col space-y-4">
              {categoryProgresses.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  value={parseInt(item.progressRate, 10) || 0}
                  title={item.category.categoryName}
                  titleColor="text-secondary"
                />
              ))}
            </div>
          </Card>
        )}

        {/* 오늘의 To Do */}
        <Card title="오늘의 To Do">
          <div className="space-y-2">
            {todoList.length > 0 ? (
              todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
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
              <p className="text-lg text-center text-secondary mb-2">오늘 할 일이 아직 없어요!</p>
            )}
          </div>

          {todoList.length === 0 && <ChatbotHelperBox />}

          <div className="flex justify-center mt-4">
            <ActionButton
              onClick={handleOpenTodoModal}
              icon={<Plus size={16} />}
              disabled={todoList.length >= 10}
            >
              <span className="text-base">추가</span>
            </ActionButton>
          </div>
          {todoList.length >= 10 && (
            <p className="text-sm text-primary mt-2 text-center">
              할 일은 최대 10개까지만 추가할 수 있어요.
            </p>
          )}
        </Card>

        {/* 오늘의 메모 */}
        <Card
          title={<div className="flex items-center gap-2 text-xl">오늘의 메모</div>}
          isMore={false}
        >
          {memoList.length > 0 ? (
            <MemoList />
          ) : (
            <p className="text-lg text-center text-secondary">
              오늘의 할 일을 추가해주세요! <br /> 오늘의 메모로는 어떤게 있을까요?
            </p>
          )}

          <div className="flex justify-center mt-4">
            <ActionButton
              onClick={handleAddMemo}
              icon={<Plus size={16} />}
              disabled={memoList.length >= 10}
            >
              <span className="text-base">추가</span>
            </ActionButton>
          </div>
          {memoList.length >= 10 && (
            <p className="text-sm text-primary mt-2 text-center">
              메모는 최대 10개까지만 작성할 수 있어요.
            </p>
          )}
        </Card>

        <div className="h-3" />
      </div>
    </div>
  );
}

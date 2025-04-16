'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import TodoItem from '@/components/shared/ToDo/TodoItem';
import MemoList from '@/components/shared/Memo/MemoList';
import { Plus, PencilLine } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';
import { useModalStore } from '@/stores/modal';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import ChatbotHelperBox from '@/components/shared/ToDo/ChatbotHelperBox';
import { useTodoEditStore } from '@/stores/todoEditStore';
import MemoPopup from '@/components/shared/Memo/MemoPopup';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useMemoStore } from '@/stores/useMemoStore';
import { useProgress } from '@/hooks/useProgress';
import { useUserStore } from '@/stores/user';
import { useTodoMemos } from '@/hooks/useTodoMemos';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';

// 스켈레톤 컴포넌트
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-beige-deco rounded ${className}`}></div>
);

// 진행률 카드 스켈레톤
const ProgressSkeleton = () => (
  <Card title="오늘의 목표 진행률" isMore className="w-full">
    <div className="mt-4">
      <Skeleton className="h-6 mb-2 w-1/3" />
      <Skeleton className="h-8 w-full" />
    </div>
  </Card>
);

// 할 일 카드 스켈레톤
const TodoSkeleton = () => (
  <Card title="오늘의 To Do" className="w-full">
    <div className="space-y-3 mt-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center gap-2 p-2 bg-beige-light rounded-lg">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 flex-1" />
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-4">
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
  </Card>
);

// 메모 카드 스켈레톤
const MemoSkeleton = () => (
  <Card
    title={
      <div className="flex items-center gap-2 text-xl text-secondary">
        오늘의 메모 <PencilLine size={16} />
      </div>
    }
    className="w-full"
  >
    <div className="mt-4 space-y-3">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="p-3 bg-beige-light rounded-lg">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-4">
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
  </Card>
);

export default function Todays() {
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const { totalProgressRate, cheerUpMessage, categoryProgresses, loadProgress } = useProgress();
  const { todoList, addTodo, removeTodo, updateTodo } = useTodoListStore();
  const { memoList, addMemo, removeMemo, updateMemo } = useMemoStore();
  const { user } = useUserStore();
  const userId = user.id || '';
  console.log('user', user);

  const { todos, memos, loading, error, loadTodoMemos } = useTodoMemos(userId);

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
      const today = new Date().toISOString().split('T')[0];
      loadTodoMemos(today, today);
    }
  }, [userId, loadProgress, loadTodoMemos]);

  // API에서 가져온 데이터를 스토어에 반영
  useEffect(() => {
    if (todos.length > 0) {
      todos.forEach((todo: Todo) => {
        if (!todoList.some((t) => t.id === todo.id)) {
          addTodo(todo);
        }
      });
    }
  }, [todos, todoList, addTodo]);

  useEffect(() => {
    if (memos.length > 0) {
      memos.forEach((memo: Memo) => {
        if (!memoList.some((m) => m.id === memo.id)) {
          addMemo(memo);
        }
      });
    }
  }, [memos, memoList, addMemo]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <ProgressSkeleton />
        <TodoSkeleton />
        <MemoSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative bg-beige-base flex-1 shadow pt-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide rounded-t-3xl">
        {/* 오늘의 목표 진행률 */}
        <Card
          title="오늘의 목표 진행률"
          isMore
          onMoreClick={() => setShowCategoryProgress((prev) => !prev)}
          className="w-full"
        >
          <div className="mt-4">
            <ProgressBar
              value={parseInt(totalProgressRate, 10) || 0}
              title={cheerUpMessage}
              titleColor="text-secondary"
            />
          </div>
        </Card>

        {showCategoryProgress && (
          <Card title="목표별 현황" className="w-full">
            <div className="flex flex-col space-y-2 mt-4">
              {categoryProgresses.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  value={parseInt(item.progressRate, 10) || 0}
                  title={item.category.categoryName}
                  titleColor="text-secondary"
                  color={item.category.categoryColor}
                />
              ))}
            </div>
          </Card>
        )}
        {/* 오늘의 To Do */}
        <Card title="오늘의 To Do" className="w-full">
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

        {/* 메모 섹션 - TodoAndMemoSection 스타일 적용 */}
        <Card
          title={
            <div className="flex items-center gap-2 text-xl text-secondary">
              오늘의 메모 <PencilLine size={16} />
            </div>
          }
          className="w-full"
        >
          <div className="mt-4 space-y-2">
            {memoList.length > 0 ? (
              <MemoList />
            ) : (
              <p className="text-lg text-center text-secondary mb-2">
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
          </div>
        </Card>

        <div className="h-3" />
      </div>
    </div>
  );
}

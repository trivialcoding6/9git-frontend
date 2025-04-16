'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import { useModalStore } from '@/stores/modal';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import { useTodoEditStore } from '@/stores/todoEditStore';
import MemoPopup from '@/components/shared/Memo/MemoPopup';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useMemoStore } from '@/stores/useMemoStore';
import { useProgress } from '@/hooks/useProgress';
import { useUserStore } from '@/stores/user';
import { useTodoMemos } from '@/hooks/useTodoMemos';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';
import { TodoAndMemoSection } from '@/components/service/schedule/TodoAndMemoSection';

export default function Todays() {
  const [showCategoryProgress, setShowCategoryProgress] = useState(false);
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const { totalProgressRate, cheerUpMessage, categoryProgresses, loadProgress } = useProgress();
  const { todoList, addTodo, removeTodo, updateTodo } = useTodoListStore();
  const { memoList, addMemo, removeMemo, updateMemo } = useMemoStore();
  const { user } = useUserStore();
  const userId = user.id || '';

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
    return <div>로딩 중...</div>;
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

        {/* TodoAndMemoSection 컴포넌트 사용 */}
        <div className="w-full">
          <TodoAndMemoSection todos={todoList} memos={memoList} />
        </div>

        <div className="h-3" />
      </div>
    </div>
  );
}

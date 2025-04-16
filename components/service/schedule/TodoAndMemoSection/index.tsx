'use client';
import { ActionButton } from '@/components/common/ActionButton';
import Card from '@/components/common/Card';
import ChatbotHelperBox from '@/components/shared/ToDo/ChatbotHelperBox';
import TodoItem from '@/components/shared/ToDo/TodoItem';
import TodoPopup from '@/components/shared/ToDo/TodoPopup';
import { todoListData } from '@/mocks/data';
import { useModalStore } from '@/stores/modal';
import { useTodoEditStore } from '@/stores/todoEditStore';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { PencilLine, Plus } from 'lucide-react';

export const TodoAndMemoSection = () => {
  //   const { todoList } = useTodoListStore();
  const { openModal } = useModalStore();
  const { setEditingTodo } = useTodoEditStore();
  const handleOpenTodoModal = () => {
    setEditingTodo(null);
    openModal({
      title: '오늘의 ToDo',
      component: <TodoPopup />,
    });
  };
  return (
    <section className="flex flex-col gap-4 bg-beige-base overflow-y-auto rounded-t-3xl mt-7 p-4">
      <div className="flex justify-center items-center mt-1 mb-10">
        <div className="w-14 h-1 bg-secondary rounded-full" />
      </div>

      {/* 메모 섹션 */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-secondary">메모</span>
          <PencilLine size={16} className="text-secondary" />
        </div>
        <div>
          <ActionButton icon={<Plus size={16} />}>
            <span className="text-base">추가</span>
          </ActionButton>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-[300px] overflow-y-auto scrollbar-hide">
        {[0, 1, 2, 3].map((memo) => (
          <div className="flex flex-col justify-center w-full h-[96px] bg-beige-light rounded-lg p-4">
            <div className="text-xl font-bold text-secondary">메모</div>
            <div className="text-sm text-primary">한강 공원 오후 5시</div>
          </div>
        ))}
      </div>

      {/* todo 섹션 */}
      <Card title="오늘의 To Do" className="mt-7 w-full">
        <div className="space-y-2">
          {todoListData.length > 0 ? (
            todoListData.map((todo) => (
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

        {todoListData.length === 0 && <ChatbotHelperBox />}

        <div className="flex justify-center mt-4">
          <ActionButton
            onClick={handleOpenTodoModal}
            icon={<Plus size={16} />}
            disabled={todoListData.length >= 10}
          >
            <span className="text-base">추가</span>
          </ActionButton>
        </div>
        {todoListData.length >= 10 && (
          <p className="text-sm text-primary mt-2 text-center">
            할 일은 최대 10개까지만 추가할 수 있어요.
          </p>
        )}
      </Card>
    </section>
  );
};

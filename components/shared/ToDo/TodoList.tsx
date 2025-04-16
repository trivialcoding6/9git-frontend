'use client';

import { useEffect } from 'react';
import { useTodoListStore } from '@/stores/useTodoListStore';
import TodoItem from './TodoItem';

const userId = 1;
const categoryId = 1;

export default function TodoList() {
  const { todoList, loadTodos } = useTodoListStore();

  useEffect(() => {
    loadTodos(userId, categoryId);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">📋 할 일 목록</h2>
      {todoList.length === 0 ? (
        <p className="text-gray-500">할 일이 없어요!</p>
      ) : (
        <ul className="space-y-2">
          {todoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                id={todo.id}
                category={todo.category}
                text={todo.text}
                startDate={todo.startDate}
                endDate={todo.endDate}
                isRepeat={todo.isRepeat}
                repeatDays={todo.repeatDays}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

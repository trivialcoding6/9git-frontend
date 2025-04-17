import { useState } from 'react';
import { Todo } from '@/types/todopopup';
import { createTodo, updateTodo, deleteTodo } from '@/apis/todopopup';

export const useTodoPopup = () => {
  const [error, setError] = useState<string | null>(null);

  const addTodo = async (todo: Omit<Todo, 'id'>, userId: string, categoryId: string) => {
    try {
      setError(null);
      const newTodo = await createTodo(todo, userId, categoryId);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 추가하는데 실패했습니다.');
      throw err;
    }
  };

  const editTodo = async (
    todoId: string,
    userId: string,
    categoryId: string,
    updated: Partial<Todo>
  ) => {
    try {
      setError(null);
      const editedTodo = await updateTodo(todoId, userId, categoryId, updated);
      return editedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 수정하는데 실패했습니다.');
      throw err;
    }
  };

  const removeTodo = async (todoId: string, userId: string, categoryId: string) => {
    try {
      setError(null);
      await deleteTodo(todoId, userId, categoryId);
    } catch (err) {
      setError(err instanceof Error ? err.message : '할 일을 삭제하는데 실패했습니다.');
      throw err;
    }
  };

  return {
    error,
    addTodo,
    editTodo,
    removeTodo,
  };
};

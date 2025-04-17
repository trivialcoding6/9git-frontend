// lib/api/todo.ts

import { Todo } from '@/types/todo';

export const fetchAllTodos = async (userId: number): Promise<Todo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/todos`);
  if (!res.ok) throw new Error('할 일 전체 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const fetchTodos = async (userId: string, todoId: string): Promise<Todo[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/todos/${todoId}`
  );
  if (!res.ok) throw new Error('할 일 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const createTodo = async (
  todo: Omit<Todo, 'id'>,
  userId: string,
  categoryId: string
): Promise<Todo> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    }
  );
  if (!res.ok) throw new Error('할 일을 추가하는데 실패했습니다.');
  return res.json();
};

export const updateTodo = async (
  todoId: string,
  userId: string,
  updated: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/todos/${todoId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }
  );
  if (!res.ok) throw new Error('할 일을 수정하는데 실패했습니다.');
  return res.json();
};

export const deleteTodo = async (todoId: string, userId: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/todos/${todoId}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('할 일을 삭제하는데 실패했습니다.');
};

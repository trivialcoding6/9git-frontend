// lib/api/todo.ts

import { Todo } from '@/types/todo';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const fetchAllTodos = async (userId: number): Promise<Todo[]> => {
  const res = await fetch(`${baseUrl}/api/v1/todos/${userId}/`);
  if (!res.ok) throw new Error('할 일 전체 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const fetchTodos = async (userId: number, todoId: number): Promise<Todo[]> => {
  const res = await fetch(`${baseUrl}/api/v1/${todoId}/${userId}/todos/`);
  if (!res.ok) throw new Error('할 일 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const createTodo = async (
  todo: Omit<Todo, 'id'>,
  userId: number,
  categoryId: number
): Promise<Todo> => {
  const res = await fetch(`${baseUrl}/api/v1/todos/${userId}/${categoryId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('할 일을 추가하는데 실패했습니다.');
  return res.json();
};

export const updateTodo = async (
  todoId: number,
  userId: number,
  updated: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(`${baseUrl}/api/v1/todos/${todoId}/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error('할 일을 수정하는데 실패했습니다.');
  return res.json();
};

export const deleteTodo = async (todoId: number, userId: number): Promise<void> => {
  const res = await fetch(`${baseUrl}/api/v1/todos/${todoId}/${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('할 일을 삭제하는데 실패했습니다.');
};

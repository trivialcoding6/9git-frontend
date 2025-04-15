
import { Memo } from '@/types/memo';
import { Todo } from '@/types/todo';

type TodoAndMemoListRequest = {
  userId: string;
  startDate: string;
  endDate: string;
};

type TodoAndMemoListResponse = {
  todos: Todo[];
  memos: Memo[];
};

export const getTodAndMemoList = async ({
  userId,
  startDate,
  endDate,
}: TodoAndMemoListRequest): Promise<TodoAndMemoListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/todos-and-memos?start_date=${startDate}&end_date=${endDate}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todos and memos');
  }

  const responseJson = await response.json();

  if (responseJson.status_code !== 200) {
    throw new Error('Failed to fetch todos and memos');
  }

  return responseJson.data;

// lib/api/todo.ts

import { Todo } from '@/types/todo';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todo');
  if (!res.ok) throw new Error('할 일 목록 불러오기 실패');
  return res.json();
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const res = await fetch('/api/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('할 일 추가 실패');
  return res.json();
};

export const updateTodo = async (id: number, updated: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error('할 일 수정 실패');
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`/api/todo/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('할 일 삭제 실패');
};


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

<<<<<<< HEAD
export const fetchAllTodos = async (userId: number): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:8000/api/v1/todos/${userId}/`);
  if (!res.ok) throw new Error('할 일 전체 목록 불러오기 실패');
  return res.json();
};

export const fetchTodos = async (userId: number, todoId: number): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:8000/api/v1/${todoId}/${userId}/todos/`);
=======
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todo');
>>>>>>> 62c29a7 (임시저장)
  if (!res.ok) throw new Error('할 일 목록 불러오기 실패');
  return res.json();
};

<<<<<<< HEAD
export const createTodo = async (
  todo: Omit<Todo, 'id'>,
  userId: number,
  categoryId: number
): Promise<Todo> => {
  const res = await fetch(`http://localhost:8000/api/v1/todos/${userId}/${categoryId}`, {
=======
export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const res = await fetch('/api/todo', {
>>>>>>> 62c29a7 (임시저장)
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('할 일 추가 실패');
  return res.json();
};

<<<<<<< HEAD
export const updateTodo = async (
  todoId: number,
  userId: number,
  updated: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(`http://localhost:8000/api/v1/todos/${todoId}/${userId}`, {
=======
export const updateTodo = async (id: number, updated: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`/api/todo/${id}`, {
>>>>>>> 62c29a7 (임시저장)
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error('할 일 수정 실패');
  return res.json();
};

<<<<<<< HEAD
export const deleteTodo = async (todoId: number, userId: number): Promise<void> => {
  const res = await fetch(`http://localhost:8000/api/v1/todos/${todoId}/${userId}`, {
=======
export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`/api/todo/${id}`, {
>>>>>>> 62c29a7 (임시저장)
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('할 일 삭제 실패');
};

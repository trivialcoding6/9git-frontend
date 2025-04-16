import { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { fetchAllTodos, createTodo, updateTodo, deleteTodo } from '@/apis/todo';

export function useTodos(userId: number) {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 초기 로딩
  useEffect(() => {
    const load = async () => {
      const todos = await fetchAllTodos(userId);
      setTodoList(todos);
      setLoading(false);
    };
    load();
  }, [userId]);

  // 추가
  const addTodo = async (todo: Omit<Todo, 'id'>, categoryId: number) => {
    const newTodo = await createTodo(todo, userId, categoryId);
    setTodoList((prev) => [...prev, newTodo]);
  };

  // 수정
  const editTodo = async (id: string, updated: Partial<Todo>) => {
    const updatedTodo = await updateTodo(Number(id), userId, updated);
    setTodoList((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };

  // 삭제
  const removeTodo = async (id: string) => {
    await deleteTodo(Number(id), userId);
    setTodoList((prev) => prev.filter((t) => t.id !== id));
  };

  return { todoList, loading, addTodo, editTodo, removeTodo };
}

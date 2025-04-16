import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { Memo } from '@/types/memo';
import { getTodAndMemoList } from '@/apis/todo';

export function useTodoMemos(userId: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodoMemos = async (startDate: string, endDate: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTodAndMemoList({
        userId,
        startDate,
        endDate,
      });

      setTodos(response.todos);
      setMemos(response.memos);
    } catch (err) {
      console.error('Error loading todos and memos:', err);
      setError('할 일과 메모를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    memos,
    loading,
    error,
    loadTodoMemos,
  };
}

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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/todos-and-memos?start_date=${startDate}&end_date=${endDate}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todos and memos');
  }

  const responseJson = await response.json();

  if (responseJson.status_code !== 200) {
    throw new Error('Failed to fetch todos and memos');
  }

  return responseJson.data;
};

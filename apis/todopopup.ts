import { Todo, TodoResponse, TodoListResponse } from '@/types/todopopup';

// ✅ 전체 Todo 가져오기 (카테고리별)
export const fetchAllTodos = async (
  userId: string,
  categoryId: string
): Promise<TodoListResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos`
  );
  if (!res.ok) throw new Error('할 일 전체 목록을 불러오는데 실패했습니다.');
  return res.json();
};

// ✅ 특정 Todo 가져오기
export const fetchTodoById = async (
  userId: string,
  categoryId: string,
  todoId: string
): Promise<TodoResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos/${todoId}`
  );
  if (!res.ok) throw new Error('할 일 조회에 실패했습니다.');
  return res.json();
};

// ✅ Todo 생성
export const createTodo = async (
  todo: Omit<Todo, 'id' | 'category' | 'categoryId' | 'userId'>,
  userId: string,
  categoryId: string
): Promise<TodoResponse> => {
  try {
    // API URL 구성
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos`;
    console.log('API URL:', apiUrl);

    // 요청 데이터 구성
    const requestData = {
      content: todo.content,
      startDate: todo.startDate,
      endDate: todo.endDate,
      isRepeat: todo.isRepeat || false,
      weeks:
        todo.weeks?.map((week) => ({
          weekName: week.weekName,
        })) || [],
      isCompleted: todo.isCompleted || false,
    };

    console.log('Request body:', JSON.stringify(requestData, null, 2));

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // 응답 상태 확인
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API 응답 오류:', {
        status: res.status,
        statusText: res.statusText,
        errorData,
      });

      // 422 에러의 경우 상세 메시지 제공
      if (res.status === 422) {
        const validationErrors =
          errorData.errors || errorData.message || '데이터 유효성 검사에 실패했습니다.';
        throw new Error(`할 일 추가 실패: ${validationErrors}`);
      }

      throw new Error(`할 일을 추가하는데 실패했습니다. (${res.status}: ${res.statusText})`);
    }

    // 응답 데이터 파싱
    const data = await res.json();
    console.log('API 응답 성공:', data);
    return data;
  } catch (error) {
    console.error('할 일 추가 중 오류 발생:', error);
    throw error;
  }
};

// ✅ Todo 수정
export const updateTodo = async (
  todoId: string,
  userId: string,
  categoryId: string,
  updated: Partial<Todo>
): Promise<TodoResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos/${todoId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }
  );
  if (!res.ok) throw new Error('할 일을 수정하는데 실패했습니다.');
  return res.json();
};

// ✅ Todo 삭제
export const deleteTodo = async (
  todoId: string,
  userId: string,
  categoryId: string
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/todos/${todoId}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('할 일을 삭제하는데 실패했습니다.');
};

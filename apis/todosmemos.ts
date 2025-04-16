// 예: lib/api/todo.ts

export const fetch_filtered_todos = async ({
  user_id,
  start_date,
  end_date,
}: {
  user_id: string;
  start_date: string;
  end_date: string;
}): Promise<Todo[]> => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/v1/todos?userId=${user_id}&startDate=${start_date}&endDate=${end_date}`
    );

    if (!res.ok) {
      throw new Error('할 일 목록 불러오기 실패');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

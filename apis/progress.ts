import { ProgressResponse } from '@/types/progress';

// 여긱까지 함수 정의와 입력 부분
export const todayProgressItems = async ({
  userId,
}: {
  userId: string;
}): Promise<ProgressResponse> => {
  // 여기는 코드 동작 정의 부분
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/v1/users/${userId}/today-progresses`);

    if (!response.ok) {
      throw new Error('Failed to fetch progress items');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // 6~19 까지 코드 실행하다가 에러 발생하면 여기로 코드가 실행됨
    console.error('Error fetching progress items:', error);
    // 예외를 던짐
    throw error;
  }
};

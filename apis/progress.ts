import { CategoryProgress, ProgressResponse } from '@/types/progress';

// 여긱까지 함수 정의와 입력 부분
export const todayProgressItems = async ({
  userId,
}: {
  userId: string;
}): Promise<ProgressResponse> => {
  // 여기는 코드 동작 정의 부분
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/today-progresses`
    );

    if (!response.ok) {
      throw new Error('진행률 정보를 불러오는데 실패했습니다.');
    }

    const response_json = await response.json();

    if (response_json.status_code !== 200) {
      throw new Error('진행률 정보를 불러오는데 실패했습니다.');
    }

    return response_json.data;
  } catch (error) {
    // 6~19 까지 코드 실행하다가 에러 발생하면 여기로 코드가 실행됨
    console.error('진행률 정보를 불러오는 중 오류가 발생했습니다:', error);
    // 예외를 던짐
    throw error;
  }
};

export const getProgress = async (userId: string): Promise<ProgressResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/progresses`
    );
    if (!response.ok) {
      throw new Error('진행률을 가져오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('진행률 API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
};

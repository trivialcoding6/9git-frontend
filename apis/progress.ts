import { CategoryProgress, ProgressResponse, ProgressData } from '@/types/progress';
import { Category } from '@/types/category';

// 오늘의 진행률 가져오기
export const todayProgressItems = async ({ userId }: { userId: string }): Promise<ProgressData> => {
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

    // 카테고리 정보가 없는 경우 기본 카테고리 설정
    if (
      !response_json.data.categoryProgresses ||
      response_json.data.categoryProgresses.length === 0
    ) {
      const defaultCategories: CategoryProgress[] = [
        {
          id: '1',
          userId: userId,
          categoryId: '1',
          progressRate: '0%',
          category: {
            id: '1',
            categoryName: '영어',
            categoryColor: '#FF6B6B',
          },
        },
        {
          id: '2',
          userId: userId,
          categoryId: '2',
          progressRate: '0%',
          category: {
            id: '2',
            categoryName: '운동',
            categoryColor: '#4ECDC4',
          },
        },
        {
          id: '3',
          userId: userId,
          categoryId: '3',
          progressRate: '0%',
          category: {
            id: '3',
            categoryName: '코딩',
            categoryColor: '#45B7D1',
          },
        },
      ];

      return {
        ...response_json.data,
        categoryProgresses: defaultCategories,
      };
    }

    return response_json.data;
  } catch (error) {
    console.error('진행률 정보를 불러오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 전체 진행률 가져오기
export const getProgress = async (userId: string): Promise<ProgressData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/progresses`
    );
    if (!response.ok) {
      throw new Error('진행률을 가져오는데 실패했습니다.');
    }
    const response_json = await response.json();
    return response_json.data;
  } catch (error) {
    console.error('진행률 API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
};

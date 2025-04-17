// types/progress.ts

// 카테고리 정보 타입
export type Category = {
  id: string;
  categoryName: string;
  categoryColor: string;
};

// 각 카테고리의 진행률 타입
export type CategoryProgress = {
  id: string;
  userId: string;
  categoryId: string;
  progressRate: string;
  category: Category;
};

// 전체 API 응답 데이터 타입
export type ProgressData = {
  totalProgressRate: string;
  cheerUpMessage: string;
  categoryProgresses: CategoryProgress[];
};

// 전체 API 응답 타입
export type ProgressResponse = {
  status_code: number;
  data: ProgressData;
  error: string;
};

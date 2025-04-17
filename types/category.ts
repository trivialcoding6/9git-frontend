export type Todo = {
  id: string;
  userId: string;
  categoryId: string;
  weekId: string;
  isCompleted: boolean;
  content: string;
  startDate: string;
  endDate: string;
};

export type Memo = {
  id: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
};

export type CategoryItem = {
  id: string;
  categoryName: string;
  categoryColor: string;
  todos?: {
    id: string;
    isCompleted: boolean;
    content: string;
    startDate: string;
    endDate: string;
  }[];
  memos?: {
    id: string;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
  }[];
  created_at?: string;
  updated_at?: string;
};

export type ExtendedDay = {
  date: number;
  currentMonth: boolean;
  isToday: boolean;
  categories: {
    name: string;
    color: string;
  }[];
};

export type Category = {
  id: string;
  categoryName: string;
  categoryColor: string;
};

// 전체 카테고리 목록 응답
export type CategoryListResponse = {
  status_code: number;
  data: Category[];
  error: string | null;
};

// 단일 카테고리 조회, 생성, 수정 응답
export type SingleCategoryResponse = {
  status_code: number;
  data: Category | null;
  error: string | null;
};

// 카테고리 삭제 응답
export type DeleteCategoryResponse = {
  status_code: number;
  data: boolean;
  error: string | null;
};

// Week 반복 요일 정보
export type Week = {
  id: string;
  weekName: string; // 예: "MON", "TUE", ...
};

// 카테고리 정보
export type Category = {
  id: string;
  categoryName: string;
  categoryColor: string;
};

// 할 일(Todo) 항목
export type Todo = {
  id: string;
  userId: string;
  categoryId: string;
  content: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isCompleted: boolean;
  isRepeat: boolean;
  weeks: Week[];
  category: Category;
};

// 메모 항목
export type Memo = {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  startDate: string; // ISO 문자열
  endDate: string; // ISO 문자열
};

// API 응답의 data 필드
export type TodoMemoData = {
  todos: Todo[];
  memos: Memo[];
};

// 최종 API 응답 타입
export type TodoMemoResponse = {
  data: TodoMemoData;
  error?: string;
};

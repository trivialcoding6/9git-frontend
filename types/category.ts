export type Category = {
  name: string;
  color: string;
};

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

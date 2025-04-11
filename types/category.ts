export type Category = {
  name: string;
  color: string;
};

export type Todo = {
  id: string;
  isCompleted: boolean;
  content: string;
};

export type Memo = {
  id: string;
  title: string;
  content: string;
};

export type CategoryItem = {
  id: string;
  categoryName: string;
  categoryColor: string;
  todos: Todo[];
  memos: Memo[];
  startDate: string;
  endDate: string;
  created_at: string;
  updated_at: string;
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

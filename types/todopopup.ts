export type Week = {
  id?: string;
  weekName: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
};

export type Category = {
  id: string;
  categoryName: string;
  categoryColor: string;
};

export type Todo = {
  id: string;
  userId: string;
  categoryId: string;
  content: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  isRepeat: boolean;
  weeks: Week[];
  category: Category;
};

export type TodoResponse = {
  status_code: number;
  data: Todo;
  error: string | null;
};

export type TodoListResponse = {
  status_code: number;
  data: Todo[];
  error: string | null;
};

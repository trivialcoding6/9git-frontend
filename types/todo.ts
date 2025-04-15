export type Week = {
  id: string;
  weekName: string;
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
  isRepeat?: boolean;
  weeks?: Week[];
  category?: Category;
  isDone?: boolean;
};

export type EditingTodo = Todo;

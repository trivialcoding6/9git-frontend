export type Todo = {
  id: number;
  category: string;
  text: string;
  startDate: string;
  endDate: string;
  isRepeat?: boolean;
  repeatDays?: string[];
};

export type EditingTodo = Todo;

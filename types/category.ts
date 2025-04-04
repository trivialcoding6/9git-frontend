export type Category = {
  name: string;
  color: string;
};

export type CategoryItem = {
  goal_id: string;
  user_id: string;
  category_name: string;
  category_color: string;
  todo_content: string;
  start_date: Date;
  end_date: Date;
  is_completed: boolean;
  is_repeat: boolean;
  created_at: Date;
  updated_at: Date;
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

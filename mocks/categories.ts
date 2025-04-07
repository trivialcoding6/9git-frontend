import { CategoryItem } from '@/types/category';

export const categoryItems = [
  {
    goal_id: '1',
    user_id: 'user1',
    category_name: '코딩',
    category_color: '#FDA63A',
    todo_content: 'React 학습',
    start_date: new Date(2025, 2, 20), // 2025년 3월 20일
    end_date: new Date(2025, 4, 25), // 2025년 3월 25일
    is_completed: false,
    is_repeat: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    goal_id: '2',
    user_id: 'user1',
    category_name: '영어',
    category_color: '#6C88C4',
    todo_content: '영어 학습',
    start_date: new Date(2025, 2, 22), // 2025년 3월 22일
    end_date: new Date(2025, 4, 24), // 2025년 3월 24일
    is_completed: false,
    is_repeat: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    goal_id: '3',
    user_id: 'user1',
    category_name: '운동',
    category_color: '#556B2F',
    todo_content: '운동',
    start_date: new Date(2025, 2, 23), // 2025년 3월 23일
    end_date: new Date(2025, 3, 23), // 2025년 3월 23일
    is_completed: false,
    is_repeat: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
] as CategoryItem[];

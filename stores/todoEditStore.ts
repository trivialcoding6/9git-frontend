import { create } from 'zustand';
import { EditingTodo } from '@/types/todo';

type TodoEditStore = {
  editingTodo: EditingTodo | null;
  setEditingTodo: (todo: EditingTodo | null) => void;
};
export const useTodoEditStore = create<TodoEditStore>((set) => ({
  editingTodo: null,
  setEditingTodo: (todo) => set({ editingTodo: todo }),
}));

import { create } from 'zustand';
import { Todo } from '@/types/todo';

type TodoListStore = {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updated: Partial<Todo>) => void;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: [],
  addTodo: (todo) =>
    set((state) => {
      return {
        todoList: [...state.todoList, { ...todo }],
      };
    }),
  removeTodo: (id) =>
    set((state) => ({
      todoList: state.todoList.filter((t) => t.id !== id),
    })),
  updateTodo: (id, updated) =>
    set((state) => ({
      todoList: state.todoList.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    })),
}));

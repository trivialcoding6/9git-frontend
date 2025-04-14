import { create } from 'zustand';
import { Todo } from '@/types/todo';

let idCounter = 0;

type TodoListStore = {
  todoList: Todo[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, updated: Partial<Todo>) => void;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: [],
  addTodo: (todo) =>
    set((state) => {
      const newId = ++idCounter;
      return {
        todoList: [...state.todoList, { ...todo, id: newId }],
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

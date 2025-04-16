import { useState } from 'react';
import { Todo } from '@/types/todo';
import { createTodo, updateTodo, deleteTodo } from '@/apis/todopopup';

export function useTodoPopup(userId: number) {
  const [loading, setLoading] = useState(false);

  const addTodo = async (todo: Omit<Todo, 'id'>, categoryId: string) => {
    try {
      setLoading(true);
      const newTodo = await createTodo(todo, userId, Number(categoryId));
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (id: string, updated: Partial<Todo>) => {
    try {
      setLoading(true);
      const updatedTodo = await updateTodo(Number(id), userId, updated);
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      setLoading(true);
      await deleteTodo(Number(id), userId);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addTodo, editTodo, removeTodo };
}

import { useState } from 'react';
import { Memo } from '@/types/memo';
import { createMemo, updateMemo, deleteMemo } from '@/apis/memopopup';

export function useMemoPopup(userId: number) {
  const [loading, setLoading] = useState(false);

  const addMemo = async (memo: Omit<Memo, 'id'>) => {
    try {
      setLoading(true);
      const newMemo = await createMemo(memo, userId);
      return newMemo;
    } catch (error) {
      console.error('Error adding memo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editMemo = async (id: string, updated: Partial<Memo>) => {
    try {
      setLoading(true);
      const updatedMemo = await updateMemo(Number(id), userId, updated);
      return updatedMemo;
    } catch (error) {
      console.error('Error updating memo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeMemo = async (id: string) => {
    try {
      setLoading(true);
      await deleteMemo(Number(id), userId);
    } catch (error) {
      console.error('Error deleting memo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addMemo, editMemo, removeMemo };
}

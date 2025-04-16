// stores/useMemoStore.ts
import { create } from 'zustand';
import { Memo as MemoType } from '@/types/memo';
import { fetchMemos, createMemo, updateMemo, deleteMemo } from '@/apis/memo';

export type Memo = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

type MemoStore = {
  memoList: MemoType[];
  editingMemo: MemoType | null;
  setEditingMemo: (memo: MemoType | null) => void;
  loadMemos: (userId: number, categoryId: number, year: number, month: number) => void;
  addMemo: (memo: MemoType) => void;
  updateMemo: (id: string, memo: Partial<MemoType>) => void;
  removeMemo: (id: string) => void;
};

export const useMemoStore = create<MemoStore>((set) => ({
  memoList: [],
  editingMemo: null,
  setEditingMemo: (memo) => set({ editingMemo: memo }),
  addMemo: (memo) => set((state) => ({ memoList: [...state.memoList, memo] })),
  updateMemo: (id, updated) =>
    set((state) => ({
      memoList: state.memoList.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    })),
  removeMemo: (id) =>
    set((state) => ({
      memoList: state.memoList.filter((m) => m.id !== id),
    })),
  loadMemos: async (userId, categoryId, year, month) => {
    try {
      const memos = await fetchMemos(userId, categoryId, year, month);
      set({ memoList: memos });
    } catch (error) {
      console.error('메모 로드 실패:', error);
    }
  },
}));

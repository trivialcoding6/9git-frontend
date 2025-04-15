// stores/useMemoStore.ts
import { create } from 'zustand';

export type Memo = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

type MemoStore = {
  memoList: Memo[];
  editingMemo: Memo | null;
  setEditingMemo: (memo: Memo | null) => void;
  addMemo: (memo: Memo) => void;
  updateMemo: (id: string, memo: Partial<Memo>) => void;
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
}));

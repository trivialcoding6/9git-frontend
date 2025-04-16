import { create } from 'zustand';
import type { CategoryProgress } from '@/types/progress';
import { todayProgressItems } from '@/apis/progress';

type ProgressStore = {
  totalProgressRate: string;
  cheerUpMessage: string;
  categoryProgresses: CategoryProgress[];
  loadProgress: (userId: string) => Promise<void>;
};

export const useProgressStore = create<ProgressStore>((set) => ({
  totalProgressRate: '',
  cheerUpMessage: '',
  categoryProgresses: [],
  loadProgress: async (userId) => {
    const res = await todayProgressItems({ userId });
    set({
      totalProgressRate: res.data.totalProgressRate,
      cheerUpMessage: res.data.cheerUpMessage,
      categoryProgresses: res.data.categoryProgresses,
    });
  },
}));

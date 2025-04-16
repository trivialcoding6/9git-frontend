import { useState } from 'react';
import type { CategoryProgress } from '@/types/progress';
import { todayProgressItems } from '@/apis/progress';

export const useProgress = () => {
  const [totalProgressRate, setTotalProgressRate] = useState('');
  const [cheerUpMessage, setCheerUpMessage] = useState('');
  const [categoryProgresses, setCategoryProgresses] = useState<CategoryProgress[]>([]);

  const loadProgress = async (userId: string) => {
    const res = await todayProgressItems({ userId });
    setTotalProgressRate(res.data.totalProgressRate);
    setCheerUpMessage(res.data.cheerUpMessage);
    setCategoryProgresses(res.data.categoryProgresses);
  };

  return {
    totalProgressRate,
    cheerUpMessage,
    categoryProgresses,
    loadProgress,
  };
};

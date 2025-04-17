import { useCallback, useState } from 'react';
import type { CategoryProgress } from '@/types/progress';
import { todayProgressItems, getProgress } from '@/apis/progress';

export const useProgress = () => {
  const [totalProgressRate, setTotalProgressRate] = useState<string>('0%');
  const [cheerUpMessage, setCheerUpMessage] = useState<string>('');
  const [categoryProgresses, setCategoryProgresses] = useState<CategoryProgress[]>([]);

  const loadProgress = useCallback(async (userId: string) => {
    try {
      const response = await todayProgressItems({ userId });
      setTotalProgressRate(response.totalProgressRate);
      setCheerUpMessage(response.cheerUpMessage);
      setCategoryProgresses(response.categoryProgresses);
    } catch (error) {
      console.error('진행률 로딩 중 오류가 발생했습니다:', error);
    }
  }, []);

  const setGoal = async (goal: string) => {
    try {
      // TODO: API 호출 구현
      // const response = await setGoalAPI(goal);
      console.log('목표가 설정되었습니다:', goal);
    } catch (error) {
      console.error('목표 설정 중 오류가 발생했습니다:', error);
      throw error;
    }
  };

  return {
    totalProgressRate,
    cheerUpMessage,
    categoryProgresses,
    loadProgress,
    setGoal,
  };
};

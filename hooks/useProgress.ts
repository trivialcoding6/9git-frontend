import { useCallback, useState } from 'react';
import type { CategoryProgress, ProgressData } from '@/types/progress';
import { todayProgressItems, getProgress } from '@/apis/progress';

export const useProgress = () => {
  const [totalProgressRate, setTotalProgressRate] = useState<string>('0%');
  const [cheerUpMessage, setCheerUpMessage] = useState<string>('');
  const [categoryProgresses, setCategoryProgresses] = useState<CategoryProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async (userId: string) => {
    if (!userId) {
      console.error('사용자 ID가 제공되지 않았습니다.');
      setError('사용자 ID가 제공되지 않았습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await todayProgressItems({ userId });

      // 응답 데이터 유효성 검사
      if (!response) {
        throw new Error('응답 데이터가 없습니다.');
      }

      setTotalProgressRate(response.totalProgressRate || '0%');
      setCheerUpMessage(response.cheerUpMessage || '목표를 설정해보세요!');

      // categoryProgresses가 배열인지 확인하고 설정
      if (Array.isArray(response.categoryProgresses)) {
        setCategoryProgresses(response.categoryProgresses);
      } else {
        console.warn('categoryProgresses가 배열이 아닙니다:', response.categoryProgresses);
        setCategoryProgresses([]);
      }
    } catch (error) {
      console.error('진행률 로딩 중 오류가 발생했습니다:', error);
      setError('진행률 정보를 불러오는데 실패했습니다.');
      setTotalProgressRate('0%');
      setCheerUpMessage('목표를 설정해보세요!');
      setCategoryProgresses([]);
    } finally {
      setLoading(false);
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
    loading,
    error,
    loadProgress,
    setGoal,
  };
};

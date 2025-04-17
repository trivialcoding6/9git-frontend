import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { fetchAllAnalyzeToday } from '@/apis/analyzetoday';
import { AnalyzeToday } from '@/types/analyzetoday';

export function useAnalyzeToday(
  userId: string,
  startDate: string = new Date().toISOString().split('T')[0],
  endDate: string = new Date().toISOString().split('T')[0]
) {
  const [analyzeToday, setAnalyzeToday] = useState<AnalyzeToday | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // 전체 평가 불러오기
  const loadAnalyzeToday = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        setError(new Error('사용자 ID가 유효하지 않습니다.'));
        setAnalyzeToday(null);
        return;
      }

      if (!startDate || !endDate) {
        setError(new Error('시작일과 종료일이 필요합니다.'));
        setAnalyzeToday(null);
        return;
      }

      const res = await fetchAllAnalyzeToday(userId);

      if (res.status_code === 200 && res.data) {
        setAnalyzeToday(res.data);
        setError(null);
      } else if (res.status_code === 404) {
        setAnalyzeToday(null);
        setError(new Error('종합 평가 데이터가 없습니다.'));
      } else if (res.status_code === 422) {
        setAnalyzeToday(null);
        setError(new Error('요청된 데이터가 유효하지 않습니다. 사용자 ID를 확인해주세요.'));
      } else {
        setAnalyzeToday(null);
        setError(new Error(res.error || '종합 평가 데이터를 가져오는데 실패했습니다.'));
      }
    } catch (err) {
      console.error('종합 평가 데이터 로딩 중 오류 발생:', err);
      setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
      setAnalyzeToday(null);
    } finally {
      setLoading(false);
    }
  }, [userId, startDate, endDate]);

  // 처음 로드 시 전체 불러오기
  useEffect(() => {
    if (userId && userId.trim() !== '') {
      loadAnalyzeToday();
    } else {
      setLoading(false);
      setError(new Error('사용자 ID가 유효하지 않습니다.'));
    }
  }, [userId, startDate, endDate, loadAnalyzeToday]);

  return {
    analyzeToday,
    loading,
    error,
    reload: loadAnalyzeToday,
  };
}

// 이전 이름으로도 내보내기

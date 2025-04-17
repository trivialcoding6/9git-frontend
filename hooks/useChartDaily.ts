import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { fetchAllAnalyzeToday } from '@/apis/chartdaily';
import { DailyChartItem } from '@/types/chartdaily';

export function useChartDaily(userId: string, year: number = new Date().getFullYear()) {
  const [chartData, setChartData] = useState<DailyChartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadChartData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('useChartDaily - 사용자 ID:', userId);
      console.log('useChartDaily - 연도:', year);

      if (!userId || userId.trim() === '') {
        console.error('사용자 ID가 유효하지 않습니다.');
        setError(new Error('사용자 ID가 유효하지 않습니다.'));
        setChartData([]);
        return;
      }

      const res = await fetchAllAnalyzeToday(userId, year);
      console.log('useChartDaily - API 응답:', res);

      if (res.status_code === 200 && res.data) {
        setChartData(res.data);
        setError(null);
      } else if (res.status_code === 404) {
        console.log('일별 차트 데이터가 없습니다.');
        setChartData([]);
        setError(new Error('일별 차트 데이터가 없습니다.'));
      } else {
        console.error('일별 차트 데이터를 가져오는데 실패했습니다:', res.error);
        setChartData([]);
        setError(new Error(res.error || '일별 차트 데이터를 가져오는데 실패했습니다.'));
      }
    } catch (err) {
      console.error('일별 차트 데이터 로딩 중 오류 발생:', err);
      setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [userId, year]);

  useEffect(() => {
    if (userId && userId.trim() !== '') {
      loadChartData();
    } else {
      console.error('사용자 ID가 유효하지 않습니다.');
      setLoading(false);
      setError(new Error('사용자 ID가 유효하지 않습니다.'));
    }
  }, [userId, year, loadChartData]);

  return {
    chartData,
    loading,
    error,
    reload: loadChartData,
  };
}

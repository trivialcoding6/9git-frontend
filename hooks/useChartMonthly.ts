import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { fetchAllChartMonthly } from '@/apis/chartmonth';
import { MonthlyChartItem } from '@/types/chartmonthly';

export function useChartMonthly(userId: string, year: number = new Date().getFullYear()) {
  const [chartData, setChartData] = useState<MonthlyChartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);

  const loadChartData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('useChartMonthly - 사용자 ID:', userId);
      console.log('useChartMonthly - 연도:', year);

      if (!userId || userId.trim() === '') {
        console.error('사용자 ID가 유효하지 않습니다.');
        setError(new Error('사용자 ID가 유효하지 않습니다.'));
        setChartData([]);
        setHasData(false);
        return;
      }

      const res = await fetchAllChartMonthly(userId, year);
      console.log('useChartMonthly - API 응답:', res);

      if (res.status_code === 200 && res.data) {
        setChartData(res.data);
        setError(null);
        setHasData(true);
      } else if (res.status_code === 404) {
        console.log('월별 차트 데이터가 없습니다.');
        setChartData([]);
        // 404 에러는 데이터가 없는 것이므로 에러로 처리하지 않고 hasData를 false로 설정
        setError(null);
        setHasData(false);
      } else {
        console.error('월별 차트 데이터를 가져오는데 실패했습니다:', res.error);
        setChartData([]);
        setError(new Error(res.error || '월별 차트 데이터를 가져오는데 실패했습니다.'));
        setHasData(false);
      }
    } catch (err) {
      console.error('월별 차트 데이터 로딩 중 오류 발생:', err);
      setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
      setChartData([]);
      setHasData(false);
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
      setHasData(false);
    }
  }, [userId, year, loadChartData]);

  return {
    chartData,
    loading,
    error,
    hasData,
    reload: loadChartData,
  };
}

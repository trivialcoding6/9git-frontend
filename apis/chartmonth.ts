import { MonthlyChartResponse } from '@/types/chartmonthly';

export const fetchAllChartMonthly = async (
  userId: string,
  year: number
): Promise<MonthlyChartResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/chart/monthly?year=${year}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // 항상 최신 데이터를 가져오기 위해 캐시 비활성화
      }
    );

    // 응답 상태 코드 확인
    if (res.status === 404) {
      return {
        status_code: 404,
        data: [],
        error: '월별 차트 데이터가 없습니다.',
      };
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API 에러 응답:', {
        status: res.status,
        statusText: res.statusText,
        errorData,
      });
      return {
        status_code: res.status,
        data: [],
        error: errorData.message || `API 요청 실패 (${res.status}: ${res.statusText})`,
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return {
      status_code: 500,
      data: [],
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
};

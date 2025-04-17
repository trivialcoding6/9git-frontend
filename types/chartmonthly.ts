export type MonthlyChartItem = {
  month: string; // "2025-04" 형식의 문자열
  english: number;
  exercise: number;
  coding: number;
};

export type MonthlyChartResponse = {
  status_code: number;
  data: MonthlyChartItem[];
  error: string | null;
};

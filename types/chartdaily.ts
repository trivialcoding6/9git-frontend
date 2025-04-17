export type DailyChartItem = {
  date: string; // "2025-04-17"
  english: number;
  exercise: number;
  coding: number;
};

export type DailyChartResponse = {
  status_code: number;
  data: DailyChartItem[];
  error: string;
};

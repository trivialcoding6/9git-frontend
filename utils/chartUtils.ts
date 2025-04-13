// utils/chartUtils.ts

import { RawProgressItem } from '@/types/chart';

export type MonthlyAverageItem = {
  month: string; // '1월', '2월' 등
  영어: number;
  운동: number;
  코딩: number;
};

// 현재 월 기준으로 1월부터 현재 달까지의 데이터를 추림
function isWithinCurrentYearToNow(dateStr: string) {
  const date = new Date(dateStr);
  return date.getFullYear() === 2025 && date.getMonth() <= 11; // 2025년의 모든 월 데이터 포함
}

export const groupByMonthAndAverage = (rawData: RawProgressItem[]): MonthlyAverageItem[] => {
  const monthlyMap: Record<string, RawProgressItem[]> = {};

  rawData.forEach((item) => {
    if (!isWithinCurrentYearToNow(item.date)) return;
    const date = new Date(item.date);
    const month = `${date.getMonth() + 1}월`;

    if (!monthlyMap[month]) monthlyMap[month] = [];
    monthlyMap[month].push(item);
  });

  const categories: (keyof Omit<RawProgressItem, 'date'>)[] = ['영어', '운동', '코딩'];

  // 2025년의 모든 월을 포함
  const fullMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  return fullMonths.map((month) => {
    const items = monthlyMap[month] || [];
    const averaged: MonthlyAverageItem = {
      month,
      영어: 0,
      운동: 0,
      코딩: 0,
    };

    categories.forEach((category) => {
      const values = items
        .map((item) => item[category])
        .filter((v): v is number => typeof v === 'number');

      averaged[category] =
        values.length > 0
          ? Math.round(values.reduce((sum, cur) => sum + cur, 0) / values.length)
          : 0;
    });

    return averaged;
  });
};

export const getCategoryExtremes = (data: any[], category: string) => {
  const values = data
    .map((item) => item[category])
    .filter((value): value is number => value !== undefined && value !== null);

  if (values.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

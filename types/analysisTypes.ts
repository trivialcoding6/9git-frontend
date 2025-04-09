// types/analysisTypes.ts

export type Category = '영어' | '운동' | '코딩';

export type ProgressData = {
  name: Category;
  value: number;
};

export type AnalysisType = 'strength' | 'weakness';

export type AnalysisComment = {
  id: string;
  type: AnalysisType;
  title: string;
  description: string;
};

export type MonthlyGoalProgress = {
  month: string;
} & Partial<Record<Category, number>>;

export type ChallengeLevel = '쉬움' | '초급' | '중급' | '어려움';

export type Challenge = {
  title: string;
  description: string[];
  period: string;
  level: ChallengeLevel;
};

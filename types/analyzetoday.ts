export type AnalyzeToday = {
  id: string;
  userId: string;
  overallAchievementRate: number;
  evaluationText: string;
  strengthAchievementRate: number;
  strengthText: string;
  improvementAchievementRate: number;
  improvementText: string;
};

export type AnalyzeTodayResponse = {
  status_code: number;
  data: AnalyzeToday;
  error: string | null;
};

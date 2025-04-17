export type ComevalResponse = {
  status_code: number;
  data: Comeval[];
  error: string;
};

export type Comeval = {
  id: string;
  userId: string;
  overallAchievementRate: number;
  evaluationText: string;
  strengthAchievementRate: number;
  strengthText: string;
  improvementAchievementRate: number;
  improvementText: string;
};

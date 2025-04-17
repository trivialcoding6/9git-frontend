export type Challenge = {
  id: string;
  progressRate: number;
  challengeTask: string;
  challengeDuration: string;
  challengeDifficulty: string;
  challengeSuggestion: string;
};

export type ChallengeListResponse = {
  status_code: number;
  data: Challenge[]; // 배열 형태!
  error: string | null;
};

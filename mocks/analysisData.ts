import {
  ProgressData,
  AnalysisComment,
  MonthlyGoalProgress,
  Challenge,
} from '@/types/analysisTypes';

// 전체 달성도 (카테고리별)
export const totalProgressData: ProgressData[] = [
  {
    name: '영어',
    value: 85,
  },
  {
    name: '운동',
    value: 65,
  },
  {
    name: '코딩',
    value: 40,
  },
];

// 강점 & 개선점
export const analysisComments: AnalysisComment[] = [
  {
    id: 'strength-1',
    type: 'strength',
    title: '강점',
    description: `영어 카테고리에서 지금까지 80% 이상의 달성도를 보이고 있어요`,
  },
  {
    id: 'weakness-1',
    type: 'weakness',
    title: '개선점',
    description: `파이썬 프로젝트 todo 달성일은 30%밖에 되지 않아요.\n목표를 낮춰보는 건 어떨까요?`,
  },
  {
    id: 'strength-2',
    type: 'strength',
    title: '강점',
    description: `운동 루틴을 매주 3회 이상 지키며 좋은 습관을 만들고 있어요!`,
  },
  {
    id: 'weakness-2',
    type: 'weakness',
    title: '개선점',
    description: `영어 단어 암기는 잘 되고 있지만 문장 활용 연습이 부족해요.\n간단한 에세이를 써보는 건 어때요?`,
  },
];

// 목표별 달성 현황 (월별 + 카테고리별)
export const goalData: MonthlyGoalProgress[] = [
  {
    month: '1월',
    영어: 20,
    운동: 13,
    코딩: 30,
  },
  {
    month: '2월',
    영어: 60,
    운동: 60,
    코딩: 40,
  },
  {
    month: '3월',
    영어: 75,
    운동: 45,
    코딩: 50,
  },
  {
    month: '4월',
    영어: 85,
    운동: 70,
    코딩: 55,
  },
  {
    month: '5월',
    영어: 80,
    운동: 65,
    코딩: 60,
  },
  {
    month: '6월',
    영어: 90,
    운동: 80,
    코딩: 65,
  },
];

// ✅ AI 추천 도전과제
export const aiRecommendedChallenges: Challenge[] = [
  {
    title: '토익 850+ 달성',
    description: [
      '14일 연속 하루에 10개씩 토익 단어를 외우고 있어요. 영어의 기본은 단어!',
      '다음엔 토익 850점에 도전해보는 건 어떨까요?',
      '(25년 4월 27일에 시험이 있어요)',
    ],
    period: '3개월',
    level: '중급',
  },
  {
    title: '파이썬 웹 크롤링 프로젝트',
    description: [
      '3월 23일 메모 기록을 보니 데이터 분석 취직에 관심이 많아 보여요.',
      '포트폴리오를 위해 공공데이터를 활용해 기획안을 작성해보는 프로젝트를 진행해보는 건 어떨까요?',
    ],
    period: '2개월',
    level: '초급',
  },
];

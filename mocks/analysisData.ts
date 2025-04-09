// mocks/analysisData.ts

import {
  ProgressData,
  AnalysisComment,
  MonthlyGoalProgress,
  Challenge,
} from '@/types/analysisTypes';

// ... (totalProgressData, totalProgressComment 등은 그대로)

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

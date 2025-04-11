import { CategoryItem } from '@/types/category';

export const categoryItemsData = [
  {
    id: '1',
    categoryName: '영어',
    categoryColor: '#FDA63A', // 주황색
    todos: [
      {
        id: '101',
        isCompleted: false,
        content: '영어 회화 연습',
      },
      {
        id: '102',
        isCompleted: true,
        content: '영어 단어 50개 암기',
      },
    ],
    memos: [
      {
        id: '201',
        title: '영어 학습 메모',
        content: '비즈니스 영어 표현 정리 필요',
      },
    ],
    startDate: 'Fri Mar 10 2025 00:00:00 GMT+0900 (한국 표준시)',
    endDate: 'Sun Mar 25 2025 00:00:00 GMT+0900 (한국 표준시)',
    created_at: 'Wed Dec 13 2023 12:00:00 GMT+0900 (한국 표준시)',
    updated_at: 'Wed Dec 13 2023 12:00:00 GMT+0900 (한국 표준시)',
  },
  {
    id: '2',
    categoryName: '코딩',
    categoryColor: '#6C88C4', // 파랑 계열
    todos: [
      {
        id: '103',
        isCompleted: false,
        content: 'React 학습하기',
      },
      {
        id: '104',
        isCompleted: false,
        content: 'Next.js 프로젝트 설정',
      },
    ],
    memos: [
      {
        id: '202',
        title: '코딩 강의 메모',
        content: '컴포넌트 라이프사이클 복습 필요',
      },
    ],
    startDate: 'Sat Mar 15 2025 00:00:00 GMT+0900 (한국 표준시)',
    endDate: 'Mon Apr 15 2025 00:00:00 GMT+0900 (한국 표준시)',
    created_at: 'Wed Dec 13 2023 13:30:00 GMT+0900 (한국 표준시)',
    updated_at: 'Wed Dec 13 2023 13:30:00 GMT+0900 (한국 표준시)',
  },
  {
    id: '3',
    categoryName: '운동',
    categoryColor: '#556B2F', // 녹색 계열
    todos: [
      {
        id: '105',
        isCompleted: false,
        content: '헬스장 가기',
      },
      {
        id: '106',
        isCompleted: false,
        content: '5km 달리기',
      },
    ],
    memos: [
      {
        id: '203',
        title: '운동 계획',
        content: '주 3회 근력 운동, 주 2회 유산소',
      },
      {
        id: '204',
        title: '식단 메모',
        content: '단백질 섭취량 증가 필요',
      },
    ],
    startDate: 'Tue Apr 01 2025 00:00:00 GMT+0900 (한국 표준시)',
    endDate: 'Tue Apr 30 2025 00:00:00 GMT+0900 (한국 표준시)',
    created_at: 'Wed Dec 13 2023 15:45:00 GMT+0900 (한국 표준시)',
    updated_at: 'Wed Dec 13 2023 15:45:00 GMT+0900 (한국 표준시)',
  },
] as CategoryItem[];

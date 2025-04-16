import { CategoryItem } from '@/types/category';
import { Memo } from '@/types/memo';
import { Todo } from '@/types/todo';

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

export const todoListData: Todo[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    categoryId: '2',
    content: 'React 학습하기',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    isCompleted: false,
    isRepeat: true,
    weeks: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        weekName: 'MON',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        weekName: 'WED',
      },
    ],
    category: {
      id: '2',
      categoryName: '코딩',
      categoryColor: '#6C88C4',
    },
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    categoryId: '3',
    content: '헬스장 가기',
    startDate: '2025-04-15',
    endDate: '2025-04-20',
    isCompleted: true,
    isRepeat: false,
    category: {
      id: '3',
      categoryName: '운동',
      categoryColor: '#556B2F',
    },
  },
];

export const memoListData: Memo[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    categoryId: '1',
    title: '영어 학습 계획',
    content: 'TOEIC 850점 달성을 위한 학습 계획',
    startDate: '2025-04-16T02:23:57.130Z',
    endDate: '2025-05-16T02:23:57.130Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    categoryId: '2',
    title: '코딩 프로젝트 아이디어',
    content: '개인 포트폴리오용 웹 애플리케이션 개발 계획',
    startDate: '2025-04-20T10:15:30.000Z',
    endDate: '2025-05-25T10:15:30.000Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
    categoryId: '3',
    title: '운동 루틴',
    content: '주 5회 운동 계획: 월/수/금 근력, 화/목 유산소',
    startDate: '2025-04-16T09:30:00.000Z',
    endDate: '2025-06-16T09:30:00.000Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa4',
    categoryId: '1',
    title: '영어 회화 표현',
    content: '비즈니스 미팅에서 자주 사용하는 영어 표현 정리',
    startDate: '2025-04-18T14:00:00.000Z',
    endDate: '2025-04-30T14:00:00.000Z',
  },
];

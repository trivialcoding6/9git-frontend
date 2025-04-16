import { CategoryItem } from '@/types/category';
import { Chat } from '@/types/chat';
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
        startDate: 'Fri Mar 10 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Sun Mar 25 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
      {
        id: '102',
        isCompleted: true,
        content: '영어 단어 50개 암기',
        startDate: 'Fri Mar 12 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Sun Mar 20 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
    memos: [
      {
        id: '201',
        title: '영어 학습 메모',
        content: '비즈니스 영어 표현 정리 필요',
        startDate: 'Fri Mar 15 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Sun Mar 22 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
    created_at: 'Wed Dec 13 2025 12:00:00 GMT+0900 (한국 표준시)',
    updated_at: 'Wed Dec 13 2025 12:00:00 GMT+0900 (한국 표준시)',
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
        startDate: 'Sat Mar 15 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Mon Apr 01 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
      {
        id: '104',
        isCompleted: false,
        content: 'Next.js 프로젝트 설정',
        startDate: 'Sat Mar 20 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Mon Apr 10 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
    memos: [
      {
        id: '202',
        title: '코딩 강의 메모',
        content: '컴포넌트 라이프사이클 복습 필요',
        startDate: 'Sat Mar 15 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Mon Apr 15 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
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
        startDate: 'Tue Apr 01 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Tue Apr 15 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
      {
        id: '106',
        isCompleted: false,
        content: '5km 달리기',
        startDate: 'Tue Apr 10 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Tue Apr 20 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
    memos: [
      {
        id: '203',
        title: '운동 계획',
        content: '주 3회 근력 운동, 주 2회 유산소',
        startDate: 'Tue Apr 01 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Tue Apr 15 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
      {
        id: '204',
        title: '식단 메모',
        content: '단백질 섭취량 증가 필요',
        startDate: 'Tue Apr 15 2025 00:00:00 GMT+0900 (한국 표준시)',
        endDate: 'Tue Apr 30 2025 00:00:00 GMT+0900 (한국 표준시)',
      },
    ],
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

// 채팅 메시지 목업 데이터
export const chatMessagesData = [
  {
    id: '7874af61-afc2-4bf0-ba0d-bd3add630764',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'user',
    content: '토익 600점에서 900점으로 올리고 싶은데 공부 방법을 알려줘',
  },
  {
    id: '9c45e182-31c7-48c6-a314-b75d8e592a01',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'assistant',
    content:
      '안녕하세요! 토익 600점에서 900점으로 올리는 것은 충분히 가능합니다. 다음과 같은 방법을 추천드립니다:\n\n1. 기초 문법 완성하기: 600점대는 기본 문법에 약점이 있을 수 있어요. 영어 기초 문법서를 한 권 정해서 집중적으로 공부하세요.\n\n2. 어휘력 강화하기: 토익 빈출 단어장을 활용해 매일 30-50개 단어를 학습하세요.\n\n3. RC(독해) 파트 강화: 시간 분배 전략을 세우고, 스키밍과 스캐닝 기술을 연습하세요.\n\n4. LC(듣기) 파트 강화: 매일 영어 듣기 연습을 하고, 받아쓰기도 병행하세요.\n\n5. 실전 문제 풀이: 최소 10회분 이상의 모의고사를 풀고 오답 분석을 철저히 하세요.\n\n6. 학습 계획: 최소 3개월의 계획을 세우고 꾸준히 실천하세요.\n\n더 구체적인 학습 계획이 필요하시면 말씀해주세요!',
  },
  {
    id: '84886321-9209-4806-a385-5fe4c69ff567',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'user',
    content: '토익 700점에서 900점으로 올리고 싶은데 공부방법 알려줘',
  },
  {
    id: '2e67d8f9-3b41-4c5a-a8d7-f94c38e24512',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'assistant',
    content:
      '토익 700점에서 900점으로 향상시키기 위한 효과적인 학습 방법을 알려드릴게요!\n\n1. 취약점 분석: 먼저 RC와 LC 중 어느 부분이 더 취약한지 파악하세요. 700점이면 기본기는 있으니 집중 보완이 필요합니다.\n\n2. RC(독해) 강화:\n   - Part 5&6: 문법과 어휘 집중 학습 (특히 동사 시제, 관사, 전치사 등)\n   - Part 7: 긴 지문 빠르게 읽는 연습과 스캐닝 기술 향상\n\n3. LC(듣기) 강화:\n   - Part 3&4: 대화 및 설명문 집중 훈련\n   - 영어 뉴스, 팟캐스트 등 다양한 원어민 자료 활용\n\n4. 시간 관리 전략: 900점대는 시간 관리가 중요합니다. 각 파트별 시간 분배 전략을 세우세요.\n\n5. 실전 모의고사: 주 1회 이상 실전과 동일한 환경에서 모의고사를 치르고 오답 분석을 철저히 하세요.\n\n6. 오답 노트 관리: 틀린 문제는 반드시 오답 노트를 작성하고 주기적으로 복습하세요.\n\n약 2-3개월 동안 이런 방식으로 집중 학습하면 900점대 도달이 가능합니다. 화이팅하세요!',
  },
  {
    id: 'b1712c43-9954-4078-8c3b-6ad791f0e5ba',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'user',
    content: '토익 750점에서 900점으로 올리고 싶은데 어떻게 공부해야할까?',
  },
  {
    id: '5a9f8c23-6e74-42b1-9d38-af1e27b54d63',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'assistant',
    content:
      '토익 750점에서 900점으로 점수를 올리기 위한 전략적 학습 방법을 알려드릴게요!\n\n750점은 상당히 좋은 기본기를 갖추고 있다는 의미입니다. 이제 세부적인 전략이 필요해요.\n\n1. 정밀 취약점 분석:\n   - 모의고사를 통해 파트별, 문제 유형별 정확한 취약점을 파악하세요.\n   - RC/LC 균형이 맞는지 확인하고 더 약한 영역에 60%, 강한 영역에 40% 시간 배분하세요.\n\n2. RC 900점 전략:\n   - Part 5: 고난도 문법 문제(가정법, 분사구문, 관계사 등) 집중 학습\n   - Part 7: 3지문 연계 문제 풀이 전략 숙달 및 추론 문제 연습\n   - 시간 단축 기술: 한 지문당 평균 읽기 시간을 줄이는 연습\n\n3. LC 900점 전략:\n   - Part 3&4: 추론 문제와 전체 흐름 파악하는 능력 향상\n   - 다양한 억양과 빠른 속도의 영어 청취 훈련\n   - 노트테이킹 기술 향상\n\n4. 고득점자 맞춤 학습:\n   - 실전 모의고사 최소 8-10회 완벽 분석\n   - 오답은 반드시 이유를 분석하고 유사 문제로 보완 학습\n   - 만점을 목표로 한 과잉학습 진행\n\n5. 멘탈 관리:\n   - 시험장 환경에 익숙해지기 위한 모의고사 연습\n   - 시험 당일 컨디션 관리 전략 수립\n\n6-8주 정도 집중적으로 이 방법을 실천하면 900점 이상 충분히 가능합니다. 지금까지 쌓아온 기본기가 좋으니 세부 전략만 보완하면 됩니다!',
  },
  {
    id: 'c3e45d8f-a672-4b91-8c35-9f76e4d21bac',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'user',
    content: '공부 일정은 어떻게 짜는 게 좋을까?',
  },
  {
    id: '8f49a3d7-bc15-4e87-9d6c-f2a5c8e10b23',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'assistant',
    content:
      '900점 달성을 위한 8주 학습 일정을 제안해 드릴게요!\n\n【1-2주차: 기초 다지기】\n* 평일 (월-금): 하루 2시간\n  - RC: 파트5 문법 정리 (30분)\n  - 어휘: 토익 고빈도 단어 30개 (30분)\n  - LC: 파트1-2 집중 훈련 (30분)\n  - 오답 분석 및 복습 (30분)\n* 주말: 하루 4시간\n  - 모의고사 1회 (2시간)\n  - 철저한 오답 분석 (2시간)\n\n【3-4주차: 실전 감각 익히기】\n* 평일 (월-금): 하루 2시간\n  - RC: 파트7 지문 빠르게 읽기 연습 (40분)\n  - 어휘: 토익 고빈도 단어 30개 (20분)\n  - LC: 파트3-4 집중 훈련 (40분)\n  - 취약점 보완 학습 (20분)\n* 주말: 하루 4시간\n  - 모의고사 1회 (2시간)\n  - 오답 분석 및 유형별 정리 (2시간)\n\n【5-6주차: 실력 향상】\n* 평일 (월-금): 하루 2시간\n  - RC: 고난도 파트5-7 문제 풀이 (1시간)\n  - LC: 고난도 파트3-4 문제 풀이 (1시간)\n* 주말: 하루 4시간\n  - 실전 모의고사 (2시간)\n  - 취약 유형 집중 훈련 (2시간)\n\n【7-8주차: 최종 점검】\n* 평일 (월-금): 하루 2시간\n  - 실전 문제 풀이 위주 (1시간 30분)\n  - 오답 및 취약점 최종 점검 (30분)\n* 주말: 하루 4시간\n  - 최종 모의고사 (2시간)\n  - 오답 정리 및 자신감 점검 (2시간)\n\n【시험 직전 3일】\n* 가볍게 복습 위주로 진행\n* 충분한 휴식과 컨디션 관리에 집중\n\n이 일정은 유연하게 조정할 수 있으며, 본인의 상황에 맞게 시간 분배를 변경해도 좋습니다. 중요한 것은 계획한 일정을 꾸준히 지키는 것입니다!',
  },
  {
    id: '1d7e932a-5b68-4f01-ae93-c8f274e5619d',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'user',
    content: '추천해줄 교재가 있을까?',
  },
  {
    id: '6b924fd5-31c8-4e7a-b572-a94e83c8d6e0',
    userId: '3ff839dc-f023-4143-b3cb-761c1035fdca',
    storageId: '71d9b379-502f-405f-ba83-6890ac230121',
    categoryId: '19589518-f650-4d43-b3d3-12b39e631124',
    role: 'assistant',
    content:
      '750점에서 900점으로 향상하기 위한 교재 추천 목록입니다!\n\n【기본 교재】\n1. ETS 공식 토익 LC & RC (최신판)\n   - 출제기관의 공식 문제집으로 실전 감각을 익히는 데 필수\n\n【RC 파트】\n1. 해커스 토익 RC Part 5 & 6 기출 실전\n   - 문법과 어휘 집중 학습에 최적화된 교재\n\n2. 토마토 토익 RC Part 7 고득점 전략\n   - 장문독해와 3지문 연계 유형에 강한 교재\n\n3. 그래머 인 유즈 (Grammar in Use - Advanced)\n   - 고급 문법 정리에 탁월한 영어 원서\n\n【LC 파트】\n1. 해커스 토익 Listening Advanced\n   - 고득점자를 위한 고난도 듣기 문제집\n\n2. ETS TOEIC 리스닝 실전 모의고사\n   - 실전과 가장 유사한 형태의 문제로 구성\n\n【어휘】\n1. 토익 빈출 어휘 2000 (해커스/YBM 등)\n   - 고득점에 필요한 핵심 어휘 수록\n\n【실전 모의고사】\n1. ETS 공식 토익 실전서 1000 Vol. 1-3\n   - 가장 실전에 가까운 문제 경험 가능\n\n2. YBM 실전 모의고사 1000 시리즈\n   - 다양한 유형의 고난도 문제 포함\n\n【온라인 자료】\n1. 토익스피킹 유튜브 채널의 토익 강의\n   - 최신 경향 및 팁 제공\n\n2. 해커스/YBM 온라인 학습 플랫폼\n   - 모바일로도 틈틈이 학습 가능\n\n【추천 학습 방법】\n- 기본 교재 1-2권을 집중적으로 학습하는 것이 여러 교재를 얕게 보는 것보다 효과적입니다.\n- 실전 모의고사는 반드시 시간을 재고 실제 시험처럼 풀어보세요.\n- 오답 노트는 반드시 작성하고 주기적으로 복습하세요.\n\n본인의 학습 스타일에 맞게 2-3권 정도 선택하여 집중적으로 공부하시는 것을 추천드립니다!',
  },
] as Chat[];

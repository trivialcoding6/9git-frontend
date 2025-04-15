export const DUMMY_PREVIOUS_CONVERSATIONS = [
  {
    id: '1',
    category: '코딩',
    date: '2025.02.06',
    title: '피드백',
    description: 'PCCE 자격증',
    href: '/conversations/1',
  },
  {
    id: '2',
    category: '코딩',
    date: '2025.04.01',
    title: '로드맵 추천',
    description: '알고리즘',
    href: '/conversations/2',
  },
  {
    id: '3',
    category: '영어',
    date: '2025.03.01',
    title: '피드백',
    description: '영어로 대화',
    href: '/conversations/3',
  },
  {
    id: '4',
    category: '영어',
    date: '2025.04.08',
    title: '멘탈 케어',
    description: '단어 암기',
    href: '/conversations/4',
  },
  {
    id: '5',
    category: '운동',
    date: '2025.02.07',
    title: '멘탈 케어',
    description: '자존감',
    href: '/conversations/5',
  },
  {
    id: '6',
    category: '운동',
    date: '2025.03.05',
    title: '로드맵 추천',
    description: '하체',
    href: '/conversations/6',
  },
];

export const DUMMY_CHATBOT_MESSAGES: Record<
  string,
  { id: number; sender: 'user' | 'bot'; message: string }[]
> = {
  '3': [
    {
      id: 1,
      sender: 'user',
      message: '영어로 대화하자',
    },
    {
      id: 2,
      sender: 'bot',
      message:
        'Sure! Would you like to have a casual chat or do a roleplay, like ordering a drink at a café? 😊',
    },
    {
      id: 3,
      sender: 'user',
      message: 'hi ! Can I get a latte?',
    },
    {
      id: 4,
      sender: 'bot',
      message: 'Hi! Of course! Would you like your latte hot or iced? 😊',
    },
    {
      id: 5,
      sender: 'user',
      message: 'hot please',
    },
    {
      id: 6,
      sender: 'bot',
      message:
        'Got it! One hot latte coming right up. Would you like any sugar or syrup with that? 😊',
    },
  ],
  // 이후 다른 ID도 추가 가능
};

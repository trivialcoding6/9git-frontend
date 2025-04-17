'use client';

import { useRouter } from 'next/navigation';

const SELECTIONS = [
  {
    id: 'feedback',
    title: '피드백',
    description: '연습문제를 계획할 수도 있고, 진로 방향성도 조언해드려요',
  },
  {
    id: 'recommend',
    title: '로드맵 추천',
    description: '맞춤형으로 단기 로드맵을 추천해드릴게요',
  },
  {
    id: 'mental',
    title: '멘탈 케어',
    description: '요즘 목표를 달성하는데 스트레스는 없으신가요?',
  },
];

export const ChatbotSelection = () => {
  const router = useRouter();
  const onSelect = (selected: { id: string; title: string; description: string }) => {
    router.push(`/chatbot/${selected.id}/new`);
  };

  return (
    <div className="flex flex-col gap-10 mt-30 px-4">
      {SELECTIONS.map((item) => (
        <button
          key={item.title}
          onClick={() => onSelect(item)}
          className="bg-white p-4 rounded-xl shadow-md text-left hover:bg-orange-100 transition"
        >
          <div className="text-base font-bold text-secondary">{item.title}</div>
          <div className="text-sm mt-1 text-secondary">{item.description}</div>
        </button>
      ))}
    </div>
  );
};

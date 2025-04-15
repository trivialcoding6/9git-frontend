'use client';

import { useState } from 'react';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatbotIntro } from './ChatbotIntro';
import { ChatbotUserInput } from './ChatbotUserInput';

type Props = {
  onSelect: (selected: { title: string; description: string }) => void;
};

const SELECTIONS = [
  {
    title: '피드백',
    description: '연습문제를 계획할 수도 있고, 진로 방향성도 조언해드려요',
  },
  {
    title: '로드맵 추천',
    description: '맞춤형으로 단기 로드맵을 추천해드릴게요',
  },
  {
    title: '멘탈 케어',
    description: '요즘 목표를 달성하는데 스트레스는 없으신가요?',
  },
];

export const ChatbotSelection = ({ onSelect }: Props) => {
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

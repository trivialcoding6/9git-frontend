'use client';

import { useState } from 'react';
import { ChatbotUserInput } from './ChatbotUserInput';

type Props = {
  selected: {
    title: string;
    description: string;
  };
};

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export const Chating = ({ selected }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'user',
      text: `${selected.title} 해줘!`,
    },
    {
      sender: 'bot',
      text: `${selected.description} 관련 내용을 알려드릴게요 냥!`,
    },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text },
      {
        sender: 'bot',
        text: `알겠어요! "${text}" 에 대해 준비해볼게요! 😺`,
      },
    ]);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
              msg.sender === 'user'
                ? 'self-end bg-primary text-white'
                : 'self-start bg-white text-secondary shadow'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <ChatbotUserInput onSend={handleSend} />
    </div>
  );
};

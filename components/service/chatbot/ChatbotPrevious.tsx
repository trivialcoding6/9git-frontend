'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatbotIntro } from './ChatbotIntro';
import { ChatbotUserInput } from './ChatbotUserInput';
import { DUMMY_CHATBOT_MESSAGES } from '@/constants/chatbot_storage';

type Message = {
  id: number;
  sender: 'user' | 'bot';
  message: string;
};

export const ChatbotPrevious = () => {
  const [step, setStep] = useState<'intro' | 'chating'>('intro');
  const [selectedOption, setSelectedOption] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const { conversationID } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initialMessages = DUMMY_CHATBOT_MESSAGES[conversationID as string] || [];
    setMessages(initialMessages);
  }, [conversationID]);

  const handleSend = (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      message: text,
    };
    const botMessage: Message = {
      id: messages.length + 2,
      sender: 'bot',
      message: `알겠어요! "${text}" 에 대해 준비해볼게요!`,
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSelection = (option: { title: string; description: string }) => {
    setSelectedOption(option);
    setStep('chating');
  };

  const handleReset = () => {
    setSelectedOption(null);
    setStep('intro');
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full sticky">
        <ChatbotHeader onReset={handleReset} />
        <ChatbotIntro showSelectBox={false} />
        <div className="flex flex-col gap-3 px-4 py-4 h-[calc(100%-160px)] overflow-y-scroll bg-beige-base">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <img
                  src="/chatbot-avatar.webp"
                  alt="gitnyang"
                  className="w-5.5 h-5 rounded-full mt-1"
                />
              )}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'self-end bg-primary text-white'
                    : 'self-start bg-white text-secondary shadow'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <ChatbotUserInput onSend={handleSend} />
      </div>
    </>
  );
};

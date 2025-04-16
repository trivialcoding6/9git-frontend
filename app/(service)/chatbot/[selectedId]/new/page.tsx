'use client';

import { ChatbotIntro } from '@/components/service/chatbot/ChatbotIntro';
import { Chating } from '@/components/service/chatbot/Chating';
import { SELECTED } from '@/constants/chatOption';
import { Chat } from '@/types/chat';
import { useParams } from 'next/navigation';

export default function StoragePage() {
  const { selectedId } = useParams();
  const selected = SELECTED[selectedId as keyof typeof SELECTED];
  const initialChats = [
    {
      role: 'user',
      content: `${selected.title} 해줘!`,
    },
    {
      role: 'assistant',
      content: `${selected.description} 관련 내용을 알려드릴게요!`,
    },
  ] as Chat[];

  return (
    <>
      <ChatbotIntro showSelectBox={true} />
      <Chating initialChats={initialChats} />
    </>
  );
}

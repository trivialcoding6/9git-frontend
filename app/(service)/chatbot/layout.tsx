import { ChatbotHeader } from '@/components/service/chatbot/ChatbotHeader';

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-[440px] bg-beige-base">
      <ChatbotHeader />
      {children}
    </div>
  );
}

import { Bot } from 'lucide-react';

export default function ChatbotHelperBox() {
  return (
    <div className="border rounded-xl border-beige-deco p-4 bg-beige-light-50 flex items-center gap-3 text-sm text-orange-600 mt-3">
      <div className="bg-white p-2 rounded-full shadow-sm">
        <Bot size={24} className="text-primary" />
      </div>
      <div>
        <p className="font-semibold text-primary">To Do 작성에 어려움이 있나요?</p>
        <p className="text-secondary">챗봇에게 목표와 함께 물어보세요</p>
      </div>
    </div>
  );
}

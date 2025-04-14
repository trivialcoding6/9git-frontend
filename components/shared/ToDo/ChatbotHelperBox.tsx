import { Bot } from 'lucide-react';

export default function ChatbotHelperBox() {
  return (
    <div className="border rounded-xl border-beige-deco p-4 bg-beige-light-50 flex items-center gap-5 text-center justify-center">
      {/* 💬 말풍선 느낌 아이콘 박스 */}
      <div className="bg-white p-2 rounded-full border border-primary shadow-inner flex items-center justify-center w-10 h-10 ">
        <Bot className="w-5 h-5 text-primary" />
      </div>

      {/* 📋 텍스트 */}
      <div className="flex flex-col justify-center text-center">
        <p className="text-primary text-base">
          <span className="text-primary">To Do</span> 작성에 어려움이 있나요?
        </p>
        <p className="text-secondary text-base">챗봇에게 목표와 함께 물어보세요!</p>
      </div>
    </div>
  );
}

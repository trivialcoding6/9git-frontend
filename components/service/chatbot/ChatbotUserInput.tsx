'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export const ChatbotUserInput = ({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled: boolean;
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex items-center p-3 border-t bg-white sticky bottom-0">
      <input
        type="text"
        placeholder="연습문제를 만들어줘."
        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={disabled}
      >
        <Send size={16} />
      </button>
    </div>
  );
};

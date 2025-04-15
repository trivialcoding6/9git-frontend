'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
type Props = {
  showSelectBox: boolean;
};

export const ChatbotIntro = ({ showSelectBox }: Props) => {
  return (
    <div className="flex items-center justify-between p-2 bg-beige-light w-full max-w-xl mx-auto sticky top-0">
      {/* 캐릭터 + 텍스트 */}
      <div className="flex items-center space-x-4 ml-3">
        <div className="relative w-16 h-24 rounded overflow-hidden">
          <Image
            src="/chatbot-image.webp"
            alt="AI 챗봇 깃냥이"
            fill
            className="object-cover rounded"
            sizes="64px"
          />
        </div>

        <div className="text-secondary text-sm">
          <p>
            야옹~ 나는 <span className="text-primary">ai챗봇 깃냥이</span>다 냥!
          </p>
          <p>어떤 걸 도와줄까 냥!🐾</p>
        </div>
      </div>

      {/* 셀렉트 박스 */}
      {showSelectBox && (
        <div className="relative mr-5">
          <select className="appearance-none w-18 px-2.5 py-1 border-2 border-primary rounded-md bg-white text-secondary font-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
            <option>영어</option>
            <option>코딩</option>
            <option>운동</option>
          </select>

          <div className="pointer-events-none absolute top-1/2 right-2 transform -translate-y-1/2 text-primary">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

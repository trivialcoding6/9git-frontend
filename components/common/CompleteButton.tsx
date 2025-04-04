'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Props = {
  onClick: () => void;
};

export default function CompleteButton({ onClick }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setIsCompleted(!isCompleted);
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className={`
        bg-transparent hover:bg-transparent shadow-none border-none px-0 py-0 h-auto
        flex items-center gap-1 text-sm font-bold
        ${isCompleted ? 'text-[#744D2C]' : 'text-[#7A4A1D]'}
        hover:text-[#A35F30] transition-colors duration-200
      `}
    >
      완료
    </Button>
  );
}

// 다른 파일에서 사용시 아래 코드 입력
//  <CompleteButton onClick={() => console.log('클릭됨!')} />

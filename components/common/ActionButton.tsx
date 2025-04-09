'use client';

import { Button } from '@/components/ui/button';
import { useState, ReactNode } from 'react';

type Props = {
  onClick?: () => void; // ✅ 선택형으로 바꿔서 하위 호환 보장
  icon?: ReactNode;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset'; // ✅ 타입 추가
  className?: string; // ✅ 유연하게 스타일 덮어쓸 수 있도록 추가
};

export const ActionButton = ({ icon, onClick, children, type = 'button', className }: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setIsCompleted(!isCompleted);
    onClick?.(); // ✅ 안전하게 처리
  };

  return (
    <Button
      type={type} // ✅ 추가 완료!
      onClick={handleClick}
      variant="ghost"
      className={`
        bg-transparent hover:bg-transparent shadow-none border-none px-0 py-0 h-auto
        flex items-center gap-1 text-sm font-bold text-secondary
        hover:text-primary transition-colors duration-200
        ${className ?? ''}
      `}
    >
      {icon && <div>{icon}</div>}
      {children}
    </Button>
  );
};

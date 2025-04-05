'use client';
import { Button } from '@/components/ui/button';
import { useState, ReactNode } from 'react';

type Props = {
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
};

export const ActionButton = ({ icon, onClick, children }: Props) => {
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
        flex items-center gap-0 text-sm font-bold text-[#744D2C]
        hover:text-[#FDA63A] transition-colors duration-200
      `}
    >
      {icon && <div>{icon}</div>}
      {children}
    </Button>
  );
};

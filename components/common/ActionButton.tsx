'use client';

import { Button } from '@/components/ui/button';
import { useState, ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const ActionButton = ({ icon, onClick, children, type = 'button', className }: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setIsCompleted(!isCompleted);
    onClick?.();
  };

  return (
    <Button
      type={type}
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

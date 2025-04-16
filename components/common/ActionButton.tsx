'use client';

import { Button } from '@/components/ui/button';
import { useState, ReactNode } from 'react';
import { PencilLine } from 'lucide-react';

type Props = {
  onClick?: () => void;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: ReactNode;
  variant?: string;
  disabled?: boolean;
};

export const ActionButton = ({
  icon,
  onClick,
  children,
  type = 'button',
  className,
  disabled = false,
}: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setIsCompleted(!isCompleted);
    onClick?.();
  };

  const defaultClassName = `bg-transparent hover:bg-transparent shadow-none border-none px-0 py-0 h-auto
    flex items-center gap-1 text-sm font-bold text-secondary
    hover:text-primary transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed`;

  return (
    <Button
      type={type}
      onClick={handleClick}
      variant="ghost"
      className={className ?? defaultClassName}
      disabled={disabled}
    >
      {icon || <PencilLine size={16} />}
      {children}
    </Button>
  );
};

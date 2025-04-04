import { Progress } from '@/components/ui/progress';
import React from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export const ProgressBar = ({ value, className, indicatorClassName }: ProgressBarProps) => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="text-xs text-right text-[#79522F] font-semibold mb-1">{value}% 달성</div>
      <Progress
        value={value}
        className={`h-2 rounded-full mt-2 ${className}`}
        indicatorClassName={indicatorClassName}
      />
    </div>
  );
};

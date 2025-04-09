import React from 'react';

type Props = {
  children: React.ReactNode;
  gap?: number;
  className?: string;
};

export const SectionContent = ({ children, gap = 6, className = '' }: Props) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

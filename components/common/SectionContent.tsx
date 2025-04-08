import React from 'react';

interface SectionContentProps {
  children: React.ReactNode;
  gap?: number; // 기본 gap 지정 가능
  className?: string; // 추가적인 클래스 확장
}

export const SectionContent = ({ children, gap = 6, className = '' }: SectionContentProps) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

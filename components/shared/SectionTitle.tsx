// components/common/SectionTitle.tsx

import { ReactNode } from 'react';

interface SectionTitleProps {
  icon: ReactNode;
  text: string;
}

export const SectionTitle = ({ icon, text }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-2">
      {icon}
      <span>{text}</span>
    </div>
  );
};

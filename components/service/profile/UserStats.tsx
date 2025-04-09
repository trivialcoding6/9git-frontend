'use client';

import { Trophy, Star, ClipboardCheck } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <div className="flex items-center gap-4">
    {icon}
    <div className="flex flex-col items-center">
      <div className="text-secondary text-sm">{label}</div>
      <div className="text-black text-base font-medium">{value}</div>
    </div>
  </div>
);

export const UserStats = () => {
  return (
    <div className="sticky top-[3.55rem] left-0 right-0 z-10 bg-beige-base p-1 border-b">
      <div className="flex items-center justify-between ml-2 mr-4">
        <StatItem icon={<Trophy size={20} className="text-black" />} label="레벨" value="4" />

        <div className="w-px"></div>

        <StatItem icon={<Star size={20} className="text-black" />} label="EXP" value="475" />

        <div className="w-px"></div>

        <StatItem
          icon={<ClipboardCheck size={20} className="text-black" />}
          label="완료한 TODOS"
          value="68"
        />
      </div>

      <div className="flex items-center gap-2"></div>
    </div>
  );
};

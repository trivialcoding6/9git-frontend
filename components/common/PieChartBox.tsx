// components/chart/PieChartBox.tsx
'use client';

import { PieChart, Pie, Cell } from 'recharts';

type Props = {
  value: number;
};

export default function PieChartBox({ value }: Props) {
  return (
    <div className="relative w-[150px] h-[75px]">
      <PieChart width={150} height={75}>
        <Pie
          data={[
            { name: '전체 달성도', value: value },
            { name: '남은 부분', value: 100 - value },
          ]}
          cx="50%"
          cy="100%"
          innerRadius={40}
          outerRadius={60}
          startAngle={180}
          endAngle={0}
          paddingAngle={3}
          dataKey="value"
        >
          <Cell fill="#FDA63A" />
          <Cell fill="#EEE0CE" />
        </Pie>
      </PieChart>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-xl font-bold text-secondary">
        {value}%
      </div>
    </div>
  );
}

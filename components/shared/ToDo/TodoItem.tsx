'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import CustomBadge from './CutstomBadge';
import { ColorMap } from '@/constants/color';

type Props = {
  category: string;
  text: string;
};

export default function TodoItem({ category, text }: Props) {
  const [checked, setChecked] = useState(false);
  const categoryColor = ColorMap[category] ?? 'bg-gray-300';

  return (
    <div className="flex items-center gap-3 w-full mb-4 ">
      {/* 카테고리 뱃지 */}
      <CustomBadge label={category} color={categoryColor} />

      {/* 투두 텍스트 */}
      <p
        className={`text-sm font-semibold text-[#744D2C] mx-4 flex-1 text-center ${
          checked ? 'line-through opacity-50' : ''
        }`}
      >
        {text}
      </p>

      {/* 체크박스 */}
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked === 'indeterminate' ? false : checked)}
      />
    </div>
  );
}

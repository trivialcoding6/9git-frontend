'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export default function ProfileModal() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">나의 정보</h2>
      <p className="text-sm">이름: 홍길동</p>

      <Checkbox checked={checked} onChange={setChecked} />
    </div>
  );
}

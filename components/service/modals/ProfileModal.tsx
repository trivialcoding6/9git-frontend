'use client';

import { useState } from 'react';
import CustomCheckbox from '@/components/common/CustomCheckbox';

export default function ProfileModal() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">나의 정보</h2>
      <p className="text-sm">이름: 홍길동</p>

      <CustomCheckbox
        label="개인정보 수집 및 이용에 동의합니다. (필수)"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
}

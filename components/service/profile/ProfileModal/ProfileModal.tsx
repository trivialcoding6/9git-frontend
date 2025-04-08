'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import JobSelectbar from '@/components/service/profile/ProfileModal/JobSelectbar';

export default function ProfileModal() {
  const [checked, setChecked] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | ''>('');

  const handleCheckedChange = (value: boolean | 'indeterminate') => {
    setChecked(value === true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* 헤더 */}
      <h2 className="text-lg font-semibold">나의 정보</h2>
      {/* 아이디 */}
      <p className="text-sm">이름: 홍길동</p>
      {/* 성별 */}

      {/* 나이 */}

      {/* 직업 */}
      <JobSelectbar selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

      {/* 체크박스 */}
      <Checkbox checked={checked} onCheckedChange={handleCheckedChange} />
    </div>
  );
}

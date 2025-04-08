'use client';

import { useState } from 'react';
import JobSelectbar from '@/components/service/profile/ProfileModal/JobSelectbar';
import { Separator } from '@/components/ui/separator';
import { TextScroll } from '@/components/service/profile/ProfileModal/TextScroll';
import { PERSONAL_INFORMATION_AGREEMENT } from '@/constants/PERSONAL_INFORMATION_AGREEMENT';
import ConsentConfirm from '@/components/service/profile/ProfileModal/ConsentConfirm';

export default function ProfileModal() {
  const [checked, setChecked] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | ''>('');
  const handleSubmit = () => {
    console.log('제출 완료!'); // 완료 버튼 클릭 시 처리할 작업
  };

  return (
    <div className="p-4 space-y-3">

      {/* 헤더 */}
      <h2 className="text-lg font-semibold">나의 정보</h2>
      {/* 아이디 */}
      <p className="text-sm">이름: 홍길동</p>
      {/* 성별 */}

      {/* 나이 */}

      {/* 직업 */}
      <JobSelectbar selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

      {/* 개인정보 동의서 */}
      <Separator className="bg-beige-deco" />
      <TextScroll text={PERSONAL_INFORMATION_AGREEMENT} />

      {/* 체크박스 + 완료 버튼 */}
      <ConsentConfirm onConfirm={handleSubmit} />
    </div>
  );
}

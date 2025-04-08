'use client';

import { useState } from 'react';
<<<<<<< HEAD

=======
>>>>>>> e8fe527 (✨ [SCRUM-114] FE 나이 입력 컴포넌트 제작)
import { useForm, FormProvider } from 'react-hook-form';
import { GenderRadio } from '@/components/service/profile/ProfileModal/GenderRadio';
import AgeInput from '@/components/service/profile/ProfileModal/AgeInput';
import JobSelectbar from '@/components/service/profile/ProfileModal/JobSelectbar';
import { Separator } from '@/components/ui/separator';
import { TextScroll } from '@/components/service/profile/ProfileModal/TextScroll';
import { PERSONAL_INFORMATION_AGREEMENT } from '@/constants/PERSONAL_INFORMATION_AGREEMENT';
import ConsentConfirm from '@/components/service/profile/ProfileModal/ConsentConfirm';

const occupations = [
  '사무직',
  '연구·개발직',
  '서비스직',
  '생산직',
  '공무원',
  '프리랜서',
  '자영업자',
  '군인',
  '취업 준비생',
  '대학생',
  '고등학생 이하',
  '무직',
  '기타',
] as const;

type Job = (typeof occupations)[number];

type FormValues = {
  age: string;
  gender: 'M' | 'F';
  job: Job | '';
};

export default function ProfileModal() {
<<<<<<< HEAD
  const methods = useForm<FormValues>({
    defaultValues: {
      age: '',
      gender: 'M',
      job: '',
=======
  const [selectedGender, setSelectedGender] = useState<'M' | 'F' | undefined>(undefined);
  const [selectedJob, setSelectedJob] = useState<Job | ''>('');

  const methods = useForm<FormValues>({
    defaultValues: {
      age: '',
      gender: selectedGender ?? 'M',
      job: selectedJob,
>>>>>>> e8fe527 (✨ [SCRUM-114] FE 나이 입력 컴포넌트 제작)
    },
  });

  const handleSubmit = () => {
    console.log(age, gender, job);
    console.log('제출 완료!'); // 완료 버튼 클릭 시 처리할 작업
  };

  return (
    <FormProvider {...methods}>
<<<<<<< HEAD
      <form {...form} onSubmit={handleSubmit}>
        <div className="p-4 space-y-3">
          {/* 아이디 */}
          <h2 className="text-lg text-secondary font-semibold">아이디</h2>
          <p className="text-sm text-secondary mb-3">user0408</p>
          {/* 성별 */}
          <GenderRadio selectedGender={selectedGender} setSelectedGender={setSelectedGender} />

          {/* 나이 */}
          <AgeInput />

          {/* 직업 */}
          <JobSelectbar selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

          {/* 개인정보 동의서 */}
          <Separator className="bg-beige-deco" />
          <TextScroll text={PERSONAL_INFORMATION_AGREEMENT} />

          {/* 체크박스 + 완료 버튼 */}
          <ConsentConfirm onConfirm={handleSubmit} />
        </div>
      </form>
=======
      <div className="p-4 space-y-3">
        {/* 헤더 */}
        <h2 className="text-lg font-semibold">나의 정보</h2>
        {/* 아이디 */}
        <p className="text-sm">이름: 홍길동</p>

        {/* 성별 */}
        <GenderRadio selectedGender={selectedGender} setSelectedGender={setSelectedGender} />

        {/* 나이 */}
        <AgeInput />

        {/* 직업 */}
        <JobSelectbar selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

        {/* 개인정보 동의서 */}
        <Separator className="bg-beige-deco" />
        <TextScroll text={PERSONAL_INFORMATION_AGREEMENT} />

        {/* 체크박스 + 완료 버튼 */}
        <ConsentConfirm onConfirm={handleSubmit} />
      </div>
>>>>>>> e8fe527 (✨ [SCRUM-114] FE 나이 입력 컴포넌트 제작)
    </FormProvider>
  );
}

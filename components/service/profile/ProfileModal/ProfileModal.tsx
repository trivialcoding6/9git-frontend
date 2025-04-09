'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormValues } from '@/schemas/profile';
import { Form } from '@/components/ui/form';

import { GenderRadio } from './GenderRadio';
import { AgeInput } from './AgeInput';
import JobSelectbar from './JobSelectbar';
import { Separator } from '@/components/ui/separator';
import { TextScroll } from './TextScroll';
import ConsentConfirm from './ConsentConfirm';
import { PERSONAL_INFORMATION_AGREEMENT } from '@/constants/PERSONAL_INFORMATION_AGREEMENT';

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

export default function ProfileModal() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: '',
      gender: 'M',
      job: '',
      isConsent: true,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('제출 데이터:', data);
    alert('제출 완료!');
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="p-4 space-y-3">
            <h2 className="text-lg text-secondary font-semibold">아이디</h2>
            <p className="text-sm text-secondary mb-3">user0408</p>

            <GenderRadio />
            <AgeInput />
            <JobSelectbar />

            <Separator className="bg-beige-deco" />
            <TextScroll text={PERSONAL_INFORMATION_AGREEMENT} />

            <ConsentConfirm onConfirm={onSubmit} />
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}

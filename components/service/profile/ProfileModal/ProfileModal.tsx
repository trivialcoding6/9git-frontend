'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormValues } from '@/schemas/profile';

import { GenderRadio } from './GenderRadio';
import { AgeInput } from './AgeInput';
import JobSelectbar from './JobSelectbar';
import { Separator } from '@/components/ui/separator';
import { TextScroll } from './TextScroll';
import ConsentConfirm from './ConsentConfirm';
import { PERSONAL_INFORMATION_AGREEMENT } from '@/constants/PERSONAL_INFORMATION_AGREEMENT';
import { Button } from '@/components/ui/button';
import { PencilLine } from 'lucide-react';

export default function ProfileModal() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: '',
      gender: 'M',
      job: '',
      isConsent: true,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('제출 데이터:', data);
    alert('제출 완료!');
  });

  const isSubmitDisabled = Object.keys(form.formState.errors).length > 0;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <div className="p-4 space-y-3">
          <h2 className="text-lg text-secondary font-semibold">아이디</h2>
          <p className="text-sm text-secondary mb-3">user0408</p>

          <GenderRadio />
          <AgeInput />
          <JobSelectbar />

          <Separator className="bg-beige-deco" />
          <TextScroll text={PERSONAL_INFORMATION_AGREEMENT} />

          <ConsentConfirm />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="ghost"
            disabled={isSubmitDisabled}
            className="bg-transparent hover:text-primary transition-colors duration-200 cursor-pointer shadow-none border-none px-0 py-0 h-auto disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-1">
              <PencilLine size={16} /> 완료
            </span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

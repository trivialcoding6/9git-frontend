'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormValues } from '@/schemas/profile';
import { useState } from 'react';

import { GenderRadio } from './GenderRadio';
import { AgeInput } from './AgeInput';
import JobSelectbar from './JobSelectbar';
import { Separator } from '@/components/ui/separator';
import { TextScroll } from './TextScroll';
import ConsentConfirm from './ConsentConfirm';
import { PERSONAL_INFORMATION_AGREEMENT } from '@/constants/PERSONAL_INFORMATION_AGREEMENT';
import { Button } from '@/components/ui/button';
import { PencilLine } from 'lucide-react';
import { toast } from 'sonner';

import { updateUserData, ProfileRequest } from '@/apis/profile';

type Props = {
  id: string;
  email: string;
};

export default function ProfileModal({ email, id }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: '',
      gender: 'M',
      job: '',
      isConsent: true,
    },
  });

  const saveProfile = async (data: Omit<ProfileRequest, 'id'>, userId: string): Promise<void> => {
    try {
      setError(null);
      setIsSubmitting(true);
      await updateUserData(userId, data.sex, data.age, data.job);
      toast.success('프로필이 저장되었어요!');
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로필 저장 실패';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const ageValue = Number(data.age);
      if (isNaN(ageValue) || ageValue <= 0) {
        throw new Error('나이는 숫자로 입력해주세요.');
      }
      await saveProfile(
        {
          sex: data.gender,
          age: Number(data.age),
          job: data.job,
        },
        id
      );
      toast.success('프로필이 저장되었어요!');
    } catch (e) {
      console.error(e);
    }
  });

  const isSubmitDisabled = isSubmitting || Object.keys(form.formState.errors).length > 0;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <div className="p-4 space-y-3">
          <h2 className="text-lg text-secondary font-semibold">아이디</h2>
          <p className="text-sm text-secondary mb-3">{email}</p>

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
              <PencilLine size={16} /> {isSubmitting ? '저장 중...' : '완료'}
            </span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

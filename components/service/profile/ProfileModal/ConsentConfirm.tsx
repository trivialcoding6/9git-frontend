'use client';

import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface Props {
  onConfirm: () => void; // 완료 버튼을 눌렀을 때 실행될 콜백 함수
}

export default function ConsentConfirm({ onConfirm }: Props) {
  // 상위 FormProvider로부터 폼 상태를 공유받음
  const {
    control,
    watch,
    trigger,
    formState: { isSubmitting },
  } = useFormContext();

  const [canSubmit, setCanSubmit] = useState(false);

  // 모든 필드 감지
  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      trigger().then(setCanSubmit);
    }, 200); // 200ms 후 실행

    return () => clearTimeout(timer);
  }, [formValues, trigger]);

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValidNow = await trigger();
    if (isValidNow) {
      onConfirm();
    } else {
      alert('입력을 다시 확인해주세요.');
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* FormField: consent 필드에 대한 입력 요소 정의. 각각의 필드를 정의하고 상태와 연결 */}
      <FormField
        control={control}
        name="isConsent"
        render={({ field }) => (
          // FormItem은 하나의 필드 묶음을 감싸는 역할 (label + control + message)
          <FormItem className="flex flex-col items-start space-y-1">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id="privacy-check"
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value === 'indeterminate' ? false : value);
                  }}
                />
              </FormControl>
              <FormLabel htmlFor="privacy-check" className="text-sm font-base text-secondary">
                개인정보 수집 및 이용에 동의합니다 (필수)
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 완료 버튼 (Button 컴포넌트 사용) */}
      <Button
        type="submit"
        variant="ghost"
        disabled={!canSubmit || isSubmitting}
        className="bg-transparent hover:text-primary transition-colors duration-200 cursor-pointer shadow-none border-none px-0 py-0 h-auto disabled:cursor-not-allowed"
      >
        <span
          className={`${
            formValues.isConsent && canSubmit
              ? 'text-secondary icon-color'
              : 'text-beige-deco icon-color'
          } flex items-center gap-1`}
        >
          <PencilLine size={16} /> 완료
        </span>
      </Button>
    </div>
  );
}

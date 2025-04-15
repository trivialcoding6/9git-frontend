'use client';

import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function ConsentConfirm() {
  // 상위 FormProvider로부터 폼 상태를 공유받음
  const { control } = useFormContext();

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
    </div>
  );
}

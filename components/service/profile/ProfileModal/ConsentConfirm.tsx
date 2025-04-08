'use client';

import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface FormValues {
  isConsent: boolean; // 체크박스 여부
}

interface Props {
  onConfirm: () => void; // 완료 버튼을 눌렀을 때 실행될 콜백 함수
}

export default function ConsentConfirm({ onConfirm }: Props) {
  // 입력값 상태를 관리하는 훅
  const form = useForm<FormValues>({
    defaultValues: {
      isConsent: false, // 기본값으로 consent는 false (체크 안 된 상태)
    },
  });

  // 체크박스 상태를 실시간으로 감시
  const consentChecked = form.watch('isConsent');

  // 폼 제출 시 실행되는 함수
  const handleSubmit = (data: FormValues) => {
    if (data.isConsent) {
      // 체크되었으면 onConfirm 콜백 실행
      onConfirm();
    } else {
      // 체크되지 않았을 경우 사용자에게 알림
      alert('동의를 체크해주세요.');
    }
  };

  return (
    // 전체 폼을 감싸는 Form 컴포넌트 (shadcn + react-hook-form 연결)
    <Form {...form}>
      {/* 실제 form 태그 - handleSubmit으로 제출 시 처리 */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-6">
        {/* FormField: consent 필드에 대한 입력 요소 정의. 각각의 필드를 정의하고 상태와 연결 */}
        <FormField
          control={form.control}
          name="isConsent"
          render={({ field }) => (
            // FormItem은 하나의 필드 묶음을 감싸는 역할 (label + control + message)
            <FormItem className="flex items-center space-x-2">
              {/* FormControl: 실제 입력 요소인 체크박스를 감싸는 부분 */}
              <FormControl>
                <Checkbox
                  id="privacy-check"
                  checked={field.value}
                  // 'indeterminate' 상태는 false로 처리 (선택 안 한 상태)
                  onCheckedChange={(value) => {
                    field.onChange(value === 'indeterminate' ? false : value);
                  }}
                />
              </FormControl>

              {/* FormLabel: 체크박스 옆 텍스트 */}
              <FormLabel htmlFor="privacy-check" className="text-sm font-base text-secondary">
                개인정보 수집 및 이용에 동의합니다 (필수)
              </FormLabel>

              {/* FormMessage: 에러 메시지를 표시할 공간 (유효성 검증 시 사용됨) */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 완료 버튼 (Button 컴포넌트 사용) */}
        <Button
          type="submit"
          variant="ghost" // 투명한 스타일
          className="bg-transparent hover:bg-transparent shadow-none border-none px-0 py-0 h-auto"
        >
          <span
            className={`${
              consentChecked ? 'text-secondary icon-color' : 'text-beige-deco icon-color'
            } flex items-center gap-1`}
          >
            <PencilLine size={16} /> 완료
          </span>
        </Button>
      </form>
    </Form>
  );
}

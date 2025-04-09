'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ActionButton } from '../common/ActionButton';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { DatePickerSection } from './DatePickerSection';
import { CalendarIcon, StarIcon, FileTextIcon, PenLine, X } from 'lucide-react';
import Card from '@/components/common/Card';

const memoSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다.'),
  startDate: z.date({ required_error: '시작일을 선택해주세요.' }),
  endDate: z.date({ required_error: '종료일을 선택해주세요.' }),
});

type MemoFormData = z.infer<typeof memoSchema>;

export default function MemoPopup() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      title: '',
      content: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: MemoFormData) => {
    console.log('폼 제출됨:', data);
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2 text-secondary font-bold text-sm">
          <PenLine size={16} className="primary" />
          <span>오늘의 Memo</span>
        </div>
      }
      rightAction={<X size={16} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        {/* 제목 */}
        <div>
          <SectionTitle icon={<FileTextIcon size={16} className="primary" />} text="제목" />
          <input
            {...register('title')}
            className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                       placeholder:text-beige-deco text-main-gray placeholder:text-sm text-sm"
            placeholder="제목을 작성해주세요"
          />
        </div>

        {/* 메모 내용 */}
        <div>
          <SectionTitle icon={<StarIcon size={16} className="primary" />} text="메모 내용 *" />
          <textarea
            {...register('content')}
            rows={2}
            maxLength={30}
            className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                       placeholder:text-beige-deco text-main-gray placeholder:text-sm text-sm resize-none"
            placeholder="메모 내용을 입력해주세요"
          />
          <div className="flex justify-between mt-1 text-xs text-secondary">
            {errors.content && <span className="text-primary">{errors.content.message}</span>}
            <span className="ml-auto">{watch('content')?.length ?? 0}/30</span>
          </div>
        </div>

        {/* 기간 설정 */}
        <div>
          <SectionTitle icon={<CalendarIcon size={16} className="primary" />} text="기간 설정" />
          <div className="flex items-center gap-3 mt-2">
            <DatePickerSection
              date={watch('startDate')}
              setDate={(date) => setValue('startDate', date as Date)}
            />
            <span className="text-secondary text-lg">~</span>
            <DatePickerSection
              date={watch('endDate')}
              setDate={(date) => setValue('endDate', date as Date)}
            />
          </div>
          {(errors.startDate || errors.endDate) && (
            <p className="mt-1 text-xs text-primary">
              {errors.startDate?.message || errors.endDate?.message}
            </p>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between mt-6 bg-transparent px-4">
          <ActionButton type="button" onClick={() => console.log('삭제')}>
            삭제
          </ActionButton>
          <ActionButton type="submit">완료</ActionButton>
        </div>
      </form>
    </Card>
  );
}

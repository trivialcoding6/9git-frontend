'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memoSchema, MemoFormData } from '@/schemas/memo';

import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { ActionButton } from '../common/ActionButton';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { DatePickerSection } from './DatePickerSection';
import { CalendarIcon, StarIcon, FileTextIcon, PenLine, X } from 'lucide-react';

import Card from '@/components/common/Card';

export default function MemoPopup() {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      title: '',
      content: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data: MemoFormData) => {
    console.log('폼 제출됨:', data);
  };

  const contentLength = watch('content')?.length ?? 0;

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
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          {/* 제목 */}
          <div>
            <SectionTitle icon={<FileTextIcon size={16} className="primary" />} text="제목" />
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                        placeholder:text-beige-deco text-main-gray placeholder:text-sm text-sm"
                      placeholder="제목을 작성해주세요"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* 메모 내용 */}
          <div>
            <SectionTitle icon={<StarIcon size={16} className="primary" />} text="메모 내용 *" />
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={2}
                      maxLength={30}
                      className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                        placeholder:text-beige-deco text-main-gray placeholder:text-sm text-sm resize-none"
                      placeholder="메모 내용을 입력해주세요"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-1 text-xs text-secondary">
              {errors.content && <span className="text-primary">{errors.content.message}</span>}
              <span className="ml-auto">{contentLength}/30</span>
            </div>
          </div>

          {/* 기간 설정 */}
          <div>
            <SectionTitle icon={<CalendarIcon size={16} className="primary" />} text="기간 설정" />
            <div className="flex justify-around mt-2">
              <FormField
                control={control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerSection
                        date={field.value}
                        setDate={(date) => field.onChange(date as Date)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span className="text-secondary text-lg">~</span>
              <FormField
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerSection
                        date={field.value}
                        setDate={(date) => field.onChange(date as Date)}
                      />
                    </FormControl>
                  </FormItem>
                )}
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
      </Form>
    </Card>
  );
}

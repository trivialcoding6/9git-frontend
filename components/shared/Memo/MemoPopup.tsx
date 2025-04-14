'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memoSchema, MemoFormData } from '@/schemas/memo';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { DatePickerSection } from '../DatePickerSection';
import { CalendarIcon, StarIcon, FileTextIcon } from 'lucide-react';
import { DeleteCompleteButtons } from '@/components/common/DeleteCompleteButton';
import { useModalStore } from '@/stores/modal';
import { useMemoStore } from '@/stores/useMemoStore';
import type { Memo } from '@/stores/useMemoStore';

export default function MemoPopup() {
  const { closeModal } = useModalStore();
  const { editingMemo, setEditingMemo, addMemo, updateMemo, removeMemo } = useMemoStore();

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
    setValue,
    watch,
    formState: { errors },
  } = form;

  const contentLength = watch('content')?.length ?? 0;

  // 수정모드일 경우 값 채워주기
  useEffect(() => {
    if (editingMemo) {
      setValue('title', editingMemo.title);
      setValue('content', editingMemo.description);
      setValue('startDate', new Date(editingMemo.startDate));
      setValue('endDate', new Date(editingMemo.endDate));
    }
  }, [editingMemo, setValue]);

  // 완료 버튼
  const handleComplete = (data: MemoFormData) => {
    const payload: Memo = {
      id: editingMemo?.id || crypto.randomUUID(),
      title: data.title ?? '', // undefined 방지
      description: data.content,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    if (editingMemo) {
      updateMemo(editingMemo.id, payload);
    } else {
      addMemo(payload);
    }

    setEditingMemo(null);
    closeModal();
  };

  // 삭제 버튼
  const handleDelete = () => {
    if (editingMemo) {
      removeMemo(editingMemo.id);
      setEditingMemo(null);
    }
    closeModal();
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-4">
        {/* 제목 필드 */}
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
          <div className="flex items-center justify-center gap-x-4 mt-2">
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
            <span className="text-sm text-primary">~</span>
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

        {/* 삭제 / 완료 버튼 */}
        <DeleteCompleteButtons onDelete={handleDelete} onComplete={handleSubmit(handleComplete)} />
      </form>
    </Form>
  );
}

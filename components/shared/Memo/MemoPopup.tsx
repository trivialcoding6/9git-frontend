'use client';

import { useEffect, useState } from 'react';
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
  const { editingMemo, setEditingMemo, addMemo, updateMemo, removeMemo, memoList } = useMemoStore();

  const [limitError, setLimitError] = useState('');

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

  useEffect(() => {
    if (editingMemo) {
      setValue('title', editingMemo.title);
      setValue('content', editingMemo.description);
      setValue('startDate', new Date(editingMemo.startDate));
      setValue('endDate', new Date(editingMemo.endDate));
    }
  }, [editingMemo, setValue]);

  const handleComplete = (data: MemoFormData) => {
    if (!editingMemo && memoList.length >= 10) {
      setLimitError('메모는 최대 10개까지만 작성할 수 있어요.');
      return;
    }

    const payload: Memo = {
      id: editingMemo?.id || crypto.randomUUID(),
      title: data.title ?? '',
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
          <SectionTitle icon={<FileTextIcon size={16} className="text-primary" />} text="제목" />
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                    placeholder:text-beige-deco text-main-gray placeholder:text-lg text-lg"
                    placeholder="제목을 작성해주세요"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* 메모 내용 */}
        <div className="mb-0">
          <SectionTitle icon={<StarIcon size={16} className="text-primary" />} text="메모 내용" />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    value={field.value?.slice(0, 30) ?? ''}
                    onChange={(e) => field.onChange(e.target.value.slice(0, 30))}
                    rows={2}
                    maxLength={30}
                    className="w-full p-2 border border-orange-300 rounded-md bg-transparent 
                      placeholder:text-beige-deco text-main-gray placeholder:text-lg text-lg resize-none"
                    placeholder="메모 내용을 입력해주세요"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between mt-1 text-base text-secondary">
            {errors.content && <span className="text-primary">{errors.content.message}</span>}
            <span className="ml-auto">{contentLength}/30</span>
          </div>
        </div>

        {/* 기간 설정 */}
        <div className="mt-0">
          <SectionTitle
            icon={<CalendarIcon size={16} className="text-primary" />}
            text="기간 설정"
          />
          <div className="flex items-center justify-center gap-x-4 mt-0 w-full">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <DatePickerSection
                      date={field.value}
                      setDate={(date) => field.onChange(date as Date)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span className="text-lg text-primary">~</span>
            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
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

        {/* 메모 개수 제한 에러 메시지 */}
        {limitError && <p className="text-sm text-primary text-center">{limitError}</p>}

        {/* 삭제 / 완료 버튼 */}
        <DeleteCompleteButtons onDelete={handleDelete} onComplete={handleSubmit(handleComplete)} />
      </form>
    </Form>
  );
}

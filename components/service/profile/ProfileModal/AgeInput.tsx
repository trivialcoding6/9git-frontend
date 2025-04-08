'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { numFormSchema } from '@/schemas/num';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

// numFormSchema가 age 필드를 포함한다고 가정
type FormValues = z.infer<typeof numFormSchema>;

const AgeInput: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(numFormSchema),
    defaultValues: {
      age: '',
    },
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((data) => {
    const submissionData = {
      ...data,
<<<<<<< HEAD
      age: data.age === '' ? null : data.age,
=======
      age: data.age === '' ? '999' : data.age,
>>>>>>> e8fe527 (✨ [SCRUM-114] FE 나이 입력 컴포넌트 제작)
    };
    console.log('나이 제출됨:', submissionData);
    // 필요한 로직 처리
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold text-secondary">나이</FormLabel>
              <FormControl>
                <input
<<<<<<< HEAD
                  type="number"
=======
                  type="text"
                  inputMode="numeric"
>>>>>>> e8fe527 (✨ [SCRUM-114] FE 나이 입력 컴포넌트 제작)
                  maxLength={3}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full rounded border text-sm px-3 py-1 shadow-sm focus:outline-none focus:ring-1 ${
                    form.formState.errors.age
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-beige-deco bg-beige-light focus:ring-secondary'
                  } placeholder:text-beige-deco text-secondary`}
                  placeholder="나이를 입력하세요."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AgeInput;

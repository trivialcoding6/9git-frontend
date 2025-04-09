'use client';

import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ChevronDownIcon } from 'lucide-react';

const occupations = [
  '사무직',
  '연구·개발직',
  '서비스직',
  '생산직',
  '공무원',
  '프리랜서',
  '자영업자',
  '군인',
  '취업 준비생',
  '기타',
] as const;

export default function JobSelectbar() {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name="job"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-lg font-bold text-secondary">직업</FormLabel>
          <FormControl>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full rounded border text-secondary text-sm px-3 py-1 shadow-sm focus:outline-none focus:ring-1 flex items-center justify-between
                  ${
                    fieldState.error
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-beige-deco bg-beige-light focus:ring-secondary'
                  }`}
              >
                <span>
                  {field.value || <span className="text-beige-deco">직업을 선택하세요.</span>}
                </span>
                <ChevronDownIcon className="size-4 opacity-50" />
              </button>

              {isOpen && (
                <ul className="absolute z-10 w-full bg-beige-light border border-beige-deco rounded-l-lg mt-1 max-h-50 overflow-y-auto">
                  {occupations.map((job) => (
                    <li
                      key={job}
                      onClick={() => {
                        field.onChange(job);
                        setIsOpen(false);
                      }}
                      className="px-4 py-1.5 cursor-pointer text-secondary text-sm hover:bg-beige-deco"
                    >
                      {job}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

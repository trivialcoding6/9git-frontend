'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export function AgeInput() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="age"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-lg font-bold text-secondary">나이</FormLabel>
          <FormControl>
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]*$/.test(value)) {
                  field.onChange(value);
                }
              }}
              className={`w-full rounded border text-sm px-3 py-1 shadow-sm focus:outline-none focus:ring-1 ${
                fieldState.error
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
  );
}

export default AgeInput;

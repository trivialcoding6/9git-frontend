'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function GenderRadio() {
  const { control, watch, setValue } = useFormContext();

  const selectedGender = watch('gender');

  return (
    <div className="space-y-2">
      <h2 className="text-lg text-secondary font-semibold">성별</h2>
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue('gender', value);
                }}
                value={field.value}
                className="flex flex-row space-x-5"
              >
                <FormItem className="flex items-center space-x-0.5 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="M" />
                  </FormControl>
                  <FormLabel className="font-normal text-sm text-secondary">남성</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-x-0.5 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="F" />
                  </FormControl>
                  <FormLabel className="font-normal text-sm text-secondary">여성</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

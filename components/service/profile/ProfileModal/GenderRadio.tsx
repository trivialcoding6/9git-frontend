'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  selectedGender: 'M' | 'F' | undefined;
  setSelectedGender: (gender: 'M' | 'F') => void;
};

type FormValues = {
  type: 'M' | 'F';
};

export function GenderRadio({ selectedGender, setSelectedGender }: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      type: selectedGender ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => setSelectedGender(data.type))}
        className="space-y-2"
      >
        <h2 className="text-lg text-secondary font-semibold">성별</h2>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
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
      </form>
    </Form>
  );
}

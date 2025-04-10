'use client';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

type AuthFormField = {
  name: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
};

type Props = {
  fields: AuthFormField[];
  submitButtonText: string;
};

export const AuthForm = ({ fields, submitButtonText }: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const form = useFormContext();

  const hasError = Object.keys(form.formState.errors).length > 0;

  const isDisabled = form.formState.isSubmitting || hasError;

  return (
    <div className="p-6 space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: fieldProps }) => (
            <FormItem>
              <FormControl>
                {field.isPassword ? (
                  <div className="relative">
                    <Input
                      className="h-[46px] bg-white opacity-80"
                      placeholder={field.placeholder}
                      type={isShowPassword ? 'text' : 'password'}
                      error={!!form.formState.errors[field.name]}
                      {...fieldProps}
                    />
                    {isShowPassword ? (
                      <EyeOffIcon
                        size={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        aria-label="Hide password"
                      />
                    ) : (
                      <EyeIcon
                        size={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        aria-label="Show password"
                      />
                    )}
                  </div>
                ) : (
                  <div key={field.name}>
                    <Input
                      className="h-[46px] bg-white opacity-80"
                      placeholder={field.placeholder}
                      type={field.type || 'text'}
                      error={!!form.formState.errors[field.name]}
                      {...fieldProps}
                    />
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <Button className="w-full bg-primary text-white h-[45px] mt-4" disabled={isDisabled}>
        {submitButtonText}
      </Button>

      <p className="text-sm text-gray-500 text-center">아이디/비밀번호 찾기</p>
    </div>
  );
};

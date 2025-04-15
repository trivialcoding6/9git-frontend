'use client';
import { AuthForm } from '@/components/shared/AuthForm';
import { loginFormSchema } from '@/schemas/auth';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { loginUser } from '@/apis/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await loginUser(data);
    if (response.status_code === 200) {
      router.push(ROUTES.HOME);
    } else {
      toast.error(response.error);
    }
    // 로그인 로직 처리
  });

  const fields = [
    {
      name: 'email',
      placeholder: '이메일',
      type: 'email',
    },
    {
      name: 'password',
      placeholder: '비밀번호',
      isPassword: true,
    },
  ];

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <AuthForm fields={fields} submitButtonText="로그인" />
        </form>
      </Form>
    </FormProvider>
  );
};

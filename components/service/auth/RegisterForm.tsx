'use client';
import { AuthForm } from '@/components/shared/AuthForm';
import { registerFormSchema } from '@/schemas/auth';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/apis/user';

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const fields = [
    {
      name: 'name',
      placeholder: '이름',
    },
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

  const handleSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const response = await registerUser(data);

      if (response.error) {
        toast.error(response.error);
      }

      if (response.data) {
        toast.success('회원가입에 성공했습니다.');
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('회원가입에 실패했습니다.');
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <AuthForm fields={fields} submitButtonText="회원가입" />
        </form>
      </Form>
    </FormProvider>
  );
};

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { loginFormSchema, registerFormSchema } from '@/schemas/auth';
import { TResponse } from '@/types/api';
import { TLoginResponse, TUser } from '@/types/user';

export const registerUser = async (
  data: z.infer<typeof registerFormSchema>
): Promise<TResponse<TUser>> => {
  const { name, email, password } = data;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('회원가입 API 호출 실패:', error);
    return { status_code: 500, error: '회원가입에 실패했습니다.' };
  }
};

export const loginUser = async (
  data: z.infer<typeof loginFormSchema>
): Promise<TResponse<TLoginResponse>> => {
  const { email, password } = data;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('로그인 API 호출 실패:', error);
    return { status_code: 500, error: '로그인에 실패했습니다.' };
  }
};

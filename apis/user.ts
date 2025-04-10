import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { registerFormSchema } from '@/schemas/auth';
import { TResponse } from '@/types/api';
import { TUser } from '@/types/user';

export const registerUser = async (
  data: z.infer<typeof registerFormSchema>
): Promise<TResponse<TUser>> => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password: hashedPassword }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('회원가입 API 호출 실패:', error);
    return { statusCode: 500, error: '회원가입에 실패했습니다.' };
  }
};

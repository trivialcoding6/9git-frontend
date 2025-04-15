'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  redirect(ROUTES.LOGIN);
}

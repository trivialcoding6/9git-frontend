'use server';

import { cookies } from 'next/headers';

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token');

    if (!token?.value) {
      return null;
    }

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-token?token=${token?.value}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await result.json();

    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${data.data.sub}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
      }
    );
    const userData = await userResponse.json();

    return userData.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

'use client';

import { getUser } from '@/actions/user';
import { useUserStore } from '@/stores/user';
import { useEffect } from 'react';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        updateUser(user);
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
};

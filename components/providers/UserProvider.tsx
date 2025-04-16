'use client';

import { getUser } from '@/actions/user';
import { useUserStore } from '@/stores/user';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsReady(false);
      const user = await getUser();

      if (user) {
        updateUser(user);
        setIsReady(true);
      }
    };
    fetchUser();
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  return <>{children}</>;
};

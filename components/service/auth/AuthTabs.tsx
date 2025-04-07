'use client';

import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AuthTabs = () => {
  const pathname = usePathname();
  const isLogin = pathname === ROUTES.LOGIN;
  const isRegister = pathname === ROUTES.REGISTER;

  return (
    <div className="flex w-full">
      <div className="flex-1 flex items-center justify-center">
        <Link
          href={ROUTES.LOGIN}
          className={`py-3 w-full text-center ${
            isLogin
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-1 border-beige-deco text-beige-deco hover:text-primary'
          }`}
        >
          로그인
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Link
          href={ROUTES.REGISTER}
          className={`py-3 w-full text-center ${
            isRegister
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-1 border-beige-deco text-beige-deco hover:text-primary'
          }`}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

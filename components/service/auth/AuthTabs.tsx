"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthTabs = () => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  return (
    <div className="flex w-full">
      <div className="flex-1 flex items-center justify-center">
        <Link
          href="/login"
          className={`py-3 w-full text-center ${
            isLogin
              ? "border-b-2 border-[#FDA63A] text-[#FDA63A]"
              : "border-b-1 border-[#9CA3AF] text-[#9CA3AF] hover:text-[#FDA63A]"
          }`}
        >
          로그인
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Link
          href="/register"
          className={`py-3 w-full text-center ${
            isRegister
              ? "border-b-2 border-[#FDA63A] text-[#FDA63A]"
              : "border-b-1 border-[#9CA3AF] text-[#9CA3AF] hover:text-[#FDA63A]"
          }`}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

'use client';

import { Header } from '@/components/shared/Header';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { CategoryWithStorages } from '@/types/storage';
import { useSidebarStore } from '@/stores/sidebar';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Sidebar } from './Sidebar';

export const ChatbotHeader = () => {
  const open = useSidebarStore((state) => state.open);
  const setOpen = useSidebarStore((state) => state.setOpen);

  return (
    <>
      <Header className="flex justify-between items-center">
        <Menu width={28} height={28} onClick={() => setOpen(true)} className="cursor-pointer m-2" />
        <Link href={ROUTES.CHATBOT} className=" bg-primary text-white mr-3 px-4 py-2 rounded-md">
          새 대화 시작하기
        </Link>
      </Header>

      {open && (
        <>
          {/* 뒷배경 반투명 처리 */}
          <div
            onClick={() => setOpen(false)} // 배경 클릭 시 닫힘
            className="fixed inset-0 z-40"
          />
          {/* 사이드바 */}
          <Sidebar />
        </>
      )}
    </>
  );
};

'use client';

import { Header } from '@/components/shared/Header';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

type Props = {
  onReset: () => void; // 상위에서 넘겨줌
};

export const ChatbotHeader = ({ onReset }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header className="flex justify-between items-center">
        <Menu
          width={28}
          height={28}
          onClick={() => setIsSidebarOpen(true)}
          className="cursor-pointer m-2"
        />
        <Button variant="outline" className=" bg-primary text-white mr-3" onClick={onReset}>
          새 대화 시작하기
        </Button>
      </Header>

      {isSidebarOpen && (
        <>
          {/* 뒷배경 반투명 처리 */}
          <div
            onClick={toggleSidebar} // 배경 클릭 시 닫힘
            className="fixed inset-0 z-40"
          />
          {/* 사이드바 */}
          <Sidebar onClose={toggleSidebar} />
        </>
      )}
    </>
  );
};

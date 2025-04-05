'use client';

import { useModalStore } from '@/stores/modal';

type Props = {
  children: React.ReactNode;
};

export const ModalContainer = ({ children }: Props) => {
  const { closeModal } = useModalStore();

  return (
    // 모달 배경
    // 모달 노출 시 배경 흐리게
    <div
      className="fixed inset-0 z-50 max-w-[400px] mx-auto flex items-center justify-center bg-black/70"
      onClick={closeModal} // 배경 클릭 시 모달 닫기
    >
      {/* 모달 본체 */}
      <div
        className="
      relative 
      w-[90%]
      rounded-lg 
      bg-light
      p-4 
      shadow-md
    "
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        {children}
      </div>
    </div>
  );
};

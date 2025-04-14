'use client';

import { Separator } from '@/components/ui/separator';
import { useModalStore } from '@/stores/modal';
import { XIcon } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

export const ModalHeader = ({ children }: Props) => {
  const { closeModal } = useModalStore();

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="ml-2 text-xl text-secondary">{children}</div>

        <button className="text-secondary cursor-pointer" onClick={closeModal}>
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      <Separator className="bg-beige-deco" />
    </>
  );
};

"use client";

import { Separator } from "@/components/ui/separator";
import { useModalStore } from "@/stores/modal";
import { XIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const ModalHeader = ({ children }: Props) => {
  const { closeModal } = useModalStore();

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-[#744D2C]">{children}</div>

        <button className="text-[#744D2C] cursor-pointer" onClick={closeModal}>
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      <Separator className="bg-[#F4DDBD]" />
    </>
  );
};

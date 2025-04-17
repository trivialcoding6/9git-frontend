import Image from 'next/image';
import { ActionButton } from '@/components/common/ActionButton';
import { X } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar';
export const SidebarHeader = () => {
  const setOpen = useSidebarStore((state) => state.setOpen);
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src="/chatbot-avatar.webp"
          alt="gitnyang"
          className="rounded-full"
        />
        <span className="font-bold text-lg">깃냥이 보관함</span>
      </div>
      <ActionButton icon={<X size={20} />} onClick={() => setOpen(false)}>
        {' '}
      </ActionButton>
    </div>
  );
};

import Image from 'next/image';
import { ActionButton } from '@/components/common/ActionButton';
import { X } from 'lucide-react';

export const SidebarHeader = ({ onClose }: { onClose: () => void }) => {
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
      <ActionButton icon={<X size={20} />} onClick={onClose}>
        {' '}
      </ActionButton>
    </div>
  );
};

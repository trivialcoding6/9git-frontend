'use client';
import { Button } from '@/components/ui/button';

type Props = {
  onDelete: () => void;
  onComplete: () => void;
};

export const DeleteCompleteButtons = ({ onDelete, onComplete }: Props) => {
  return (
    <div className="flex justify-between mt-6 bg-transparent px-4">
      <Button
        onClick={onDelete}
        className="bg-[#5B3E1D] text-white hover:bg-[#4a2f17] rounded-full px-6 py-2 text-sm font-semibold shadow"
      >
        삭제
      </Button>
      <Button
        onClick={onComplete}
        className="bg-[#FBAA24] text-white hover:bg-[#e8991a] rounded-full px-6 py-2 text-sm font-semibold shadow"
      >
        완료
      </Button>
    </div>
  );
};

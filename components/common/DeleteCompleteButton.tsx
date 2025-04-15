'use client';
import { Button } from '@/components/ui/button';

type Props = {
  onDelete: () => void;
  onComplete: () => void;
  disableCompleteButton?: boolean;
  categoryError?: string;
};

export const DeleteCompleteButtons = ({
  onDelete,
  onComplete,
  disableCompleteButton = false,
  categoryError,
}: Props) => {
  return (
    <div className="mt-6 bg-transparent px-4">
      <div className="flex justify-between">
        <Button
          onClick={onDelete}
          className="bg-secondary text-white hover:bg-secondary-foreground rounded-full px-6 py-2 text-lg shadow"
        >
          삭제
        </Button>
        <Button
          onClick={onComplete}
          disabled={disableCompleteButton}
          className={`rounded-full px-6 py-2 text-lg shadow text-white ${
            disableCompleteButton
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-foreground'
          }`}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

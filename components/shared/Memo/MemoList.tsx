'use client';

import MemoCard from './MemoCard';
import { useMemoStore } from '@/stores/useMemoStore';
import { useModalStore } from '@/stores/modal';
import MemoPopup from './MemoPopup';
import { Memo } from '@/types/memo';

export default function MemoList() {
  const { memoList, setEditingMemo } = useMemoStore();
  const { openModal } = useModalStore();

  const handleMemoClick = (memo: Memo) => {
    setEditingMemo(memo);
    openModal({
      title: '메모 수정',
      component: <MemoPopup />,
    });
  };

  return (
    <div className="pt-2 pb-1 px-1 flex flex-col gap-2">
      {memoList.map((memo) => (
        <div key={memo.id} onClick={() => handleMemoClick(memo)}>
          <MemoCard title={memo.title} description={memo.content || ''} />
        </div>
      ))}
    </div>
  );
}

// components/shared/Memo/MemoList.tsx

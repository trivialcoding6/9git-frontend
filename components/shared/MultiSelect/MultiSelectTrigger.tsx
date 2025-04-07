/**
 * components/shared/MultiSelect/MultiSelectTrigger.tsx
 *
 * 멀티셀렉트 드롭다운을 열고 닫는 트리거 버튼 컴포넌트
 *
 * 이 컴포넌트는 사용자가 드롭다운을 열고 닫을 수 있는 버튼을 제공합니다.
 * useSelectStore의 상태를 사용하여 현재 선택된 항목들을 표시하고,
 * 드롭다운의 열림/닫힘 상태를 토글합니다.
 *
 * 주요 기능:
 * - 선택된 항목 표시 ('All'이 선택된 경우와 개별 항목이 선택된 경우 다르게 표시)
 * - 드롭다운 상태에 따라 화살표 아이콘 변경 (위/아래)
 * - 클릭 시 드롭다운 토글
 */
'use client';

import { ReactNode } from 'react';
import { useSelectStore } from '@/stores/select';
import { ChevronDown, ChevronUp } from 'lucide-react';

type MultiSelectTriggerProps = {
  children?: ReactNode;
};

export function MultiSelectTrigger({ children }: MultiSelectTriggerProps) {
  const isOpen = useSelectStore((state) => state.isOpen);
  const setIsOpen = useSelectStore((state) => state.setIsOpen);
  const selectedItems = useSelectStore((state) => state.selectedItems);

  return (
    <button
      className="flex items-center justify-between w-[140px] px-3 py-2 text-sm border rounded-lg border-primary bg-beige-light text-secondary"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center space-x-1">
        {children || (
          <>
            <span className="font-medium">
              {selectedItems.length === 1 && selectedItems[0] === 'All'
                ? 'All'
                : `${selectedItems.join(', ')}`}
            </span>
          </>
        )}
      </div>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
}

/**
 * components/shared/MultiSelect/MultiSelectItem.tsx
 *
 * 멀티셀렉트 드롭다운 내 선택 가능한 항목 컴포넌트
 *
 * 이 컴포넌트는 드롭다운 내에서 선택 가능한 각 항목을 표현합니다.
 * useSelectStore의 상태를 사용하여 항목의 선택 상태를 관리하고 토글합니다.
 *
 * 주요 기능:
 * - 항목 클릭 시 선택 상태 토글
 * - 선택된 항목에 체크 아이콘 표시
 * - 선택된 항목에 배경색 변경으로 시각적 피드백 제공
 * - 옵션으로 항목 앞에 색상 표시 가능 (색상 마커)
 *
 * 이 컴포넌트는 카테고리나 태그 등 다양한 선택 가능한 항목을
 * 표현하는데 사용될 수 있습니다.
 */
'use client';

import { ReactNode } from 'react';
import { useSelectStore } from '@/stores/select';
import { Check } from 'lucide-react';

type MultiSelectItemProps = {
  children: ReactNode;
  value: string;
  color?: string;
};

export function MultiSelectItem({ children, value, color }: MultiSelectItemProps) {
  const toggleItem = useSelectStore((state) => state.toggleItem);
  const selectedItems = useSelectStore((state) => state.selectedItems);

  // 선택 여부 확인 함수
  const isItemSelected = () => selectedItems.includes(value);

  return (
    <div
      className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-beige-light ${
        isItemSelected() ? 'bg-beige-base' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        toggleItem(value);
      }}
    >
      <div className="flex-1 flex items-center">
        {color && <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />}
        {children}
      </div>
      {isItemSelected() && <Check size={16} className="text-primary" />}
    </div>
  );
}

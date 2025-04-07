/**
 * components/shared/MultiSelect/MultiSelectInput.tsx
 *
 * 멀티셀렉트 드롭다운 내 검색 입력 필드 컴포넌트
 *
 * 이 컴포넌트는 드롭다운 내에서 항목을 검색할 수 있는 입력 필드를 제공합니다.
 * useSelectStore의 상태를 사용하여 검색어를 저장하고 업데이트합니다.
 *
 * 주요 기능:
 * - 사용자 입력에 따른 검색어 상태 업데이트
 * - 커스터마이징 가능한 placeholder 텍스트
 * - 스타일링된 입력 필드 제공
 *
 * 검색어는 MultiSelectItem 필터링에 사용되며, 사용자가 원하는 항목을
 * 빠르게 찾는 데 도움을 줍니다.

 */
'use client';

import { useSelectStore } from '@/stores/select';

type MultiSelectInputProps = {
  placeholder?: string;
};

export function MultiSelectInput({ placeholder = '검색...' }: MultiSelectInputProps) {
  const searchText = useSelectStore((state) => state.searchText);
  const setSearchText = useSelectStore((state) => state.setSearchText);

  return (
    <div className="px-3 pb-2">
      <input
        type="text"
        className="w-full px-3 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#F5B44B]"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

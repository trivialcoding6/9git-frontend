/**
 * stores/select.ts
 *
 * 멀티셀렉트 컴포넌트를 위한 Zustand 상태 관리 스토어
 *
 * 주요 기능:
 * 1. 선택된 아이템 관리 (selectedItems)
 * 2. 드롭다운 열림/닫힘 상태 관리 (isOpen)
 * 3. 검색어 관리 (searchText)
 *
 * 특징:
 * - 'All' 카테고리 특별 처리: 선택 시 다른 모든 카테고리 해제
 * - 모든 카테고리 선택 시 자동으로 'All'로 변환
 * - 모든 카테고리 해제 시 자동으로 'All' 선택
 *
 * 사용 예:
 * const selectedItems = useSelectStore((state) => state.selectedItems);
 * const toggleItem = useSelectStore((state) => state.toggleItem);
 */
import { create } from 'zustand';

// 단순화된 상태 타입
type SelectState = {
  // 핵심 상태
  selectedItems: string[]; // 선택된 아이템 목록
  isOpen: boolean; // 드롭다운 열림/닫힘 상태
  searchText: string; // 필터링을 위한 검색어

  // 액션
  toggleItem: (item: string) => void; // 아이템 선택/해제 토글
  setIsOpen: (isOpen: boolean) => void; // 드롭다운 상태 설정
  setSearchText: (text: string) => void; // 검색어 설정
};

export const useSelectStore = create<SelectState>()((set, get) => ({
  // 초기 상태
  selectedItems: ['All'], // 기본값으로 'All' 카테고리 선택
  isOpen: false, // 초기에는 드롭다운 닫힘
  searchText: '', // 초기 검색어는 빈 문자열

  // 아이템 토글 (선택/해제)
  toggleItem: (item: string) => {
    // All 카테고리 선택 시 다른 모든 카테고리 해제
    if (item === 'All') {
      set({ selectedItems: ['All'] });
      return;
    }

    // 현재 상태 확인
    const { selectedItems } = get();

    // 이미 선택된 카테고리면 제거
    if (selectedItems.includes(item)) {
      const filtered = selectedItems.filter((c) => c !== item);

      // 모든 카테고리가 해제되면 All 선택
      if (filtered.length === 0) {
        set({ selectedItems: ['All'] });
      } else {
        // All은 제거하고 나머지만 유지
        set({
          selectedItems: filtered.filter((c) => c !== 'All'),
        });
      }
    }
    // 선택되지 않은 카테고리면 추가
    else {
      // All이 선택되어 있으면 All 제거하고 새 항목만 추가
      if (selectedItems.includes('All')) {
        set({ selectedItems: [item] });
      } else {
        // 기존 항목에 새 항목 추가
        const newSelectedItems = [...selectedItems, item];

        // Calendar.tsx에서 정의된 모든 카테고리 목록 (All 제외)
        const allCategoriesCount = 3; // 코딩, 영어, 운동 (All 제외)

        // 모든 카테고리가 선택되었는지 확인
        if (newSelectedItems.length === allCategoriesCount) {
          set({ selectedItems: ['All'] });
        } else {
          set({ selectedItems: newSelectedItems });
        }
      }
    }
  },

  // 드롭다운 열기/닫기
  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  // 검색어 설정
  setSearchText: (text: string) => set({ searchText: text }),
}));

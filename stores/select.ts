/**
 * stores/select.ts
 *
 * 멀티셀렉트 컴포넌트를 위한 Zustand 상태 관리 스토어
 *
 * 주요 기능:
 * 1. 선택된 항목 관리 (selectedItems)
 * 2. 드롭다운 열림/닫힘 상태 관리 (isOpen)
 * 3. 검색어 관리 (searchText)
 * 4. 전체 항목 목록 관리 (items)
 *
 * 특징:
 * - 'All' 항목 특별 처리: 선택 시 다른 모든 항목 해제
 * - 모든 항목 선택 시 자동으로 'All'로 변환
 * - 모든 항목 해제 시 자동으로 'All' 선택
 *
 * 사용 예:
 * const selectedItems = useSelectStore((state) => state.selectedItems);
 * const toggleItem = useSelectStore((state) => state.toggleItem);
 */
import { create } from 'zustand';

// 상수 정의
const ALL_ITEM = 'All'; // 전체 선택 항목의 식별자

// 단순화된 상태 타입
type SelectState = {
  // 핵심 상태
  items: string[]; // 선택 가능한 전체 항목 목록 ('All' 포함)
  selectedItems: string[]; // 선택된 항목 목록
  isOpen: boolean; // 드롭다운 열림/닫힘 상태
  searchText: string; // 필터링을 위한 검색어

  // 액션
  setItems: (items: string[]) => void; // 전체 항목 목록 설정
  toggleItem: (item: string) => void; // 항목 선택/해제 토글
  setIsOpen: (isOpen: boolean) => void; // 드롭다운 상태 설정
  setSearchText: (text: string) => void; // 검색어 설정
  reset: () => void; // 상태 초기화
};

export const useSelectStore = create<SelectState>()((set, get) => ({
  // 초기 상태
  items: [ALL_ITEM], // 초기에는 'All'만 존재
  selectedItems: [ALL_ITEM], // 기본값으로 'All' 항목 선택
  isOpen: false, // 초기에는 드롭다운 닫힘
  searchText: '', // 초기 검색어는 빈 문자열

  // 전체 항목 목록 설정
  setItems: (items: string[]) => {
    // 'All'이 없으면 추가
    if (!items.includes(ALL_ITEM)) {
      set({ items: [ALL_ITEM, ...items] });
    } else {
      set({ items });
    }
  },

  // 항목 토글 (선택/해제)
  toggleItem: (item: string) => {
    // All 항목 선택 시 다른 모든 항목 해제
    if (item === ALL_ITEM) {
      set({ selectedItems: [ALL_ITEM] });
      return;
    }

    // 현재 상태 확인
    const { selectedItems, items } = get();

    // 이미 선택된 항목이면 제거
    if (selectedItems.includes(item)) {
      const filtered = selectedItems.filter((i) => i !== item);

      // 모든 항목이 해제되면 All 선택
      if (filtered.length === 0) {
        set({ selectedItems: [ALL_ITEM] });
      } else {
        // All은 제거하고 나머지만 유지
        set({
          selectedItems: filtered.filter((i) => i !== ALL_ITEM),
        });
      }
    }
    // 선택되지 않은 항목이면 추가
    else {
      // All이 선택되어 있으면 All 제거하고 새 항목만 추가
      if (selectedItems.includes(ALL_ITEM)) {
        set({ selectedItems: [item] });
      } else {
        // 기존 항목에 새 항목 추가
        const newSelectedItems = [...selectedItems, item];

        // 실제 선택 가능한 항목 개수 계산 (All 제외)
        const selectableItemCount = items.length - 1;

        // 모든 항목이 선택되었는지 확인
        if (newSelectedItems.length === selectableItemCount) {
          set({ selectedItems: [ALL_ITEM] });
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

  // 상태 초기화
  reset: () =>
    set({
      selectedItems: [ALL_ITEM],
      isOpen: false,
      searchText: '',
    }),
}));

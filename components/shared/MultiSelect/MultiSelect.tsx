/**
 * components/shared/MultiSelect/MultiSelect.tsx
 *
 * 멀티셀렉트 컴포넌트의 루트 컴포넌트
 *
 * 이 컴포넌트는 Compound Component 패턴을 사용하여 구현되었으며,
 * 멀티셀렉트 UI의 컨테이너 역할을 합니다.
 *
 * 관련 컴포넌트:
 * - MultiSelectTrigger: 드롭다운을 열고 닫는 버튼
 * - MultiSelectContent: 드롭다운 내용을 감싸는 컨테이너
 * - MultiSelectInput: 검색 입력 필드
 * - MultiSelectItem: 선택 가능한 각 항목
 */
'use client';

import { ReactNode } from 'react';

type MultiSelectProps = {
  children: ReactNode;
};

export function MultiSelect({ children }: MultiSelectProps) {
  return <div className="relative">{children}</div>;
}

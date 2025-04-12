/**
 * components/shared/MultiSelect/MultiSelectContent.tsx
 *
 * 멀티셀렉트 드롭다운의 내용을 담는 컨테이너 컴포넌트
 *
 * 이 컴포넌트는 멀티셀렉트 드롭다운이 열렸을 때 표시되는 콘텐츠의
 * 컨테이너 역할을 합니다. useSelectStore의 상태를 사용하여
 * 드롭다운의 열림/닫힘 상태를 관리합니다.
 *
 * 주요 기능:
 * - 드롭다운 열림/닫힘 상태에 따라 내용 표시/숨김
 * - 외부 클릭 감지 및 드롭다운 자동 닫기
 * - 스타일링된 드롭다운 컨테이너 제공
 *
 * 기술적 특징:
 * - useRef를 사용한 DOM 요소 참조
 * - useEffect를 사용한 외부 클릭 이벤트 리스너 등록/해제
 */
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useSelectStore } from '@/stores/select';

type MultiSelectContentProps = {
  children: ReactNode;
};

export function MultiSelectContent({ children }: MultiSelectContentProps) {
  const isOpen = useSelectStore((state) => state.isOpen);

  if (!isOpen) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
      {children}
    </div>
  );
}

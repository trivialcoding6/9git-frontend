/**
 * utils/date.ts
 *
 * 날짜 관련 유틸리티 함수들을 제공하는 파일
 *
 * 이 파일은 캘린더 구현과 날짜 계산에 필요한
 * 순수 함수들을 제공합니다. 캘린더 UI와 연동되어
 * 날짜 조작과 계산을 담당합니다.
 */

/**
 * 특정 연도와 월의 일수를 반환하는 함수
 *
 * @param year - 연도 (예: 2025)
 * @param month - 월 (1-12)
 * @returns 해당 월의 총 일수
 *
 * 참고: 자바스크립트 Date에서 month 파라미터에 0을 전달하면
 * 이전 달의 마지막 날을 반환하는 특성을 활용합니다.
 */
export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

/**
 * 특정 연도와 월의 1일이 시작하는 요일을 반환하는 함수
 *
 * @param year - 연도 (예: 2025)
 * @param month - 월 (1-12)
 * @returns 해당 월의 1일이 시작하는 요일 (0: 일요일, 1: 월요일, ...)
 *
 * 캘린더 그리드에서 첫 주의 빈 셀을 계산하는 데 사용됩니다.
 */
export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
};

// JavaScript Date 객체를 YYYY-MM-DD 형식으로 변환하는 간단한 방법
export const formatDateToYYYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};

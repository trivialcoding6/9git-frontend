export type Memo = {
  id: string; // UUID
  categoryId: string;
  title: string;
  content: string;
  startDate: string; // ISO 날짜 문자열
  endDate: string;
};

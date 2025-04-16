import { Memo } from '@/types/memo';

export const fetchMemos = async (
  userId: number,
  categoryId: number,
  year: number,
  month: number
): Promise<Memo[]> => {
  const res = await fetch(
    `http://localhost:8000/api/v1/users/${userId}/categories/${categoryId}/${year}/${month}/memos/`
  );
  if (!res.ok) throw new Error('메모 목록 불러오기 실패');
  return res.json();
};

export const createMemo = async (
  memo: Omit<Memo, 'id'>,
  userId: number,
  categoryId: number
): Promise<Memo> => {
  const res = await fetch(
    `http://localhost:8000/api/v1/users/${userId}/categories/${categoryId}/memos/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memo),
    }
  );
  if (!res.ok) throw new Error('메모 추가 실패');
  return res.json();
};

export const updateMemo = async (
  memoId: number,
  userId: number,
  categoryId: number,
  updated: Partial<Memo>
): Promise<Memo> => {
  const res = await fetch(
    `http://localhost:8000/api/v1/users/${userId}/categories/${categoryId}/memos/${memoId}/`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }
  );
  if (!res.ok) throw new Error('메모 수정 실패');
  return res.json();
};

export const deleteMemo = async (
  memoId: number,
  userId: number,
  categoryId: number
): Promise<void> => {
  const res = await fetch(
    `http://localhost:8000/api/v1/users/${userId}/categories/${categoryId}/memos/${memoId}/`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('메모 삭제 실패');
};

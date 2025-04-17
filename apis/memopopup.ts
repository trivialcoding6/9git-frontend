import { Memo } from '@/types/memo';

export const fetchMemos = async (
  userId: number,
  categoryId: number,
  year: number,
  month: number
): Promise<Memo[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/${year}/${month}/memos/`
  );
  if (!res.ok) throw new Error('메모 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const createMemo = async (memo: Omit<Memo, 'id'>, userId: number): Promise<Memo> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/memos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memo),
  });

  if (!response.ok) {
    throw new Error('메모를 추가하는데 실패했습니다.');
  }

  const data = await response.json();
  return data.data;
};

export const updateMemo = async (
  id: number,
  userId: number,
  updated: Partial<Memo>
): Promise<Memo> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/memos/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    }
  );

  if (!response.ok) {
    throw new Error('메모를 수정하는데 실패했습니다.');
  }

  const data = await response.json();
  return data.data;
};

export const deleteMemo = async (id: number, userId: number): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/memos/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('메모를 삭제하는데 실패했습니다.');
  }
};

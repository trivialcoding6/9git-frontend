import { ComevalResponse, Comeval } from '@/types/comeval';

export const fetchAllComevals = async (userId: string): Promise<ComevalResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations`
  );
  if (!res.ok) throw new Error('할 일 전체 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const fetchComeval = async (
  userId: string,
  comprehensiveEvaluationId: string
): Promise<ComevalResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations/${comprehensiveEvaluationId}`
  );
  if (!res.ok) throw new Error('할 일 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const createComeval = async (
  comeval: Omit<Comeval, 'id'>,
  userId: string,
  categoryId: string
): Promise<Comeval> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comeval),
    }
  );
  if (!res.ok) throw new Error('할 일을 추가하는데 실패했습니다.');
  return res.json();
};

export const updateComeval = async (
  comprehensiveEvaluationId: string,
  userId: string,
  updated: Partial<Comeval>
): Promise<Comeval> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations/${comprehensiveEvaluationId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }
  );
  if (!res.ok) throw new Error('할 일을 수정하는데 실패했습니다.');
  return res.json();
};

export const deleteComeval = async (
  comprehensiveEvaluationId: string,
  userId: string
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations/${comprehensiveEvaluationId}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('할 일을 삭제하는데 실패했습니다.');
};

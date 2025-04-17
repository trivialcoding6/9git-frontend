export const fetchAllRecommend = async (userId: string): Promise<ComevalResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/recommend`);
  if (!res.ok) throw new Error('할 일 전체 목록을 불러오는데 실패했습니다.');
  return res.json();
};

export const fetchRecommend = async (
  userId: string,
  comprehensiveEvaluationId: string
): Promise<ComevalResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/comprehensive-evaluations/${comprehensiveEvaluationId}`
  );
  if (!res.ok) throw new Error('할 일 목록을 불러오는데 실패했습니다.');
  return res.json();
};

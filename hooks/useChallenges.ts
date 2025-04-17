import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { fetchAllChallenges } from '@/apis/challenges';
import { Challenge } from '@/types/challenges';

export function useChallenges(userId: string) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadChallenges = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!userId || userId.trim() === '') {
        setError(new Error('사용자 ID가 유효하지 않습니다.'));
        setChallenges([]);
        return;
      }

      const res = await fetchAllChallenges(userId);

      if (res.status_code === 200 && res.data) {
        setChallenges(res.data);
        setError(null);
      } else if (res.status_code === 404) {
        setChallenges([]);
        setError(new Error('챌린지 데이터가 없습니다.'));
      } else {
        setChallenges([]);
        setError(new Error(res.error || '챌린지 데이터를 가져오는데 실패했습니다.'));
      }
    } catch (err) {
      console.error('챌린지 데이터 로딩 중 오류 발생:', err);
      setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && userId.trim() !== '') {
      loadChallenges();
    } else {
      setLoading(false);
      setError(new Error('사용자 ID가 유효하지 않습니다.'));
    }
  }, [userId, loadChallenges]);

  return {
    challenges,
    loading,
    error,
    reload: loadChallenges,
  };
}

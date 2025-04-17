import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import {
  fetchAllComevals,
  fetchComeval,
  createComeval,
  updateComeval,
  deleteComeval,
} from '@/apis/comeval';
import { Comeval } from '@/types/comeval';

export function useComevals(userId: string) {
  const [comevals, setComevals] = useState<Comeval[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // 전체 목록 불러오기
  const loadComevals = useCallback(async () => {
    setLoading(true);
    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        setError(new Error('사용자 ID가 유효하지 않습니다.'));
        setComevals([]);
        return;
      }

      const res = await fetchAllComevals(userId);
      setComevals(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 개별 평가 불러오기
  const getComeval = async (evaluationId: string) => {
    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        throw new Error('사용자 ID가 유효하지 않습니다.');
      }

      const res = await fetchComeval(userId, evaluationId);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // 평가 추가
  const addComeval = async (newComeval: Omit<Comeval, 'id'>) => {
    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        throw new Error('사용자 ID가 유효하지 않습니다.');
      }

      const created = await createComeval(newComeval, userId, newComeval.userId);
      setComevals((prev) => [...prev, created]);
      return created;
    } catch (err) {
      throw err;
    }
  };

  // 평가 수정
  const editComeval = async (evaluationId: string, updatedFields: Partial<Comeval>) => {
    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        throw new Error('사용자 ID가 유효하지 않습니다.');
      }

      const updated = await updateComeval(evaluationId, userId, updatedFields);
      setComevals((prev) => prev.map((c) => (c.id === evaluationId ? { ...c, ...updated } : c)));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  // 평가 삭제
  const removeComeval = async (evaluationId: string) => {
    try {
      // userId가 유효한지 확인
      if (!userId || userId.trim() === '') {
        throw new Error('사용자 ID가 유효하지 않습니다.');
      }

      await deleteComeval(evaluationId, userId);
      setComevals((prev) => prev.filter((c) => c.id !== evaluationId));
    } catch (err) {
      throw err;
    }
  };

  // 처음 로드 시 전체 불러오기
  useEffect(() => {
    if (userId && userId.trim() !== '') {
      loadComevals();
    } else {
      setLoading(false);
      setError(new Error('사용자 ID가 유효하지 않습니다.'));
    }
  }, [userId, loadComevals]);

  return {
    comevals,
    loading,
    error,
    reload: loadComevals,
    getComeval,
    addComeval,
    editComeval,
    removeComeval,
  };
}

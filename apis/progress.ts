// 여긱까지 함수 정의와 입력 부분
export const todayProgressItems = async ({ userId }: { userId: String }) => {
  // 여기는 코드 동작 정의 부분
  try {
    // api 요청 시도

    const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/today-progresses`);

    if (!response.ok) {
      throw new Error('Failed to fetch progress items');
    }

    if (response.status === 200) {
      // 출력 부분
      const items = await response.json();
      return items.data;
    }

    throw new Error('Failed to fetch category items');
  } catch (error) {
    // 6~19 까지 코드 실행하다가 에러 발생하면 여기로 코드가 실행됨
    console.error(error);
    // 예외를 던짐
    throw error;
  }
};

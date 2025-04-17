export const getCategoryItems = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`);

    if (!response.ok) {
      throw new Error('카테고리 목록을 불러오는데 실패했습니다.');
    }

    if (response.status === 200) {
      const items = await response.json();
      return items.data;
    }

    throw new Error('카테고리 목록을 불러오는데 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

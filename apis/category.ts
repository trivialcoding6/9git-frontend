export const getCategoryItems = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/categories`);

    if (!response.ok) {
      throw new Error('Failed to fetch category items');
    }

    if (response.status === 200) {
      const items = await response.json();
      return items.data;
    }

    throw new Error('Failed to fetch category items');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

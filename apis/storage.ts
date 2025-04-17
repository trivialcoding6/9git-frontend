import { Storage, StorageRequest } from '@/types/storage';

export const getStorage = async ({ userId, categoryId }: StorageRequest): Promise<Storage[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/storages`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch storage');
  }

  const responseJson = await response.json();

  if (responseJson.status_code !== 200) {
    throw new Error('Failed to fetch storage');
  }

  return responseJson.data;
};

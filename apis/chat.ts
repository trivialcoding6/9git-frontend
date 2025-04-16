type ChatRequest = {
  userId: string;
  categoryId: string;
  storageId: string;
  chat: {
    role: string;
    content: string;
    createdAt: string;
  };
};

type StorageRequest = {
  userId: string;
  categoryId: string;
  storage: {
    title: string;
    createdAt: string;
  };
};

export const getChats = async (userId: string, categoryId: string, storageId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/storages/${storageId}/chats`
  );
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }

  return responseJson.data;
};

export const addStorage = async ({ userId, categoryId, storage }: StorageRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/storages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: storage.title, created_at: storage.createdAt }),
    }
  );
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to add storage');
  }

  return responseJson.data;
};

export const addChat = async ({ userId, categoryId, storageId, chat }: ChatRequest) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/categories/${categoryId}/storages/${storageId}/chats`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: chat.role,
        content: chat.content,
        created_at: chat.createdAt,
      }),
    }
  );
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to add chat');
  }

  return responseJson.data;
};

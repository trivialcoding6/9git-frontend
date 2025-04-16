export type ProfileResponse = {
  userID: string;
  name: string;
  email: string;
  level: number;
  exp: number;
  characterCount: number;
  completedTodoCount: number;
};

export const getProfileItems = async (userId: string): Promise<ProfileResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Profile items');
    }

    if (response.status === 200) {
      const items = await response.json();
      console.log('items', items, items.data);
      return items.data;
    }

    throw new Error('Failed to fetch Profile items');
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export type ProfileRequest = {
  sex: string;
  age: number;
  job: string;
};

export const updateUserData = async (
  userId: string,
  sex: string,
  age: number,
  job: string
): Promise<ProfileRequest> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sex, age, job }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Profile items');
    }

    if (response.status === 200) {
      const items = await response.json();
      return items.data;
    }

    throw new Error('Failed to send Profile items');
  } catch (error) {
    console.error(error);

    throw error;
  }
};

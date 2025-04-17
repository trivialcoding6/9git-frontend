export type CharacterResponse = {
  characterName: string;
  imageLink: string;
  isCollected: boolean;
  collectedDate: string;
};

export const getCharacterItems = async (userId: string): Promise<Array<CharacterResponse>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/characters/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Profile items');
    }

    if (response.status === 200) {
      const items = await response.json();
      console.log('items', items, items.data);
      return items.data as Array<CharacterResponse>;
    }

    throw new Error('Failed to fetch Profile items');
  } catch (error) {
    console.error(error);

    throw error;
  }
};

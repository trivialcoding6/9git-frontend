import {
  Category,
  CategoryListResponse,
  SingleCategoryResponse,
  DeleteCategoryResponse,
} from '@/types/category';

// 모든 카테고리 가져오기
export const fetchAllCategories = async (): Promise<CategoryListResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return {
        status_code: response.status,
        data: [],
        error: '카테고리 목록을 불러오는데 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      status_code: 200,
      data: data.data || [],
      error: null,
    };
  } catch (error) {
    console.error('카테고리 목록을 불러오는 중 오류가 발생했습니다:', error);
    return {
      status_code: 500,
      data: [],
      error: '카테고리 목록을 불러오는 중 오류가 발생했습니다.',
    };
  }
};

// 단일 카테고리 가져오기
export const fetchCategoryById = async (categoryId: string): Promise<SingleCategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${categoryId}`
    );

    if (!response.ok) {
      return {
        status_code: response.status,
        data: null,
        error: '카테고리를 불러오는데 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      status_code: 200,
      data: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error('카테고리를 불러오는 중 오류가 발생했습니다:', error);
    return {
      status_code: 500,
      data: null,
      error: '카테고리를 불러오는 중 오류가 발생했습니다.',
    };
  }
};

// 카테고리 생성
export const createCategory = async (
  categoryName: string,
  categoryColor: string
): Promise<SingleCategoryResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryName, categoryColor }),
    });

    if (!response.ok) {
      return {
        status_code: response.status,
        data: null,
        error: '카테고리 생성에 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      status_code: 200,
      data: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error('카테고리 생성 중 오류가 발생했습니다:', error);
    return {
      status_code: 500,
      data: null,
      error: '카테고리 생성 중 오류가 발생했습니다.',
    };
  }
};

// 카테고리 수정
export const updateCategory = async (
  categoryId: string,
  categoryName: string,
  categoryColor: string
): Promise<SingleCategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${categoryId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName, categoryColor }),
      }
    );

    if (!response.ok) {
      return {
        status_code: response.status,
        data: null,
        error: '카테고리 수정에 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      status_code: 200,
      data: data.data || null,
      error: null,
    };
  } catch (error) {
    console.error('카테고리 수정 중 오류가 발생했습니다:', error);
    return {
      status_code: 500,
      data: null,
      error: '카테고리 수정 중 오류가 발생했습니다.',
    };
  }
};

// 카테고리 삭제
export const deleteCategory = async (categoryId: string): Promise<DeleteCategoryResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${categoryId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return {
        status_code: response.status,
        data: false,
        error: '카테고리 삭제에 실패했습니다.',
      };
    }

    const data = await response.json();
    return {
      status_code: 200,
      data: true,
      error: null,
    };
  } catch (error) {
    console.error('카테고리 삭제 중 오류가 발생했습니다:', error);
    return {
      status_code: 500,
      data: false,
      error: '카테고리 삭제 중 오류가 발생했습니다.',
    };
  }
};

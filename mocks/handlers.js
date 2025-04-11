import { http, HttpResponse } from 'msw';
import { categoryItemsData } from './data';
const BASE_URL = 'http://localhost:8000/api/v1';

export const handlers = [
  http.get(`${BASE_URL}/todos`, ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const categoryItems = categoryItemsData.filter(
      (item) => item.startDate >= startDate || item.endDate <= endDate
    );

    const response = {
      statusCode: 200,
      data: categoryItems,
      error: null,
    };
    return HttpResponse.json(response);
  }),
];

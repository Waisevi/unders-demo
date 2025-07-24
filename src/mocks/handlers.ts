import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: 1, title: 'Mocked task 1' },
      { id: 2, title: 'Mocked task 2' },
    ]);
  }),
];

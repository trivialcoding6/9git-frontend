import { setupServer } from 'msw/node'; // 'msw/node'로 변경됨
import { handlers } from './handlers';

export const server = setupServer(...handlers);

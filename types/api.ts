export type TResponse<T> = {
  statusCode: number;
  data?: T;
  error?: string;
};

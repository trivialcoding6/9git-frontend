export type TResponse<T> = {
  status_code: number;
  data?: T;
  error?: string;
};

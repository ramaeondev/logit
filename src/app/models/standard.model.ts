export interface StandardResponse<T = any> {
  isSuccess: boolean;
  messages: string[];
  errors: string[];
  data: T;
  status_code: number;
}
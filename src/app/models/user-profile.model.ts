export interface UserProfile {
  access_token: string;
  refresh_token: string;
  user: UserDetails;
}


export interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  user_ulid: string;
  user_id: number;
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse<T = any> {
  isSuccess: boolean;
  messages: string[];
  errors: string[];
  data?: T;
  status_code: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
}
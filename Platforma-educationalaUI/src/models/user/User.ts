export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  errors: string[];
  responseStatus: number;
}

export interface CreateAccountResponse {
  errors: string[];
  responseStatus: number;
}
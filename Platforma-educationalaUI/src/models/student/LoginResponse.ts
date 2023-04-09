export interface LoginResponse {
  token: string;
  username:string;
  errors: string[];
  responseStatus: number;
}

export default interface User {
  userName: string;
}

export interface UsersResponse {
  users: User[];
  errors: string[];
  responseStatus: number;
}

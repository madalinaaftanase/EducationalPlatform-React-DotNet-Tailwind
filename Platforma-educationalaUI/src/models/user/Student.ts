export default interface Student {
  email: string;
}

export interface StudentSigninRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface StudentsResponse {
  users: Student[];
  errors: string[];
  responseStatus: number;
}

export default interface Student {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
  groupName?: string;
  groupId?: string;
}

export interface StudentSigninRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface StudentsResponse {
  students: Student[];
  errors: string[];
  responseStatus: number;
}

export interface StudentResponse {
  student: Student;
  errors: string[];
  responseStatus: number;
}

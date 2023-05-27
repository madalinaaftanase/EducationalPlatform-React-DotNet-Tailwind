export default interface Teacher {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
}


export interface TeachersResponse {
 teachers: Teacher[];
 errors: string[];
 responseStatus: number;
}
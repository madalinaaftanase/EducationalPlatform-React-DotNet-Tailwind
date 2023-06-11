import Student from "../student/Student";

export default interface Project {
  id: string;
  name: string;
  xml: string;
  comment?: string;
  grade?: number;
  students?: Student[]
}

export interface ProjectSave {
  id?: string;
  name?: string;
  xml?: string;
  isTeacher?: boolean;
  comment?: string;
  grade?: number;
}

export interface DeleteProject {
  message: string;
  errors: string[];
  responseStatus: number;
}

export interface CreateProjectResponse {
  id: string;
  errors: string[];
  responseStatus: number;
}

export interface ProjectResponse {
  project: Project;
  errors: string[];
  responseStatus: number;
}

export interface ProjectsResponse {
  projects: Project[];
  errors: string[];
  responseStatus: number;
}

export default interface Project {
  id: string;
  name: string;
  xml: string;
}

export interface ProjectSave {
  id?: string;
  name: string;
  xml?: string;
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

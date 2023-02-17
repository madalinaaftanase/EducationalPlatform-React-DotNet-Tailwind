export default interface Project {
  id: string;
  name: string;
  xml: string;
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

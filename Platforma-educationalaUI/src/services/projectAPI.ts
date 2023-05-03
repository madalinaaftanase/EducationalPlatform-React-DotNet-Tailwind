import axios from "axios";
import Project, {
  CreateProjectResponse,
  DeleteProject,
  ProjectResponse,
  ProjectSave,
  ProjectsResponse,
} from "../models/project/Project";
import { getCookie } from "../utilities/cookieFunctions";

export const getAll = async (url: string, isTeacher: boolean) => {
  var token = getCookie("token");
  try {
    const response = await axios.get<ProjectsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
      params: { isTeacher }
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as ProjectsResponse;
  }
};

export const getById = async (url: string) => {
  try {
    const response = await axios.get<ProjectResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as ProjectResponse;
  }
};

export const saveProject = async (url: string, project: ProjectSave, isTeacher: boolean, ownerId?: string) => {
  try {
    const response = await axios.post<ProjectResponse>(url, project, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
      params: { isTeacher, ownerId }
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as ProjectResponse;
  }
};

const payload = {
  reason: "Account no longer needed",
  notify: true,
};

export const deleteByIdProject = async (url: string, isTeacher: boolean) => {
  try {
    const response = await axios.delete<DeleteProject>(url, {
      data: payload,
      headers: { Authorization: `Bearer ${getCookie("token")}` },
      params: { isTeacher }
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as DeleteProject;
  }
};

export const createProject = async (url: string, data: ProjectSave, isTeacher: boolean) => {
  data.isTeacher = isTeacher;

  try {
    const response = await axios.post<CreateProjectResponse>(url, data, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as CreateProjectResponse;
  }
};

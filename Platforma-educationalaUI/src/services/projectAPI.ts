import axios from "axios";
import { ProjectResponse, ProjectsResponse } from "../models/project/Project";
import { getCookie } from "../utilities/cookieFunctions";

export const getAll = async (url: string) => {
  var token = getCookie("token");
  try {
    const response = await axios.get<ProjectsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as ProjectsResponse;
  }
};

export const getById = async (url: string) => {
  try {
    const response = await axios.get<ProjectResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as ProjectResponse;
  }
};

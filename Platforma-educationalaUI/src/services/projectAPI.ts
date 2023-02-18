import axios from "axios";
import { ProjectResponse, ProjectsResponse } from "../models/project/Project";
import { getCookie } from "../utilities/cookieFunctions";

export const getAll = async (url: string) => {
  var token = getCookie("token");

  const response = await axios
    .get<ProjectsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      return err.response.data;
    });
  return response.data;
};

export const getById = async (url: string) => {
  const response = await axios
    .get<ProjectResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    })
    .catch((err) => {
      return err.response.data;
    });
  return response.data;
};

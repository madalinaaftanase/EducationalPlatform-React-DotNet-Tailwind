import axios from "axios";
import { ProjectsResponse } from "../models/project/Project";
import { getCookie } from "../utilities/cookieFunctions";

export const getAll = async (url: string) => {
  //   const response = await axios
  //   .get<ProjectsResponse>(url, {
  //     headers: { Authorization: `Bearer ${getCookie("token")}` },
  //   })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  //     return response.data;
  return proiecte;
};

export const getById = async (url: string) => {
  //   const response = await axios
  //   .get<Project>(url, {
  //     headers: { Authorization: `Bearer ${getCookie("token")}` },
  //   })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  //     return response.data;
  return proiecte.projects[0];
};

const proiecte: ProjectsResponse = {
  projects: [
    { id: "1", name: "proiect1", xml: "xml" },
    { id: "2", name: "proiect2", xml: "xml" },
  ],
  errors: [],
  responseStatus: 200,
};

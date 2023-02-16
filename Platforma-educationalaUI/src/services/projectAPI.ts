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
  //   const response = await axios
  //   .get<Project>(url, {
  //     headers: { Authorization: `Bearer ${getCookie("token")}` },
  //   })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  //     return response.data;
  return proiect;
};

const proiecte: ProjectsResponse = {
  projects: [
    { id: "1", name: "proiect1", xml: "xml" },
    { id: "2", name: "proiect2", xml: "xml" },
  ],
  errors: [],
  responseStatus: 200,
};

const proiect: ProjectResponse = {
  project: {
    id: "1",
    name: "proiect1",
    xml: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="document" id="*[p(l)IBYpSM_7LvsSbP" x="70" y="70"><statement name="Content"><block type="div" id="Vg[u(ms=H/-lkj(LJUgf"></block></statement></block></xml>',
  },
  errors: [],
  responseStatus: 200,
};

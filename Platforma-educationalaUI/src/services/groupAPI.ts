import axios from "axios";
import { getCookie } from "../utilities/cookieFunctions";
import { GroupsResponse } from "../models/group/Group";
import { BasicResponse } from "../models/student/Student";

export const getAll = async (url: string, isTeacher: boolean) => {

  const token = getCookie("token");
  try {
    const response = await axios.get<GroupsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
      params: { isTeacher }
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as GroupsResponse;
  }
};


export const addStudentToGroup = async (url: string, studentEmail: string) => {

  const token = getCookie("token");
  try {
    const response = await axios.post<BasicResponse>(url,{studentEmail}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
  }
};

export const deleteStudentFromGroup = async (url: string) => {
  try {
    const response = await axios.delete<BasicResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
  }
}

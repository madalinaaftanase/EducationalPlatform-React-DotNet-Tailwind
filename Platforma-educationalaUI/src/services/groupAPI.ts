import axios from "axios";
import { getCookie } from "../utilities/cookieFunctions";
import Group, { GroupResponse, GroupStudentsResponse, GroupsResponse } from "../models/group/Group";
import Student, { BasicResponse, StudentResponse } from "../models/student/Student";
import config from "../config";

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
    const response = await axios.post<BasicResponse>(url, { studentEmail }, {
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

export const addOrUpdateGroup = async (url: string, group: Partial<Group>) => {
  try {
    const response = await axios.put<GroupResponse>(url, group, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as GroupResponse;
  }
};

export const getById = async (groupId: string) => {
  const url = `${config.baseApiUrl}/Groups/${groupId}`;
  try {
    const response = await axios.get<GroupResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as GroupResponse;
  }
}

export const getStudentsFromGroup = async (url: string) => {
  try {
    const response = await axios.get<GroupStudentsResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as GroupStudentsResponse;
  }
}

export const deleteGroup = async (url: string) => {
  try {
    const response = await axios.delete<BasicResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
  }
}

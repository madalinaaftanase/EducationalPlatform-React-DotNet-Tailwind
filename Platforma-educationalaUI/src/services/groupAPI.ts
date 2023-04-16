import axios from "axios";
import { getCookie } from "../utilities/cookieFunctions";
import { GroupsResponse } from "../models/group/Group";

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

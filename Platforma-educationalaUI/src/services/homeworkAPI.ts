import axios from "axios";
import { getCookie } from "../utilities/cookieFunctions";
import { BasicResponse } from "../models/student/Student";
import config from "../config";
import Homework, { HomeworkResponse } from "../models/homework/Homework";

const url = `${config.baseApiUrl}/Homework`;

export const getHomeworkByUserId = async () => {
  const token = getCookie("token");
  try {
    const response = await axios.get<HomeworkResponse>(`${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as HomeworkResponse;
  }
};

export const addHomework = async (name: string, groupId: string) => {
  const token = getCookie("token");
  try {
    const response = await axios.post<BasicResponse>(`${url}?groupId=${groupId}`, { name }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
  }
};

export const updateHomework = async (id: string, homework: Partial<Homework>) => {
  const token = getCookie("token");
  try {
    const response = await axios.put<BasicResponse>(`${url}/${id}`, homework, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
  }
};
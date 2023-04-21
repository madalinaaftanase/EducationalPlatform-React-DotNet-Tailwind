import axios from "axios";
import Student, { BasicResponse, StudentResponse, StudentsResponse } from "../models/student/Student";
import { getCookie } from "../utilities/cookieFunctions";

const GetAllStudents = async (url: string) => {
    try {
        const response = await axios
            .get<StudentsResponse>(url, {
                headers: { Authorization: `Bearer ${getCookie("token")}` },
            })
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data as StudentsResponse;
    }
};

const saveStudent = async (url: string, student: Partial<Student>) => {
    const token = getCookie("token");
    try {
        const response = await axios.patch<StudentResponse>(url, student, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data as StudentResponse;
    }
};

const saveStudentGroup = async (url: string, newIdGroup: string) => {
    try {
        const response = await axios.patch<StudentResponse>(url, { newIdGroup }, {
            headers: { Authorization: `Bearer ${getCookie("token")}` },
        });

        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data as StudentResponse;
    }
};

const deleteStudentFromGroup = async (url: string) => {
    try {
        const response = await axios.delete<BasicResponse>(url, {
            headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data as BasicResponse;
    }
}

export { GetAllStudents, saveStudent, saveStudentGroup, deleteStudentFromGroup }
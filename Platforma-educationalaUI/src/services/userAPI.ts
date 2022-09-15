import {
  StudentSigninRequest,
  StudentsResponse,
} from "../models/student/Student";
import axios from "axios";
import { LoginRequest } from "../models/user/User";
import { LoginResponse } from "../models/student/LoginResponse";

const GetAll = (url: string) =>
  axios.get<StudentsResponse>(url).then((res) => res.data);

const CreateAccount = (url: string, accountData: StudentSigninRequest) =>
  axios.post(url, accountData).then((res) => {
    if (res.status === 200 || res.status === 201) {
      window.location.href = "/login";
    }
  });

const LoginAccount = (url: string, loginData: LoginRequest) =>
  axios.post<LoginResponse>(url, loginData).then((res) => {
    if (res.status === 200) {
      var token = res.data.token;
    }
  });

export { GetAll, CreateAccount, LoginAccount };

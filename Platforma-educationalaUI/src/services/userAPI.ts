import {
  StudentSigninRequest,
  StudentsResponse,
} from "../models/student/Student";
import axios from "axios";
import { LoginRequest } from "../models/user/User";
import { LoginResponse } from "../models/student/LoginResponse";

const GetAll = (url: string) =>
  axios
    .get<StudentsResponse>(url, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    })
    .then((res) => res.data);

const CreateAccount = (url: string, accountData: StudentSigninRequest) =>
  axios.post(url, accountData).then((res) => {
    if (res.status === 200 || res.status === 201) {
      window.location.href = "/login";
    }
  });

const LoginAccount = (url: string, loginData: LoginRequest) =>
  axios.post<LoginResponse>(url, loginData).then((res) => {
    console.log("set cookie", res.status);
    if (res.data.responseStatus === 200) {
      var token = res.data.token;
      document.cookie = `token=${token}; path=/;`;
      window.location.href = "/";
    }
  });

export { GetAll, CreateAccount, LoginAccount };

function getCookie(name: string) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
}

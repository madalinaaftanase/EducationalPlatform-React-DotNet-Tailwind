import { StudentSigninRequest, StudentsResponse } from "../models/student/Student";
import axios from "axios";
import { LoginRequest, LoginResponse } from "../models/user/User";
import { getCookie } from "../utilities/cookieFunctions";

const GetAll = (url: string) => {
  var token = getCookie("token");
  axios
    .get<StudentsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

const CreateAccount = (url: string, accountData: StudentSigninRequest) =>
  axios.post(url, accountData).then((res) => {
    if (res.status === 200 || res.status === 201) {
      window.location.href = "/Login";
    }
  });

const LoginAccount = (url: string, loginData: LoginRequest) =>
  axios
    .post<LoginResponse>(url, loginData)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });

export { GetAll, CreateAccount, LoginAccount };

import { StudentSigninRequest, StudentsResponse } from "../models/student/Student";
import axios from "axios";
import { CreateAccountResponse, LoginRequest, LoginResponse } from "../models/user/User";
import { getCookie } from "../utilities/cookieFunctions";

const GetAll = (url: string) => {
  var token = getCookie("token");
  axios
    .get<StudentsResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

const CreateAccount = async (url: string, accountData: StudentSigninRequest) => {
  try {
    const response = await axios.post<CreateAccountResponse>(url, accountData, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data as CreateAccountResponse;
  }
}


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

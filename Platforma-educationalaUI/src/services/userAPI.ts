import { StudentSigninRequest, StudentsResponse } from "../models/user/Student";
import axios from "axios";

const GetAll = (url: string) =>
  axios.get<StudentsResponse>(url).then((res) => res.data);

const CreateAccount = (url: string, accountData: StudentSigninRequest) =>
  axios.post(url, accountData).then((res) => {
    if (res.status === 200 || res.status === 201) {
      window.location.href = "/login";
    }
  });

export { GetAll, CreateAccount };

import { UsersResponse } from "../models/user/User";
import axios from "axios";

const GetAll = (url: string) =>
  axios.get<UsersResponse>(url).then((res) => res.data);

export { GetAll };

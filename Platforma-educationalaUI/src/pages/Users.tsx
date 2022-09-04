import useSWR from "swr";
import config from "../config";
import { GetAll } from "../services/userAPI";

function Users() {
  const { data } = useSWR(`${config.baseApiUrl}/users`, GetAll);
  return <>{JSON.stringify(data?.users)}</>;
}

export default Users;

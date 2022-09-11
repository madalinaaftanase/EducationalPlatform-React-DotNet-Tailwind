import useSWR from "swr";
import config from "../config";
import { GetAll } from "../services/userAPI";

function Students() {
  const { data } = useSWR(`${config.baseApiUrl}/students`, GetAll);

  return <>{JSON.stringify(data)}</>;
}

export default Students;

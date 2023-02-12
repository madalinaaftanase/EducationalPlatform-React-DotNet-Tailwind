import useSWR from "swr";
import config from "../config";
import { GetAll } from "../services/userAPI";

function Students() {
  const { data } = useSWR(`${config.baseApiUrl}/Students`, GetAll);

  return <>{JSON.stringify(data)}</>;
}

export default Students;

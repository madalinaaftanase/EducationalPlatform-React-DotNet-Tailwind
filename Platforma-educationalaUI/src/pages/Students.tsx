import useSWR from "swr";
import config from "../config";
import { GetAll } from "../services/userAPI";
import StudentsTable from "../components/students/components/StudentsTable";

function Students() {
  return <StudentsTable />;
}

export default Students;

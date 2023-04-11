import { useEffect, useState, useContext } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/groupAPI";
import Group from "../models/group/Group";
import { UserContext } from "../hooks/UserContext";

function Groups() {
  const url = `${config.baseApiUrl}/Groups`;
  const { isTeacher } = useContext(UserContext);
  const navigator = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    const response = await getAll(url, isTeacher);
    if (response?.responseStatus == 200) {
      setGroups(response?.groups);
    } else {
      navigator("/Error");
    }
  };
  return (
    <>
      {groups.map((group) => {
        return <div>{group.name}</div>;
      })}
    </>
  );
}

export default Groups;

import { useEffect, useState, useContext } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/groupAPI";
import Group from "../models/group/Group";
import { UserContext } from "../hooks/UserContext";
import AddButton from "../components/project/components/AddButton";
import GroupCard from "../components/group/components/GroupCard";

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
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between">
        <h1>Grupele tale:</h1>
        <div>+</div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {groups.map((value) => {
          return <GroupCard group={value} key={value.id} />;
        })}
      </div>
    </div>
  );
}

export default Groups;

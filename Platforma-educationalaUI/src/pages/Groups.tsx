import { useEffect, useState, useContext } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/groupAPI";
import Group from "../models/group/Group";
import { UserContext } from "../hooks/UserContext";
import AddButton from "../components/project/components/AddButton";
import GroupCard from "../components/group/components/GroupCard";
import AddGroupModal from "../components/group/components/AddGroupModal";

function Groups() {
  const url = `${config.baseApiUrl}/Groups`;
  const { isTeacher } = useContext(UserContext);
  const navigator = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isAddGroupModalOpen, setAddGroupModalOpen] = useState(false);

  useEffect(() => {
    init();
  }, [isTeacher]);

  let init = async () => {
    const response = await getAll(url, isTeacher);
    if (response?.responseStatus == 200) {
      setGroups(response?.groups);
    } else {
      navigator("/Error");
    }
  };

  const handleAddGroup = () => {
    setAddGroupModalOpen(true);
  };

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between">
        <h1>Grupele tale:</h1>
        <button
          className="bg-mintBlue hover:bg-mint text-yellow font-bold py-2 px-4 border-b-4 border-mint hover:border-mintBlue rounded"
          onClick={handleAddGroup}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {groups.map((value) => {
          return <GroupCard group={value} key={value.id} init={init} />;
        })}
      </div>
      <AddGroupModal isOpen={isAddGroupModalOpen} setIsOpen={setAddGroupModalOpen} init={init}/>
    </div>
  );
}

export default Groups;

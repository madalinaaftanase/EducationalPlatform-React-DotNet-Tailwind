import { useNavigate } from "react-router-dom";
import Group from "../../../models/group/Group";
import config from "../../../config";
import { deleteGroup } from "../../../services/groupAPI";
import { UserContext } from "../../../hooks/UserContext";
import { useContext } from "react";

interface CardInterface {
  group: Group;
  init: Function;
}
function GroupCard({ group, init }: CardInterface) {
  const navigator = useNavigate();
  const { isTeacher } = useContext(UserContext);

  const handleDeleteCard = async () => {
    const url = `${config.baseApiUrl}/Groups/${group.id}`;
    const response = await deleteGroup(url);
    if (response?.responseStatus == 200) {
      init();
    }
  };

  const handleOpenCard = () =>{
      navigator(`/Grupe/${group.id}`);
  }

  return (
    <div className="block max-w-sm p-6 bg-[#C0DEFF] rounded-lg shadow hover:bg-[#F6E3C5] min-w-[30%] flex flex-row justify-between">
      <div>
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer"
          onClick={handleOpenCard}
        >
          {group.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">desciption</p>
      </div>
      {isTeacher && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 rounded-lg basis-[8%] cursor-pointer hover:text-red-700"
          onClick={handleDeleteCard}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      )}
    </div>
  );
}

export default GroupCard;

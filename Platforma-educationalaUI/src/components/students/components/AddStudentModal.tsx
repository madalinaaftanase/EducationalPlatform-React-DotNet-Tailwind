import CancelButton from "../../common/CancelButton";
import GenericModal from "../../common/GenericModal";
import { useState } from "react";
import GroupSubcomponent from "./GroupSubcomponent";
import Group from "../../../models/group/Group";
import config from "../../../config";
import { addStudentToGroup } from "../../../services/groupAPI";

function AddStudentModal({
  isOpen,
  setIsOpen,
  fetchData,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  fetchData: Function;
}) {
  const [email, setEmail] = useState<string>();
  const [isDisable, setIsDisable] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsDisable(email.length === 0);
  };

  const handleSubmitAddButton = async () => {
    const url = `${config.baseApiUrl}/Groups/${selectedGroupId}/Students`;
    if (email) {
      console.log(email);
      const response = await addStudentToGroup(url, email);
      setIsOpen(false);
      if (response?.responseStatus == 200) {
        fetchData();
      }
    }
  };

  return (
    <GenericModal showModal={isOpen}>
      <h5>Introdu adresa de email</h5>
      <div className="flex flex-col ">
        <div className="flex items-center">
          <input onChange={handleInput} placeholder="Email student" className="p-1" />
          <GroupSubcomponent
            groups={groups}
            setGroups={setGroups}
            setSelectedGroupId={setSelectedGroupId}
          />
        </div>
        <div className="flex gap-x-3 ">
          <button
            type="button"
            className="bg-mintBlue hover:bg-mint text-yellow px-2 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded disabled:opacity-75"
            onClick={handleSubmitAddButton}
            disabled={isDisable}
          >
            Adauga
          </button>
          <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
        </div>
      </div>
    </GenericModal>
  );
}

export default AddStudentModal;

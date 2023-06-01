import CancelButton from "../../common/CancelButton";
import GenericModal from "../../common/GenericModal";
import { useState, useEffect } from "react";
import GroupSubcomponent from "./GroupSubcomponent";
import Group from "../../../models/group/Group";
import config from "../../../config";
import { addStudentToGroup } from "../../../services/groupAPI";
import Button from "../../navbar/components/Button";

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
  };

  useEffect(() => {
    if (email && selectedGroupId) {
      setIsDisable(false);
    }
  }, [selectedGroupId, email]);

  const handleSubmitAddButton = async () => {
    const url = `${config.baseApiUrl}/Groups/${selectedGroupId}/Students`;
    if (email) {
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
          <Button variant="general" onClick={handleSubmitAddButton} disabled={isDisable}>
            <span>Adauga</span>
          </Button>
          <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
        </div>
      </div>
    </GenericModal>
  );
}

export default AddStudentModal;

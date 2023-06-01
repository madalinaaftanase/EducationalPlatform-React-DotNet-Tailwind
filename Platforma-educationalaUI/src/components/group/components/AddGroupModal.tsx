import GenericModal from "../../common/GenericModal";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import config from "../../../config";
import Group from "../../../models/group/Group";
import { addOrUpdateGroup } from "../../../services/groupAPI";
import Button from "../../navbar/components/Button";

function AddGroupModal({
  isOpen,
  setIsOpen,
  init,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  init: Function;
}) {
  const [groupName, setGroupName] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const handleConfirm = async () => {
    const url = `${config.baseApiUrl}/Groups`;
    const group: Partial<Group> = {
      name: groupName,
    };
    const response = await addOrUpdateGroup(url, group);
    if (response?.responseStatus == 200) {
      setIsOpen(false);
      init();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setGroupName(name);
    setIsDisable(name.length === 0);
  };

  return (
    <GenericModal showModal={isOpen}>
      <div className="flex flex-col justify-start items-start py-4">
        <h5>Introdu numele grupei:</h5>
        <input onChange={handleInput} placeholder="grupa z" className="p-1" />
      </div>
      <div className="flex gap-4">
        <Button variant="general" onClick={handleConfirm} disabled={isDisable}>
          <span>Adauga</span>
        </Button>
        <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default AddGroupModal;

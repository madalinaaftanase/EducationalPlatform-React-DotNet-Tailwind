import { ChangeEventHandler, useState } from "react";
import config from "../../../config";
import { saveStudentGroup } from "../../../services/studentAPI";
import Student from "../../../models/student/Student";
import Group from "../../../models/group/Group";
import { useNavigate } from "react-router";
import GenericModal from "../../common/GenericModal";
import CancelButton from "../../common/CancelButton";
import GroupSubcomponent from "./GroupSubcomponent";

function GroupModal({
  isOpen,
  setIsOpen,
  studentDetails,
  fetchData,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  studentDetails?: Student;
  fetchData: Function;
}) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const navigator = useNavigate();

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    if (studentDetails?.groupId && selectedGroupId) {
      const idStudent = studentDetails.id;
      const url = `${config.baseApiUrl}/Students/${idStudent}/Groups/${studentDetails?.groupId}`;
      var response = await saveStudentGroup(url, selectedGroupId);
      if (response?.responseStatus == 200) {
        setIsOpen(!isOpen);
        fetchData();
      }
    } else {
      setIsOpen(!isOpen);
      navigator("/Error");
    }
  };

  return (
    <GenericModal showModal={isOpen}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">Editeaza grupa</h3>
      <GroupSubcomponent
        groups={groups}
        setGroups={setGroups}
        setSelectedGroupId={setSelectedGroupId}
      />
      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          data-modal-hide="defaultModal"
          type="button"
          className="bg-mintBlue hover:bg-mint text-yellow px-2 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded"
          onClick={handleSubmit}
        >
          Salveaza
        </button>
        <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default GroupModal;

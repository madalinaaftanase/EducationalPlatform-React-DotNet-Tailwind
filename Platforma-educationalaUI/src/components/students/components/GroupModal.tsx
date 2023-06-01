import { useState } from "react";
import config from "../../../config";
import { saveStudentGroup } from "../../../services/studentAPI";
import Student from "../../../models/student/Student";
import Group from "../../../models/group/Group";
import { useNavigate } from "react-router";
import GenericModal from "../../common/GenericModal";
import CancelButton from "../../common/CancelButton";
import GroupSubcomponent from "./GroupSubcomponent";
import Button from "../../navbar/components/Button";

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
      <h3 className="text-gray-900 dark:text-white">Editeaza grupa</h3>
      <GroupSubcomponent
        groups={groups}
        setGroups={setGroups}
        setSelectedGroupId={setSelectedGroupId}
      />
      <div className="flex space-x-2 rounded-b">
        <Button data-modal-hide="defaultModal" variant="general" onClick={handleSubmit}>
          <span> Salveaza </span>
        </Button>
        <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default GroupModal;

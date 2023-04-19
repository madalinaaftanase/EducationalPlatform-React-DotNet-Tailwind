import { ChangeEventHandler, useState, useEffect } from "react";
import config from "../../../config";
import { saveStudentGroup } from "../../../services/studentAPI";
import Student from "../../../models/student/Student";
import Group from "../../../models/group/Group";
import { useNavigate } from "react-router";
import { getAll } from "../../../services/groupAPI";
import GenericModal from "../../common/GenericModal";

function GroupModal({
  isOpen,
  setIsOpen,
  studentDetails,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  studentDetails?: Student;
}) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const url = `${config.baseApiUrl}/Groups`;
  const navigator = useNavigate();

  useEffect(() => {
    onInit();
  }, []);

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  const onInit = async () => {
    const response = await getAll(url, true);
    if (response?.responseStatus == 200) {
      setGroups(response.groups);
    } else {
      navigator("/Error");
    }
  };

  const handleChangeGroup: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newIdGroup = e.target.value;
    if (newIdGroup.length < 1) {
    }
    setSelectedGroupId(newIdGroup);
  };

  const handleSubmit = async () => {
    if (studentDetails?.groupId && selectedGroupId) {
      const idStudent = studentDetails.id;
      const url = `${config.baseApiUrl}/Students/${idStudent}/Groups/${studentDetails?.groupId}`;
      var response = await saveStudentGroup(url, selectedGroupId);
      if (response?.responseStatus == 200) {
        setIsOpen(!isOpen);
        window.location.reload();
        //to do sa arat ca s-a salvat
      }
    } else {
      setIsOpen(!isOpen);
      navigator("/Error");
    }
  };

  return (
    <GenericModal showModal={isOpen}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">Editeaza grupa</h3>
      <div className="p-6 space-y-6">
        <select onChange={handleChangeGroup}>
          <option value="default" disabled>
            Selecteaza o grupa
          </option>
          {groups.map((group) => {
            return (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          data-modal-hide="defaultModal"
          type="button"
          className="bg-mintBlue hover:bg-mint text-yellow px-2 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded"
          onClick={handleSubmit}
        >
          Salveaza
        </button>
        <button
          type="button"
          data-modal-hide="defaultModal"
          className="bg-red-400 hover:bg-red-500 px-2 py-1 font-bold border-b-4 border-red-800 hover:border-red-700 rounded"
          onClick={handleCloseModal}
        >
          Anuleaza
        </button>
      </div>
    </GenericModal>
  );
}

export default GroupModal;

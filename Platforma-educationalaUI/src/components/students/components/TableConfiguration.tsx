import { MouseEventHandler, useState, useEffect, ChangeEventHandler } from "react";
import Student from "../../../models/student/Student";
import Group from "../../../models/group/Group";
import { getAll } from "../../../services/groupAPI";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { saveStudentGroup } from "../../../services/studentAPI";

export const getColumns = (handleStudentGroup: (student: Student) => void) => {
  return [
    {
      name: "Nume",
      selector: (row: Student) => row.lastname,
      sortable: true,
    },
    {
      name: "Prenume",
      selector: (row: Student) => row.firstname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Student) => row.email,
      sortable: true,
    },
    {
      name: "Grupa",
      selector: (row: Student) => row.groupName || "-",
      sortable: true,
    },
    {
      cell: (row: Student) => (
        <button
          className="bg-mintBlue hover:bg-mint text-yellow px-1 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded"
          onClick={() => handleStudentGroup(row)}
        >
          Editeaza grupa
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
};

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
    <>
      {isOpen && (
        <div
          id="defaultModal"
          aria-hidden="true"
          tab-index="-1"
          className="fixed w-auto left-0 top-0  right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center flex-col bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-[30%]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                Editeaza grupa
              </h3>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupModal;

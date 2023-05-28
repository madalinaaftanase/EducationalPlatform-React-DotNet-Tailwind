import { ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GenericModal from "../../common/GenericModal";
import CancelButton from "../../common/CancelButton";
import Teacher from "../../../models/teacher/Teacher";
import config from "../../../config";
import { getTeachersByStudent } from "../../../services/studentAPI";
import { sendNotification } from "../../../services/notificationAPI";
import { getUserId, getUserName } from "../../../utilities/decodeJwt";

function Notify({ projectName }: { projectName: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(getUserId());
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const hasTeachers = teachers.length > 0;
  const { id } = useParams();

  useEffect(() => {
    init();
  }, [isModalOpen]);

  const init = async () => {
    const url = `${config.baseApiUrl}/Students/${userId}/Teachers`;
    const response = await getTeachersByStudent(url);

    if (response?.responseStatus == 200) {
      setTeachers(response.teachers);
    }

    setSelectedTeacher(undefined);
  };

  const handleSendNotification = () => {
    const projectURL = `${window.location.origin}/Studenti/${userId}/Proiecte/${id}`;
    const notification = {
      teacherEmail: selectedTeacher?.email || "",
      projectName: projectName,
      studentName: getUserName() || "",
      linkProject: projectURL,
    };

    const url = "/sendMail";
    const response = sendNotification(url, notification);
    setIsModalOpen(false);
  };

  const handleChangeTeacher: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const teacherId = e.target.value;
    const teacher = teachers.find((t) => t.id == teacherId);
    setSelectedTeacher(teacher);
  };

  return (
    <>
      <button
        className="flex bg-mintBlue hover:bg-mint text-yellow px-3 items-center font-bold border-b-4 border-mint hover:border-mintBlue rounded"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <span>Notificare profesor</span>
      </button>
      <GenericModal showModal={isModalOpen}>
        {hasTeachers && (
          <div className="flex gap-8">
            <select defaultValue={"default"} onChange={handleChangeTeacher}>
              <option value="default" disabled>
                Selecteaza un profesor
              </option>
              {teachers.map((teacher) => {
                return (
                  <option key={teacher.id} value={teacher.id}>
                    {`${teacher.firstname} ${teacher.lastname} `}
                  </option>
                );
              })}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-mintBlue hover:bg-mint text-yellow px-2 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded disabled:opacity-75"
                onClick={handleSendNotification}
                disabled={!selectedTeacher}
              >
                Notifica
              </button>
              <CancelButton setIsOpen={setIsModalOpen} text={"Anuleaza"} />
            </div>
          </div>
        )}
        {!hasTeachers && (
          <div className="flex justify-between items-center">
            <h5> Nu exista profesori</h5>
            <CancelButton setIsOpen={setIsModalOpen} text={"Anuleaza"} />
          </div>
        )}
      </GenericModal>
    </>
  );
}

export default Notify;
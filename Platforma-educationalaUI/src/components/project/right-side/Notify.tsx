import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GenericModal from "../../common/GenericModal";
import CancelButton from "../../common/CancelButton";
import Teacher from "../../../models/teacher/Teacher";
import config from "../../../config";
import { getTeachersByStudent } from "../../../services/studentAPI";
import { sendNotification } from "../../../services/notificationAPI";
import { getUserId, getUserName } from "../../../utilities/decodeJwt";
import Button from "../../navbar/components/Button";
import { UserContext } from "../../../hooks/UserContext";
import Homework from "../../../models/homework/Homework";

function Notify({
  projectName,
  homework,
}: {
  projectName: string;
  homework: Homework | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(getUserId());
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const hasTeachers = teachers.length > 0;
  const { id } = useParams();
  const { isTeacher } = useContext(UserContext);

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

    const response = sendNotification(notification);
    setIsModalOpen(false);
  };

  const handleChangeTeacher: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const teacherId = e.target.value;
    const teacher = teachers.find((t) => t.id == teacherId);
    setSelectedTeacher(teacher);
  };

  return (
    <>
      {!isTeacher && (
        <Button
          variant="orange"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <span>Notificare profesor</span>
        </Button>
      )}
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
              <Button
                variant={"general"}
                onClick={handleSendNotification}
                disabled={!selectedTeacher}
              >
                Notifica
              </Button>
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

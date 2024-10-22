import DataTable from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Student from "../../../models/student/Student";
import config from "../../../config";
import { addOrUpdateGroup, getById, getStudentsFromGroup } from "../../../services/groupAPI";
import EditableInput from "../../project/components/EditableInput";
import Group from "../../../models/group/Group";
import { UserContext } from "../../../hooks/UserContext";
import Teacher from "../../../models/teacher/Teacher";
import Button from "../../navbar/components/Button";

function GroupTable() {
  const { id } = useParams();
  const { isTeacher } = useContext(UserContext);
  const [teacher, setTeacher] = useState<Teacher>();
  const [students, setStudents] = useState<Student[]>([]);
  const [groupName, setGroupName] = useState("");
  const navigator = useNavigate();

  const handleStudentProjects = (student: Student) => {
    navigator(`/Studenti/${student.id}/Proiecte`);
  };

  const getTeacherColumns = () => {
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
        cell: (row: Student) => (
          <Button variant="general" onClick={() => handleStudentProjects(row)}>
            <span> Vezi proiecte</span>
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];
  };

  const getStudentColumns = () => {
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
    ];
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (id) {
      const groupDetails = await getById(id);
      if (groupDetails?.responseStatus == 200) {
        setGroupName(groupDetails.group.name);
        setTeacher(groupDetails.group.teacher);
      }

      const url = `${config.baseApiUrl}/Groups/${id}/Students`;
      const response = await getStudentsFromGroup(url);
      if (response?.responseStatus == 200) {
        setStudents(response.students);
      }
    }
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleSubmitChanges = async () => {
    const group: Partial<Group> = {
      name: groupName,
    };
    const url = `${config.baseApiUrl}/Groups/${id}`;
    id && (await addOrUpdateGroup(url, group));
  };

  return (
    <div className="border border-green-400 bg-gray-300 m-2 p-2 rounded-lg shadow-sm">
      <div className="flex">
        {isTeacher && (
          <h3>
            <EditableInput
              text={groupName}
              handleTextChange={handleTextChange}
              handleFinishedEdit={handleSubmitChanges}
            />
          </h3>
        )}
        {!isTeacher && <h3>{groupName}</h3>}
      </div>
      {!isTeacher && <p>Profesor: {`${teacher?.firstname} ${teacher?.lastname}`}</p>}

      <DataTable
        columns={isTeacher ? getTeacherColumns() : getStudentColumns()}
        data={students}
        pagination
        highlightOnHover={true}
        className="table w-3/5 bg-gray-100 text-gray-900 border border-green-400 rounded-lg shadow-sm"
      />
    </div>
  );
}

export default GroupTable;

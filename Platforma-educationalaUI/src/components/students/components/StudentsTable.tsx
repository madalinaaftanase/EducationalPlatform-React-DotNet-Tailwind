import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import config from "../../../config";
import { GetAllStudents } from "../../../services/studentAPI";
import { useNavigate } from "react-router-dom";
import Student from "../../../models/student/Student";
import GroupModal, { getColumns } from "./TableConfiguration";
import { UserContext } from "../../../hooks/UserContext";

function StudentsTable() {
  const navigator = useNavigate();
  const { idTeacher } = useContext(UserContext);
  const [studentDetails, setStudentDetails] = useState<Student>();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsCopy, setStudentsCopy] = useState<Student[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    var teacherId = localStorage.getItem("idTeacher");
    const url = `${config.baseApiUrl}/Teachers/${teacherId}/Students`;
    const response = await GetAllStudents(url);
    if (response?.responseStatus == 200) {
      setStudents(response?.students);
      setStudentsCopy(response?.students);
    } else {
      navigator("/Error");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value.toLowerCase();
    const newData = studentsCopy.filter((student) =>
      ["firstName", "lastName", "email"].some((prop) =>
        (student[prop as keyof typeof student] || "").toString().toLowerCase().includes(filter)
      )
    );

    setStudents(newData);
  };

  const handleOpenModal = (studentDetails: Student) => {
    setIsOpen(!isOpen);
    setStudentDetails(studentDetails);
  };

  //adg margine fortata
  return (
    <div className="border border-green-400 bg-gray-300 m-2 p-2 rounded-lg shadow-sm">
      <div className="w-full flex justify-between items-center mb-2">
        <h2>Studenti:</h2>
        <input
          className="p-1 w-1/6 rounded-lg"
          onChange={handleFilterChange}
          placeholder={"Cauta"}
        />
      </div>
      <DataTable
        columns={getColumns(handleOpenModal)}
        data={students}
        pagination
        highlightOnHover={true}
        className="table w-3/5 bg-gray-100 text-gray-900 border border-green-400 rounded-lg shadow-sm"
      />
      <GroupModal isOpen={isOpen} setIsOpen={setIsOpen} studentDetails={studentDetails} />
    </div>
  );
}

export default StudentsTable;

import { useState } from "react";
import Student from "../../../models/student/Student";
import Button from "../../navbar/components/Button";
import AddStudentModal from "../components/AddStudentModal";

interface Props {
  students: Student[];
  refetch: Function;
}

function ColaboratorsSection({ students, refetch }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleAddNewStudent = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-start gap-2 p-1">
      <Button variant="yellow" onClick={handleAddNewStudent}>
        <span>Adauga un student</span>
      </Button>
      <span className="font-bold">Colaboratori:</span>
      {students.map((student) => (
        <div key={student.id} className="flex flex-row ">
          <span>
            <span className="font-bold"> Nume: </span> {student.firstname} {student.lastname}
          </span>
          <span>
            , <span className="font-bold"> Email: </span> {student.email}
          </span>
        </div>
      ))}
      <AddStudentModal isOpen={showModal} setIsOpen={setShowModal} refetch={refetch} />
    </div>
  );
}

export default ColaboratorsSection;

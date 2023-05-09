import { useNavigate } from "react-router-dom";

function Profile() {
  const navigator = useNavigate();

  const goToStudents = () => {
    navigator("/Studenti");
  };

  return (
    <>
      <button onClick={goToStudents} className="bg-blue-400 p-2 hover:bg-blue-200">
        My students
      </button>
    </>
  );
}

export default Profile;

import { useNavigate } from "react-router-dom";

function Profile() {
  const navigator = useNavigate();
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("idTeacher");
    document.cookie = "token=; expires=" + new Date(0).toUTCString() + "; path=/";
    window.location.href = "/";
  };

  const goToStudents = () => {
    navigator("/Studenti");
  };

  return (
    <>
      <button onClick={logout} className="bg-blue-400 p-2 hover:bg-blue-200">
        Log out
      </button>
      <button onClick={goToStudents} className="bg-blue-400 p-2 hover:bg-blue-200">
        My students
      </button>
    </>
  );
}

export default Profile;

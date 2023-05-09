import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../../hooks/UserContext";

function DropdownMenu({ setIsOpen }: { setIsOpen: Function }) {
  const navigator = useNavigate();
  const { isTeacher } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("idTeacher");
    document.cookie = "token=; expires=" + new Date(0).toUTCString() + "; path=/";
    window.location.href = "/";

    setIsOpen(false);
  };

  const handleProfile = () => {
    navigator("/Profil");
    setIsOpen(false);
  };

  const handleStudents = () => {
    navigator("/Studenti");
    setIsOpen(false);
  };

  return (
    <div className="shadow-lg bg-green-300 absolute z-50 rounded-md mt-1.5 -ml-4">
      <div>
        <div
          className="block px-1 py-2 w-36 text-sm text-gray-700 hover:bg-navbar hover:text-gray-900 hover:rounded-md"
          onClick={handleProfile}
        >
          Profilul meu
        </div>
        {isTeacher && (
          <div
            className="block px-1 py-2 w-36 text-sm text-gray-700 hover:bg-navbar hover:text-gray-900"
            onClick={handleStudents}
          >
            Studentii mei
          </div>
        )}

        <div
          className="block px-1 py-2 w-36 text-sm text-gray-700 hover:bg-navbar hover:text-gray-900 mt-1 border-t hover:rounded-md"
          onClick={handleLogout}
        >
          Iesire cont
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
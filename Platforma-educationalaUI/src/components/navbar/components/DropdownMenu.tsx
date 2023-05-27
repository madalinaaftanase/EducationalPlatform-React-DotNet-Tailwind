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
    <div className="rounded-md mt-2 w-full">
      <div>
        <div
          className="block px-1 py-2 w-full text-sm text-gray-700 hover:bg-navbar hover:text-gray-900 hover:rounded-md border-t"
          onClick={handleProfile}
        >
          Profilul meu
        </div>
        {isTeacher && (
          <div
            className="block px-1 py-2 text-sm text-gray-700 hover:bg-navbar hover:text-gray-900"
            onClick={handleStudents}
          >
            Studentii mei
          </div>
        )}
        <div
          className="block px-1 py-2 text-sm text-gray-700 hover:bg-navbar hover:text-gray-900 border-t hover:rounded-md mt-2"
          onClick={handleLogout}
        >
          Iesire cont
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;

import { useContext, useState } from "react";
import { UserContext } from "../../../hooks/UserContext";
import DropdownMenu from "./DropdownMenu";

function Menu() {
  const { username: name } = useContext(UserContext);
  const [isDropdownOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <button
      className="hover:bg-navbarHover focus:bg-navbarHover py-1 rounded-md mt-3 z-50 relative"
      onClick={handleOpenDropdown}
      onBlur={handleCloseDropdown}
    >
      <div className="flex items-center gap-x-2 px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div>{name}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {isDropdownOpen && <DropdownMenu setIsOpen={setIsOpen} />}
    </button>
  );
}

export default Menu;

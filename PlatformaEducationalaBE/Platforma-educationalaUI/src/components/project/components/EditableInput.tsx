import { ChangeEventHandler, useState } from "react";

interface EditableInputInterface {
  text: string;
  handleTextChange: ChangeEventHandler<HTMLInputElement>;
  handleFinishedEdit?: Function;
  isVisibleForShare?: boolean;
}
function EditableInput({
  text,
  handleTextChange,
  handleFinishedEdit,
  isVisibleForShare,
}: EditableInputInterface) {
  const [displayEditIcon, setDisplayEditIcon] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleMouseHover = () => {
    setDisplayEditIcon(true);
  };

  const handleEdit = () => {
    setIsInEditMode(true);
  };

  const handleEditMode = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsInEditMode(false);
      handleFinishedEdit && handleFinishedEdit();
    }
  };

  const handleMouseLeave = () => {
    setIsInEditMode(false);
    setDisplayEditIcon(false);
    if (isInEditMode && handleFinishedEdit) {
      handleFinishedEdit();
    }
  };

  return (
    <>
      {isInEditMode ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleEditMode}
          onBlur={handleMouseLeave}
          className="p-1"
        />
      ) : (
        <div
          className="flex gap-4 cursor-pointer "
          onMouseOver={handleMouseHover}
          onMouseLeave={handleMouseLeave}
          onClick={handleEdit}
        >
          <div>{text}</div>
          {displayEditIcon && isVisibleForShare && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          )}
        </div>
      )}
    </>
  );
}

export default EditableInput;

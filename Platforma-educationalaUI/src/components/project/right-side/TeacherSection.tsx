//@ts-ignore
import ReactStars from "react-stars";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { saveProject } from "../../../services/projectAPI";
import config from "../../../config";
import Notify from "./Notify";

function TeacherSection({
  comment,
  grade,
  setGrade,
  setComment,
  projectName
}: {
  comment: string;
  grade: number;
  setGrade: Function;
  setComment: Function;
  projectName: string;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const { id, studentId } = useParams();
  const [key, setKey] = useState(0);
  const saveUrl = `${config.baseApiUrl}/Projects/${id}/Save`;

  useEffect(() => {
    init();
  }, [id, studentId]);

  useEffect(() => {
    setKey((prev: number) => prev + 1);
  }, [isEditable]);

  const init = () => {
    if (id && studentId) {
      setIsEditable(true);
    }
  };

  const ratingChanged = (newRating: number) => {
    setGrade(newRating);
    saveProject(saveUrl, { grade: newRating }, true, studentId);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      saveProject(saveUrl, { comment }, true, studentId);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={32}
        color2={"#ffd700"}
        edit={isEditable}
        value={grade}
        key={key}
      />
      <Notify projectName={projectName} />
      </div>
      <div className="pb-1">Comentarii</div>

      <textarea
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        readOnly={!isEditable}
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 "
        placeholder="Nu exista comentarii"
        value={comment}
      />
    </div>
  );
}

export default TeacherSection;

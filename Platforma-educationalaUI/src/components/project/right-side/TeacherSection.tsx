//@ts-ignore
import ReactStars from "react-stars";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { saveProject } from "../../../services/projectAPI";
import config from "../../../config";
import Notify from "./Notify";
import Homework from "../../../models/homework/Homework";
import Button from "../../navbar/components/Button";
import { getHomeworkByUserId, updateHomework } from "../../../services/homeworkAPI";
import { getUserId } from "../../../utilities/decodeJwt";
import Student from "../../../models/student/Student";

function TeacherSection({
  comment,
  grade,
  setGrade,
  setComment,
  projectName,
  homework,
  students,
  refetch,
}: {
  comment: string;
  grade: number;
  setGrade: Function;
  setComment: Function;
  projectName: string;
  homework: Homework | undefined;
  students: Student[];
  refetch: Function;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const { id, studentId } = useParams();
  const [key, setKey] = useState(0);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState("");
  const [availableHomeworks, setAvailableHomeworks] = useState<Homework[]>([]);

  const saveUrl = `${config.baseApiUrl}/Projects/${id}/Save`;
  const userId = getUserId();
  const isOwner = students.some((s) => s.id === userId);

  useEffect(() => {
    init();
  }, [id, studentId]);

  useEffect(() => {
    setKey((prev: number) => prev + 1);
  }, [isEditable]);

  const init = async () => {
    if (id && studentId) {
      setIsEditable(true);
    }
    const response = await getHomeworkByUserId();
    if (response?.responseStatus == 200 && response?.homeworks != null) {
      setAvailableHomeworks(response.homeworks.filter((homework:any) => !homework.projectId)); //?
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

  const handleAddHomework = async () => {
    await updateHomework(selectedHomeworkId, { projectId: id });
    refetch();
  };

  return (
    <div className="p-2">
      {homework && <div>Tema {homework.name}</div>}

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
        {isOwner && homework && <Notify projectName={projectName} homework={homework} />}
      </div>
      <div className="pb-1">Comentarii</div>

      <textarea
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        readOnly={!isEditable}
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 read-only:outline-none"
        placeholder="Nu exista comentarii"
        value={comment}
      />

      {!homework && isOwner && (
        <div className="flex flex-col gap-2 p-1 mt-2">
          <div> Nu există temă asociată cu acest proiect.</div>
          {availableHomeworks.length > 0 && (
            <>
              <select
                defaultValue="default"
                className="w-28"
                onChange={(e) => setSelectedHomeworkId(e.target.value)}
              >
                <option value="default" disabled>
                  {"Alege tema"}
                </option>
                {availableHomeworks.map((homework) => {
                  return (
                    <option key={homework.id} value={homework.id}>
                      {homework.name}
                    </option>
                  );
                })}
              </select>
              <Button
                className="w-48"
                variant="general"
                onClick={handleAddHomework}
                disabled={!selectedHomeworkId}
              >
                Adaugă temă
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherSection;

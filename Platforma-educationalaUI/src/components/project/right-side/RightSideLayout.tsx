import { useState } from "react";
import EditableInput from "../components/EditableInput";
import SaveButton from "../components/SaveButton";
import HTMLResult from "./HtmlResult";
import ResultCompiler from "./ResultCompiler";
import TeacherSection from "./TeacherSection";

interface RightSideLayoutInterface {
  htmlText: string;
  name: string;
  xml: string;
  isVisibleForShare: boolean;
  comment: string;
  grade: number;
  setGrade: Function;
  setComment: Function;
}

function RightSideLayout({
  htmlText,
  name,
  xml,
  isVisibleForShare,
  comment,
  grade,
  setGrade,
  setComment,
}: RightSideLayoutInterface) {
  const [selectedTab, setSelectedTab] = useState("result");
  const [newText, setNewText] = useState(name);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

  const getClassName = (tabName: string) => {
    let className = "hover:ring hover:bg-violet-300 hover:text-black p-2 rounded";
    if (selectedTab == tabName) {
      className += " ring bg-violet-300 text-black p-2";
    }
    return className;
  };

  return (
    <div className="right-side">
      <div className="flex justify-between p-2 bg-gray-200">
        <EditableInput
          text={newText}
          handleTextChange={handleTextChange}
          isVisibleForShare={isVisibleForShare}
        />
        {isVisibleForShare && <SaveButton name={newText} xml={xml} />}
      </div>
      <div className="bg-[#eb5353] flex gap-4 p-2 text-white ">
        <button className={getClassName("result")} onClick={() => setSelectedTab("result")}>
          Rezultat
        </button>
        <button className={getClassName("html")} onClick={() => setSelectedTab("html")}>
          Html
        </button>
        {
          <button className={getClassName("teacher")} onClick={() => setSelectedTab("teacher")}>
            Evaluare
          </button>
        }
      </div>

      {selectedTab == "result" && <ResultCompiler htmlText={htmlText} />}
      {selectedTab == "html" && <HTMLResult htmlText={htmlText} />}
      {selectedTab == "teacher" && (
        <TeacherSection
          comment={comment}
          setComment={setComment}
          grade={grade}
          setGrade={setGrade}
          projectName={name}
        />
      )}
    </div>
  );
}

export default RightSideLayout;

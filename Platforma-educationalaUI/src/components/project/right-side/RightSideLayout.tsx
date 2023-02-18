import { useState } from "react";
import EditableInput from "../components/EditableInput";
import SaveButton from "../components/SaveButton";
import HTMLResult from "./HtmlResult";
import ResultCompiler from "./ResultCompiler";

interface RightSideLayoutInterface {
  htmlText: string;
  name: string;
  xml: string;
}

function RightSideLayout({ htmlText, name, xml }: RightSideLayoutInterface) {
  const [isResultComponent, setResultComponent] = useState(true);
  const [newText, setNewText] = useState(name);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between p-2">
        <EditableInput text={newText} handleTextChange={handleTextChange} />
        <SaveButton name={newText} xml={xml} />
      </div>
      <div className="bg-[#eb5353] flex gap-4 p-2 text-white ">
        {/* need to be change when component is displayed not on focus */}
        <button
          className="focus:ring focus:bg-violet-300 focus:text-black hover:bg-sky-700 p-2"
          onClick={() => setResultComponent(true)}
        >
          Result
        </button>
        <button
          className="focus:ring focus:bg-violet-300 focus:text-black hover:bg-sky-700 p-2"
          onClick={() => setResultComponent(false)}
        >
          Html
        </button>
      </div>
      {isResultComponent && <ResultCompiler htmlText={htmlText} />}
      {!isResultComponent && <HTMLResult />}
    </>
  );
}

export default RightSideLayout;

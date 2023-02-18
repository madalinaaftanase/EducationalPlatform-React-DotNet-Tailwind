import { useState } from "react";
import EditableInput from "../components/EditableInput";
import HTMLResult from "./HtmlResult";
import ResultCompiler from "./ResultCompiler";

interface RightSideLayoutInterface {
  htmlText: string;
  name: string;
}

function RightSideLayout({ htmlText, name }: RightSideLayoutInterface) {
  const [isResultComponent, setResultComponent] = useState(true);
  return (
    <>
      <EditableInput text={name} />
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

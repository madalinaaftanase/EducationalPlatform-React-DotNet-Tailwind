import { useState } from "react";
import HTMLResult from "./HtmlResult";
import ResultCompiler from "./ResultCompiler";

function RightSideLayout({ htmlText }: { htmlText: string }) {
  const [isResultComponent, setResultComponent] = useState(true);
  return (
    <>
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

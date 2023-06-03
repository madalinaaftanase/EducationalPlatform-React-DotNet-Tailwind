import { useState } from "react";
import Button from "../../navbar/components/Button";

function ResultContainer({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const fullScreenStyle = {
    position: "absolute",
    inset: 0,
    height: "100vh",
    background: "white",
    zIndex: 100,
  };
  const style = isFullScreen ? fullScreenStyle : {};

  return (
    <div
      className="bg-white border-gray-400 border-4 h-[83%] rounded overflow-y-auto"
      style={style}
    >
      <div className=" bg-gray-300 border-b-2 border-gray-400">
        <div className="flex flex-start">
          <div className="bg-gray-200 flex justify-between w-[30%] rounded border-b-2 border-gray-400">
            <span>&nbsp; PaginaMea</span>
            <span className="px-2">x</span>
          </div>
          <div className="flex-1" />
          <Button variant="general" onClick={toggleFullScreen}>
            Mergi {!isFullScreen ? "Fullscreen" : "Normal"}
          </Button>
        </div>
        <div className="flex gap-2 items-center border-t-2 border-gray-200 ">
          <div className="pr-4 flex gap-1 ">
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>

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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>

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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <span className="bg-gray-100 pr-24 rounded pl-2"> https://localhost:3000/PaginaMea</span>
        </div>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}

export default ResultContainer;

// @ts-ignore
import beautify from "xml-beautifier";

function HTMLResult({ htmlText }: { htmlText: string }) {
  const handleDownloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([htmlText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className="flex justify-end items-end mr-2">
        <button
          className="flex bg-mintBlue hover:bg-mint text-yellow px-1 py-1 font-bold border-b-4 border-mint hover:border-mintBlue rounded"
          onClick={handleDownloadFile}
        >
          <span>Descarca</span>
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
      <textarea id="code" className="w-full h-[77%]" value={beautify(htmlText)} readOnly></textarea>
    </>
  );
}

export default HTMLResult;

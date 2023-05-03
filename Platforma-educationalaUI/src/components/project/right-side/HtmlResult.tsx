// @ts-ignore
import beautify from "xml-beautifier";

function HTMLResult({ htmlText }: { htmlText: string }) {
  return (
    <textarea id="code" className="w-full h-full" value={beautify(htmlText)} readOnly></textarea>
  );
}

export default HTMLResult;


function HTMLResult({ htmlText }: { htmlText: string }) {
  return (
    <textarea
      id="code"
      className="w-full h-full"
      value={htmlText}
      readOnly
    ></textarea>
  );
}

export default HTMLResult;

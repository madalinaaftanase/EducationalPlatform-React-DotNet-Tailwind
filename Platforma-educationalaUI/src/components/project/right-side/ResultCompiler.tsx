import ResultContainer from "./ResultContainer";

function Result({ htmlText }: { htmlText: string }) {
  if (!htmlText) {
    return <> </>;
  }

  return (
    <ResultContainer>
      <iframe className="w-full h-full" srcDoc={htmlText} />
    </ResultContainer>
  );
}

export default Result;

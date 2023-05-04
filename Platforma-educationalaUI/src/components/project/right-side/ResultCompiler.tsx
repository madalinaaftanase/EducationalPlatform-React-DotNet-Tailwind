import ResultContainer from "./ResultContainer";

function Result({ htmlText }: { htmlText: string }) {
  return (
    <ResultContainer>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </ResultContainer>
  );
}

export default Result;

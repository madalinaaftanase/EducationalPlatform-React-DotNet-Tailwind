import ResultContainer from "./ResultContainer";
import InnerHTML from "dangerously-set-html-content";

function Result({ htmlText }: { htmlText: string }) {
  if (!htmlText) {
    return <> </>;
  }

  return (
    <ResultContainer>
      <InnerHTML html={htmlText} key={htmlText} />
    </ResultContainer>
  );
}

export default Result;

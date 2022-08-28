function Result({ htmlText }: { htmlText: string }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
}

export default Result;

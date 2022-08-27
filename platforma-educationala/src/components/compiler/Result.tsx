function Result({ htmlText }: { htmlText: string }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
  // return <h3>Results will be displayed here</h3>;
}

export default Result;

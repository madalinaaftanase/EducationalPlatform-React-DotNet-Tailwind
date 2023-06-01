function TextContainer({ imgPath, text }: { imgPath: string; text: string }) {
  return (
    <div className="flex gap-1 ">
      <img src={imgPath} className="h-[1.5rem] animate-spin" alt="wheel" />
      <p>{text} </p>
    </div>
  );
}

export default TextContainer;

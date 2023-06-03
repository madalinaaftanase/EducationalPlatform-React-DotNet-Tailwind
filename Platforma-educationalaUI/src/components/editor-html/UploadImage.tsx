import { ChangeEventHandler } from "react";

function UploadImage({
  handleUploadImg,
}: {
  handleUploadImg: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="file"
      onChange={handleUploadImg}
      required={true}
      accept="image/png, image/gif, image/jpeg"
    />
  );
}

export default UploadImage;

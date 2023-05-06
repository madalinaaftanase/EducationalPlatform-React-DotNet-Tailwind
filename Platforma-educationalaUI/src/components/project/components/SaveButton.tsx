import { useParams } from "react-router";
import { useContext } from "react";

import config from "../../../config";
import { ProjectSave } from "../../../models/project/Project";
import { saveProject } from "../../../services/projectAPI";
import { UserContext } from "../../../hooks/UserContext";

function SaveButton({ name, xml }: { name: string; xml: string }) {
  const params = useParams();
  const { isTeacher } = useContext(UserContext);
  const url = `${config.baseApiUrl}/Projects/${params.id}/Save`;
  let data: ProjectSave = { id: params.id, name: name, xml: xml };

  const onClickSave = async () => {
    if (!xml) {
      alert(name);
      return;
    }
    const response = await saveProject(url, data, isTeacher);
  };

  return (
    <button
      className="bg-mintBlue hover:bg-mint text-yellow font-bold py-2 px-4 border-b-4 border-mint hover:border-mintBlue rounded"
      onClick={onClickSave}
    >
      Salveaza Proiect
    </button>
  );
}

export default SaveButton;

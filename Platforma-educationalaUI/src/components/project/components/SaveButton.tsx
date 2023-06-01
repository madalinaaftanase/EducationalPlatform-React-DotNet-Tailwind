import { useParams } from "react-router";
import { useContext } from "react";

import config from "../../../config";
import { ProjectSave } from "../../../models/project/Project";
import { saveProject } from "../../../services/projectAPI";
import { UserContext } from "../../../hooks/UserContext";
import Button from "../../navbar/components/Button";

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
    <Button variant="general" onClick={onClickSave}>
      <span>Salveaza Proiect</span>
    </Button>
  );
}

export default SaveButton;

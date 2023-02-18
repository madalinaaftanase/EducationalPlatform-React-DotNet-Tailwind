import { useParams } from "react-router";
import config from "../../../config";
import { ProjectSave } from "../../../models/project/Project";
import { saveProject } from "../../../services/projectAPI";

function SaveButton({ name, xml }: { name: string; xml: string }) {
  const params = useParams();
  const url = `${config.baseApiUrl}/Projects/${params.id}/Save`;
  let data: ProjectSave = { id: params.id, name: name, xml: xml };

  const onClickSave = async () => {
    console.log(xml);
    if(!xml){
        alert(name);
        return;
    }
    const response = await saveProject(url, data);
    if (response?.responseStatus == 200) {
      alert("Project saved successfully");
    }
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

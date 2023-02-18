import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BlockyMain from "../components/blocky-main/BlockyMain";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RightSideLayout from "../components/project/right-side/RightSideLayout";
import config from "../config";
import { ProjectResponse } from "../models/project/Project";
import { getById } from "../services/projectAPI";

function Project() {
  const navigator = useNavigate();
  const [initialXml, setInitialXml] = useState("");
  const [htmlText, setHtml] = useState("");
  const [calledDb, setCallDb] = useState(false);
  const [projectName, setProjectName] = useState("defualt");
  const params = useParams();

  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    if (params.id) {
      const url = `${config.baseApiUrl}/Projects/${params.id}`;
      const response = await getById(url);
      if (response?.responseStatus == 200 && response?.project != null) {
        setInitialXml(response.project.xml);
        setProjectName(response.project.name);
      } else {
        navigator("/Error");
      }
      setCallDb(true);
    }
  };
  // to do
  if (!calledDb && params.id) {
    return <LoadingSpinner />;
  }

  return (
    <main className="grid grid-rows-2  md:grid-cols-[3fr_2fr]">
      <section>
        <BlockyMain setHtml={setHtml} xmlFromDb={initialXml} />
      </section>
      <section className="bg-gray-200">
        <RightSideLayout htmlText={htmlText} name={projectName} />
      </section>
    </main>
  );
}

export default Project;

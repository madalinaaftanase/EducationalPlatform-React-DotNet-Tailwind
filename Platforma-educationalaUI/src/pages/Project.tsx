import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BlockyMain from "../components/blockyMain/BlockyMain";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RightSideLayout from "../components/game/RightSideLayout";
import config from "../config";
import { getById } from "../services/projectAPI";

function Project() {
  const [initialXml, setInitialXml] = useState("");
  const [htmlText, setHtml] = useState("");
  const params = useParams();

  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    if (params.id) {
      const url = `${config.baseApiUrl}/Proiecte/${params.id}`;
      const response = await getById(url);
      if (response.responseStatus == 200) {
        setInitialXml(response.project.xml);
      }
    }
  };
  // to do
  if (!initialXml && params.id) {
    return <LoadingSpinner />;
  }

  return (
    <main className="grid grid-rows-2  md:grid-cols-[3fr_2fr]">
      <section>
        <BlockyMain setHtml={setHtml} xmlFromDb={initialXml} />
      </section>
      <section className="bg-gray-200">
        <RightSideLayout htmlText={htmlText} />
      </section>
    </main>
  );
}

export default Project;

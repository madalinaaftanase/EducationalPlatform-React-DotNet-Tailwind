import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BlockyMain from "../components/blocky-main/BlockyMain";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RightSideLayout from "../components/project/right-side/RightSideLayout";
import config from "../config";
import { getById } from "../services/projectAPI";
import { UserContext } from "../hooks/UserContext";

function Project({ isTeacherOverride }: { isTeacherOverride?: boolean }) {
  const navigator = useNavigate();
  let { isTeacher } = useContext(UserContext);
  const [initialXml, setInitialXml] = useState("");
  const [changedXml, setChangeXml] = useState(initialXml);
  const [htmlText, setHtml] = useState("");
  const [calledDb, setCallDb] = useState(false);
  const [projectName, setProjectName] = useState("defualt");
  const params = useParams();

  if (isTeacherOverride !== undefined) {
    console.log(isTeacherOverride);
    isTeacher = isTeacherOverride;
  }

  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    if (params.id) {
      let url = `${config.baseApiUrl}/Projects/${params.id}`;
      if (params.studentId) {
        url += `?ownerId=${params.studentId}`;
      }
      const response = await getById(url);
      if (response?.responseStatus == 200 && response?.project != null) {
        setInitialXml(response.project.xml);
        setProjectName(response.project.name);
      } else {
        // navigator("/Error");
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
        <BlockyMain setHtml={setHtml} xmlFromDb={initialXml} setXml={setChangeXml} />
      </section>
      <section className="bg-gray-200">
        <RightSideLayout htmlText={htmlText} name={projectName} xml={changedXml} />
      </section>
    </main>
  );
}

export default Project;

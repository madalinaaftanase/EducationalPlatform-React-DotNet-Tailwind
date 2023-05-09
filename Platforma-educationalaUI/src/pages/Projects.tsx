import config from "../config";
import { getAll } from "../services/projectAPI";
import Project from "../models/project/Project";
import Card from "../components/project/components/Card";
import AddButton from "../components/project/components/AddButton";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";

function Projects() {
  const navigator = useNavigate();
  const { id } = useParams();
  const { isTeacher } = useContext(UserContext);
  let url = `${config.baseApiUrl}/Projects`;
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectPageTitle, setProjectPageTitle] = useState("Proiectele tale:");

  useEffect(() => {
    init();
  }, [isTeacher,id]);

  let init = async () => {
    if (id) {
      setProjectPageTitle("Proiectele studentului:");
      url = `${config.baseApiUrl}/Students/${id}/Projects`;
    }
    const response = await getAll(url, isTeacher);
    if (response?.responseStatus == 200) {
      setProjects(response.projects);
    } else {
      navigator("/Error");
    }
  };

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between">
        <h1>{projectPageTitle}</h1>
        <AddButton />
      </div>
      <div className="flex gap-4 flex-wrap">
        {projects.map((value) => {
          return <Card project={value} key={value.id} fetchData={init} />;
        })}
      </div>
    </div>
  );
}

export default Projects;

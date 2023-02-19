import config from "../config";
import { getAll } from "../services/projectAPI";
import Project from "../models/project/Project";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/project/components/Card";
import AddButton from "../components/project/components/AddButton";

function Projects() {
  const navigator = useNavigate();
  let url = `${config.baseApiUrl}/Projects`;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    const response = await getAll(url);
    if (response?.responseStatus == 200) {
      setProjects(response.projects);
    } else {
      navigator("/Error");
    }
  };

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between">
        <h1>Proiectele tale:</h1>
        <AddButton />
      </div>
      <div className="flex gap-4 flex-wrap">
        {projects.map((value) => {
          return <Card project={value} key={value.id} />;
        })}
      </div>
    </div>
  );
}

export default Projects;

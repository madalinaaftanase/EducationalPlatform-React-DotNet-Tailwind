import AddButton from "../components/project/AddButton";
import config from "../config";
import { getAll } from "../services/projectAPI";
import Project from "../models/project/Project";
import Card from "../components/project/Card";

import { useEffect, useState } from "react";

function Projects() {
  let url = `${config.baseApiUrl}/Projects`;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    init();
  }, []);

  let init = async () => {
    const response = await getAll(url);
    if (response.responseStatus == 200) {
      setProjects(response.projects);
    }
  };

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between">
        <h1>Proiectele tale:</h1>
        <AddButton />
      </div>
      <div className="flex gap-4">
        {projects.map((value) => {
          return <Card project={value} key={value.id} />;
        })}
      </div>
    </div>
  );
}

export default Projects;

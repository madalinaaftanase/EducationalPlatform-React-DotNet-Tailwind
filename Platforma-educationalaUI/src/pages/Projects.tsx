import AddButton from "../components/project/AddButton";
import config from "../config";
import { getAll } from "../services/projectAPI";
import { useState, useEffect } from "react";
import Project from "../models/project/Project";
import Card from "../components/project/Card";

function Projects() {
  let url = `${config.baseApiUrl}/Projects`;
  const [projects, setProjects] = useState<Project[]>([]);
  const [id, setId] = useState("");
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
    <div className="flex-col p-8">
      <AddButton />
      <h1>Projects</h1>
      <div
       
        className="flex flex-col gap-4 bg-blue-500"
      >
        {projects.map((value) => {
          //setId(value.id);
          return <Card project={value} key={value.id}/>;
        })}
      </div>
    </div>
  );
}

export default Projects;

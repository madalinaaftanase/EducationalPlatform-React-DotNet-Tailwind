import AddButton from "../components/project/AddButton";
import config from "../config";
import { getAll } from "../services/projectAPI";
import { useState, useEffect } from "react";
import  Project  from "../models/project/Project"

function Projects() {
    let url = `${config.baseApiUrl}/Projects`;
    const [projects, setProjects] = useState<Project[]>([]);
    const [id, setId] = useState("");
    useEffect(() => {
        init();
    });

    let init = async() =>{
    const response = await getAll(url);
    if (response.responseStatus == 200) {
        setProjects(response.projects);
    }

    }
    return ( <>
    <AddButton />
    <div className="cursor-pointer" onClick={()=>{window.location.href = `Projects/${id}`}}>
        <h1>Projects</h1>
        {projects.map((value)=>{
            setId(value.id)
            return <div>{value.name}</div>
        })}
    </div>
    </>);
}

export default Projects;
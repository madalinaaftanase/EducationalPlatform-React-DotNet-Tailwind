import { useNavigate } from "react-router-dom";
import Project from "../../models/project/Project";

interface CardInterface {
  project: Project;
}

function Card({ project }: CardInterface) {
  const navigator = useNavigate();
  return (
    <div
      className="block max-w-sm p-6 bg-blue-200 border border-gray-200 rounded-lg shadow hover:bg-blue-400 cursor-pointer "
      onClick={() => {
        navigator(`/Proiecte/${project.id}`);
      }}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {project.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">desciption</p>
    </div>
  );
}

export default Card;

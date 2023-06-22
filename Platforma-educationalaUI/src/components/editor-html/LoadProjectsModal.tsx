import React, { ChangeEventHandler, useState, useEffect } from "react";
import GenericModal from "../common/GenericModal";
import Button from "../navbar/components/Button";
import config from "../../config";
import { getAll } from "../../services/projectAPI";
import CancelButton from "../common/CancelButton";
import Project from "../../models/project/Project";
import { getHtmlCode } from "../../utilities/blocklyXmlToHtml";
import ResultContainer from "../project/right-side/ResultContainer";

interface Props {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  setLoadedProject: (arg: Project | undefined) => void;
}

function SendHomeworkModal({ showModal, setShowModal, setLoadedProject }: Props) {
  const [projects, setProjects] = useState<Project[]>();
  const [selectedProject, setSelectedProject] = useState<Project>();

  useEffect(() => {
    init();
  }, [showModal]);

  const init = async () => {
    const url = `${config.baseApiUrl}/Projects`;
    const response = await getAll(url, true);

    if (response?.responseStatus == 200) {
      setProjects(response?.projects);
    }
    setSelectedProject(undefined);
  };

  const handleProjectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const projectId = e.target.value;
    const project = projects?.find((t) => t.id == projectId);
    project && setSelectedProject(project);
  };

  const handleProjectLoad = () => {
    setLoadedProject(projects?.find((project) => project.id === selectedProject?.id));
    setShowModal(false);
  };

  return (
    <GenericModal showModal={showModal}>
      <div className="flex flex-col gap-2">
        {projects?.length && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex gap-8">
                <select defaultValue={"default"} onChange={handleProjectChange}>
                  <option value="default" disabled>
                    Selecteaza un proiect
                  </option>
                  {projects?.map((project) => {
                    return (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {selectedProject && (
              <ResultContainer>
                <iframe
                  className="w-full h-full ring-1"
                  srcDoc={getHtmlCode(selectedProject.xml)}
                  sandbox="allow-scripts allow-popups allow-same-origin"
                  key={selectedProject.id}
                />
              </ResultContainer>
            )}
            <div className="flex gap-3">
              <Button variant={"general"} onClick={handleProjectLoad} disabled={!selectedProject}>
                Încarcă
              </Button>
              <CancelButton setIsOpen={setShowModal} text={"Anuleaza"} />
            </div>
          </>
        )}

        {!projects?.length && (
          <div className="flex flex-col gap-2">
            <p>Nu ai proiecte momentan</p>
            <CancelButton setIsOpen={setShowModal} text={"Anuleaza"} />
          </div>
        )}
      </div>
    </GenericModal>
  );
}

export default SendHomeworkModal;

import React, { useEffect, useRef, useState } from "react";
import { options } from "../components/editor-html/options";
import ControlledEditor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import SendHomeworkModal from "../components/editor-html/SendHomeworkModal";
import LoadProjectsModal from "../components/editor-html/LoadProjectsModal";
import Project from "../models/project/Project";
import { getHtmlCode } from "../utilities/blocklyXmlToHtml";

function EditorHtml() {
  const editorRef = useRef<any>(null);
  const iframeElement = useRef<any>();
  const [theme, setTheme] = useState("vs-light");
  const [htmlCode, setHtmlCode] = useState<string | undefined>("");
  const [loadedProject, setLoadedProject] = useState<Project>();
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  useEffect(() => {
    if (!loadedProject) return;
    setHtmlCode(getHtmlCode(loadedProject.xml));
    setLoadedProject(undefined);
  }, [loadedProject]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined, event: any) => {
    setHtmlCode(value);
  };

  const getThemeText = () => {
    return theme === "vs-light" ? "Mod intunecat" : "Mod luminos";
  };

  const handleTheme = () => {
    if (theme === "vs-light") {
      setTheme("vs-dark");
    } else {
      setTheme("vs-light");
    }
  };

  const handleDownload = () => {
    let editorContent = "";
    if (editorRef.current) {
      editorContent = editorRef.current.getValue();
    }

    const element = document.createElement("a");
    const file = new Blob([editorContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  const handleSnapShot = () => {
    const iframe: any = document.getElementById("myIframe");

    html2canvas(iframe.contentDocument.body).then((canvas) => {
      const screenshot = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = screenshot;
      link.download = "HTML2IMG.png";
      link.click();
    });
  };

  return (
    <div className="flex border-4 border-gray-500">
      <div className="h-[89.5vh]">
        <div className="bg-gray-500 h-[5vh]">
          <div className="flex items-center gap-4 px-2">
            <button
              className="text-white hover:border-b-2 hover:border-yellow-200"
              onClick={handleDownload}
            >
              Descarca
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button className="text-white hover:border-b-2 hover:border-yellow-200" onClick={handleTheme}>
              {getThemeText()}
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button
              className="text-white hover:border-b-2 hover:border-yellow-200"
              onClick={handleSnapShot}
            >
              Captura
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button
              className="text-white hover:border-b-2 hover:border-yellow-200"
              onClick={() => {
                setShowProjectsModal(true);
              }}
            >
              Încarcă proiect
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button
              className="text-white hover:border-b-2 hover:border-yellow-200"
              onClick={() => {
                setShowHomeworkModal(true);
              }}
            >
              Creaza tema
            </button>
          </div>
        </div>
        <ControlledEditor
          height="84vh"
          width="50vw"
          defaultLanguage="html"
          defaultValue="<h1>apasa enter</h1>"
          value={htmlCode}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={options}
          theme={theme}
        />
      </div>
      <div className="h-[89.5vh] w-[49.5vw] border-l-4 border-gray-500">
        <div className="bg-gray-500 h-[5vh] text-white flex items-center">Rezultat</div>
        <iframe
          id="myIframe"
          className="w-full h-full"
          srcDoc={htmlCode}
          sandbox="allow-scripts allow-popups allow-same-origin"
          ref={iframeElement}
        />
      </div>
      <SendHomeworkModal
        showModal={showHomeworkModal}
        setShowModal={setShowHomeworkModal}
        projectHtmlCode={htmlCode}
      />
      <LoadProjectsModal
        showModal={showProjectsModal}
        setShowModal={setShowProjectsModal}
        setLoadedProject={setLoadedProject}
      />
    </div>
  );
}

export default EditorHtml;

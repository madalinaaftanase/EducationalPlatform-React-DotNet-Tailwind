import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { options } from "../components/editor-html/options";
import ControlledEditor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import GenericModal from "../components/common/GenericModal";
import Button from "../components/navbar/components/Button";
import CancelButton from "../components/common/CancelButton";
import Group from "../models/group/Group";
import { getAll, getStudentsFromGroup } from "../services/groupAPI";
import config from "../config";
import { sendHomework } from "../services/notificationAPI";
import FormField from "../components/authentification/FormField";
import UploadImage from "../components/editor-html/UploadImage";

function EditorHtml() {
  const editorRef = useRef<any>(null);
  const iframeElement = useRef<any>();
  const [theme, setTheme] = useState("vs-light");
  const [htmlCode, setHtmlCode] = useState<string | undefined>("");
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState<Group[]>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const [messageHomework, setMessageHomework] = useState("");

  const [error, setError] = useState("");
  const isDisabled = !selectedGroup || !selectedImage || !messageHomework;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined, event: any) => {
    setHtmlCode(value);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setError("");
  }, [selectedImage, selectedGroup, messageHomework]);

  const init = async () => {
    const url = `${config.baseApiUrl}/Groups`;
    const response = await getAll(url, true);

    if (response?.responseStatus == 200) {
      setGroups(response?.groups);
    }
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

  // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript#comment92434742_52311051
  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendHomework = async () => {
    setError("");

    const url = `${config.baseApiUrl}/Groups/${selectedGroup?.id}/Students`;
    const response = await getStudentsFromGroup(url);
    if (response?.responseStatus != 200) {
      return setError("Nu s-au putut incarca studentii din grupa!");
    }
    if (response.students.length === 0) {
      return setError("Grupa nu are studenti!");
    }

    for (const student of response.students) {
      if (!selectedImage) {
        return setError("Imaginea nu a fost gasita/ nu e valida!");
      }
      if (!student?.firstname && !student.email) {
        return setError("Detaliile despre email-ul unui student lipsesc!");
      }
      if (messageHomework.length < 3) {
        return setError("Mesajul este prea scurt!");
      }
      const notification = {
        teacherEmail: "",
        studentName: student.firstname,
        studentEmail: student.email,
        message: messageHomework,
        photo: await file2Base64(selectedImage),
      };
      const url = "/sendHomework";
      sendHomework(url, notification);
    }

    setShowModal(false);
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

  const handleChangeGroups: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const groupId = e.target.value;
    const group = groups?.find((t) => t.id == groupId);
    setSelectedGroup(group);
  };

  const handleUploadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
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

  const handleGetMessage: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newMessage = e.target.value;
    setMessageHomework(newMessage);
  };

  return (
    <div className="flex border-4 border-gray-500 ">
      <div className="h-[89.5vh]">
        <div className="bg-gray-500 h-[5vh]">
          <div className="flex items-center gap-4 px-2">
            <button
              className="text-white hover:border-b-2 hover:border-mint"
              onClick={handleDownload}
            >
              Descarca
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button className="text-white hover:border-b-2 hover:border-mint" onClick={handleTheme}>
              {getThemeText()}
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button
              className="text-white hover:border-b-2 hover:border-mint"
              onClick={handleSnapShot}
            >
              Captura
            </button>
            <div className="h-7 w-0.5 bg-gray-700" />
            <button
              className="text-white hover:border-b-2 hover:border-mint"
              onClick={() => {
                setShowModal(true);
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
          defaultValue="// scrie aici"
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
      <GenericModal showModal={showModal}>
        <div className="flex flex-col gap-8">
          {groups?.length && (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex gap-8">
                  <select defaultValue={"default"} onChange={handleChangeGroups}>
                    <option value="default" disabled>
                      Selecteaza o grupa
                    </option>
                    {groups?.map((group) => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                  </select>
                  <UploadImage handleUploadImg={handleUploadImg} />
                </div>
                <div className="flex flex-col pl-1">
                  <label>Mesaj:</label>
                  <textarea className="border-2 " onChange={handleGetMessage} />
                </div>
              </div>
              <span className="text-red-500 pl-1 -mt-8 -mb-4">{error}</span>
              <div className="flex gap-3">
                <Button variant={"general"} onClick={handleSendHomework} disabled={isDisabled}>
                  Trimite
                </Button>
                <CancelButton setIsOpen={setShowModal} text={"Anuleaza"} />
              </div>
            </>
          )}
          {!groups?.length && (
            <div className="flex gap-8">
              <p>Nu ai grupe momentan</p>
              <CancelButton setIsOpen={setShowModal} text={"Anuleaza"} />
            </div>
          )}
        </div>
      </GenericModal>
    </div>
  );
}

export default EditorHtml;

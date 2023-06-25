import React, { ChangeEventHandler, useState, useEffect } from "react";
import GenericModal from "../common/GenericModal";
import Group from "../../models/group/Group";
import UploadImage from "./UploadImage";
import Button from "../navbar/components/Button";
import config from "../../config";
import { getAll, getStudentsFromGroup } from "../../services/groupAPI";
import { sendHomeworkEmail } from "../../services/notificationAPI";
import CancelButton from "../common/CancelButton";
import html2canvas from "html2canvas";
import { addHomework } from "../../services/homeworkAPI";
import { group } from "console";
import { TextInput } from "flowbite-react";

interface Props {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  projectHtmlCode: string | undefined;
}

function SendHomeworkModal({ showModal, setShowModal, projectHtmlCode }: Props) {
  const [homeworkName, setHomeworkName] = useState("");
  const [groups, setGroups] = useState<Group[]>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const [messageHomework, setMessageHomework] = useState("");
  const [error, setError] = useState("");
  const isDisabled = !homeworkName || !selectedGroup || !selectedImage || !messageHomework;

  useEffect(() => {
    init();
  }, [showModal]);

  const init = async () => {
    const url = `${config.baseApiUrl}/Groups`;
    const response = await getAll(url, true);

    if (response?.responseStatus == 200) {
      setGroups(response?.groups);
    }
    setHomeworkName("");
    setSelectedImage(null);
    setSelectedGroup(undefined);
    setMessageHomework("");
    setError("");
  };

  useEffect(() => {
    setError("");
  }, [homeworkName, selectedImage, selectedGroup, messageHomework]);

  const handleChangeGroups: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const groupId = e.target.value;
    const group = groups?.find((t) => t.id == groupId);
    group && setSelectedGroup(group);
  };

  const handleUploadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleGetMessage: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newMessage = e.target.value;
    setMessageHomework(newMessage);
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

  const handleProjectImage = () => {
    const iframe: any = document.getElementById("myIframe");

    html2canvas(iframe.contentDocument.body).then((canvas) => {
      const screenshot = canvas.toDataURL("image/png");
      fetch(screenshot).then((response) => {
        response.blob().then((blob) => {
          const file = new File([blob], "project.png", { type: "image/png" });
          setSelectedImage(file);
        });
      });
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
      if (homeworkName.length < 3) {
        return setError("Titlul temei trebuie sa aibe cel putin 3 caractere");
      }
      if (!selectedImage) {
        return setError("Imaginea nu a fost gasita/ nu e valida!");
      }
      if (!student?.firstname && !student.email) {
        return setError("Detaliile despre email-ul unui student lipsesc!");
      }
      if (messageHomework.length < 3) {
        return setError("Mesajul este prea scurt!");
      }
      if (!selectedGroup?.id) {
        return setError("Grupa nu a fost selectata!");
      }
      const notification = {
        teacherEmail: "",
        studentName: student.firstname,
        studentEmail: student.email,
        message: messageHomework,
        photo: await file2Base64(selectedImage),
      };
      sendHomeworkEmail("/sendHomework", notification);
    }
    addHomework(homeworkName, selectedGroup?.id!);
    setShowModal(false);
  };

  return (
    <GenericModal showModal={showModal}>
      <div className="flex flex-col gap-8">
        {(groups?.length || 0 > 0) && (
          <>
            <div className="flex flex-col gap-2 ml-1">
              Titlu tema:
              <input
                className="ring-1 ring-gray-300 rounded-sm w-64 px-2"
                onChange={(e) => setHomeworkName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 -mt-4">
              {selectedImage ? (
                <div className="ml-1 text-teal-500">Imagine încărcată!</div>
              ) : (
                <div className="ml-1">
                  Alege poza html:
                  <div className="flex gap-4 mt-1">
                    <UploadImage handleUploadImg={handleUploadImg} />
                    sau
                    <Button variant="general" onClick={handleProjectImage}>
                      Proiect curent
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-8 mt-1 mb-1">
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
              </div>

              <div className="flex flex-col pl-1">
                <label>Mesaj:</label>
                <textarea className="border-2 px-2" onChange={handleGetMessage} />
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
          <div className="flex flex-col gap-2">
            <p>Nu ai grupe momentan</p>
            <CancelButton setIsOpen={setShowModal} text={"Anuleaza"} />
          </div>
        )}
      </div>
    </GenericModal>
  );
}

export default SendHomeworkModal;

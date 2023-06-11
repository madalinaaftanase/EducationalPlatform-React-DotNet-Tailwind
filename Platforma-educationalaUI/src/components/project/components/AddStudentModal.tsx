import { useState, useEffect } from "react";
import GenericModal from "../../common/GenericModal";
import Button from "../../navbar/components/Button";
import CancelButton from "../../common/CancelButton";
import config from "../../../config";
import { useParams } from "react-router";
import { addStudentToProject } from "../../../services/projectAPI";

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  refetch: Function;
}

function AddStudent({ isOpen, setIsOpen, refetch }: Props) {
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    setEmail("");
    setError("");
  }, [isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleSubmitAddButton = async () => {
    const url = `${config.baseApiUrl}/Projects/${params.id}/Student`;
    if (!email) return setError("Email-ul nu exista!");
    let error = true;
    try {
      const response = await addStudentToProject(url, email);
      if (response?.responseStatus == 200) {
        refetch();
        setIsOpen(false);
        error = false;
      }
    } catch {}
    if (error) {
      setError("Eroare la adaugare, verifica emailul!");
    }
  };

  const isDisable = !email;

  return (
    <GenericModal showModal={isOpen}>
      <h5>Introdu adresa de email:</h5>

      <input onChange={handleInput} placeholder="Email student" className="p-1 mt-2 w-full" />

      <div className="text-red-400">{error}</div>

      <div className="flex gap-x-6 mt-4">
        <Button variant="general" onClick={handleSubmitAddButton} disabled={isDisable}>
          <span>Adauga</span>
        </Button>
        <CancelButton setIsOpen={setIsOpen} text={"Anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default AddStudent;

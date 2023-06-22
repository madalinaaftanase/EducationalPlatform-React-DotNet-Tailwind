import React from "react";
import GenericModal from "./GenericModal";
import CancelButton from "./CancelButton";
import Button from "../navbar/components/Button";

interface CheckModalInterface {
  handleConfirm: () => void;
  handleCancel: () => void;
  setShowModal: Function;
  showModal: boolean;
  title: string;
}

function CheckModal({
  handleConfirm,
  showModal,
  title,
  setShowModal,
}: CheckModalInterface) {
  return (
    <GenericModal showModal={showModal}>
      <h5 className="text-black mb-8">{title}</h5>
      <div className="flex justify-start gap-4">
        <Button variant={"general"} onClick={handleConfirm}>  Da, sunt sigur</Button>
        <CancelButton setIsOpen={setShowModal} text={"Nu, anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default CheckModal;

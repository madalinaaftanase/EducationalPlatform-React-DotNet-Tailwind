import React from "react";
import GenericModal from "./GenericModal";
import CancelButton from "./CancelButton";

interface CheckModalInterface {
  handleConfirm: () => void;
  handleCancel: () => void;
  setShowModal: Function;
  showModal: boolean;
  title: string;
}

function CheckModal({
  handleCancel,
  handleConfirm,
  showModal,
  title,
  setShowModal,
}: CheckModalInterface) {
  return (
    <GenericModal showModal={showModal}>
      <h5 className="text-black">{title}</h5>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-300 hover:bg-gray-500 py-2 px-4 border-b-4 border-gray-800 hover:border-gray-700 rounded"
          onClick={handleConfirm}
        >
          Da, sunt sigur
        </button>
        <CancelButton setIsOpen={setShowModal} text={"Nu, anuleaza"} />
      </div>
    </GenericModal>
  );
}

export default CheckModal;

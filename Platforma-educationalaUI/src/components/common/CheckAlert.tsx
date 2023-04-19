import React from "react";
import GenericModal from "./GenericModal";

interface CheckModalInterface {
  handleConfirm: () => void;
  handleCancel: () => void;
  showModal: boolean;
  title: string;
}

function CheckModal({ handleCancel, handleConfirm, showModal, title }: CheckModalInterface) {
  return (
    <GenericModal showModal={showModal}>
      <h3 className="text-lg font-normal text-black p-8">{title}</h3>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-300 hover:bg-gray-500 py-2 px-4 border-b-4 border-gray-800 hover:border-gray-700 rounded"
          onClick={handleConfirm}
        >
          Da, sunt sigur
        </button>
        <button
          className="bg-red-300 hover:bg-pink-600 py-2 px-4 border-b-4 border-pink-600 hover:border-red-300 rounded"
          onClick={handleCancel}
        >
          {" "}
          Nu, anuleaza
        </button>
      </div>
    </GenericModal>
  );
}

export default CheckModal;

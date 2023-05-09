function CancelButton({ setIsOpen, text }: { setIsOpen: Function; text: string }) {
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  
  return (
    <button
      type="button"
      data-modal-hide="defaultModal"
      className="bg-red-400 hover:bg-red-500 px-2 py-1 font-bold border-b-4 border-red-800 hover:border-red-700 rounded"
      onClick={handleCloseModal}
    >
      {text}
    </button>
  );
}

export default CancelButton;

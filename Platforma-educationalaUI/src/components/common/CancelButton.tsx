import Button from "../navbar/components/Button";

function CancelButton({ setIsOpen, text }: { setIsOpen: Function; text: string }) {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Button variant="red" data-modal-hide="defaultModal" onClick={handleCloseModal}>
      {text}
    </Button>
  );
}

export default CancelButton;

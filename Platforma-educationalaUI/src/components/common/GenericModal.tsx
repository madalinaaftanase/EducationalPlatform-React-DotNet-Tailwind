interface GenericModalInterface {
  showModal: boolean;
  children: React.ReactNode;
}

function GenericModal({ children, showModal }: GenericModalInterface) {
  return (
    <>
      {showModal && (
        <div className="fixed w-auto z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center flex-col bg-gray-900 bg-opacity-50 ">
          <div className="justify-center items-center bg-white relative w-[30%] p-3 rounded mt-[15%]">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default GenericModal;

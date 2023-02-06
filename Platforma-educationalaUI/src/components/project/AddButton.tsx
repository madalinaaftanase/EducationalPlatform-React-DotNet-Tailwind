function AddButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-400 text-yellow font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
}

export default AddButton;

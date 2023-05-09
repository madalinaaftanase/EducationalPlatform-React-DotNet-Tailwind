function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-purple-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-green-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-yellow-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;

import { useNavigate } from "react-router-dom";

function AuthButton({ text, navigationLink }: { text: string; navigationLink: string }) {
  const navigator = useNavigate();

  return (
    <button
      className="bg-transparent text-textColor border-b-0 hover:border-b-2 hover:text-slate-600 "
      onClick={() => {
        navigator(navigationLink);
      }}
    >
      {text}
    </button>
  );
}

export default AuthButton;

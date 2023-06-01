import { ReactNode } from "react";

interface ButtonInterface {
  variant: string;
  onClick?: (arg?: any) => Promise<void> | void;
  children: ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  value?: string;
}
function Button({ variant: type, onClick, children, disabled }: ButtonInterface) {
  const getClassName = (type: string) => {
    console.log(type);
    let className = "py-1 px-3 border rounded shadow-md font-bold ";
    if (type == "general") {
      return `${className} bg-blue-200 hover:bg-blue-300 text-black `;
    }
    if (type === "yellow") {
      return `${className} bg-[#FFE15D] hover:bg-[#FFD93D]`;
    }
    if (type === "red") {
      return `${className} bg-[#E0144C] hover:bg-[#CD104D]`;
    }
    if (type === "orange") {
      return `${className} bg-[#F99417] hover:bg-[#F0A04B]`;
    }
    return `${className} bg-white hover:bg-gray-100 text-gray-800 font-semibold`;
  };
  return (
    <button className={getClassName(type)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

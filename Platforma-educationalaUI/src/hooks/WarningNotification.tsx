import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const WarningNotification = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const warning = localStorage.getItem("warning");
      if (warning) {
        toast.warn(warning, {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.removeItem("warning");
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {children}
      <ToastContainer limit={5} />
    </>
  );
};

export default WarningNotification;

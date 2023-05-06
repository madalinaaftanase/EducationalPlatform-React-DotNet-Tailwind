import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          if (
            response.config.method?.toLocaleLowerCase() !== "get" &&
            !response.request.responseURL.includes("Login")
          ) {
            toast.dismiss();
            toast.success("Succes", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        }
        return response;
      },
      async (response) => {
        toast.error(`Eroare! ${response.response.data.errors}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return (
    <>
      {children}
      <ToastContainer limit={1} />
    </>
  );
};

export default AxiosInterceptor;

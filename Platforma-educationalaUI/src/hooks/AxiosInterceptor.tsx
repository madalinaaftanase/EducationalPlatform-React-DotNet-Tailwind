import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const excludedURLs: Set<string> = new Set(["Login", "sendHomework", "Homework?groupId="]);
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      async (response) => {
        const requestURL = response.request.responseURL;
        if (response.status >= 200 && response.status < 300) {
          if (
            response.config.method?.toLocaleLowerCase() !== "get" &&
            !Array.from(excludedURLs).some((url) => requestURL.includes(url))
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
        const requestURL = response.request.responseURL;
        if (!Array.from(excludedURLs).some((url) => requestURL.includes(url))) {
          toast.error(`Eroare! ${response.response.data.errors}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
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

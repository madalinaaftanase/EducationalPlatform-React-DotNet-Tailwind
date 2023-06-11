import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./hooks/UserContext";
import AxiosInterceptor from "./hooks/AxiosInterceptor";
import "react-toastify/dist/ReactToastify.css";
import WarningNotification from "./hooks/WarningNotification";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <AxiosInterceptor>
          <WarningNotification>
            <App />
          </WarningNotification>
        </AxiosInterceptor>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

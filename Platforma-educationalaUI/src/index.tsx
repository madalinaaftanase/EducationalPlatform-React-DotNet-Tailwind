import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./hooks/UserContext";
import AxiosInterceptor from "./hooks/AxiosInterceptor";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

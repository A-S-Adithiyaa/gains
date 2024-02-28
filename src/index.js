import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import NavbarSection from "./components/Navbar";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  <React.StrictMode>
    {/* <NavbarSection /> */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
  // </BrowserRouter>
);

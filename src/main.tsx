import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.scss";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

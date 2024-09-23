import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

const apiUrl = process.env.REACT_APP_API_URL;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

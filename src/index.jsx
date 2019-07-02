import ReactDOM from "react-dom";
import "./main.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

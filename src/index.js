import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./scss/volt.scss";
import "./styles/style.css";
import "react-datetime/css/react-datetime.css";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <ScrollToTop />
      <HomePage />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

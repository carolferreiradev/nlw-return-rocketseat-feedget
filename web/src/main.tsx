import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes";

import { ThemeToggle } from "./components/ThemeToggle";
import { WidgetButton } from "./components/WidgetButton";

import { ThemeProvider } from "./contexts/ThemeContext";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeToggle />
      <Router />
      <WidgetButton />
    </ThemeProvider>
  </React.StrictMode>
);

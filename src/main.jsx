import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind CSS를 사용하기 위한 스타일시트

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

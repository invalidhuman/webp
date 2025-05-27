//
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 페이지 import
import Entrance from "./pages/Entrance";
import PracticePage from "./pages/PracticePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

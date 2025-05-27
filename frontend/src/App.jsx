// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 페이지 import
import Entrance from "./pages/Entrance";
import PracticePage from "./pages/PracticePage";

// Zustand store
import { useTTSStore } from "./stores/ttsStore";

export default function App() {
  const restore = useTTSStore((s) => s.restore);

  // 앱 시작 시 IndexedDB에서 히스토리 복원
  useEffect(() => {
    restore();
  }, [restore]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

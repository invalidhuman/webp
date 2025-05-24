import { useState } from "react";
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleMode = () => setIsDark(!isDark);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[#222] text-white" : "bg-[#fff] text-black"
      }`}
    >
      <h1>{isDark ? "! Dark Mode" : "☀ Light Mode"}</h1>
      <button
        onClick={toggleMode}
        className="mt-4 px-4 py-2x rounded bg-gray-200 border-2 border-gray-950 text-black"
      >
        {isDark ? "Light Mode로 전환" : "Dark Mode로 전환"}
      </button>
    </div>
  );
}

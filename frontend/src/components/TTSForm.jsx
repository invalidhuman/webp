// src/components/TTSForm.jsx
import React, { useState } from "react";
import { useGenerateTTS } from "../hooks/useGenerateTTS";

export default function TTSForm() {
  const [input, setInput] = useState("");
  const [voice, setVoice] = useState("coral");
  const [model, setModel] = useState("gpt-4o-mini-tts");
  const [instructions, setInstructions] = useState("");

  const { generate } = useGenerateTTS();

  // 카테고리별 지시어 목록
  const categories = {
    "Voice Affect": [
      "Calm, composed, and reassuring.",
      "Competent and in control, instilling trust.",
    ],
    Tone: [
      "Sincere, empathetic, with genuine concern for the customer and understanding of the situation.",
    ],
    Pacing: [
      "Slower during the apology to allow for clarity and processing.",
      "Faster when offering solutions to signal action and resolution.",
    ],
    Emotions: ["Calm reassurance, empathy, and gratitude."],
    Pronunciation: [
      "Clear, precise: Ensures clarity, especially with key details.",
      'Focus on key words like "refund" and "patience."',
    ],
    Pauses: [
      "Before and after the apology to give space for processing the apology.",
    ],
  };

  // 최댓값 계산
  const maxRows = Math.max(
    ...Object.values(categories).map((arr) => arr.length)
  );

  // 예시 클릭 토글
  const toggleExample = (example) => {
    if (instructions.includes(example)) {
      // 제거
      const updated = instructions
        .split(example)
        .join("")
        .trim()
        .replace(/\s{2,}/g, " ");
      setInstructions(updated);
    } else {
      // 추가
      const sep = instructions && !instructions.endsWith(" ") ? " " : "";
      setInstructions(instructions + sep + example);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await generate({ input, voice, model, instructions });
    setInput("");
    setInstructions("");
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-24 border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="읽어줄 문장을 입력하세요"
      />

      <div className="flex space-x-2">
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="coral">Coral</option>
          <option value="alloy">Alloy</option>
        </select>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4o-mini-tts">gpt-4o-mini-tts</option>
        </select>
      </div>

      <div>
        <input
          className="w-full border p-2"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions: 원하는 지시어를 입력하세요"
        />
      </div>

      {/* 카테고리별 지시어 테이블 */}
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              {Object.keys(categories).map((cat) => (
                <th key={cat} className="border px-2 py-1 text-left">
                  {cat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(maxRows)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(categories).map(([cat, examples]) => {
                  const example = examples[rowIndex] || null;
                  return (
                    <td key={cat} className="border px-2 py-1">
                      {example ? (
                        <button
                          type="button"
                          onClick={() => toggleExample(example)}
                          className={`w-full text-left p-1 rounded ${
                            instructions.includes(example)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {example}
                        </button>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
        disabled={!input.trim()}
      >
        Generate
      </button>
    </div>
  );
}

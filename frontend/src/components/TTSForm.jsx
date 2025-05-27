// components/TTSForm.jsx
import React, { useState } from "react";
import { useGenerateTTS } from "../hooks/useGenerateTTS";

export default function TTSForm() {
  // 재생할 Audio 객체를 담을 ref
  //   const audioRef = useRef(null);
  // blob URL을 상태로 보관 (다운로드용)
  //   const [audioUrl, setAudioUrl] = useState("");

  const [input, setInput] = useState("");
  const [voice, setVoice] = useState("coral");
  const [model, setModel] = useState("gpt-4o-mini-tts");

  const { generate } = useGenerateTTS();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await generate({ input, voice, model });
    setInput(""); // 제출 후 입력창 비우기
  };

  //   const handleSubmit = async () => {
  //     const { data } = await axios.post(
  //       "/api/getTodos",
  //       { input, voice, model },
  //       {
  //         responseType: "arraybuffer",
  //       }
  //     );
  //     // Blob → URL
  //     const blob = new Blob([data], { type: "audio/wav" });
  //     const url = URL.createObjectURL(blob);
  //     setAudioUrl(url);

  //     // Audio 객체 생성(처음이거나, 기존이 있으면 해제)
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       URL.revokeObjectURL(audioRef.current.src);
  //     }
  //     audioRef.current = new Audio(url);

  //     // 바로 재생
  //     await audioRef.current.play();
  //     onResult({ input, voice, model, blob, createdAt: Date.now() });
  //   };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-24 border"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="읽어줄 문장을 입력하세요"
      />
      <div className="flex space-x-2 my-2">
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="coral">Coral</option>
          <option value="alloy">Alloy</option>
          {/* 필요시 더 추가 */}
        </select>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4o-mini-tts">gpt-4o-mini-tts</option>
          {/* 다른 모델 옵션 */}
        </select>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

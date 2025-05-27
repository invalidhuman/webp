// src/pages/PracticePage.jsx
import React, { useEffect, useRef } from "react";
import TTSForm from "../components/TTSForm";
import { useTTSStore } from "../stores/ttsStore";

export default function PracticePage() {
  const history = useTTSStore((s) => s.history);
  const current = useTTSStore((s) => s.current);
  const setCurrent = useTTSStore((s) => s.setCurrent);
  const deleteItem = useTTSStore((s) => s.deleteItem);
  const audioRef = useRef(null);

  // Audio URL을 동적으로 Blob에서 생성하고 해제하며 재생
  const playCurrent = () => {
    if (!current || !current.blob) return;

    // 기존 인스턴스 정리
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      URL.revokeObjectURL(audioRef.current.src);
    }

    // Blob -> URL 생성
    const blobUrl = URL.createObjectURL(current.blob);
    audioRef.current = new Audio(blobUrl);
    audioRef.current.play();
  };

  const pauseCurrent = () => {
    audioRef.current?.pause();
  };

  const stopCurrent = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // 컴포넌트 언마운트 시 리소스 해제
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  return (
    <div className="flex h-full">
      {/* 좌측: 폼 + 히스토리 리스트 */}
      <div className="w-1/3 border-r p-4 overflow-auto">
        <TTSForm />
      </div>

      {/* 우측: 현재 선택 항목 및 컨트롤 */}
      <div className="w-2/3 p-4">
        {current ? (
          <>
            <h3 className="text-2xl mb-4">“{current.text}”</h3>
            <div className="space-x-2">
              <button
                onClick={playCurrent}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Play
              </button>
              <button
                onClick={pauseCurrent}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Pause
              </button>
              <button
                onClick={stopCurrent}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Stop
              </button>
            </div>
          </>
        ) : (
          <p>Generate 버튼을 눌러 음성을 만들어 보세요.</p>
        )}
        <ul className="mt-2 space-y-2">
          <h2 className="mt-6 text-xl">히스토리</h2>
          {history.map((item, i) => (
            <li
              key={i}
              className="p-2 rounded hover:bg-gray-100 flex justify-between items-center"
            >
              <button
                className="flex-1 text-left"
                onClick={() => setCurrent(item)}
              >
                <span className="block text-sm text-gray-600">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
                <span className="truncate">"{item.text}"</span>
              </button>
              {/* <button
                onClick={playCurrent}
                className="ml-2 p-1 bg-blue-500 text-white rounded"
              >
                ▶️
              </button> */}
              <button
                onClick={() => deleteItem(item)}
                className="p-1 bg-red-500 text-white rounded"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

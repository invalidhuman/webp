// pages/PracticePage.jsx
import React, { useEffect, useRef } from "react";
import TTSForm from "../components/TTSForm";
import { useTTSStore } from "../stores/ttsStore";

export default function PracticePage() {
  // 생성된 음성을 기록할 히스토리 및 현재 아이템 상태
  const history = useTTSStore((s) => s.history);
  const current = useTTSStore((s) => s.current);
  const setCurrent = useTTSStore((s) => s.setCurrent);
  const audioRef = useRef(null);

  // current가 바뀔 때마다 자동 재생
  useEffect(() => {
    if (!current) return;
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }
    audioRef.current = new Audio(current.url);
    audioRef.current.play();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, [current]);

  // TTSForm 으로부터 결과를 받을 때 호출될 함수
  // const handleResult = (item) => {
  //   setHistory((h) => [item, ...h]);
  //   setCurrent(item);
  // };

  return (
    <div className="flex h-full">
      {/* 좌측: 폼 + 히스토리 */}
      <div className="w-1/3 border-r p-4 overflow-auto">
        <TTSForm />
        <h2 className="mt-6 text-xl">히스토리</h2>
        <ul className="mt-2 space-y-2">
          {history.map((item, i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => setCurrent(item)}
            >
              <span className="text-sm text-gray-600 mr-2">
                {new Date(item.createdAt).toLocaleTimeString()}
              </span>
              <span className="truncate">"{item.text}"</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 우측: 현재 선택 항목 안내 */}
      <div className="w-2/3 p-4">
        {current ? (
          <p>“{current.text}” 를 재생 중입니다.</p>
        ) : (
          <p>Generate 버튼을 눌러 음성을 만들어 보세요.</p>
        )}
      </div>
    </div>
  );
}

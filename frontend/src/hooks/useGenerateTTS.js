// hooks/useGeneralTTS.js
import { useRef, useState } from "react";
import axios from "axios";
import { useTTSStore } from "../stores/ttsStore";

export const useGenerateTTS = () => {
  // 재생할 Audio 객체를 담을 ref
  const audioRef = useRef(null);
  // blob URL을 상태로 보관 (다운로드용)
  const [audioUrl, setAudioUrl] = useState("");

  const addItem = useTTSStore((s) => s.addItem);

  // 1. TTS API 요청
  // 2. 받아온 ArrayBuffer를 Blob으로 변환
  // 3. URL.createObjectURL로 Blob URL 생성 (사실상 2,3번은 ArrayBuffer -> Blob -> URL 변환)
  // 3. 결과를 Zustand 스토어에 저장
  const generate = async ({
    input,
    voice = "coral",
    model = "gpt-4o-mini-tts",
    instructions = "Speak in a cheerful and positive tone.",
  }) => {
    const { data } = await axios.post(
      "/api/getTodos",
      { input, voice, model, instructions },
      { responseType: "arraybuffer" }
    );

    // bolb -> URL 변환
    const blob = new Blob([data], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    // Audio 객체 생성(처음이거나, 기존이 있으면 해제)
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }
    audioRef.current = new Audio(url);

    const item = {
      text: input,
      voice,
      model,
      instructions,
      blob,
      url,
      createdAt: Date.now(),
    };

    addItem(item); // Zustand 스토어에 저장 & current 설정
    return item;
  };

  const playAudio = async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
  };
  return { generate, playAudio };
};

// Entrance.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Entrance() {
  const navigate = useNavigate();

  // 재생할 Audio 객체를 담을 ref
  const audioRef = useRef(null);
  // blob URL을 상태로 보관
  const [audioUrl, setAudioUrl] = useState("");

  const audioHandler = async () => {
    // 응답을 ArrayBuffer 로 받도록 설정
    const { data } = await axios.get("/api/getTodos", {
      responseType: "arraybuffer",
    });

    // vite.config.js 에서 proxy 설정을 했기 때문에 아래와 같이 절대 경로로 요청을 보낼 필요는 없어짐 테스트 완료
    // const { data } = await axios.get("https://newsev.vercel.app/api/getTodos", {
    //   responseType: "arraybuffer",
    // });

    // ArrayBuffer → Blob → URL → Audio 재생
    const blob = new Blob([data], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();

    // 사용 후 URL 해제
    URL.revokeObjectURL(url);
  };

  // 서버에서 받아와서 blob → URL 생성, Audio 객체 생성 및 재생
  const fetchAndPlay = async () => {
    // arraybuffer로 받아오기
    const { data } = await axios.get("/api/getTodos", {
      responseType: "arraybuffer",
    });

    // Blob → URL
    const blob = new Blob([data], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    // Audio 객체 생성(처음이거나, 기존이 있으면 해제)
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }
    audioRef.current = new Audio(url);

    // 바로 재생
    await audioRef.current.play();
  };

  // play / pause / stop 핸들러
  const handlePlay = () => audioRef.current?.play();
  const handlePause = () => audioRef.current?.pause();
  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // 다운로드 트리거
  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "speech.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="text-white text-center
      font-gong-light
      flex flex-col items-center justify-center bg-black h-screen w-screen"
    >
      <h1 className="m-0 p-[60px] text-[80px] font-gonggothicmedium">
        AI를 활용한 커스텀 TTS
      </h1>
      <div className="font-gonggothiclight">
        <button
          onClick={() => navigate("/practice")}
          className="
              font-gong-light text-[30px] font-[200] text-white
              bg-black
              border-[3.5px] border-[#ffd700]
              p-[25px] my-[30px] mx-[20px]
            "
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

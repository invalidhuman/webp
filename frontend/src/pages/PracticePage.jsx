// import { useState, useEffect } from "react";

import React, { useState } from "react";
import TTSForm from "../components/TTSForm";

export default function PracticePage() {
  // 생성된 음성을 기록할 히스토리 및 현재 아이템 상태
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState(null);

  // TTSForm 으로부터 결과를 받을 때 호출될 함수
  const handleResult = (item) => {
    setHistory((h) => [item, ...h]);
    setCurrent(item);
  };

  return (
    <div className="p-4 flex">
      {/* 1) TTSForm 에 onResult 전달 */}
      <div className="w-1/3">
        <TTSForm onResult={handleResult} />
      </div>
      {/* 2) 현재 선택된 아이템을 재생/컨트롤할 플레이어 */}
      {/* +      <div className="w-2/3">
+        {current ? (
+          <AudioPlayer item={current} />
+        ) : (
+          <p>생성된 음성이 없습니다.</p>
+        )}
+      </div> */}
    </div>
  );
}

// serverlessapi/getTodos.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // body에서 값 꺼내기 (없으면 기본값)
  const {
    input = "Today is a wonderful day to build something people love!",
    voice = "coral",
    instructions = "Speak in a cheerful and positive tone.",
  } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 로드
  });
  // const openai = new OpenAI({
  //   apiKey: process.env.VITE_OPENAI_API_KEY, // 환경 변수에서 API 키 로드
  // });

  const response = await openai.audio.speech.create({
    input,
    voice,
    instructions,
    model: "gpt-4o-mini-tts",
    response_format: "wav",
  });

  const buffer = Buffer.from(await response.arrayBuffer());

  res.status(200); // 원랜 없었음
  res.setHeader("Content-Type", "audio/wav");
  res.send(buffer);
}

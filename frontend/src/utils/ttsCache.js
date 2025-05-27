// src/utils/ttsCache.js
// indexedDB
import { get, set } from "idb-keyval";

const STORAGE_KEY = "tts-history";

// history 배열 저장하기
export async function saveHistory(history) {
  try {
    await set(STORAGE_KEY, history);
  } catch (err) {
    console.error("ttsCache.saveHistory 에러:", err);
  }
}

// 저장된 history 배열 불러오기
export async function loadHistory() {
  try {
    const stored = await get(STORAGE_KEY);
    return Array.isArray(stored) ? stored : [];
  } catch (err) {
    console.error("ttsCache.loadHistory 에러:", err);
    return [];
  }
}

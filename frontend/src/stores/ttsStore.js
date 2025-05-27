// stores/ttsStore.js
import { create } from "zustand";
import { saveHistory, loadHistory } from "../utils/ttsCache";

export const useTTSStore = create((set, get) => ({
  history: [],
  current: null,

  // 앱 시작 시 IndexedDB에서 히스토리 불러오기(복원)
  restore: async () => {
    const stored = await loadHistory();
    set(() => ({
      history: stored,
      current: stored[0] || null,
    }));
  },

  /** 새 TTS 아이템 추가 & current 설정 */
  addItem: async (item) => {
    set((state) => {
      const newHist = [item, ...state.history];
      return { history: newHist, current: item };
    });
    // IndexedDB에도 저장
    saveHistory(get().history);
  },

  /** 히스토리에서 선택만 변경 */
  setCurrent: (item) => set({ current: item }),

  //   // 새 TTS 아이템 추가 & current로 설정
  //   addItem: async (item) =>
  //     set((state) => ({
  //       history: [item, ...state.history],
  //       current: item,
  //     })),

  //   // 기존 히스토리에서 선택만 변경
  //   setCurrent: (item) =>
  //     set(() => ({
  //       current: item,
  //     })),
}));

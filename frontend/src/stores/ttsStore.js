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

  // 히스토리에서 클릭한 아이템을 전역 current로 설정
  setCurrent: (item) => set({ current: item }),

  // IndexedDB에서 삭제
  deleteItem: async (item) => {
    set((state) => {
      const newHist = state.history.filter(
        (h) => h.createdAt !== item.createdAt
      );
      const newCurrent =
        state.current?.createdAt === item.createdAt ? null : state.current;
      return { history: newHist, current: newCurrent };
    });
    saveHistory(get().history);
  },
}));

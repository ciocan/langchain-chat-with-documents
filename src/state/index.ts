import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useState, useEffect } from "react";

export interface FileType {
  name: string;
  size: number;
}

export interface Message {
  agent: "human" | "ai";
  text: string;
}

interface AppState {
  userId: string;
  question: string;
  history: Message[];
  files: FileType[];
  setUserId: (userId: string) => void;
  addFile: (file: FileType) => void;
  deleteFile: (id: string) => void;
  setQuestion: (question: string) => void;
  setHistory: (history: Message[]) => void;
  addToHistory: (message: Message) => void;
}

const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        userId: "anonymous",
        question: "",
        files: [],
        history: [],
        setUserId: (userId: string) => set({ userId }),
        addFile: (file: FileType) => set((state) => ({ files: [...state.files, file] })),
        deleteFile: (name: string) =>
          set((state) => ({ files: state.files.filter((file) => file.name !== name) })),
        setQuestion: (question: string) => set({ question }),
        setHistory: (history: Message[]) => set({ history }),
        addToHistory: (message: Message) =>
          set((state) => ({ history: [...state.history, message] })),
      }),
      { name: "app-state" },
    ),
  ),
);

// fix for hydration issue
// https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useAppState;

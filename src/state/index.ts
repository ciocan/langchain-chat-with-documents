import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useState, useEffect } from "react";

export interface FileType {
  id: string;
  name: string;
  size: number;
}

interface AppState {
  userId: string;
  files: FileType[];
  setUserId: (userId: string) => void;
  addFile: (file: FileType) => void;
  deleteFile: (id: string) => void;
}

const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        userId: "anonymous",
        files: [],
        setUserId: (userId: string) => set({ userId }),
        addFile: (file: FileType) => set((state) => ({ files: [...state.files, file] })),
        deleteFile: (id: string) =>
          set((state) => ({ files: state.files.filter((file) => file.id !== id) })),
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

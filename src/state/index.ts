import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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

export default useAppState;

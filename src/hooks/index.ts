import useAppState, { useStore } from "~/state";

export function useFiles() {
  const files = useStore(useAppState, (state) => state.files);
  const addFile = useAppState((state) => state.addFile);
  const deleteFile = useAppState((state) => state.deleteFile);
  return { files, addFile, deleteFile };
}

export function useUserId() {
  const userId = useStore(useAppState, (state) => state.userId) as string;
  const setUserId = useAppState((state) => state.setUserId);
  return { userId, setUserId };
}

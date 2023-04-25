import { useTimeout, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { useFiles, useUserId } from "~/hooks";
import { api } from "~/utils/api";

export const useFileDelete = (name: string) => {
  const [action, toggle] = useToggle(["delete", "confirm"] as const);
  const { start, clear } = useTimeout(toggle, 3000);
  const { deleteFile } = useFiles();
  const { userId } = useUserId();

  const deleteFileApi = api.s3.deleteFile.useMutation({
    onSuccess: () => {
      deleteFile(name);
      clear();
      toggle("delete");
    },
    onError: (error) => {
      console.error("TRPC:error", error);
      notifications.show({ title: "Error", message: error.message, color: "red" });
      clear();
      toggle("delete");
    },
  });

  const handleDelete = () => {
    deleteFileApi.mutate({ userId, name });
  };

  const handleClick = () => {
    if (action === "delete") start();
    toggle();
  };

  const isHidden = action === "delete";
  const isLoading = deleteFileApi.isLoading;

  return { isHidden, isLoading, handleClick, handleDelete, action };
};

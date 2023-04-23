import { ActionIcon, Group } from "@mantine/core";
import { useTimeout, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";

import { useFiles, useUserId } from "~/hooks";
import { api } from "~/utils/api";

function FileDelete({ name }: { name: string }) {
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

  return (
    <Group ml="auto" spacing={0} position="right" miw="60px">
      <ActionIcon
        variant="transparent"
        title="Cancel delete"
        onClick={handleClick}
        style={{ display: isHidden ? "none" : "block" }}
      >
        <IconX size={18} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        title="Confirm delete"
        onClick={handleDelete}
        style={{ display: isHidden ? "none" : "block" }}
        loading={deleteFileApi.isLoading}
      >
        <IconCheck size={18} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        title="Delete"
        onClick={handleClick}
        style={{ display: action === "confirm" ? "none" : "block" }}
      >
        <IconTrash size={18} />
      </ActionIcon>
    </Group>
  );
}

export default FileDelete;

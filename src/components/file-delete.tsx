import { ActionIcon, Group } from "@mantine/core";
import { useTimeout, useToggle } from "@mantine/hooks";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";

import { useFiles } from "~/hooks";

function FileDelete({ name }: { name: string }) {
  const [action, toggle] = useToggle(["delete", "confirm"] as const);
  const { start, clear } = useTimeout(toggle, 3000);
  const { deleteFile } = useFiles();

  const handleDelete = () => {
    deleteFile(name);
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

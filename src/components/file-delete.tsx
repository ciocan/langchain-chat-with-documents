import { ActionIcon, Group } from "@mantine/core";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";

import { useFileDelete } from "~/hooks/useFileDelete";

function FileDelete({ name }: { name: string }) {
  const { isHidden, isLoading, handleClick, handleDelete, action } = useFileDelete(name);

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
        loading={isLoading}
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

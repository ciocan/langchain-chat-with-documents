import type { DropzoneProps } from "@mantine/dropzone";
import { Stack, Text, rem } from "@mantine/core";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";

import { useFiles } from "~/hooks";
import { getId } from "~/utils";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/plain": [".txt"],
};

function FileUpload(props: Partial<DropzoneProps>) {
  const { files, addFile } = useFiles();

  const handleAddFile = (droppedFiles: File[]) => {
    const file = droppedFiles[0];
    if (!file) return;
    if (files?.some((f) => f.name === file.name)) {
      notifications.show({
        title: "Error!",
        message: "File already exists",
        color: "red",
      });
      return;
    }
    addFile({
      id: getId(),
      name: file.name,
      size: file.size,
    });
  };

  return (
    <Dropzone onDrop={handleAddFile} accept={acceptedFiles} maxFiles={1} {...props}>
      <Stack align="center" spacing="xs" style={{ minHeight: rem(42), pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload size="2.5rem" stroke={1} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="2.5rem" stroke={1} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size="2.5rem" stroke={1} />
        </Dropzone.Idle>
        <Text size="sm">Drag document here or click to select file</Text>
        <Text size="xs" color="dimmed">
          Only pdf, doc, docx, txt files are allowed
        </Text>
      </Stack>
    </Dropzone>
  );
}

export default FileUpload;

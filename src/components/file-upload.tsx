import type { DropzoneProps } from "@mantine/dropzone";
import { Stack, Text, rem } from "@mantine/core";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { useFileUpload } from "~/hooks/useFileUpload";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/plain": [".txt"],
};

function FileUpload(props: Partial<DropzoneProps>) {
  const { isLoading, handleAddFile } = useFileUpload();

  return (
    <Dropzone
      onDrop={handleAddFile}
      accept={acceptedFiles}
      maxFiles={1}
      loading={isLoading}
      {...props}
    >
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

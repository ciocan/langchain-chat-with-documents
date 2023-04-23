import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import type { DropzoneProps } from "@mantine/dropzone";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/plain": [".txt"],
};

function FileUpload(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      accept={acceptedFiles}
      maxFiles={1}
      {...props}
    >
      <Group position="center" spacing="md" style={{ minHeight: rem(42), pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload size="2.5rem" stroke={1} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="2.5rem" stroke={1} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size="2.5rem" stroke={1} />
        </Dropzone.Idle>
        <Text size="sm" color="dimmed">
          Drag document (pdf, doc, docx, txt) here or click to select file
        </Text>
      </Group>
    </Dropzone>
  );
}

export default FileUpload;

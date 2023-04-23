import { useState } from "react";
import type { DropzoneProps, FileWithPath } from "@mantine/dropzone";
import { Stack, Text, rem } from "@mantine/core";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";

import { useFiles, useUserId } from "~/hooks";
import { api } from "~/utils/api";

const acceptedFiles = {
  [MIME_TYPES.pdf]: [".pdf"],
  [MIME_TYPES.doc]: [".doc"],
  [MIME_TYPES.docx]: [".docx"],
  "text/plain": [".txt"],
};

function FileUpload(props: Partial<DropzoneProps>) {
  const [droppedFiles, setDroppedFiles] = useState<FileWithPath[]>([]);
  const { files, addFile } = useFiles();
  const { userId } = useUserId();

  const presignedUrlApi = api.s3.createPresignUrl.useMutation({
    onSuccess: async ({ url }) => {
      const file = droppedFiles[0];
      if (!file) return;
      const response = await fetch(url, { method: "PUT", body: file });
      if (response.status === 200) {
        // add file to state
        const { name, size } = file;
        addFile({ name, size });
        // index document in weaviate
      } else {
        console.error("S3:error", response);
        notifications.show({ title: "Error", message: response.statusText, color: "red" });
      }
    },
    onError: (error) => {
      console.error("PSurl:error", error);
      notifications.show({ title: "Error", message: error.message, color: "red" });
    },
  });

  const handleAddFile = (droppedFiles: File[]) => {
    setDroppedFiles(droppedFiles);
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
    presignedUrlApi.mutate({ userId, name: file.name });
  };

  const isLoading = presignedUrlApi.isLoading;

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

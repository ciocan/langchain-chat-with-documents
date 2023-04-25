import { useState } from "react";
import type { FileWithPath } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";

import { useFiles, useUserId } from "~/hooks";
import { api } from "~/utils/api";

export const useFileUpload = () => {
  const [droppedFiles, setDroppedFiles] = useState<FileWithPath[]>([]);
  const { files, addFile } = useFiles();
  const { userId } = useUserId();

  const presignedUrlApi = api.s3.createPresignUrl.useMutation({
    onSuccess: async ({ url }) => {
      const file = droppedFiles[0];
      if (!file) return;
      const response = await fetch(url, { method: "PUT", body: file });
      if (response.status === 200) {
        // index document in weaviate
        const { name } = file;
        indexDocumentApi.mutate({ userId, name });
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

  const indexDocumentApi = api.weaviate.index.useMutation({
    onSuccess: () => {
      const file = droppedFiles[0];
      if (!file) return;
      const { name, size } = file;
      addFile({ name, size });
    },
    onError: (error) => {
      console.error(error);
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

  const isLoading = presignedUrlApi.isLoading || indexDocumentApi.isLoading;

  return { isLoading, handleAddFile };
};

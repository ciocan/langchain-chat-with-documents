import { Flex, Stack, Text } from "@mantine/core";
import prettyBytes from "pretty-bytes";

import { useFiles } from "~/hooks";
import FileDelete from "~/components/file-delete";

function FileList() {
  const { files } = useFiles();

  return (
    <Stack spacing="xs" mt="xl">
      {files?.map((file) => {
        const { id, name, size } = file;
        return (
          <Flex key={id}>
            <Stack spacing={0}>
              <Text size="sm">{name}</Text>
              <Text size="xs" color="dimmed">
                {prettyBytes(size)}
              </Text>
            </Stack>
            <FileDelete id={id} />
          </Flex>
        );
      })}
    </Stack>
  );
}

export default FileList;

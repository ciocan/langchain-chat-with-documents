import { Text } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

import FileUpload from "~/components/file-upload";
import FileList from "~/components/file-list";
import Chat from "~/components/chat";
import { useUserId } from "~/hooks";

const Home: NextPage = () => {
  const { userId } = useUserId();
  return (
    <>
      <Head>
        <title>Chat with large documents</title>
        <meta name="description" content="Chat with large documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="">
        <div className="container flex h-screen">
          <div className="flex w-full max-w-sm flex-col bg-[#FBFBFB] p-4">
            <FileUpload />
            <FileList />
            <Text color="dimmed" size="xs" className="sticky bottom-0 mt-auto">
              {userId}
            </Text>
          </div>
          <div className="flex flex-1 flex-col">
            <Chat />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

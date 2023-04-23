import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat with large documents</title>
        <meta name="description" content="Bellingcat Hackhathon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="">
        <div className="container flex h-screen">
          <div className="w-full max-w-md bg-[#FBFBFB] p-4">
            sidebar here
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 overflow-y-auto bg-white p-8">
              messages here
            </div>
            <div className="sticky bottom-0 p-8">
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 rounded-l-md border-2 border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Type your message..."
                />
                <button className="rounded-r-md bg-blue-500 px-6 py-2 font-semibold text-white">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

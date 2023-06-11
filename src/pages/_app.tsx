import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "~/styles/globals.css";
import { api } from "~/utils/api";
import { useSetUserId } from "~/hooks";
import { SessionProvider } from "next-auth/react"

import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useSetUserId();

  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
        <Notifications />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

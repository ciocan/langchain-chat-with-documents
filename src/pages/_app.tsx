import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "~/styles/globals.css";
import { api } from "~/utils/api";
import { useSetUserId } from "~/hooks";

const MyApp: AppType = ({ Component, pageProps }) => {
  useSetUserId();

  return (
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
  );
};

export default api.withTRPC(MyApp);

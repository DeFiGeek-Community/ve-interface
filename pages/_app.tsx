import "src/css/rsuite-override.css";
import type { AppProps } from "next/app";
import "lib/i18nConfig";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { config, projectId } from "lib/connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#818181",
      },
    },
  },
});

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  themeMode: "light",
  projectId: projectId,
  enableAnalytics: false,
  themeVariables: {
    "--w3m-accent": "#5bad92",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ColorModeScript initialColorMode={"light"} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;

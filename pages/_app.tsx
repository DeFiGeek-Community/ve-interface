import "src/css/rsuite-override.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, theme, createWeb3ModalConfig } from "lib/connector";
import "lib/i18nConfig";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  createWeb3Modal(createWeb3ModalConfig());
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

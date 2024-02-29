import "src/css/rsuite-override.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, theme, createWeb3ModalConfig } from "lib/connector";
import "lib/i18nConfig";
import { SystemProvider } from "components/providers/SystemProvider";
import { ContractProvider } from "components/providers/ContractProvider";

const queryClient = new QueryClient();

createWeb3Modal(createWeb3ModalConfig());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SystemProvider>
            <ContractProvider>
              <ColorModeScript initialColorMode={"light"} />
              <Component {...pageProps} />
            </ContractProvider>
          </SystemProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;

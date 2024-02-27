import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { mainnet, sepolia, Chain } from "viem/chains";
import { extendTheme } from "@chakra-ui/react";

const chains = [mainnet, sepolia] as [Chain, ...Chain[]];

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";

function createConfig() {
  return defaultWagmiConfig({
    projectId: projectId,
    chains: chains,
    metadata: {
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      icons: [],
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export const config = createConfig();

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#818181",
      },
    },
  },
});

export const createWeb3ModalConfig = () => ({
  wagmiConfig: config,
  themeMode: "light" as const,
  projectId,
  enableAnalytics: false,
  themeVariables: {
    "--w3m-accent": "#5bad92",
  },
});

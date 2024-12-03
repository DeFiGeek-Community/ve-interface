import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, anvil } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, anvil],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
})
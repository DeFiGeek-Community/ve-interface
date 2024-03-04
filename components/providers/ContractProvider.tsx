import { useChainId } from "wagmi";
import { ContractContext } from "lib/contexts/ContractContext";
import { veSystemContracts } from "lib/constants/address";
import { veSystemAbis } from "lib/constants/abi";
import { environmentConfig } from "lib/constants/config";
import { ReactNode } from "react";

interface ContractProviderProps {
  children: ReactNode;
}

export function ContractProvider({ children }: ContractProviderProps) {
  const chainId = useChainId();
  const systemName = "yamato";
  const addresses = veSystemContracts[systemName][chainId];
  const abis = veSystemAbis[systemName][chainId];
  const config = environmentConfig[systemName][chainId];

  return (
    <ContractContext.Provider value={{ addresses, abis, config }}>
      {children}
    </ContractContext.Provider>
  );
}

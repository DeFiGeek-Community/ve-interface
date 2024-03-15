import { useChainId } from "wagmi";
import { ContractContext } from "lib/contexts/ContractContext";
import { veSystemContracts } from "lib/constants/address";
import { veSystemAbis } from "lib/constants/abi";
import { environmentConfig } from "lib/constants/config";
import { ReactNode, useState } from "react";

interface ContractProviderProps {
  children: ReactNode;
}

export function ContractProvider({ children }: ContractProviderProps) {
  const chainId = useChainId();
  const systemName = "yamato";
  const addresses = veSystemContracts[systemName][chainId];
  const abis = veSystemAbis[systemName][chainId];
  const config = environmentConfig[systemName][chainId];
  const [refetchFlag, setRefetchFlag] = useState(false);

  const triggerRefetch = () => {
    setRefetchFlag((prevFlag) => !prevFlag); // フラグを反転させる
  };

  return (
    <ContractContext.Provider
      value={{ addresses, abis, config, refetchFlag, triggerRefetch }}
    >
      {children}
    </ContractContext.Provider>
  );
}

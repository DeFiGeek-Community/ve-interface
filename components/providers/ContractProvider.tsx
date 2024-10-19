import { useChainId } from "wagmi";
import { ContractContext } from "lib/contexts/ContractContext";
import { veSystemContracts } from "lib/constants/address";
import { veSystemAbis } from "lib/constants/abi";
import { environmentConfig } from "lib/constants/config";
import { ReactNode, useState } from "react";
import Render404 from "components/error/Render404";

interface ContractProviderProps {
  children: ReactNode;
  systemName: string;
}

export function ContractProvider({
  children,
  systemName,
}: ContractProviderProps) {
  const chainId = useChainId();
  const addresses = veSystemContracts[systemName]?.[chainId];
  const abis = veSystemAbis[systemName]?.[chainId];
  const config = environmentConfig[systemName]?.[chainId];
  const [refetchFlag, setRefetchFlag] = useState(false);

  if (!addresses || !abis || !config) {
    console.error(`Invalid systemName or chainId: ${systemName}, ${chainId}`);
    return <Render404 />;
  }

  const triggerRefetch = () => {
    setRefetchFlag((prevFlag) => !prevFlag);
  };

  return (
    <ContractContext.Provider
      value={{ addresses, abis, config, refetchFlag, triggerRefetch }}
    >
      {children}
    </ContractContext.Provider>
  );
}

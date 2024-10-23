import { useChainId } from "wagmi";
import { ContractContext } from "lib/contexts/ContractContext";
import { veSystemContracts } from "lib/constants/address";
import { veSystemAbis } from "lib/constants/abi";
import { environmentConfig } from "lib/constants/config";
import { ReactNode, useState } from "react";

interface ContractProviderProps {
  children: (isValid: boolean) => ReactNode; // childrenを関数として受け取る
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

  const isValid = !!addresses && !!abis && !!config; // 有効性をチェック

  const triggerRefetch = () => {
    setRefetchFlag((prevFlag) => !prevFlag);
  };

  return (
    <ContractContext.Provider
      value={{ addresses, abis, config, refetchFlag, triggerRefetch }}
    >
      {children(isValid)} {/* 有効性をchildrenに渡す */}
    </ContractContext.Provider>
  );
}
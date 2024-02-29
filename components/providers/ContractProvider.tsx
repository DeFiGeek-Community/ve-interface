import { useSystemContext } from "lib/contexts/SystemContext";
import { ContractContext } from "lib/contexts/ContractContext";
import { veSystemContracts } from "lib/constants/address";
import { veSystemAbis } from "lib/constants/abi";
import { ReactNode } from 'react';

interface ContractProviderProps {
  children: ReactNode;
}

export function ContractProvider({ children }: ContractProviderProps) {
  const { systemName, chainId } = useSystemContext();
  const addresses = veSystemContracts[systemName][chainId];
  const abis = veSystemAbis[systemName][chainId];

  return (
    <ContractContext.Provider value={{ addresses, abis }}>
      {children}
    </ContractContext.Provider>
  );
}
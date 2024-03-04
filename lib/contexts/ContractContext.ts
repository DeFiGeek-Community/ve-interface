import { createContext, useContext } from "react";
import { ISystemContractAbis } from "lib/constants/abi";
import { ISystemContractAddresses } from "lib/constants/address";
import { IConfig } from "lib/constants/config";

interface IContractContext {
  abis: ISystemContractAbis;
  addresses: ISystemContractAddresses;
  config: IConfig;
}

export const ContractContext = createContext<IContractContext | undefined>(
  undefined,
);

export function useContractContext() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error(
      "useContractContext must be used within a ContractProvider",
    );
  }
  return context;
}

import { createContext, useContext } from "react";

interface ISystemContext {
  systemName: string;
  chainId: number;
}

export const SystemContext = createContext<ISystemContext | undefined>(undefined);

export function useSystemContext() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystemContext must be used within a SystemProvider");
  }
  return context;
}
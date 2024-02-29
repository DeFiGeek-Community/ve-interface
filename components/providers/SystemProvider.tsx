import { useChainId } from "wagmi";
import { SystemContext } from "lib/contexts/SystemContext";
import { ReactNode } from "react";

interface SystemProviderProps {
  children: ReactNode;
}

export function SystemProvider({ children }: SystemProviderProps) {
  const chainId = useChainId();
  const systemName = "yamato";

  return (
    <SystemContext.Provider value={{ systemName, chainId }}>
      {children}
    </SystemContext.Provider>
  );
}

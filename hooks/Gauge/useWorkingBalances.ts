import { useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useWorkingBalances(
  address?: `0x${string}`,
): ReturnType<typeof useReadContract> {
  const { addresses, abis, refetchFlag } = useContractContext();
  const { address: accentAddress } = useAccount();
  const config = {
    address: addresses.Gauge as `0x${string}`,
    abi: abis.Gauge,
  };
  const readFn = useReadContract({
    ...config,
    functionName: "workingBalances",
    args: [address || "0x0"],
    query: {
      enabled: !!accentAddress,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

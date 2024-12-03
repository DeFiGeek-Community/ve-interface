import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useTimeTotal(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<
    readonly unknown[],
    "getTotalWeight",
    readonly unknown[]
  >
> {
  const { addresses, abis, refetchFlag } = useContractContext();

  const config = {
    address: addresses.GaugeController as `0x${string}`,
    abi: abis.GaugeController,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "timeTotal",
    readonly unknown[]
  >({
    ...config,
    functionName: "timeTotal",
    args: [],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

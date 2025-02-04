import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function usePointsTotal(
  timestamp: bigint,
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<
    readonly unknown[],
    "pointsTotal",
    readonly [bigint]
  >
> {
  const { addresses, abis, refetchFlag } = useContractContext();

  const config = {
    address: addresses.GaugeController as `0x${string}`,
    abi: abis.GaugeController,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "pointsTotal",
    readonly [bigint]
  >({
    ...config,
    functionName: "pointsTotal",
    args: [timestamp],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}
import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useVoteUserSlopes(
  address?: `0x${string}`,
  scoreAddress?: `0x${string}`,
): ReturnType<
  typeof useReadContract<
    readonly unknown[],
    "voteUserSlopes",
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
    "voteUserSlopes",
    readonly unknown[]
  >({
    ...config,
    functionName: "voteUserSlopes",
    args: [address, scoreAddress],
    query: {
      enabled: !!(address || scoreAddress),
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

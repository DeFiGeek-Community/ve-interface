import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useVestingAmounts(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<
    readonly unknown[],
    "vestingAmounts",
    readonly unknown[]
  >
> {
  const { addresses, abis, refetchFlag } = useContractContext();
  const config = {
    address: addresses.Vesting as `0x${string}`,
    abi: abis.Vesting,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "vestingAmounts",
    readonly unknown[]
  >({
    ...config,
    functionName: "vestingAmounts",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

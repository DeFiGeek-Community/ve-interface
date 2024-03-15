import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useBalanceOf(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "balanceOf", readonly unknown[]>
> {
  const { addresses, abis, refetchFlag } = useContractContext();

  const config = {
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "balanceOf",
    readonly unknown[]
  >({
    ...config,
    functionName: "balanceOf",
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

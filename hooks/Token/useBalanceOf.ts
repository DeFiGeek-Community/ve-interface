import { useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useBalanceOf(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "balanceOf", readonly unknown[]>
> {
  const { addresses, abis, refetchFlag } = useContractContext();
  const { address: accentAddress } = useAccount();
  const config = {
    address: addresses.Token as `0x${string}`,
    abi: abis.Token,
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
      enabled: !!accentAddress,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

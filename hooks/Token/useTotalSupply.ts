import { useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useTotalSupply(): ReturnType<
  typeof useReadContract<readonly unknown[], "totalSupply", readonly unknown[]>
> {
  const { addresses, abis, refetchFlag } = useContractContext();
  const { address: accentAddress } = useAccount();

  const config = {
    address: addresses.Token as `0x${string}`,
    abi: abis.Token,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "totalSupply",
    readonly unknown[]
  >({
    ...config,
    functionName: "totalSupply",
    args: [],
    query: {
      enabled: !!accentAddress,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

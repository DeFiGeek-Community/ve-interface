import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function usePledge(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "getPledge", readonly unknown[]>
> {
  const { addresses, abis, refetchFlag } = useContractContext();

  const config = {
    address: addresses.Yamato as `0x${string}`,
    abi: abis.Yamato,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "getPledge",
    readonly unknown[]
  >({
    ...config,
    functionName: "getPledge",
    args: [address || "0x0"],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]);

  return readFn;
}

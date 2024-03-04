import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useClaimedAmounts(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<
    readonly unknown[],
    "claimedAmounts",
    readonly unknown[]
  >
> {
  const { addresses, abis } = useContractContext();

  const config = {
    address: addresses.Token as `0x${string}`,
    abi: abis.Token,
  };
  const readFn = useReadContract<
    readonly unknown[],
    "claimedAmounts",
    readonly unknown[]
  >({
    ...config,
    functionName: "claimedAmounts",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return readFn;
}

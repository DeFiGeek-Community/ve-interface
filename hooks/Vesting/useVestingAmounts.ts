import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useVestingAmounts(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "vestingAmounts", readonly unknown[]>
> {
  const { addresses, abis } = useContractContext();
  const config = {
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
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

  return readFn;
}

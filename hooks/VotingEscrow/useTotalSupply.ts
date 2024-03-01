import { useReadContract } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useTotalSupply(
  address?: `0x${string}`,
): ReturnType<
  typeof useReadContract<readonly unknown[], "totalSupply", readonly unknown[]>
> {
  const { addresses, abis } = useContractContext();

  const config = {
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
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
      enabled: !!address,
    },
  });

  return readFn;
}

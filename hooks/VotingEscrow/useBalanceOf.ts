import { useReadContract } from "wagmi";
import VotingEscrowABI from "lib/abis/yamato/veYMT.json";

export default function useBalanceOf(address?: `0x${string}`): {
  readFn: ReturnType<
    typeof useReadContract<
      typeof VotingEscrowABI,
      "balanceOf",
      readonly unknown[]
    >
  >;
} {
  const config = {
    address: process.env.NEXT_PUBLIC_VE_ADDRESS as `0x${string}`,
    abi: VotingEscrowABI,
  };
  const readFn = useReadContract<
    typeof VotingEscrowABI,
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

  return {
    readFn,
  };
}

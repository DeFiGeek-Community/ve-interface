import { useReadContract } from "wagmi";
import FeeDistributorABI from "lib/constants/abis/FeeDistributor.json";

export default function useTokens(): {
  readFn: ReturnType<
    typeof useReadContract<
      typeof FeeDistributorABI,
      "balanceOf",
      [`0x${string}`]
    >
  >;
} {
  const config = {
    address: process.env.NEXT_PUBLIC_FEE_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: FeeDistributorABI,
  };
  const readFn = useReadContract<
    typeof FeeDistributorABI,
    "getTokens",
    [`0x${string}`]
  >({
    ...config,
    functionName: "getTokens",
    args: [],
  });

  return {
    readFn,
  };
}

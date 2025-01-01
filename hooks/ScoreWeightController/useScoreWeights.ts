import { useEffect } from "react";
import { useReadContracts } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useScoreWeights(
  address?: `0x${string}`,
): ReturnType<typeof useReadContracts> {
  const { addresses, abis, refetchFlag } = useContractContext();

  const contracts = (addresses.Score || [])
    .filter(
      (score: { name: string; address?: `0x${string}` }) =>
        score.address !== undefined,
    )
    .map((score: { name: string; address?: `0x${string}` }) => ({
      address: addresses.GaugeController as `0x${string}`,
      abi: abis.GaugeController,
      functionName: "getScoreWeight",
      args: [score.address! as `0x${string}`],
    }));

  const results = useReadContracts({
    contracts,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    results.refetch();
  }, [refetchFlag]);

  return results;
}

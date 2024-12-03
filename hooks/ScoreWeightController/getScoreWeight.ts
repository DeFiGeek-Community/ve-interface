import { readContract } from "@wagmi/core";
import { useContractContext } from "lib/contexts/ContractContext";
import { config } from "lib/connector/core";

export default async function getScoreWeight(scoreAddress: `0x${string}`): Promise<any> {
  const { addresses, abis, refetchFlag } = useContractContext();

  try {
    const result = await readContract(config, {
      address: addresses.GaugeController as `0x${string}`,
      abi: abis.GaugeController,
      functionName: "getScoreWeight",
      args: [scoreAddress],
    });
    return result;
  } catch (error) {
    console.error("Error reading contract:", error);
  }
}
